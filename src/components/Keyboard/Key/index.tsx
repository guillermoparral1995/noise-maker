import React, { useContext, useEffect, useMemo } from 'react';
import { audioContext } from '../../../providers/AudioContextProvider';
import { midiContext } from '../../../providers/MIDIProvider';
import { NoteMessageEvent } from 'webmidi';
import { envelopeStateContext } from '../../Controls/EnvelopeControls/EnvelopeStateProvider';

import './index.scss';
import { Knobs } from '../../../types';

const Key = ({
  identifier,
  frequency,
}: {
  identifier: string;
  frequency: number;
}) => {
  const { context, output, lfo } = useContext(audioContext);
  const {
    state: { attack, decay, sustain, release, detune, waveform },
  } = useContext(envelopeStateContext);
  const midiInput = useContext(midiContext);
  let releaseTimeout: NodeJS.Timeout;

  const oscillator = useMemo(
    () => new OscillatorNode(context, { type: waveform, frequency }),
    [],
  );
  const envelope = useMemo(() => new GainNode(context), []);
  oscillator.type = waveform;
  oscillator.detune.value = detune;

  useEffect(() => {
    oscillator.start(context.currentTime);
    envelope.connect(output);
    return () => oscillator.disconnect();
  }, []);

  useEffect(() => {
    if (lfo.target === Knobs.DETUNE) {
      lfo.output.connect(oscillator.detune);
    }
    return () => lfo.output.disconnect();
  }, [lfo.target]);

  useEffect(() => {
    if (midiInput) {
      midiInput.addListener('noteon', (event: NoteMessageEvent) => {
        if (event.note.identifier === identifier) {
          play();
        }
      });

      midiInput.addListener('noteoff', (event: NoteMessageEvent) => {
        if (event.note.identifier === identifier) {
          stop();
        }
      });
    }
    return () => {
      if (midiInput) {
        midiInput.removeListener('noteon');
        midiInput.removeListener('noteoff');
      }
    };
  });

  const play = () => {
    // clear all pending scheduled events for envelope
    envelope.gain.cancelAndHoldAtTime(context.currentTime);
    clearTimeout(releaseTimeout);

    // reset envelope and connect oscillator
    envelope.gain.setValueAtTime(0, context.currentTime);
    oscillator.connect(envelope);

    // ramp up to attack value
    envelope.gain.linearRampToValueAtTime(1, context.currentTime + attack);

    // ramp down to sustain value in decay time
    envelope.gain.linearRampToValueAtTime(
      sustain,
      context.currentTime + attack + decay,
    );
  };

  const stop = () => {
    // clear pending scheduled evenets for envelope
    envelope.gain.cancelAndHoldAtTime(context.currentTime);

    // ramp down to 0 in release time
    envelope.gain.exponentialRampToValueAtTime(
      0.001,
      context.currentTime + release,
    );

    // set timeout for disconnecting oscillator after release
    releaseTimeout = setTimeout(
      () => {
        oscillator.disconnect();
      },
      (context.currentTime + release) * 1000 + 10,
    );
  };

  return (
    <button
      className={`key ${
        identifier.includes('#') ? 'black' : 'white'
      } ${identifier.replace('#', 'sharp')}`}
      type="button"
      onMouseDown={play}
      onMouseUp={stop}
    ></button>
  );
};

export default Key;

import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { NoteMessageEvent } from 'webmidi';
import { audioContext } from '../../../providers/AudioContextProvider';
import { midiContext } from '../../../providers/MIDIProvider';
import { envelopeStateContext } from '../../Controls/EnvelopeControls/EnvelopeStateProvider';
import './index.scss';
import useConnectLFOTargets from '../../../hooks/useConnectLFOTargets';
import { Knobs } from '../../../types';

const Key = ({
  identifier,
  frequency,
}: {
  identifier: string;
  frequency: number;
}) => {
  const keyRef = useRef<HTMLButtonElement>(null);
  const { context, output, lfo1, lfo2 } = useContext(audioContext);
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

  useConnectLFOTargets(lfo1, [
    { knob: Knobs.DETUNE, param: oscillator.detune },
  ]);
  useConnectLFOTargets(lfo2, [
    { knob: Knobs.DETUNE, param: oscillator.detune },
  ]);

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
    if (keyRef.current) {
      keyRef.current.classList.add('pressed');
    }
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
    if (keyRef.current) {
      keyRef.current.classList.remove('pressed');
    }
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
      ref={keyRef}
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

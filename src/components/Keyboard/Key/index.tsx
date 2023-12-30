import React, { useContext, useEffect } from 'react';
import { audioContext } from '../../../providers/AudioContextProvider';
import { midiContext } from '../../../providers/MIDIProvider';
import { NoteMessageEvent } from 'webmidi';
import { envelopeStateContext } from '../../Controls/EnvelopeControls/EnvelopeStateProvider';

import './index.scss';

const Key = ({
  identifier,
  frequency,
}: {
  identifier: string;
  frequency: number;
}) => {
  const { context, output } = useContext(audioContext);
  const {
    state: { attack, decay, sustain, release, waveform },
  } = useContext(envelopeStateContext);
  const midiInput = useContext(midiContext);
  let releaseTimeout: NodeJS.Timeout;

  const oscillator = new OscillatorNode(context, { type: waveform, frequency });
  const envelope = new GainNode(context);
  envelope.connect(output);
  oscillator.start(context.currentTime);

  useEffect(() => {
    return () => oscillator.stop();
  }, []);

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
      // if oscillator is playing while params change, turn it off
      oscillator.disconnect();
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

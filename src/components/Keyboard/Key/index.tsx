import React, { useContext, useEffect, useRef } from 'react';
import { NoteMessageEvent } from 'webmidi';
import { GainNodeMock, OscillatorNodeMock } from '../../../../__mocks__';
import { Notes } from '../../../constants/noteTable';
import useConnectLFOTargets from '../../../hooks/useConnectLFOTargets';
import {
  useInstantiateGainNode,
  useInstantiateOscillatorNode,
} from '../../../hooks/useInstantiateAudioNode';
import { audioContext } from '../../../providers/AudioContextProvider';
import { midiContext } from '../../../providers/MIDIProvider';
import { Knobs } from '../../../types';
import { envelopeStateContext } from '../../Controls/EnvelopeControls/EnvelopeStateProvider';
import styles from './index.module.scss';

interface KeyProps {
  identifier: Notes;
  frequency: number;
  __mockOscillator?: OscillatorNodeMock;
  __mockEnvelope?: GainNodeMock;
}

const Key = ({
  identifier,
  frequency,
  __mockOscillator,
  __mockEnvelope,
}: KeyProps) => {
  const keyRef = useRef<HTMLButtonElement>(null);
  const { context, output, lfo1, lfo2, delay } = useContext(audioContext);
  const {
    state: { attack, decay, sustain, release, detune, pitchbend, waveform },
  } = useContext(envelopeStateContext);
  const { selectedInput: midiInput } = useContext(midiContext);
  let releaseTimeout: NodeJS.Timeout;

  const oscillator = useInstantiateOscillatorNode(
    waveform,
    frequency,
    __mockOscillator,
  );
  const envelope = useInstantiateGainNode(__mockEnvelope);
  oscillator.type = waveform;
  oscillator.detune.value = detune + pitchbend;

  useEffect(() => {
    oscillator.start(context.currentTime);
    envelope.connect(output);
    envelope.connect(delay);
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
      keyRef.current.classList.add(styles.pressed);
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
      keyRef.current.classList.remove(styles.pressed);
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
      tabIndex={-1}
      ref={keyRef}
      className={`${styles.key} ${
        identifier.includes('#')
          ? `${styles.black} ${
              // TODO: find a nicer way to do this
              styles[identifier.replace('#', 'sharp') as keyof typeof styles]
            }`
          : styles.white
      }`}
      type="button"
      data-testid={identifier}
      onMouseDown={play}
      onMouseUp={stop}
    ></button>
  );
};

export default Key;

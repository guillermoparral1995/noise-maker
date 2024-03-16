import { Notes, NoteValue } from '@constants/noteTable';
import useConnectLFOTargets from '@hooks/useConnectLFOTargets';
import {
  useInstantiateGainNode,
  useInstantiateOscillatorNode,
} from '@hooks/useInstantiateAudioNode';
import { GainNodeMock, OscillatorNodeMock } from '@mocks';
import { audioContext } from '@providers/AudioContextProvider';
import { midiContext } from '@providers/MIDIProvider';
import { Knobs } from '@types';
import React, { useContext, useEffect, useRef } from 'react';
import { NoteMessageEvent } from 'webmidi';
import { envelopeStateContext } from '../../Controls/EnvelopeControls/EnvelopeStateProvider';
import styles from './index.module.scss';

interface KeyProps {
  identifier: Notes;
  value: NoteValue;
  __mockOscillator?: OscillatorNodeMock;
  __mockEnvelope?: GainNodeMock;
}

const Key = ({
  identifier,
  value,
  __mockOscillator,
  __mockEnvelope,
}: KeyProps) => {
  const keyRef = useRef<HTMLButtonElement>(null);
  const delayWasTurnedOn = useRef<boolean>(false);
  const releaseTimeout = useRef<NodeJS.Timeout>(null);
  const { context, output, lfo1, lfo2, delay } = useContext(audioContext);
  const {
    state: { attack, decay, sustain, release, detune, pitchbend, waveform },
  } = useContext(envelopeStateContext);
  const { selectedInput: midiInput } = useContext(midiContext);

  const oscillator = useInstantiateOscillatorNode(
    waveform,
    value.frequency,
    __mockOscillator,
  );
  const envelope = useInstantiateGainNode(__mockEnvelope);
  oscillator.type = waveform;
  oscillator.detune.value = detune + pitchbend;

  useEffect(() => {
    oscillator.start(context.currentTime);
    envelope.connect(output);
    return () => oscillator.disconnect();
  }, []);

  useEffect(() => {
    if (delay.active) {
      envelope.connect(delay.node);
      delayWasTurnedOn.current = true;
    } else {
      // this check is necessary to avoid disconnecting when no connection was first made
      if (delayWasTurnedOn.current) envelope.disconnect(delay.node);
    }
  }, [delay.active]);

  useConnectLFOTargets(lfo1, [
    { knob: Knobs.DETUNE, param: oscillator.detune },
  ]);
  useConnectLFOTargets(lfo2, [
    { knob: Knobs.DETUNE, param: oscillator.detune },
  ]);

  const handleKeyboardKeyDown = (e: KeyboardEvent) => {
    if (!e.repeat && e.key === value.mapping) {
      play();
    }
  };

  const handleKeyboardKeyUp = (e: KeyboardEvent) => {
    if (e.key === value.mapping) {
      stop();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardKeyDown);
    document.addEventListener('keyup', handleKeyboardKeyUp);

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
      document.removeEventListener('keydown', handleKeyboardKeyDown);
      document.removeEventListener('keyup', handleKeyboardKeyUp);
      if (midiInput) {
        midiInput.removeListener('noteon');
        midiInput.removeListener('noteoff');
      }
    };
  });

  const play = (e?: React.TouchEvent | React.MouseEvent) => {
    e?.preventDefault();
    if (keyRef.current) {
      keyRef.current.classList.add(styles.pressed);
    }
    // clear all pending scheduled events for envelope
    envelope.gain.cancelAndHoldAtTime(context.currentTime);
    clearTimeout(releaseTimeout.current);

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

  const stop = (e?: React.TouchEvent | React.MouseEvent) => {
    e?.preventDefault();
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
    releaseTimeout.current = setTimeout(
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
      onTouchStart={play}
      onTouchEnd={stop}
      onMouseDown={play}
      onMouseUp={stop}
    ></button>
  );
};

export default Key;

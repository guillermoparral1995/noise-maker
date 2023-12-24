import React, { useContext } from 'react';
import { audioContext } from '../../providers/AudioContextProvider';
import { stateContext } from '../../providers/StateProvider';
import { midiContext } from '../../providers/MIDIProvider';
import { NoteMessageEvent } from 'webmidi';

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
  } = useContext(stateContext);
  const midiInput = useContext(midiContext);

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

  const oscillator = new OscillatorNode(context, { type: waveform, frequency });
  const envelope = new GainNode(context);
  envelope.connect(output);
  oscillator.start(context.currentTime);

  const play = () => {
    envelope.gain.setValueAtTime(0, context.currentTime);
    oscillator.connect(envelope);
    envelope.gain.linearRampToValueAtTime(
      1,
      context.currentTime + attack + 0.01,
    );
    envelope.gain.linearRampToValueAtTime(
      sustain + 0.01,
      context.currentTime + attack + decay,
    );
  };

  const stop = () => {
    envelope.gain.cancelAndHoldAtTime(context.currentTime);
    envelope.gain.exponentialRampToValueAtTime(
      0.01,
      context.currentTime + release,
    );
    setTimeout(
      () => {
        oscillator.disconnect();
      },
      (context.currentTime + release) * 1000 + 10,
    );
  };

  return (
    <>
      <button type="button" onMouseDown={play} onMouseUp={stop}>
        {identifier}
      </button>
    </>
  );
};

export default Key;

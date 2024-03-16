import Selector from '@components/Selector';
import { midiContext } from '@providers/MIDIProvider';
import { Selectors } from '@types';
import React, { useContext } from 'react';

const MIDIInputSelector = () => {
  const { inputs, selectedInput, dispatch } = useContext(midiContext);

  return (
    <Selector
      id={Selectors.MIDI_INPUT}
      dispatch={dispatch}
      value={selectedInput?.name ?? ''}
      options={inputs.map((i) => ({ value: i, label: i }))}
    ></Selector>
  );
};

export default MIDIInputSelector;

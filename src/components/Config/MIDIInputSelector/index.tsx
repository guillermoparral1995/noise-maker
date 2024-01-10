import React, { useContext } from 'react';
import { midiContext } from '../../../providers/MIDIProvider';
import { Selectors } from '../../../types';
import Selector from '../../shared/Selector';

const MIDIInputSelector = () => {
  const { inputs, selectedInput, dispatch } = useContext(midiContext);

  return (
    <Selector
      id={Selectors.MIDI_INPUT}
      dispatch={dispatch}
      value={selectedInput?.name ?? ''}
      disabled={!inputs.length}
      options={inputs.map((i) => ({ value: i, label: i }))}
    ></Selector>
  );
};

export default MIDIInputSelector;

import React, { useContext } from 'react';
import Key from './Key';
import Selector from '../shared/Selector';
import noteTable from './noteTable';
import { Waveform } from '../../types';
import { stateContext } from '../../providers/StateProvider';
import { updateWaveform } from '../../store/actions';

const Keyboard = () => {
  const { state } = useContext(stateContext);
  return (
    <>
      <Selector
        options={[
          Waveform.SINE,
          Waveform.SQUARE,
          Waveform.SAWTOOTH,
          Waveform.TRIANGLE,
        ]}
        value={state.waveform}
        action={updateWaveform}
      ></Selector>
      {Object.entries(noteTable).map(([note, frequency]) => (
        <Key key={note} identifier={note} frequency={frequency}></Key>
      ))}
    </>
  );
};

export default Keyboard;

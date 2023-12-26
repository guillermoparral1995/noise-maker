import React, { useContext } from 'react';
import Key from './Key';
import Selector from '../shared/Selector';
import noteTable from '../../constants/noteTable';
import { Selectors, Waveform } from '../../types';
import { stateContext } from '../../providers/StateProvider';
import { updateWaveform } from '../../store/actions';
import './index.scss';

const Keyboard = () => {
  const { state } = useContext(stateContext);
  return (
    <>
      <Selector
        label={Selectors.WAVEFORM}
        options={[
          Waveform.SINE,
          Waveform.SQUARE,
          Waveform.SAWTOOTH,
          Waveform.TRIANGLE,
        ]}
        value={state.waveform}
        action={updateWaveform}
      ></Selector>
      <div className="keyboard">
        {Object.entries(noteTable).map(([note, frequency]) => (
          <Key key={note} identifier={note} frequency={frequency}></Key>
        ))}
      </div>
    </>
  );
};

export default Keyboard;

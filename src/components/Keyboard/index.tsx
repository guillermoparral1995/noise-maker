import React, { useContext } from 'react';
import Key from './Key';
import Selector from '../shared/Selector';
import noteTable from '../../constants/noteTable';
import { Selectors, Waveform } from '../../types';
import './index.scss';
import { envelopeStateContext } from '../Controls/EnvelopeControls/EnvelopeStateProvider';
import { updateWaveform } from '../Controls/EnvelopeControls/store/actions';

const Keyboard = () => {
  const { state, dispatch } = useContext(envelopeStateContext);
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
        dispatch={dispatch}
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

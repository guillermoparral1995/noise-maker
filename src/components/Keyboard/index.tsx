import React, { useContext } from 'react';
import Key from './Key';
import Selector from '../shared/Selector';
import noteTable from '../../constants/noteTable';
import { Knobs, Selectors, Waveform } from '../../types';
import { envelopeStateContext } from '../Controls/EnvelopeControls/EnvelopeStateProvider';
import {
  updateDetune,
  updateWaveform,
} from '../Controls/EnvelopeControls/store/actions';
import Knob from '../shared/Knob';

import './index.scss';

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
      <Knob
        label={Knobs.DETUNE}
        value={state.detune}
        action={updateDetune}
        dispatch={dispatch}
      ></Knob>
      <div className="keyboard">
        {Object.entries(noteTable).map(([note, frequency]) => (
          <Key key={note} identifier={note} frequency={frequency}></Key>
        ))}
      </div>
    </>
  );
};

export default Keyboard;

import React, { useContext } from 'react';
import noteTable from '../../constants/noteTable';
import { Knobs, Selectors } from '../../types';
import { envelopeStateContext } from '../Controls/EnvelopeControls/EnvelopeStateProvider';
import {
  updateDetune,
  updateWaveform,
} from '../Controls/EnvelopeControls/store/actions';
import Knob from '../shared/Knob';
import Selector from '../shared/Selector';
import Key from './Key';
import './index.scss';

const Keyboard = () => {
  const { state, dispatch } = useContext(envelopeStateContext);
  return (
    <>
      <div id="keyboard-controls" className="column">
        <Selector
          id={Selectors.WAVEFORM}
          dispatch={dispatch}
          value={state.waveform}
          action={updateWaveform}
        ></Selector>
        <Knob
          id={Knobs.DETUNE}
          value={state.detune}
          action={updateDetune}
          dispatch={dispatch}
        ></Knob>
      </div>
      <div id="keyboard-container">
        {Object.entries(noteTable).map(([note, frequency]) => (
          <Key key={note} identifier={note} frequency={frequency}></Key>
        ))}
      </div>
    </>
  );
};

export default Keyboard;

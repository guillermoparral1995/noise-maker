import React, { useContext } from 'react';
import noteTable from '../../constants/noteTable';
import useAddMidiListeners from '../../hooks/useAddMidiListeners';
import { Knobs, Selectors } from '../../types';
import { envelopeStateContext } from '../Controls/EnvelopeControls/EnvelopeStateProvider';
import Knob from '../shared/Knob';
import Selector from '../shared/Selector';
import Key from './Key';
import './index.scss';
import PitchbendWheel from './PitchbendWheel';

const Keyboard = () => {
  const { state, dispatch } = useContext(envelopeStateContext);
  useAddMidiListeners([Knobs.DETUNE], dispatch);
  return (
    <>
      <div id="keyboard-controls" className="column">
        <Selector
          id={Selectors.WAVEFORM}
          dispatch={dispatch}
          value={state.waveform}
        ></Selector>
        <Knob id={Knobs.DETUNE} value={state.detune} dispatch={dispatch}></Knob>
      </div>
      <div id="keyboard-wheels" className="column">
        <PitchbendWheel></PitchbendWheel>
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

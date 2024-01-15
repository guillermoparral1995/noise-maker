import React, { useContext } from 'react';
import noteTable, { Notes, NoteValue } from '../../constants/noteTable';
import useAddMidiListeners from '../../hooks/useAddMidiListeners';
import appStyles from '../../index.module.scss';
import { Knobs, Selectors } from '../../types';
import { envelopeStateContext } from '../Controls/EnvelopeControls/EnvelopeStateProvider';
import Knob from '../shared/Knob';
import Selector from '../shared/Selector';
import styles from './index.module.scss';
import Key from './Key';
import PitchbendWheel from './PitchbendWheel';

const Keyboard = () => {
  const { state, dispatch } = useContext(envelopeStateContext);
  useAddMidiListeners([Knobs.DETUNE], dispatch);
  return (
    <>
      <div className={appStyles.column}>
        <Selector
          id={Selectors.WAVEFORM}
          dispatch={dispatch}
          value={state.waveform}
        ></Selector>
        <Knob id={Knobs.DETUNE} value={state.detune} dispatch={dispatch}></Knob>
      </div>
      <div className={appStyles.column}>
        <PitchbendWheel></PitchbendWheel>
      </div>
      <div id={styles.keyboard_container}>
        {Object.entries(noteTable).map(
          ([note, noteValue]: [Notes, NoteValue]) => (
            <Key key={note} identifier={note} value={noteValue}></Key>
          ),
        )}
      </div>
    </>
  );
};

export default Keyboard;

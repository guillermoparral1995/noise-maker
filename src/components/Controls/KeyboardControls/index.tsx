import React, { useContext } from 'react';
import useAddMidiListeners from '../../../hooks/useAddMidiListeners';
import { Knobs, Selectors } from '../../../types';
import ControlsRow from '../../shared/ControlsRow';
import Knob from '../../shared/Knob';
import Selector from '../../shared/Selector';
import { envelopeStateContext } from '../EnvelopeControls/EnvelopeStateProvider';
import styles from './index.module.scss';
import PitchbendWheel from './PitchbendWheel';

const KeyboardControls = () => {
  const { state, dispatch } = useContext(envelopeStateContext);
  useAddMidiListeners([Knobs.DETUNE], dispatch);

  return (
    <>
      <div className={styles.column}>
        <ControlsRow>
          <Selector
            id={Selectors.WAVEFORM}
            dispatch={dispatch}
            value={state.waveform}
          ></Selector>
          <Knob
            id={Knobs.DETUNE}
            value={state.detune}
            dispatch={dispatch}
          ></Knob>
        </ControlsRow>
      </div>
      <div className={styles.column}>
        <PitchbendWheel></PitchbendWheel>
      </div>
    </>
  );
};

export default KeyboardControls;

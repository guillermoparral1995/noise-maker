import React, { useContext } from 'react';
import useAddMidiListeners from '../../../hooks/useAddMidiListeners';
import { useBreakpoints } from '../../../hooks/useBreakpoints';
import { Knobs, Selectors } from '../../../types';
import ControlsRow from '../../shared/ControlsRow';
import Knob from '../../shared/Knob';
import Selector from '../../shared/Selector';
import { envelopeStateContext } from '../EnvelopeControls/EnvelopeStateProvider';
import styles from './index.module.scss';
import PitchbendWheel from './PitchbendWheel';

const KeyboardControls = () => {
  const { state, dispatch } = useContext(envelopeStateContext);
  const { isDesktop } = useBreakpoints();
  useAddMidiListeners([Knobs.DETUNE], dispatch);

  return isDesktop ? (
    <>
      <div className={styles.column}>
        <Selector
          id={Selectors.WAVEFORM}
          dispatch={dispatch}
          value={state.waveform}
        ></Selector>
        <Knob id={Knobs.DETUNE} value={state.detune} dispatch={dispatch}></Knob>
      </div>
      <div className={styles.column}>
        <PitchbendWheel></PitchbendWheel>
      </div>
    </>
  ) : (
    <ControlsRow>
      <Selector
        id={Selectors.WAVEFORM}
        dispatch={dispatch}
        value={state.waveform}
        hideLabel
      ></Selector>
      <Knob id={Knobs.DETUNE} value={state.detune} dispatch={dispatch}></Knob>
    </ControlsRow>
  );
};

export default KeyboardControls;

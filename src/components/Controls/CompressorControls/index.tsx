import { ControlsRow, Knob } from '@components';
import { useBreakpoints } from '@hooks/useBreakpoints';
import { audioContext } from '@providers/AudioContextProvider';
import { Knobs } from '@types';
import React, { useContext } from 'react';
import {
  compressorStateContext,
  CompressorStateProvider,
} from './CompressorStateProvider';
import styles from './index.module.scss';

export const CompressorControls_ = () => {
  const { state, dispatch } = useContext(compressorStateContext);
  const { compressor } = useContext(audioContext);
  const { isMobile } = useBreakpoints();

  compressor.threshold.value = state.threshold;
  compressor.ratio.value = state.ratio;
  compressor.knee.value = state.knee;
  compressor.attack.value = state.attack;
  compressor.release.value = state.release;

  return (
    <>
      <h3>Compressor</h3>
      {isMobile ? (
        <ControlsRow>
          <Knob
            id={Knobs.COMPRESSOR_THRESHOLD}
            value={state.threshold}
            dispatch={dispatch}
          ></Knob>
          <Knob
            id={Knobs.COMPRESSOR_RATIO}
            value={state.ratio}
            dispatch={dispatch}
          ></Knob>
          <Knob
            id={Knobs.COMPRESSOR_KNEE}
            value={state.knee}
            dispatch={dispatch}
          ></Knob>
          <Knob
            id={Knobs.COMPRESSOR_ATTACK}
            value={state.attack}
            dispatch={dispatch}
          ></Knob>
          <Knob
            id={Knobs.COMPRESSOR_RELEASE}
            value={state.release}
            dispatch={dispatch}
          ></Knob>
        </ControlsRow>
      ) : (
        <div className={styles.column_container}>
          <div className={styles.compressor_column}>
            <Knob
              id={Knobs.COMPRESSOR_THRESHOLD}
              value={state.threshold}
              dispatch={dispatch}
            ></Knob>
            <Knob
              id={Knobs.COMPRESSOR_RATIO}
              value={state.ratio}
              dispatch={dispatch}
            ></Knob>
            <Knob
              id={Knobs.COMPRESSOR_KNEE}
              value={state.knee}
              dispatch={dispatch}
            ></Knob>
          </div>
          <div className={styles.compressor_column}>
            <Knob
              id={Knobs.COMPRESSOR_ATTACK}
              value={state.attack}
              dispatch={dispatch}
            ></Knob>
            <Knob
              id={Knobs.COMPRESSOR_RELEASE}
              value={state.release}
              dispatch={dispatch}
            ></Knob>
          </div>
        </div>
      )}
    </>
  );
};

export default () => (
  <CompressorStateProvider>
    <CompressorControls_></CompressorControls_>
  </CompressorStateProvider>
);

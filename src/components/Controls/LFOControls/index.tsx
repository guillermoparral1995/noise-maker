import React, { useContext, useEffect } from 'react';
import { OscillatorNodeMock } from '../../../../__mocks__';
import { knobsValues } from '../../../constants/knobsValues';
import useAddMidiListeners from '../../../hooks/useAddMidiListeners';
import { useBreakpoints } from '../../../hooks/useBreakpoints';
import useConnectLFOTargets from '../../../hooks/useConnectLFOTargets';
import { useInstantiateOscillatorNode } from '../../../hooks/useInstantiateAudioNode';
import { audioContext } from '../../../providers/AudioContextProvider';
import { Knobs, Selectors } from '../../../types';
import ControlsRow from '../../shared/ControlsRow';
import Knob from '../../shared/Knob';
import Selector from '../../shared/Selector';
import styles from './index.module.scss';
import { lfoStateContext, LFOStateProvider } from './LFOStateProvider';

export const LFOControls_ = ({
  __mockLFO1,
  __mockLFO2,
}: {
  __mockLFO1?: OscillatorNodeMock;
  __mockLFO2?: OscillatorNodeMock;
}) => {
  const { state, dispatch } = useContext(lfoStateContext);
  const { lfo1, lfo2, dispatch: audioDispatch } = useContext(audioContext);
  const { isDesktop } = useBreakpoints();
  useAddMidiListeners(
    [
      Knobs.LFO_1_FREQUENCY,
      Knobs.LFO_1_AMPLITUDE,
      Knobs.LFO_2_FREQUENCY,
      Knobs.LFO_2_AMPLITUDE,
    ],
    dispatch,
  );

  const lfo1Node = useInstantiateOscillatorNode(
    state.lfo1.waveform,
    state.lfo1.frequency,
    __mockLFO1,
  );
  const lfo2Node = useInstantiateOscillatorNode(
    state.lfo2.waveform,
    state.lfo2.frequency,
    __mockLFO2,
  );

  lfo1Node.type = state.lfo1.waveform;
  lfo1Node.frequency.value = state.lfo1.frequency;
  lfo2Node.type = state.lfo2.waveform;
  lfo2Node.frequency.value = state.lfo2.frequency;

  useEffect(() => {
    lfo1Node.connect(lfo1.output);
    lfo2Node.connect(lfo2.output);
    lfo1Node.start();
    lfo2Node.start();

    return () => {
      lfo1Node.disconnect();
      lfo2Node.disconnect();
    };
  }, []);

  useConnectLFOTargets(lfo2, [
    { knob: Knobs.LFO_1_FREQUENCY, param: lfo1Node.frequency },
    { knob: Knobs.LFO_1_AMPLITUDE, param: lfo1.output.gain },
  ]);

  useEffect(() => {
    if (lfo1.target !== 'off') {
      const knob = Knobs[lfo1.target];
      const range =
        ((knobsValues[knob].max - knobsValues[knob].min) / 2) *
        state.lfo1.amplitude;
      lfo1.output.gain.value = range;
    }
  }, [state.lfo1.amplitude, lfo1.target]);

  useEffect(() => {
    if (lfo2.target !== 'off') {
      const knob = Knobs[lfo2.target];
      const range =
        ((knobsValues[knob].max - knobsValues[knob].min) / 2) *
        state.lfo2.amplitude;
      lfo2.output.gain.value = range;
    }
  }, [state.lfo2.amplitude, lfo2.target]);

  return isDesktop ? (
    <>
      <div className={styles.lfo_column}>
        <h3>LFO 1</h3>
        <ControlsRow>
          <Selector
            id={Selectors.LFO_1_TARGET}
            value={lfo1.target}
            dispatch={audioDispatch}
          ></Selector>
          <Selector
            id={Selectors.LFO_1_WAVEFORM}
            value={state.lfo1.waveform}
            dispatch={dispatch}
          ></Selector>
        </ControlsRow>

        <Knob
          id={Knobs.LFO_1_FREQUENCY}
          value={state.lfo1.frequency}
          dispatch={dispatch}
        ></Knob>
        <Knob
          id={Knobs.LFO_1_AMPLITUDE}
          value={state.lfo1.amplitude}
          dispatch={dispatch}
        ></Knob>
      </div>
      <div className={styles.lfo_column}>
        <h3>LFO 2</h3>
        <ControlsRow>
          <Selector
            id={Selectors.LFO_2_TARGET}
            value={lfo2.target}
            dispatch={audioDispatch}
          ></Selector>
          <Selector
            id={Selectors.LFO_2_WAVEFORM}
            value={state.lfo2.waveform}
            dispatch={dispatch}
          ></Selector>
        </ControlsRow>

        <Knob
          id={Knobs.LFO_2_FREQUENCY}
          value={state.lfo2.frequency}
          dispatch={dispatch}
        ></Knob>
        <Knob
          id={Knobs.LFO_2_AMPLITUDE}
          value={state.lfo2.amplitude}
          dispatch={dispatch}
        ></Knob>
      </div>
    </>
  ) : (
    <>
      <h3 className={styles.section_title}>LFO 1</h3>
      <ControlsRow>
        <Selector
          id={Selectors.LFO_1_TARGET}
          value={lfo1.target}
          dispatch={audioDispatch}
        ></Selector>
        <Selector
          id={Selectors.LFO_1_WAVEFORM}
          value={state.lfo1.waveform}
          dispatch={dispatch}
        ></Selector>
      </ControlsRow>
      <Knob
        id={Knobs.LFO_1_FREQUENCY}
        value={state.lfo1.frequency}
        dispatch={dispatch}
      ></Knob>
      <Knob
        id={Knobs.LFO_1_AMPLITUDE}
        value={state.lfo1.amplitude}
        dispatch={dispatch}
      ></Knob>
      <h3 className={styles.section_title}>LFO 2</h3>
      <ControlsRow>
        <Selector
          id={Selectors.LFO_2_TARGET}
          value={lfo2.target}
          dispatch={audioDispatch}
        ></Selector>
        <Selector
          id={Selectors.LFO_2_WAVEFORM}
          value={state.lfo2.waveform}
          dispatch={dispatch}
        ></Selector>
      </ControlsRow>
      <Knob
        id={Knobs.LFO_2_FREQUENCY}
        value={state.lfo2.frequency}
        dispatch={dispatch}
      ></Knob>
      <Knob
        id={Knobs.LFO_2_AMPLITUDE}
        value={state.lfo2.amplitude}
        dispatch={dispatch}
      ></Knob>
    </>
  );
};

export default () => (
  <LFOStateProvider>
    <LFOControls_></LFOControls_>
  </LFOStateProvider>
);

import React, { useContext, useEffect, useMemo } from 'react';
import { knobsValues } from '../../../constants/knobsValues';
import useAddMidiListeners from '../../../hooks/useAddMidiListeners';
import useConnectLFOTargets from '../../../hooks/useConnectLFOTargets';
import { audioContext } from '../../../providers/AudioContextProvider';
import {
  updateLFO1Target,
  updateLFO2Target,
} from '../../../providers/AudioContextProvider/store/actions';
import { Knobs, Selectors } from '../../../types';
import Knob from '../../shared/Knob';
import Selector from '../../shared/Selector';
import { lfoStateContext, LFOStateProvider } from './LFOStateProvider';
import './index.scss';

const LFOControls_ = () => {
  const { state, dispatch } = useContext(lfoStateContext);
  const {
    context,
    lfo1,
    lfo2,
    dispatch: audioDispatch,
  } = useContext(audioContext);
  useAddMidiListeners(
    [
      Knobs.LFO_1_FREQUENCY,
      Knobs.LFO_1_AMPLITUDE,
      Knobs.LFO_2_FREQUENCY,
      Knobs.LFO_2_AMPLITUDE,
    ],
    dispatch,
  );
  const lfo1Node: OscillatorNode = useMemo(
    () =>
      new OscillatorNode(context, {
        type: state.lfo1.waveform,
        frequency: state.lfo1.frequency,
      }),
    [],
  );
  const lfo2Node: OscillatorNode = useMemo(
    () =>
      new OscillatorNode(context, {
        type: state.lfo2.waveform,
        frequency: state.lfo2.frequency,
      }),
    [],
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
      audioDispatch(updateLFO1Target(knob));
    }
  }, [state.lfo1.amplitude, lfo1.target]);

  useEffect(() => {
    if (lfo2.target !== 'off') {
      const knob = Knobs[lfo2.target];
      const range =
        ((knobsValues[knob].max - knobsValues[knob].min) / 2) *
        state.lfo2.amplitude;
      lfo2.output.gain.value = range;
      audioDispatch(updateLFO2Target(knob));
    }
  }, [state.lfo2.amplitude, lfo2.target]);

  return (
    <>
      <div className="lfo-column">
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
      <div className="lfo-column">
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
  );
};

export default () => (
  <LFOStateProvider>
    <LFOControls_></LFOControls_>
  </LFOStateProvider>
);

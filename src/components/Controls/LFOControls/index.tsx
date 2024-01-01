import React, { useContext, useEffect, useMemo } from 'react';
import Selector from '../../shared/Selector';
import {
  updateLFO1Amplitude,
  updateLFO1Frequency,
  updateLFO1Waveform,
  updateLFO2Amplitude,
  updateLFO2Frequency,
  updateLFO2Waveform,
} from './store/actions';
import { Knobs, Selectors, Waveform } from '../../../types';
import Knob from '../../shared/Knob';
import { lfoStateContext } from './LFOStateProvider';
import { audioContext } from '../../../providers/AudioContextProvider';
import { knobsLimits } from '../../../constants/knobsLimits';
import {
  updateLFO1Target,
  updateLFO2Target,
} from '../../../providers/AudioContextProvider/store/actions';

const LFOControls = () => {
  const { state, dispatch } = useContext(lfoStateContext);
  const {
    context,
    lfo1,
    lfo2,
    dispatch: audioDispatch,
  } = useContext(audioContext);
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

  useEffect(() => {
    if (lfo2.target === Knobs.LFO_1_FREQUENCY) {
      lfo2.output.connect(lfo1Node.frequency);
    }
    if (lfo2.target === Knobs.LFO_1_AMPLITUDE) {
      lfo2.output.connect(lfo1.output.gain);
    }
    return () => lfo2.output.disconnect();
  }, [lfo2.target]);

  useEffect(() => {
    const knob = Knobs[lfo1.target as keyof typeof Knobs];
    if (knob) {
      const range =
        ((knobsLimits[knob].max - knobsLimits[knob].min) / 2) *
        state.lfo1.amplitude;
      lfo1.output.gain.value = range;
      switch (lfo1.target) {
        case Knobs.VOLUME:
          audioDispatch(updateLFO1Target(Knobs.VOLUME));
          break;
        case Knobs.PAN:
          audioDispatch(updateLFO1Target(Knobs.PAN));
          break;
        case Knobs.FILTER_CUTOFF:
          audioDispatch(updateLFO1Target(Knobs.FILTER_CUTOFF));
          break;
        case Knobs.FILTER_RESONANCE:
          audioDispatch(updateLFO1Target(Knobs.FILTER_RESONANCE));
          break;
        case Knobs.DETUNE:
          audioDispatch(updateLFO1Target(Knobs.DETUNE));
          break;
        default:
          break;
      }
    }
  }, [state.lfo1.amplitude, lfo1.target]);

  useEffect(() => {
    const knob = Knobs[lfo2.target as keyof typeof Knobs];
    if (knob) {
      const range =
        ((knobsLimits[knob].max - knobsLimits[knob].min) / 2) *
        state.lfo2.amplitude;
      lfo2.output.gain.value = range;
      switch (lfo2.target) {
        case Knobs.VOLUME:
          audioDispatch(updateLFO2Target(Knobs.VOLUME));
          break;
        case Knobs.PAN:
          audioDispatch(updateLFO2Target(Knobs.PAN));
          break;
        case Knobs.FILTER_CUTOFF:
          audioDispatch(updateLFO2Target(Knobs.FILTER_CUTOFF));
          break;
        case Knobs.FILTER_RESONANCE:
          audioDispatch(updateLFO2Target(Knobs.FILTER_RESONANCE));
          break;
        case Knobs.DETUNE:
          audioDispatch(updateLFO2Target(Knobs.DETUNE));
          break;
        case Knobs.LFO_1_AMPLITUDE:
          audioDispatch(updateLFO2Target(Knobs.LFO_1_AMPLITUDE));
          break;
        case Knobs.LFO_1_FREQUENCY:
          audioDispatch(updateLFO2Target(Knobs.LFO_1_FREQUENCY));
          break;
        default:
          break;
      }
    }
  }, [state.lfo2.amplitude, lfo2.target]);

  return (
    <div>
      <Selector
        label={Selectors.LFO_1_TARGET}
        options={[
          'off',
          Knobs.VOLUME,
          Knobs.PAN,
          Knobs.FILTER_CUTOFF,
          Knobs.FILTER_RESONANCE,
          Knobs.DETUNE,
        ]}
        value={lfo1.target}
        dispatch={audioDispatch}
        action={updateLFO1Target}
      ></Selector>
      <Selector
        label={Selectors.LFO_1_WAVEFORM}
        options={[
          Waveform.SINE,
          Waveform.SQUARE,
          Waveform.SAWTOOTH,
          Waveform.TRIANGLE,
        ]}
        value={state.lfo1.waveform}
        dispatch={dispatch}
        action={updateLFO1Waveform}
      ></Selector>
      <Knob
        label={Knobs.LFO_1_FREQUENCY}
        value={state.lfo1.frequency}
        action={updateLFO1Frequency}
        dispatch={dispatch}
      ></Knob>
      <Knob
        label={Knobs.LFO_1_AMPLITUDE}
        value={state.lfo1.amplitude}
        action={updateLFO1Amplitude}
        dispatch={dispatch}
      ></Knob>
      <Selector
        label={Selectors.LFO_2_TARGET}
        options={[
          'off',
          Knobs.VOLUME,
          Knobs.PAN,
          Knobs.FILTER_CUTOFF,
          Knobs.FILTER_RESONANCE,
          Knobs.DETUNE,
          Knobs.LFO_1_AMPLITUDE,
          Knobs.LFO_1_FREQUENCY,
        ]}
        value={lfo2.target}
        dispatch={audioDispatch}
        action={updateLFO2Target}
      ></Selector>
      <Selector
        label={Selectors.LFO_2_WAVEFORM}
        options={[
          Waveform.SINE,
          Waveform.SQUARE,
          Waveform.SAWTOOTH,
          Waveform.TRIANGLE,
        ]}
        value={state.lfo2.waveform}
        dispatch={dispatch}
        action={updateLFO2Waveform}
      ></Selector>
      <Knob
        label={Knobs.LFO_2_FREQUENCY}
        value={state.lfo2.frequency}
        action={updateLFO2Frequency}
        dispatch={dispatch}
      ></Knob>
      <Knob
        label={Knobs.LFO_2_AMPLITUDE}
        value={state.lfo2.amplitude}
        action={updateLFO2Amplitude}
        dispatch={dispatch}
      ></Knob>
    </div>
  );
};

export default LFOControls;

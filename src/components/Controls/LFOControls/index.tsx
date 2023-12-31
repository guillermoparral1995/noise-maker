import React, { useContext, useEffect, useMemo } from 'react';
import Selector from '../../shared/Selector';
import {
  updateLFOAmplitude,
  updateLFOFrequency,
  updateLFOWaveform,
} from './store/actions';
import { Knobs, Selectors, Waveform } from '../../../types';
import Knob from '../../shared/Knob';
import { lfoStateContext } from './LFOStateProvider';
import {
  audioContext,
  updateLFOTarget,
} from '../../../providers/AudioContextProvider';
import { knobsLimits } from '../../../constants/knobsLimits';

const LFOControls = () => {
  const {
    state: { waveform, frequency, amplitude },
    dispatch,
  } = useContext(lfoStateContext);
  const { context, lfo, dispatch: audioDispatch } = useContext(audioContext);
  const lfoNode: OscillatorNode = useMemo(
    () =>
      new OscillatorNode(context, {
        type: waveform,
        frequency: frequency,
      }),
    [],
  );
  lfoNode.type = waveform;
  lfoNode.frequency.value = frequency;

  useEffect(() => {
    lfoNode.connect(lfo.output);
    lfoNode.start();

    return () => lfoNode.disconnect();
  }, []);

  useEffect(() => {
    const knob = Knobs[lfo.target as keyof typeof Knobs];
    if (knob) {
      const range =
        ((knobsLimits[knob].max - knobsLimits[knob].min) / 2) * amplitude;
      lfo.output.gain.value = range;
      switch (lfo.target) {
        case Knobs.VOLUME:
          audioDispatch(updateLFOTarget(Knobs.VOLUME));
          break;
        case Knobs.PAN:
          audioDispatch(updateLFOTarget(Knobs.PAN));
          break;
        case Knobs.FILTER_CUTOFF:
          audioDispatch(updateLFOTarget(Knobs.FILTER_CUTOFF));
          break;
        case Knobs.FILTER_RESONANCE:
          audioDispatch(updateLFOTarget(Knobs.FILTER_RESONANCE));
          break;
        case Knobs.DETUNE:
          audioDispatch(updateLFOTarget(Knobs.DETUNE));
          break;
        default:
          break;
      }
    }
  }, [amplitude, lfo.target]);

  return (
    <div>
      <Selector
        label={Selectors.LFO_TARGET}
        options={[
          'off',
          Knobs.VOLUME,
          Knobs.PAN,
          Knobs.FILTER_CUTOFF,
          Knobs.FILTER_RESONANCE,
          Knobs.DETUNE,
        ]}
        value={lfo.target}
        dispatch={audioDispatch}
        action={updateLFOTarget}
      ></Selector>
      <Selector
        label={Selectors.LFO_WAVEFORM}
        options={[
          Waveform.SINE,
          Waveform.SQUARE,
          Waveform.SAWTOOTH,
          Waveform.TRIANGLE,
        ]}
        value={waveform}
        dispatch={dispatch}
        action={updateLFOWaveform}
      ></Selector>
      <Knob
        label={Knobs.LFO_FREQUENCY}
        value={frequency}
        action={updateLFOFrequency}
        dispatch={dispatch}
      ></Knob>
      <Knob
        label={Knobs.LFO_AMPLITUDE}
        value={amplitude}
        action={updateLFOAmplitude}
        dispatch={dispatch}
      ></Knob>
    </div>
  );
};

export default LFOControls;

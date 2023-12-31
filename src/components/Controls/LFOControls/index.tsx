import React, { useContext, useEffect, useMemo } from 'react';
import Selector from '../../shared/Selector';
import {
  updateLFOAmplitude,
  updateLFOFrequency,
  updateLFOTarget,
  updateLFOWaveform,
} from './store/actions';
import { Knobs, Selectors, Waveform } from '../../../types';
import Knob from '../../shared/Knob';
import { lfoStateContext } from './LFOStateProvider';
import { audioContext } from '../../../providers/AudioContextProvider';
import { knobsLimits } from '../../../constants/knobsLimits';

const LFOControls = () => {
  const {
    state: { target, waveform, frequency, amplitude },
    dispatch,
  } = useContext(lfoStateContext);
  const { context, volume, pan, filter } = useContext(audioContext);
  const lfoNode: OscillatorNode = useMemo(
    () =>
      new OscillatorNode(context, {
        type: waveform,
        frequency: frequency,
      }),
    [],
  );
  const lfoGainNode: GainNode = useMemo(() => context.createGain(), []);
  lfoNode.connect(lfoGainNode);
  lfoNode.type = waveform;
  lfoNode.frequency.value = frequency;

  useEffect(() => {
    lfoNode.connect(lfoGainNode);
    lfoNode.start();

    return () => lfoNode.disconnect();
  }, []);

  useEffect(() => {
    const knob = Knobs[target as keyof typeof Knobs];
    if (knob) {
      const range =
        ((knobsLimits[knob].max - knobsLimits[knob].min) / 2) * amplitude;
      lfoGainNode.gain.value = range;
      switch (target) {
        case Knobs.VOLUME:
          lfoGainNode.connect(volume.gain);
          break;
        case Knobs.PAN:
          lfoGainNode.connect(pan.pan);
          break;
        case Knobs.FILTER_CUTOFF:
          lfoGainNode.connect(filter.frequency);
          break;
        case Knobs.FILTER_RESONANCE:
          lfoGainNode.connect(filter.Q);
          break;
        default:
          break;
      }
    }
    return () => lfoGainNode.disconnect();
  }, [
    target,
    amplitude,
    volume.gain.value,
    pan.pan.value,
    filter.frequency.value,
  ]);

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
        ]}
        value={target}
        dispatch={dispatch}
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

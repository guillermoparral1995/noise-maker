import React, { useContext } from 'react';
import { stateContext } from '../../providers/StateProvider';
import Selector from '../shared/Selector';
import {
  updateLFOAmplitude,
  updateLFOFrequency,
  updateLFOTarget,
  updateLFOWaveform,
} from '../../store/actions';
import { Knobs, Selectors, Waveform } from '../../types';
import Knob from '../shared/Knob';

const LFOControls = () => {
  const {
    state: {
      lfo: { target, waveform, frequency, amplitude },
    },
  } = useContext(stateContext);

  return (
    <div>
      <Selector
        label={Selectors.LFO_TARGET}
        options={['off', Knobs.VOLUME, Knobs.PAN, Knobs.FILTER_FREQUENCY]}
        value={target}
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
        action={updateLFOWaveform}
      ></Selector>
      <Knob
        label={Knobs.LFO_FREQUENCY}
        value={frequency}
        action={updateLFOFrequency}
      ></Knob>
      <Knob
        label={Knobs.LFO_AMPLITUDE}
        value={amplitude}
        action={updateLFOAmplitude}
      ></Knob>
    </div>
  );
};

export default LFOControls;

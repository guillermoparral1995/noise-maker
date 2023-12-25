import React, { useContext } from 'react';
import Knob from '../shared/Knob';
import {
  updateAttack,
  updateDecay,
  updateRelease,
  updateSustain,
} from '../../store/actions';
import { stateContext } from '../../providers/StateProvider';
import { knobsLimits } from '../../constants/knobsLimits';

const EnvelopeControls = () => {
  const { state } = useContext(stateContext);
  return (
    <div>
      <Knob
        label="attack"
        defaultValue={knobsLimits.attack.default}
        value={state.attack}
        action={updateAttack}
        min={knobsLimits.attack.min}
        max={knobsLimits.attack.max}
      ></Knob>
      <Knob
        label="decay"
        defaultValue={knobsLimits.decay.default}
        value={state.decay}
        action={updateDecay}
        min={knobsLimits.decay.min}
        max={knobsLimits.decay.max}
      ></Knob>
      <Knob
        label="sustain"
        defaultValue={knobsLimits.sustain.default}
        value={state.sustain}
        action={updateSustain}
        min={knobsLimits.sustain.min}
        max={knobsLimits.sustain.max}
      ></Knob>
      <Knob
        label="release"
        defaultValue={knobsLimits.release.default}
        value={state.release}
        action={updateRelease}
        min={knobsLimits.release.min}
        max={knobsLimits.release.max}
      ></Knob>
    </div>
  );
};

export default EnvelopeControls;

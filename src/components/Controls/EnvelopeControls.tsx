import React, { useContext } from 'react';
import Knob from '../shared/Knob';
import {
  updateAttack,
  updateDecay,
  updateRelease,
  updateSustain,
} from '../../store/actions';
import { stateContext } from '../../providers/StateProvider';
import { Knobs } from '../../types';

const EnvelopeControls = () => {
  const { state } = useContext(stateContext);
  return (
    <div>
      <Knob
        label={Knobs.ATTACK}
        value={state.attack}
        action={updateAttack}
      ></Knob>
      <Knob label={Knobs.DECAY} value={state.decay} action={updateDecay}></Knob>
      <Knob
        label={Knobs.SUSTAIN}
        value={state.sustain}
        action={updateSustain}
      ></Knob>
      <Knob
        label={Knobs.RELEASE}
        value={state.release}
        action={updateRelease}
      ></Knob>
    </div>
  );
};

export default EnvelopeControls;

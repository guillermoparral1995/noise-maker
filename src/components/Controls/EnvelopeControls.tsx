import React, { useContext } from 'react';
import Knob from '../shared/Knob';
import {
  updateAttack,
  updateDecay,
  updateRelease,
  updateSustain,
} from '../../store/actions';
import { stateContext } from '../../providers/StateProvider';

const EnvelopeFilterControls = () => {
  const { state } = useContext(stateContext);
  return (
    <div>
      <Knob
        label="attack"
        defaultValue={0}
        value={state.attack}
        action={updateAttack}
        min={0}
        max={5}
      ></Knob>
      <Knob
        label="decay"
        defaultValue={0}
        value={state.decay}
        action={updateDecay}
        min={0}
        max={5}
      ></Knob>
      <Knob
        label="sustain"
        defaultValue={1}
        value={state.sustain}
        action={updateSustain}
        min={0}
        max={1}
      ></Knob>
      <Knob
        label="release"
        defaultValue={0}
        value={state.release}
        action={updateRelease}
        min={0}
        max={5}
      ></Knob>
    </div>
  );
};

export default EnvelopeFilterControls;

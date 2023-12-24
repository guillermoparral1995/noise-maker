import React from 'react';
import Knob from '../shared/Knob';
import {
  updateAttack,
  updateDecay,
  updateRelease,
  updateSustain,
} from '../../store/actions';

const EnvelopeFilterControls = () => {
  return (
    <div>
      <Knob
        label="attack"
        defaultValue={0}
        action={updateAttack}
        min={0}
        max={5}
      ></Knob>
      <Knob
        label="decay"
        defaultValue={0}
        action={updateDecay}
        min={0}
        max={5}
      ></Knob>
      <Knob
        label="sustain"
        defaultValue={1}
        action={updateSustain}
        min={0}
        max={1}
      ></Knob>
      <Knob
        label="release"
        defaultValue={0}
        action={updateRelease}
        min={0}
        max={5}
      ></Knob>
    </div>
  );
};

export default EnvelopeFilterControls;

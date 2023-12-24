import React from 'react';
import Knob from '../shared/Knob';
import { updatePan, updateVolume } from '../../store/actions';

const GeneralControls = () => {
  return (
    <div>
      <Knob
        label="volume"
        defaultValue={0.5}
        action={updateVolume}
        min={0}
        max={1}
      ></Knob>
      <Knob
        label="pan"
        defaultValue={0}
        action={updatePan}
        min={-1}
        max={1}
      ></Knob>
    </div>
  );
};

export default GeneralControls;

import React, { useContext } from 'react';
import Knob from '../shared/Knob';
import { updatePan, updateVolume } from '../../store/actions';
import { stateContext } from '../../providers/StateProvider';
import { knobsLimits } from '../../constants/knobsLimits';

const GeneralControls = () => {
  const { state } = useContext(stateContext);
  return (
    <div>
      <Knob
        label="volume"
        defaultValue={knobsLimits.volume.default}
        value={state.volume}
        action={updateVolume}
        min={knobsLimits.volume.min}
        max={knobsLimits.volume.max}
      ></Knob>
      <Knob
        label="pan"
        defaultValue={knobsLimits.pan.default}
        value={state.pan}
        action={updatePan}
        min={knobsLimits.pan.min}
        max={knobsLimits.pan.max}
      ></Knob>
    </div>
  );
};

export default GeneralControls;

import React, { useContext } from 'react';
import Knob from '../shared/Knob';
import { updatePan, updateVolume } from '../../store/actions';
import { stateContext } from '../../providers/StateProvider';

const GeneralControls = () => {
  const { state } = useContext(stateContext);
  return (
    <div>
      <Knob
        label="volume"
        defaultValue={0.5}
        value={state.volume}
        action={updateVolume}
        min={0}
        max={1}
      ></Knob>
      <Knob
        label="pan"
        defaultValue={0}
        value={state.pan}
        action={updatePan}
        min={-1}
        max={1}
      ></Knob>
    </div>
  );
};

export default GeneralControls;

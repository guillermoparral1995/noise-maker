import React, { useContext } from 'react';
import Knob from '../shared/Knob';
import { updatePan, updateVolume } from '../../store/actions';
import { stateContext } from '../../providers/StateProvider';
import { Knobs } from '../../types';

const GeneralControls = () => {
  const { state } = useContext(stateContext);
  return (
    <div>
      <Knob
        label={Knobs.VOLUME}
        value={state.volume}
        action={updateVolume}
      ></Knob>
      <Knob label={Knobs.PAN} value={state.pan} action={updatePan}></Knob>
    </div>
  );
};

export default GeneralControls;

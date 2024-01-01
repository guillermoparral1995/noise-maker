import React, { useContext, useEffect } from 'react';
import Knob from '../../shared/Knob';
import { updatePan, updateVolume } from './store/actions';
import { Knobs } from '../../../types';
import { generalControlsStateContext } from './GeneralControlsStateProvider';
import { audioContext } from '../../../providers/AudioContextProvider';

const GeneralControls = () => {
  const { state, dispatch } = useContext(generalControlsStateContext);
  const { volume, pan, lfo1, lfo2 } = useContext(audioContext);

  useEffect(() => {
    if (lfo1.target === Knobs.VOLUME) {
      lfo1.output.connect(volume.gain);
    }
    if (lfo1.target === Knobs.PAN) {
      lfo1.output.connect(pan.pan);
    }
    return () => lfo1.output.disconnect();
  }, [lfo1.target]);

  useEffect(() => {
    if (lfo2.target === Knobs.VOLUME) {
      lfo2.output.connect(volume.gain);
    }
    if (lfo2.target === Knobs.PAN) {
      lfo2.output.connect(pan.pan);
    }
    return () => lfo2.output.disconnect();
  }, [lfo2.target]);

  volume.gain.value = state.volume;
  pan.pan.value = state.pan;
  return (
    <div>
      <Knob
        label={Knobs.VOLUME}
        value={state.volume}
        action={updateVolume}
        dispatch={dispatch}
      ></Knob>
      <Knob
        label={Knobs.PAN}
        value={state.pan}
        action={updatePan}
        dispatch={dispatch}
      ></Knob>
    </div>
  );
};

export default GeneralControls;

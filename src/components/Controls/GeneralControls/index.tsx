import React, { useContext, useEffect } from 'react';
import Knob from '../../shared/Knob';
import { updatePan, updateVolume } from './store/actions';
import { Knobs } from '../../../types';
import { generalControlsStateContext } from './GeneralControlsStateProvider';
import { audioContext } from '../../../providers/AudioContextProvider';

const GeneralControls = () => {
  const { state, dispatch } = useContext(generalControlsStateContext);
  const { volume, pan, lfo } = useContext(audioContext);

  useEffect(() => {
    if (lfo.target === Knobs.VOLUME) {
      lfo.output.connect(volume.gain);
    }
    if (lfo.target === Knobs.PAN) {
      lfo.output.connect(pan.pan);
    }
    return () => lfo.output.disconnect();
  }, [lfo.target]);

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

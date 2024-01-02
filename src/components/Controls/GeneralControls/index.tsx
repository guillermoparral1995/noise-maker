import React, { useContext, useEffect } from 'react';
import { audioContext } from '../../../providers/AudioContextProvider';
import { Knobs } from '../../../types';
import Knob from '../../shared/Knob';
import {
  generalControlsStateContext,
  GeneralControlsStateProvider,
} from './GeneralControlsStateProvider';
import { updatePan, updateVolume } from './store/actions';

const GeneralControls_ = () => {
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
    <>
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
    </>
  );
};

export default () => (
  <GeneralControlsStateProvider>
    <GeneralControls_></GeneralControls_>
  </GeneralControlsStateProvider>
);

import useAddMidiListeners from '@hooks/useAddMidiListeners';
import useConnectLFOTargets from '@hooks/useConnectLFOTargets';
import { audioContext } from '@providers/AudioContextProvider';
import { Knobs } from '@types';
import React, { useContext } from 'react';
import ControlsRow from '../../shared/ControlsRow';
import Knob from '../../shared/Knob';
import {
  generalControlsStateContext,
  GeneralControlsStateProvider,
} from './GeneralControlsStateProvider';

export const GeneralControls_ = () => {
  const { state, dispatch } = useContext(generalControlsStateContext);
  const { volume, pan, lfo1, lfo2 } = useContext(audioContext);
  useAddMidiListeners([Knobs.VOLUME, Knobs.PAN], dispatch);
  useConnectLFOTargets(lfo1, [
    { knob: Knobs.VOLUME, param: volume.gain },
    { knob: Knobs.PAN, param: pan.pan },
  ]);
  useConnectLFOTargets(lfo2, [
    { knob: Knobs.VOLUME, param: volume.gain },
    { knob: Knobs.PAN, param: pan.pan },
  ]);

  volume.gain.value = state.volume;
  pan.pan.value = state.pan;
  return (
    <>
      <h3>Master</h3>
      <ControlsRow>
        <Knob id={Knobs.VOLUME} value={state.volume} dispatch={dispatch}></Knob>
        <Knob id={Knobs.PAN} value={state.pan} dispatch={dispatch}></Knob>
      </ControlsRow>
    </>
  );
};

export default () => (
  <GeneralControlsStateProvider>
    <GeneralControls_></GeneralControls_>
  </GeneralControlsStateProvider>
);

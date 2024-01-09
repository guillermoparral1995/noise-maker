import { round } from 'lodash';
import React, { useContext, useEffect } from 'react';
import { ControlChangeMessageEvent } from 'webmidi';
import { knobsValues } from '../../../constants/knobsValues';
import useThrottledUpdate from '../../../hooks/useThrottledUpdate';
import { audioContext } from '../../../providers/AudioContextProvider';
import { midiContext } from '../../../providers/MIDIProvider';
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
  const midiInput = useContext(midiContext);

  const throttledUpdate = useThrottledUpdate(dispatch);

  useEffect(() => {
    midiInput.addListener('controlchange', (e: ControlChangeMessageEvent) => {
      const value = round(e.value as number, 2);
      if (e.controller.number === knobsValues[Knobs.VOLUME].midiControl) {
        throttledUpdate(updateVolume, value);
      }

      if (e.controller.number === knobsValues[Knobs.PAN].midiControl) {
        const panValue = value * 2 - 1;
        throttledUpdate(updatePan, round(panValue, 2));
      }
    });
  }, []);

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
      <Knob id={Knobs.VOLUME} value={state.volume} dispatch={dispatch}></Knob>
      <Knob id={Knobs.PAN} value={state.pan} dispatch={dispatch}></Knob>
    </>
  );
};

export default () => (
  <GeneralControlsStateProvider>
    <GeneralControls_></GeneralControls_>
  </GeneralControlsStateProvider>
);

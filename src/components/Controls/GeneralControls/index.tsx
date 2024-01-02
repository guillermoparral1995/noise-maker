import React, { useCallback, useContext, useEffect } from 'react';
import { throttle } from 'lodash';
import { audioContext } from '../../../providers/AudioContextProvider';
import { Knobs } from '../../../types';
import Knob from '../../shared/Knob';
import {
  generalControlsStateContext,
  GeneralControlsStateProvider,
} from './GeneralControlsStateProvider';
import { ActionBuilder, updatePan, updateVolume } from './store/actions';
import { midiContext } from '../../../providers/MIDIProvider';
import { ControlChangeMessageEvent } from 'webmidi';
import { roundValue } from '../../../utils';

const GeneralControls_ = () => {
  const { state, dispatch } = useContext(generalControlsStateContext);
  const { volume, pan, lfo1, lfo2 } = useContext(audioContext);
  const midiInput = useContext(midiContext);

  const handleUpdate = (action: ActionBuilder, value: number) => {
    dispatch(action(value));
  };

  const throttledUpdate = useCallback(throttle(handleUpdate, 100), [dispatch]);

  useEffect(() => {
    midiInput.addListener('controlchange', (e: ControlChangeMessageEvent) => {
      const value = roundValue(e.value as number);
      if (e.controller.number === 74) {
        throttledUpdate(updateVolume, value);
      }

      if (e.controller.number === 18) {
        const panValue = value * 2 - 1;
        throttledUpdate(updatePan, roundValue(panValue));
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
      <Knob
        id={Knobs.VOLUME}
        value={state.volume}
        action={updateVolume}
        dispatch={dispatch}
      ></Knob>
      <Knob
        id={Knobs.PAN}
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

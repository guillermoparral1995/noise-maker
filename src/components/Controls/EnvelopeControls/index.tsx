import { round, throttle } from 'lodash';
import React, { useCallback, useContext, useEffect } from 'react';
import { ControlChangeMessageEvent } from 'webmidi';
import { knobsValues } from '../../../constants/knobsValues';
import { midiContext } from '../../../providers/MIDIProvider';
import { Knobs } from '../../../types';
import Knob from '../../shared/Knob';
import { envelopeStateContext } from './EnvelopeStateProvider';
import {
  ActionTypes,
  updateAttack,
  updateDecay,
  updateRelease,
  updateSustain,
} from './store/actions';

type ActionBuilder = (payload: number) => ActionTypes;

const EnvelopeControls = () => {
  const { state, dispatch } = useContext(envelopeStateContext);
  const midiInput = useContext(midiContext);

  const handleUpdate = (action: ActionBuilder, value: number) => {
    dispatch(action(value));
  };

  const throttledUpdate = useCallback(throttle(handleUpdate, 100), [dispatch]);

  useEffect(() => {
    midiInput.addListener('controlchange', (e: ControlChangeMessageEvent) => {
      const value = round(e.value as number, 2);
      if (e.controller.number === knobsValues[Knobs.ATTACK].midiControl) {
        throttledUpdate(updateAttack, value);
      }

      if (e.controller.number === knobsValues[Knobs.DECAY].midiControl) {
        throttledUpdate(updateDecay, value);
      }

      if (e.controller.number === knobsValues[Knobs.SUSTAIN].midiControl) {
        throttledUpdate(updateSustain, value);
      }

      if (e.controller.number === knobsValues[Knobs.RELEASE].midiControl) {
        throttledUpdate(updateRelease, value);
      }
    });
  }, []);
  return (
    <>
      <Knob
        id={Knobs.ATTACK}
        value={state.attack}
        action={updateAttack}
        dispatch={dispatch}
      ></Knob>
      <Knob
        id={Knobs.DECAY}
        value={state.decay}
        action={updateDecay}
        dispatch={dispatch}
      ></Knob>
      <Knob
        id={Knobs.SUSTAIN}
        value={state.sustain}
        action={updateSustain}
        dispatch={dispatch}
      ></Knob>
      <Knob
        id={Knobs.RELEASE}
        value={state.release}
        action={updateRelease}
        dispatch={dispatch}
      ></Knob>
    </>
  );
};

export default EnvelopeControls;

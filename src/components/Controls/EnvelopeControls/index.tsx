import { round } from 'lodash';
import React, { useContext, useEffect } from 'react';
import { ControlChangeMessageEvent } from 'webmidi';
import { knobsValues } from '../../../constants/knobsValues';
import useThrottledUpdate from '../../../hooks/useThrottledUpdate';
import { midiContext } from '../../../providers/MIDIProvider';
import { Knobs } from '../../../types';
import Knob from '../../shared/Knob';
import { envelopeStateContext } from './EnvelopeStateProvider';
import {
  updateAttack,
  updateDecay,
  updateRelease,
  updateSustain,
} from './store/actions';

const EnvelopeControls = () => {
  const { state, dispatch } = useContext(envelopeStateContext);
  const midiInput = useContext(midiContext);

  const throttledUpdate = useThrottledUpdate(dispatch);

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
      <Knob id={Knobs.ATTACK} value={state.attack} dispatch={dispatch}></Knob>
      <Knob id={Knobs.DECAY} value={state.decay} dispatch={dispatch}></Knob>
      <Knob id={Knobs.SUSTAIN} value={state.sustain} dispatch={dispatch}></Knob>
      <Knob id={Knobs.RELEASE} value={state.release} dispatch={dispatch}></Knob>
    </>
  );
};

export default EnvelopeControls;

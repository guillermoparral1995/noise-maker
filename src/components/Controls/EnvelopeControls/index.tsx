import React, { useContext } from 'react';
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

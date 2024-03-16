import ControlsRow from '@components/ControlsRow';
import Knob from '@components/Knob';
import useAddMidiListeners from '@hooks/useAddMidiListeners';
import { Knobs } from '@types';
import React, { useContext } from 'react';
import { envelopeStateContext } from './EnvelopeStateProvider';

const EnvelopeControls = () => {
  const { state, dispatch } = useContext(envelopeStateContext);
  useAddMidiListeners(
    [Knobs.ATTACK, Knobs.DECAY, Knobs.SUSTAIN, Knobs.RELEASE],
    dispatch,
  );

  return (
    <>
      <h3>ADSR Envelope</h3>
      <ControlsRow>
        <Knob id={Knobs.ATTACK} value={state.attack} dispatch={dispatch}></Knob>
        <Knob id={Knobs.DECAY} value={state.decay} dispatch={dispatch}></Knob>
        <Knob
          id={Knobs.SUSTAIN}
          value={state.sustain}
          dispatch={dispatch}
        ></Knob>
        <Knob
          id={Knobs.RELEASE}
          value={state.release}
          dispatch={dispatch}
        ></Knob>
      </ControlsRow>
    </>
  );
};

export default EnvelopeControls;

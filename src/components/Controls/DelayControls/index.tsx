import { useInstantiateGainNode } from '@hooks/useInstantiateAudioNode';
import { GainNodeMock } from '@mocks';
import { audioContext } from '@providers/AudioContextProvider';
import { Knobs, Switchs } from '@types';
import React, { useContext, useEffect, useRef } from 'react';
import ControlsRow from '../../shared/ControlsRow';
import Knob from '../../shared/Knob';
import Switch from '../../shared/Switch';
import { delayStateContext, DelayStateProvider } from './DelayStateProvider';

export const DelayControls_ = ({
  __mockFeedback,
}: {
  __mockFeedback?: GainNodeMock;
}) => {
  const delayWasTurnedOn = useRef<boolean>(null);
  const { state, dispatch } = useContext(delayStateContext);
  const { delay, output, dispatch: audioDispatch } = useContext(audioContext);

  const feedback: GainNode = useInstantiateGainNode(__mockFeedback);

  delay.node.delayTime.value = state.delayTime;
  feedback.gain.value = state.feedback;

  useEffect(() => {
    if (delay.active) {
      delay.node.connect(feedback);
      feedback.connect(delay.node);
      delay.node.connect(output);
      delayWasTurnedOn.current = true;
    } else {
      // checking if delay was turned on at some point to avoid disconnecting firsthand
      if (delayWasTurnedOn.current && !state.trails) {
        feedback.disconnect();
        delay.node.disconnect();
      }
    }
  }, [delay.active]);

  return (
    <>
      <h3>Delay</h3>
      <ControlsRow>
        <Switch
          id={Switchs.DELAY}
          value={delay.active}
          dispatch={audioDispatch}
        ></Switch>
        <Switch
          id={Switchs.DELAY_TRAILS}
          value={state.trails}
          dispatch={dispatch}
        ></Switch>
      </ControlsRow>
      <ControlsRow>
        <Knob
          id={Knobs.DELAY_FEEDBACK}
          value={state.feedback}
          dispatch={dispatch}
        ></Knob>
        <Knob
          id={Knobs.DELAY_TIME}
          value={state.delayTime}
          dispatch={dispatch}
        ></Knob>
      </ControlsRow>
    </>
  );
};

export default () => (
  <DelayStateProvider>
    <DelayControls_></DelayControls_>
  </DelayStateProvider>
);

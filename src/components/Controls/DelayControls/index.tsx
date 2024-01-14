import React, { useContext, useEffect } from 'react';
import { GainNodeMock } from '../../../../__mocks__';
import { useInstantiateGainNode } from '../../../hooks/useInstantiateAudioNode';
import { audioContext } from '../../../providers/AudioContextProvider';
import { Knobs, Switchs } from '../../../types';
import Knob from '../../shared/Knob';
import Switch from '../../shared/Switch';
import { delayStateContext, DelayStateProvider } from './DelayStateProvider';

export const DelayControls_ = ({
  __mockFeedback,
}: {
  __mockFeedback?: GainNodeMock;
}) => {
  const { state, dispatch } = useContext(delayStateContext);
  const { delay, output } = useContext(audioContext);

  const feedback: GainNode = useInstantiateGainNode(__mockFeedback);

  delay.delayTime.value = state.delayTime;
  feedback.gain.value = state.feedback;

  useEffect(() => {
    if (state.active) {
      delay.connect(feedback);
      feedback.connect(delay);
      delay.connect(output);
    } else {
      feedback.disconnect();
      delay.disconnect();
    }
  }, [state.active]);

  return (
    <>
      <Switch
        id={Switchs.DELAY}
        value={state.active}
        dispatch={dispatch}
      ></Switch>
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
    </>
  );
};

export default () => (
  <DelayStateProvider>
    <DelayControls_></DelayControls_>
  </DelayStateProvider>
);

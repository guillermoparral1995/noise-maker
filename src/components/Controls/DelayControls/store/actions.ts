import { Actions } from '../../../../types';

export type ActionTypes =
  | DelayStateAction
  | DelayFeedbackAction
  | DelayTimeAction;

interface DelayStateAction {
  type: Actions.SWITCH_DELAY;
  payload: boolean;
}

export const switchDelay: (active: boolean) => DelayStateAction = (active) => ({
  type: Actions.SWITCH_DELAY,
  payload: active,
});

interface DelayFeedbackAction {
  type: Actions.UPDATE_DELAY_FEEDBACK;
  payload: number;
}

export const updateDelayFeedback: (feedback: number) => DelayFeedbackAction = (
  feedback,
) => ({
  type: Actions.UPDATE_DELAY_FEEDBACK,
  payload: feedback,
});

interface DelayTimeAction {
  type: Actions.UPDATE_DELAY_TIME;
  payload: number;
}

export const updateDelayTime: (delayTime: number) => DelayTimeAction = (
  delayTime,
) => ({
  type: Actions.UPDATE_DELAY_TIME,
  payload: delayTime,
});

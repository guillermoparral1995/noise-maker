import { Actions } from '../../../../types';

export type ActionTypes =
  | DelayFeedbackAction
  | DelayTimeAction
  | DelayTrailsAction;

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

interface DelayTrailsAction {
  type: Actions.SWITCH_DELAY_TRAILS;
  payload: boolean;
}

export const switchDelayTrails: (trails: boolean) => DelayTrailsAction = (
  trails,
) => ({
  type: Actions.SWITCH_DELAY_TRAILS,
  payload: trails,
});

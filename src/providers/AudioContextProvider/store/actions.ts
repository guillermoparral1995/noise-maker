import { Actions, LFO1Target, LFO2Target } from '@types';

export type ActionTypes =
  | LFO1TargetAction
  | LFO2TargetAction
  | DelayStateAction;

export type LFO1TargetAction = {
  type: Actions.UPDATE_LFO_1_TARGET;
  payload: LFO1Target;
};

export const updateLFO1Target: (target: LFO1Target) => LFO1TargetAction = (
  target,
) => ({
  type: Actions.UPDATE_LFO_1_TARGET,
  payload: target,
});

export type LFO2TargetAction = {
  type: Actions.UPDATE_LFO_2_TARGET;
  payload: LFO2Target;
};

export const updateLFO2Target: (target: LFO2Target) => LFO2TargetAction = (
  target,
) => ({
  type: Actions.UPDATE_LFO_2_TARGET,
  payload: target,
});

interface DelayStateAction {
  type: Actions.SWITCH_DELAY;
  payload: boolean;
}

export const switchDelay: (active: boolean) => DelayStateAction = (active) => ({
  type: Actions.SWITCH_DELAY,
  payload: active,
});

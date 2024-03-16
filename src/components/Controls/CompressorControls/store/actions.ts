import { Actions } from '@types';

export type ActionTypes =
  | CompressorThresholdAction
  | CompressorRatioAction
  | CompressorKneeAction
  | CompressorAttackAction
  | CompressorReleaseAction;

interface CompressorThresholdAction {
  type: Actions.UPDATE_COMPRESSOR_THRESHOLD;
  payload: number;
}

export const updateCompressorThreshold: (
  threshold: number,
) => CompressorThresholdAction = (threshold) => ({
  type: Actions.UPDATE_COMPRESSOR_THRESHOLD,
  payload: threshold,
});

interface CompressorRatioAction {
  type: Actions.UPDATE_COMPRESSOR_RATIO;
  payload: number;
}

export const updateCompressorRatio: (ratio: number) => CompressorRatioAction = (
  ratio,
) => ({
  type: Actions.UPDATE_COMPRESSOR_RATIO,
  payload: ratio,
});

interface CompressorKneeAction {
  type: Actions.UPDATE_COMPRESSOR_KNEE;
  payload: number;
}

export const updateCompressorKnee: (knee: number) => CompressorKneeAction = (
  knee,
) => ({
  type: Actions.UPDATE_COMPRESSOR_KNEE,
  payload: knee,
});

interface CompressorAttackAction {
  type: Actions.UPDATE_COMPRESSOR_ATTACK;
  payload: number;
}

export const updateCompressorAttack: (
  attack: number,
) => CompressorAttackAction = (attack) => ({
  type: Actions.UPDATE_COMPRESSOR_ATTACK,
  payload: attack,
});

interface CompressorReleaseAction {
  type: Actions.UPDATE_COMPRESSOR_RELEASE;
  payload: number;
}

export const updateCompressorRelease: (
  attack: number,
) => CompressorReleaseAction = (release) => ({
  type: Actions.UPDATE_COMPRESSOR_RELEASE,
  payload: release,
});

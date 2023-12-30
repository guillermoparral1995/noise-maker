import { Actions, LFOTarget, Waveform } from '../../../../types';

export type ActionTypes =
  | LFOTargetAction
  | LFOWaveformAction
  | LFOFrequencyAction
  | LFOAmplitudeAction;

interface LFOTargetAction {
  type: Actions.UPDATE_LFO_TARGET;
  payload: LFOTarget;
}

export const updateLFOTarget: (target: LFOTarget) => LFOTargetAction = (
  target,
) => ({
  type: Actions.UPDATE_LFO_TARGET,
  payload: target,
});

interface LFOWaveformAction {
  type: Actions.UPDATE_LFO_WAVEFORM;
  payload: Waveform;
}

export const updateLFOWaveform: (waveform: Waveform) => LFOWaveformAction = (
  waveform,
) => ({
  type: Actions.UPDATE_LFO_WAVEFORM,
  payload: waveform,
});

interface LFOFrequencyAction {
  type: Actions.UPDATE_LFO_FREQUENCY;
  payload: number;
}

export const updateLFOFrequency: (frequency: number) => LFOFrequencyAction = (
  frequency,
) => ({
  type: Actions.UPDATE_LFO_FREQUENCY,
  payload: frequency,
});

interface LFOAmplitudeAction {
  type: Actions.UPDATE_LFO_AMPLITUDE;
  payload: number;
}

export const updateLFOAmplitude: (amplitude: number) => LFOAmplitudeAction = (
  amplitude,
) => ({
  type: Actions.UPDATE_LFO_AMPLITUDE,
  payload: amplitude,
});

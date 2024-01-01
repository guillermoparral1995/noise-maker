import { Actions, Waveform } from '../../../../types';

export type ActionTypes =
  | LFOWaveformAction
  | LFOFrequencyAction
  | LFOAmplitudeAction;

interface LFOWaveformAction {
  type: Actions.UPDATE_LFO_1_WAVEFORM | Actions.UPDATE_LFO_2_WAVEFORM;
  payload: Waveform;
}

export const updateLFO1Waveform: (waveform: Waveform) => LFOWaveformAction = (
  waveform,
) => ({
  type: Actions.UPDATE_LFO_1_WAVEFORM,
  payload: waveform,
});

export const updateLFO2Waveform: (waveform: Waveform) => LFOWaveformAction = (
  waveform,
) => ({
  type: Actions.UPDATE_LFO_2_WAVEFORM,
  payload: waveform,
});

interface LFOFrequencyAction {
  type: Actions.UPDATE_LFO_1_FREQUENCY | Actions.UPDATE_LFO_2_FREQUENCY;
  payload: number;
}

export const updateLFO1Frequency: (frequency: number) => LFOFrequencyAction = (
  frequency,
) => ({
  type: Actions.UPDATE_LFO_1_FREQUENCY,
  payload: frequency,
});

export const updateLFO2Frequency: (frequency: number) => LFOFrequencyAction = (
  frequency,
) => ({
  type: Actions.UPDATE_LFO_2_FREQUENCY,
  payload: frequency,
});

interface LFOAmplitudeAction {
  type: Actions.UPDATE_LFO_1_AMPLITUDE | Actions.UPDATE_LFO_2_AMPLITUDE;
  payload: number;
}

export const updateLFO1Amplitude: (amplitude: number) => LFOAmplitudeAction = (
  amplitude,
) => ({
  type: Actions.UPDATE_LFO_1_AMPLITUDE,
  payload: amplitude,
});

export const updateLFO2Amplitude: (amplitude: number) => LFOAmplitudeAction = (
  amplitude,
) => ({
  type: Actions.UPDATE_LFO_2_AMPLITUDE,
  payload: amplitude,
});

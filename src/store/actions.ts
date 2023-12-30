import { Actions, FilterType, LFOTarget, Waveform } from '../types';

export type ActionTypes =
  | VolumeAction
  | PanAction
  | WaveformAction
  | AttackAction
  | DecayAction
  | SustainAction
  | ReleaseAction
  | FilterTypeAction
  | FilterCutoffAction
  | FilterResonanceAction
  | LFOTargetAction
  | LFOWaveformAction
  | LFOFrequencyAction
  | LFOAmplitudeAction;

interface VolumeAction {
  type: Actions.UPDATE_VOLUME;
  payload: number;
}

export const updateVolume: (volume: number) => VolumeAction = (volume) => ({
  type: Actions.UPDATE_VOLUME,
  payload: volume,
});

interface PanAction {
  type: Actions.UPDATE_PAN;
  payload: number;
}

export const updatePan: (pan: number) => PanAction = (pan) => ({
  type: Actions.UPDATE_PAN,
  payload: pan,
});

interface WaveformAction {
  type: Actions.UPDATE_WAVEFORM;
  payload: Waveform;
}

export const updateWaveform: (waveform: Waveform) => WaveformAction = (
  waveform,
) => ({
  type: Actions.UPDATE_WAVEFORM,
  payload: waveform,
});

interface AttackAction {
  type: Actions.UPDATE_ATTACK;
  payload: number;
}

export const updateAttack: (attack: number) => AttackAction = (attack) => ({
  type: Actions.UPDATE_ATTACK,
  payload: attack,
});

interface DecayAction {
  type: Actions.UPDATE_DECAY;
  payload: number;
}

export const updateDecay: (decay: number) => DecayAction = (decay) => ({
  type: Actions.UPDATE_DECAY,
  payload: decay,
});

interface SustainAction {
  type: Actions.UPDATE_SUSTAIN;
  payload: number;
}

export const updateSustain: (sustain: number) => SustainAction = (sustain) => ({
  type: Actions.UPDATE_SUSTAIN,
  payload: sustain,
});

interface ReleaseAction {
  type: Actions.UPDATE_RELEASE;
  payload: number;
}

export const updateRelease: (release: number) => ReleaseAction = (release) => ({
  type: Actions.UPDATE_RELEASE,
  payload: release,
});

interface FilterTypeAction {
  type: Actions.UPDATE_FILTER_TYPE;
  payload: FilterType;
}

export const updateFilterType: (filterType: FilterType) => FilterTypeAction = (
  filterType,
) => ({
  type: Actions.UPDATE_FILTER_TYPE,
  payload: filterType,
});

interface FilterCutoffAction {
  type: Actions.UPDATE_FILTER_CUTOFF;
  payload: number;
}

export const updateFilterCutoff: (filterFreq: number) => FilterCutoffAction = (
  cutoff,
) => ({
  type: Actions.UPDATE_FILTER_CUTOFF,
  payload: cutoff,
});

interface FilterResonanceAction {
  type: Actions.UPDATE_FILTER_RESONANCE;
  payload: number;
}

export const updateFilterResonance: (
  resonance: number,
) => FilterResonanceAction = (resonance) => ({
  type: Actions.UPDATE_FILTER_RESONANCE,
  payload: resonance,
});

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

import { Actions, FilterType, Waveform } from '../types';

export type ActionTypes =
  | VolumeAction
  | PanAction
  | WaveformAction
  | AttackAction
  | DecayAction
  | SustainAction
  | ReleaseAction
  | FilterTypeAction
  | FilterFrequencyAction
  | FilterQAction;

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

interface FilterFrequencyAction {
  type: Actions.UPDATE_FILTER_FREQUENCY;
  payload: number;
}

export const updateFilterFrequency: (
  filterFreq: number,
) => FilterFrequencyAction = (filterFreq) => ({
  type: Actions.UPDATE_FILTER_FREQUENCY,
  payload: filterFreq,
});

interface FilterQAction {
  type: Actions.UPDATE_FILTER_Q;
  payload: number;
}

export const updateFilterQ: (filterQ: number) => FilterQAction = (filterQ) => ({
  type: Actions.UPDATE_FILTER_Q,
  payload: filterQ,
});

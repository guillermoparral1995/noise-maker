import type { ActionTypes as EnvelopeActionTypes } from './components/Controls/EnvelopeControls/store/actions';
import type { ActionTypes as FilterActionTypes } from './components/Controls/FilterControls/store/actions';
import type { ActionTypes as GeneralControlsActionTypes } from './components/Controls/GeneralControls/store/actions';
import type { ActionTypes as LFOActionTypes } from './components/Controls/LFOControls/store/actions';
import type { ActionTypes as LFOTargetActionTypes } from './providers/AudioContextProvider/store/actions';

export type ActionTypes =
  | EnvelopeActionTypes
  | GeneralControlsActionTypes
  | FilterActionTypes
  | LFOTargetActionTypes
  | LFOActionTypes;

export enum Waveform {
  SINE = 'sine',
  SQUARE = 'square',
  SAWTOOTH = 'sawtooth',
  TRIANGLE = 'triangle',
}

export enum FilterType {
  LOWPASS = 'lowpass',
  HIGHPASS = 'highpass',
}

export enum Selectors {
  WAVEFORM = 'WAVEFORM',
  FILTER = 'FILTER',
  LFO_1_TARGET = 'LFO_1_TARGET',
  LFO_1_WAVEFORM = 'LFO_1_WAVEFORM',
  LFO_2_TARGET = 'LFO_2_TARGET',
  LFO_2_WAVEFORM = 'LFO_2_WAVEFORM',
}

export enum Knobs {
  VOLUME = 'VOLUME',
  PAN = 'PAN',
  DETUNE = 'DETUNE',
  ATTACK = 'ATTACK',
  DECAY = 'DECAY',
  SUSTAIN = 'SUSTAIN',
  RELEASE = 'RELEASE',
  FILTER_CUTOFF = 'FILTER_CUTOFF',
  FILTER_RESONANCE = 'FILTER_RESONANCE',
  LFO_1_FREQUENCY = 'LFO_1_FREQUENCY',
  LFO_1_AMPLITUDE = 'LFO_1_AMPLITUDE',
  LFO_2_FREQUENCY = 'LFO_2_FREQUENCY',
  LFO_2_AMPLITUDE = 'LFO_2_AMPLITUDE',
}

export type LFO1Target =
  | Exclude<
      Knobs,
      | Knobs.LFO_1_FREQUENCY
      | Knobs.LFO_1_AMPLITUDE
      | Knobs.LFO_2_FREQUENCY
      | Knobs.LFO_2_AMPLITUDE
      | Knobs.ATTACK
      | Knobs.DECAY
      | Knobs.SUSTAIN
      | Knobs.RELEASE
    >
  | 'off';

export type LFO2Target =
  | Exclude<
      Knobs,
      | Knobs.LFO_2_FREQUENCY
      | Knobs.LFO_2_AMPLITUDE
      | Knobs.ATTACK
      | Knobs.DECAY
      | Knobs.SUSTAIN
      | Knobs.RELEASE
    >
  | 'off';

export enum Actions {
  UPDATE_VOLUME,
  UPDATE_PAN,
  UPDATE_WAVEFORM,
  UPDATE_DETUNE,
  UPDATE_ATTACK,
  UPDATE_DECAY,
  UPDATE_SUSTAIN,
  UPDATE_RELEASE,
  UPDATE_FILTER_TYPE,
  UPDATE_FILTER_CUTOFF,
  UPDATE_FILTER_RESONANCE,
  UPDATE_LFO_1_TARGET,
  UPDATE_LFO_1_WAVEFORM,
  UPDATE_LFO_1_FREQUENCY,
  UPDATE_LFO_1_AMPLITUDE,
  UPDATE_LFO_2_TARGET,
  UPDATE_LFO_2_WAVEFORM,
  UPDATE_LFO_2_FREQUENCY,
  UPDATE_LFO_2_AMPLITUDE,
}
export type ActionBuilder<T> = (payload: T) => ActionTypes;

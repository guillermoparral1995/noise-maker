import type { ActionTypes as EnvelopeActionTypes } from './components/Controls/EnvelopeControls/store/actions';
import type { ActionTypes as GeneralControlsActionTypes } from './components/Controls/GeneralControls/store/actions';
import type { ActionTypes as FilterActionTypes } from './components/Controls/FilterControls/store/actions';
import type { ActionTypes as LFOActionTypes } from './components/Controls/LFOControls/store/actions';
import { LFOTargetAction } from './providers/AudioContextProvider';

export type ActionTypes =
  | EnvelopeActionTypes
  | GeneralControlsActionTypes
  | FilterActionTypes
  | LFOTargetAction
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
  WAVEFORM = 'waveform',
  FILTER = 'filter',
  LFO_TARGET = 'lfoTarget',
  LFO_WAVEFORM = 'lfoWaveform',
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
  LFO_FREQUENCY = 'LFO_FREQUENCY',
  LFO_AMPLITUDE = 'LFO_AMPLITUDE',
}

export type LFOTarget =
  | Exclude<
      Knobs,
      | Knobs.LFO_FREQUENCY
      | Knobs.LFO_AMPLITUDE
      | Knobs.ATTACK
      | Knobs.DECAY
      | Knobs.SUSTAIN
      | Knobs.RELEASE
    >
  | 'off';

export interface State {
  volume: number;
  pan: number;
  waveform: Waveform;
  attack: number;
  decay: number;
  sustain: number;
  release: number;
  filter: {
    type: FilterType;
    cutoff: number;
    resonance: number;
  };
  lfo: {
    target: LFOTarget;
    waveform: Waveform;
    frequency: number;
    amplitude: number;
  };
}

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
  UPDATE_LFO_TARGET,
  UPDATE_LFO_WAVEFORM,
  UPDATE_LFO_FREQUENCY,
  UPDATE_LFO_AMPLITUDE,
}
export type ActionBuilder<T> = (payload: T) => ActionTypes;

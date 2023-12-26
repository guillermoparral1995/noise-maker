import { ActionTypes } from './store/actions';

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
  VOLUME = 'volume',
  PAN = 'pan',
  ATTACK = 'attack',
  DECAY = 'decay',
  SUSTAIN = 'sustain',
  RELEASE = 'release',
  FILTER_FREQUENCY = 'filterFrequency',
  FILTER_Q = 'filterQ',
  LFO_FREQUENCY = 'lfoFrequency',
  LFO_AMPLITUDE = 'lfoAmplitude',
}

export type LFOTarget = Exclude<Knobs, Knobs.LFO_FREQUENCY> | 'off';

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
    frequency: number;
    q: number;
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
  UPDATE_ATTACK,
  UPDATE_DECAY,
  UPDATE_SUSTAIN,
  UPDATE_RELEASE,
  UPDATE_FILTER_TYPE,
  UPDATE_FILTER_FREQUENCY,
  UPDATE_FILTER_Q,
  UPDATE_LFO_TARGET,
  UPDATE_LFO_WAVEFORM,
  UPDATE_LFO_FREQUENCY,
  UPDATE_LFO_AMPLITUDE,
}
export type ActionBuilder<T> = (payload: T) => ActionTypes;

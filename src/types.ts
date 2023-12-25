import { ActionTypes } from './store/actions';

export type Param<T> = {
  value: T;
  set: React.Dispatch<React.SetStateAction<T>>;
};

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
}
export type ActionBuilder<T> = (payload: T) => ActionTypes;

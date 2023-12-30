import { FilterType, State, Waveform } from '../types';

const initialState: State = {
  volume: 0.5,
  pan: 0,
  waveform: Waveform.SINE,
  attack: 0,
  decay: 0,
  sustain: 1,
  release: 0,
  filter: {
    type: FilterType.HIGHPASS,
    frequency: 350,
    q: 1,
  },
  lfo: {
    target: 'off',
    waveform: Waveform.SINE,
    frequency: 1,
    amplitude: 0.5,
  },
};

export default initialState;

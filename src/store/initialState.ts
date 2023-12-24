import { State, Waveform } from '../types';

const initialState: State = {
  volume: 0.5,
  pan: 0,
  waveform: Waveform.SINE,
  attack: 0,
  decay: 0,
  sustain: 1,
  release: 0,
};

export default initialState;

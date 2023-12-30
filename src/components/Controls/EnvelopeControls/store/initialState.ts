import { Waveform } from '../../../../types';

export interface EnvelopeState {
  waveform: Waveform;
  attack: number;
  decay: number;
  sustain: number;
  release: number;
}

const initialState: EnvelopeState = {
  waveform: Waveform.SINE,
  attack: 0,
  decay: 0,
  sustain: 1,
  release: 0,
};

export default initialState;

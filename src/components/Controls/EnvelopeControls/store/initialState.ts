import { Waveform } from '../../../../types';

export interface EnvelopeState {
  waveform: Waveform;
  detune: number;
  attack: number;
  decay: number;
  sustain: number;
  release: number;
}

const initialState: EnvelopeState = {
  waveform: Waveform.SINE,
  detune: 0,
  attack: 0,
  decay: 0,
  sustain: 1,
  release: 0,
};

export default initialState;

import { Waveform } from '../../../../types';

export interface LFOState {
  waveform: Waveform;
  frequency: number;
  amplitude: number;
}

const initialState: LFOState = {
  waveform: Waveform.SINE,
  frequency: 1,
  amplitude: 0.5,
};

export default initialState;

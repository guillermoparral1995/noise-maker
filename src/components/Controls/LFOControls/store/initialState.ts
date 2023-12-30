import { LFOTarget, Waveform } from '../../../../types';

export interface LFOState {
  target: LFOTarget;
  waveform: Waveform;
  frequency: number;
  amplitude: number;
}

const initialState: LFOState = {
  target: 'off',
  waveform: Waveform.SINE,
  frequency: 1,
  amplitude: 0.5,
};

export default initialState;

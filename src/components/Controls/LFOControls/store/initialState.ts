import { Waveform } from '../../../../types';

interface LFOParams {
  waveform: Waveform;
  frequency: number;
  amplitude: number;
}

export interface LFOControlsState {
  lfo1: LFOParams;
  lfo2: LFOParams;
}

const initialState: LFOControlsState = {
  lfo1: {
    waveform: Waveform.SINE,
    frequency: 1,
    amplitude: 0.5,
  },
  lfo2: {
    waveform: Waveform.SINE,
    frequency: 1,
    amplitude: 0.5,
  },
};

export default initialState;

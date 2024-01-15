import { LFO1Target, LFO2Target } from '../../../types';

export interface AudioContextState {
  lfo1Target: LFO1Target;
  lfo2Target: LFO2Target;
  delayActive: boolean;
}

export const initialState: AudioContextState = {
  lfo1Target: 'off',
  lfo2Target: 'off',
  delayActive: false,
};

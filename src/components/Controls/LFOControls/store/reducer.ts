import { Actions } from '../../../../types';
import { ActionTypes } from './actions';
import { LFOControlsState } from './initialState';

const reducer = (
  state: LFOControlsState,
  action: ActionTypes,
): LFOControlsState => {
  const { type, payload } = action;

  switch (type) {
    case Actions.UPDATE_LFO_1_WAVEFORM:
      return {
        ...state,
        lfo1: {
          ...state.lfo1,
          waveform: payload,
        },
      };
    case Actions.UPDATE_LFO_1_FREQUENCY:
      return {
        ...state,
        lfo1: {
          ...state.lfo1,
          frequency: payload,
        },
      };
    case Actions.UPDATE_LFO_1_AMPLITUDE:
      return {
        ...state,
        lfo1: {
          ...state.lfo1,
          amplitude: payload,
        },
      };
    case Actions.UPDATE_LFO_2_WAVEFORM:
      return {
        ...state,
        lfo2: {
          ...state.lfo2,
          waveform: payload,
        },
      };
    case Actions.UPDATE_LFO_2_FREQUENCY:
      return {
        ...state,
        lfo2: {
          ...state.lfo2,
          frequency: payload,
        },
      };
    case Actions.UPDATE_LFO_2_AMPLITUDE:
      return {
        ...state,
        lfo2: {
          ...state.lfo2,
          amplitude: payload,
        },
      };
    default:
      return state;
  }
};

export default reducer;

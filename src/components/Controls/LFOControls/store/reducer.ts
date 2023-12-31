import { Actions } from '../../../../types';
import { ActionTypes } from './actions';
import { LFOState } from './initialState';

const reducer = (state: LFOState, action: ActionTypes): LFOState => {
  const { type, payload } = action;

  switch (type) {
    case Actions.UPDATE_LFO_WAVEFORM:
      return {
        ...state,
        waveform: payload,
      };
    case Actions.UPDATE_LFO_FREQUENCY:
      return {
        ...state,
        frequency: payload,
      };
    case Actions.UPDATE_LFO_AMPLITUDE:
      return {
        ...state,
        amplitude: payload,
      };
    default:
      return state;
  }
};

export default reducer;

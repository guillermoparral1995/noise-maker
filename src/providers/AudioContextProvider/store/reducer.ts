import { Actions } from '../../../types';
import { ActionTypes } from './actions';
import { AudioContextState } from './initialState';

export const reducer = (state: AudioContextState, action: ActionTypes) => {
  const { type, payload } = action;
  switch (type) {
    case Actions.UPDATE_LFO_1_TARGET:
      return {
        ...state,
        lfo1Target: payload,
      };
    case Actions.UPDATE_LFO_2_TARGET:
      return {
        ...state,
        lfo2Target: payload,
      };
    default:
      return state;
  }
};

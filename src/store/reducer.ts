import { Actions, State } from '../types';
import { ActionTypes } from './actions';

const reducer = (state: State, action: ActionTypes): State => {
  const { type, payload } = action;

  switch (type) {
    case Actions.UPDATE_VOLUME:
      return {
        ...state,
        volume: payload,
      };
    case Actions.UPDATE_PAN:
      return {
        ...state,
        pan: payload,
      };
    case Actions.UPDATE_WAVEFORM:
      return {
        ...state,
        waveform: payload,
      };
    case Actions.UPDATE_ATTACK:
      return {
        ...state,
        attack: payload,
      };
    case Actions.UPDATE_DECAY:
      return {
        ...state,
        decay: payload,
      };
    case Actions.UPDATE_SUSTAIN:
      return {
        ...state,
        sustain: payload,
      };
    case Actions.UPDATE_RELEASE:
      return {
        ...state,
        release: payload,
      };
    case Actions.UPDATE_FILTER_TYPE:
      return {
        ...state,
        filter: {
          ...state.filter,
          type: payload,
        },
      };
    case Actions.UPDATE_FILTER_FREQUENCY:
      return {
        ...state,
        filter: {
          ...state.filter,
          frequency: payload,
        },
      };
    case Actions.UPDATE_FILTER_Q:
      return {
        ...state,
        filter: {
          ...state.filter,
          q: payload,
        },
      };
    default:
      return state;
  }
};

export default reducer;

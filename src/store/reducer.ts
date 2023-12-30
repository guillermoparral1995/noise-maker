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
          cutoff: payload,
        },
      };
    case Actions.UPDATE_FILTER_Q:
      return {
        ...state,
        filter: {
          ...state.filter,
          resonance: payload,
        },
      };
    case Actions.UPDATE_LFO_TARGET:
      return {
        ...state,
        lfo: {
          ...state.lfo,
          target: payload,
        },
      };
    case Actions.UPDATE_LFO_WAVEFORM:
      return {
        ...state,
        lfo: {
          ...state.lfo,
          waveform: payload,
        },
      };
    case Actions.UPDATE_LFO_FREQUENCY:
      return {
        ...state,
        lfo: {
          ...state.lfo,
          frequency: payload,
        },
      };
    case Actions.UPDATE_LFO_AMPLITUDE:
      return {
        ...state,
        lfo: {
          ...state.lfo,
          amplitude: payload,
        },
      };
    default:
      return state;
  }
};

export default reducer;

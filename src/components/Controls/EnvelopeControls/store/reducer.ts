import { Actions } from '../../../../types';
import { ActionTypes } from './actions';
import { EnvelopeState } from './initialState';

const reducer = (state: EnvelopeState, action: ActionTypes): EnvelopeState => {
  const { type, payload } = action;

  switch (type) {
    case Actions.UPDATE_WAVEFORM:
      return {
        ...state,
        waveform: payload,
      };
    case Actions.UPDATE_DETUNE:
      return {
        ...state,
        detune: payload,
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
    case Actions.UPDATE_PITCHBEND:
      return {
        ...state,
        pitchbend: payload,
      };
    default:
      return state;
  }
};

export default reducer;

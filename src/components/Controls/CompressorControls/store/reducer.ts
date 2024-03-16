import { Actions } from '@types';
import { ActionTypes } from './actions';
import { CompressorState } from './initialState';

const reducer = (
  state: CompressorState,
  action: ActionTypes,
): CompressorState => {
  const { type, payload } = action;

  switch (type) {
    case Actions.UPDATE_COMPRESSOR_THRESHOLD:
      return {
        ...state,
        threshold: payload,
      };
    case Actions.UPDATE_COMPRESSOR_RATIO:
      return {
        ...state,
        ratio: payload,
      };
    case Actions.UPDATE_COMPRESSOR_KNEE:
      return {
        ...state,
        knee: payload,
      };
    case Actions.UPDATE_COMPRESSOR_ATTACK:
      return {
        ...state,
        attack: payload,
      };
    case Actions.UPDATE_COMPRESSOR_RELEASE:
      return {
        ...state,
        release: payload,
      };
    default:
      return state;
  }
};

export default reducer;

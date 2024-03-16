import { Actions } from '@types';
import { ActionTypes } from './actions';
import { FilterState } from './initialState';

const reducer = (state: FilterState, action: ActionTypes): FilterState => {
  const { type, payload } = action;

  switch (type) {
    case Actions.UPDATE_FILTER_TYPE:
      return {
        ...state,
        type: payload,
      };
    case Actions.UPDATE_FILTER_CUTOFF:
      return {
        ...state,
        cutoff: payload,
      };
    case Actions.UPDATE_FILTER_RESONANCE:
      return {
        ...state,
        resonance: payload,
      };
    default:
      return state;
  }
};

export default reducer;

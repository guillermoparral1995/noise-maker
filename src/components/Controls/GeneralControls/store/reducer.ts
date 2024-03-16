import { Actions } from '@types';
import { ActionTypes } from './actions';
import { GeneralControlsState } from './initialState';

const reducer = (
  state: GeneralControlsState,
  action: ActionTypes,
): GeneralControlsState => {
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
    default:
      return state;
  }
};

export default reducer;

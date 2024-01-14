import { Actions } from '../../../../types';
import { ActionTypes } from './actions';
import { DelayState } from './initialState';

const reducer = (state: DelayState, action: ActionTypes): DelayState => {
  const { type, payload } = action;

  switch (type) {
    case Actions.SWITCH_DELAY:
      return {
        ...state,
        active: payload,
      };
    case Actions.UPDATE_DELAY_FEEDBACK:
      return {
        ...state,
        feedback: payload,
      };
    case Actions.UPDATE_DELAY_TIME:
      return {
        ...state,
        delayTime: payload,
      };
    default:
      return state;
  }
};

export default reducer;

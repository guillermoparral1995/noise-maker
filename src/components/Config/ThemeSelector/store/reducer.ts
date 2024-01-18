import { ActionTypes } from './actions';
import { ThemeState } from './initialState';

const reducer = (_state: ThemeState, action: ActionTypes) => {
  return {
    darkMode: action.payload,
  };
};

export default reducer;

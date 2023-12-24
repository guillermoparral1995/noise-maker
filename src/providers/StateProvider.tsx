import React, { PropsWithChildren, useReducer } from 'react';
import initialState from '../store/initialState';
import reducer from '../store/reducer';
import { State } from '../types';
import { ActionTypes } from '../store/actions';

interface StateProviderValue {
  state: State;
  dispatch: React.Dispatch<ActionTypes>;
}

export const stateContext = React.createContext<StateProviderValue>(undefined);

export const StateProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <stateContext.Provider value={{ state, dispatch }}>
      {children}
    </stateContext.Provider>
  );
};

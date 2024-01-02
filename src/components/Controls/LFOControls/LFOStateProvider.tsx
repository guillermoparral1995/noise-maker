import React, { PropsWithChildren, useReducer } from 'react';
import { ActionTypes } from './store/actions';
import initialState, { LFOControlsState } from './store/initialState';
import reducer from './store/reducer';

interface LFOStateProviderValue {
  state: LFOControlsState;
  dispatch: React.Dispatch<ActionTypes>;
}

export const lfoStateContext =
  React.createContext<LFOStateProviderValue>(undefined);

export const LFOStateProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <lfoStateContext.Provider value={{ state, dispatch }}>
      {children}
    </lfoStateContext.Provider>
  );
};

import React, { PropsWithChildren, useReducer } from 'react';
import initialState, { GeneralControlsState } from './store/initialState';
import { ActionTypes } from './store/actions';
import reducer from './store/reducer';

interface GeneralControlsStateProviderValue {
  state: GeneralControlsState;
  dispatch: React.Dispatch<ActionTypes>;
}

export const generalControlsStateContext =
  React.createContext<GeneralControlsStateProviderValue>(undefined);

export const GeneralControlsStateProvider = ({
  children,
}: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <generalControlsStateContext.Provider value={{ state, dispatch }}>
      {children}
    </generalControlsStateContext.Provider>
  );
};

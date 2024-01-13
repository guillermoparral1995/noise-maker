import React, { PropsWithChildren, useReducer } from 'react';
import { ActionTypes } from './store/actions';
import initialState, { GeneralControlsState } from './store/initialState';
import reducer from './store/reducer';

interface GeneralControlsStateProviderValue {
  state: GeneralControlsState;
  dispatch: React.Dispatch<ActionTypes>;
}

export const generalControlsStateContext =
  React.createContext<GeneralControlsStateProviderValue>(undefined);

export const GeneralControlsStateProvider = ({
  children,
  __mockDispatch,
}: { __mockDispatch?: React.Dispatch<ActionTypes> } & PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <generalControlsStateContext.Provider
      value={{ state, dispatch: __mockDispatch ?? dispatch }}
    >
      {children}
    </generalControlsStateContext.Provider>
  );
};

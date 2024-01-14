import React, { PropsWithChildren, useReducer } from 'react';
import { ActionTypes } from './store/actions';
import initialState, { DelayState } from './store/initialState';
import reducer from './store/reducer';

interface DelayStateProviderValue {
  state: DelayState;
  dispatch: React.Dispatch<ActionTypes>;
}

export const delayStateContext =
  React.createContext<DelayStateProviderValue>(undefined);

export const DelayStateProvider = ({
  children,
  __mockDispatch,
}: { __mockDispatch?: React.Dispatch<ActionTypes> } & PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <delayStateContext.Provider
      value={{ state, dispatch: __mockDispatch ?? dispatch }}
    >
      {children}
    </delayStateContext.Provider>
  );
};

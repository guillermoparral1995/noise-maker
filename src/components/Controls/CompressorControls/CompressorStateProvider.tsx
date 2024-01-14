import React, { PropsWithChildren, useReducer } from 'react';
import { ActionTypes } from './store/actions';
import initialState, { CompressorState } from './store/initialState';
import reducer from './store/reducer';

interface CompressorStateProviderValue {
  state: CompressorState;
  dispatch: React.Dispatch<ActionTypes>;
}

export const compressorStateContext =
  React.createContext<CompressorStateProviderValue>(undefined);

export const CompressorStateProvider = ({
  children,
  __mockDispatch,
}: { __mockDispatch?: React.Dispatch<ActionTypes> } & PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <compressorStateContext.Provider
      value={{ state, dispatch: __mockDispatch ?? dispatch }}
    >
      {children}
    </compressorStateContext.Provider>
  );
};

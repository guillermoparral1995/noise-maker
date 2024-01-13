import React, { PropsWithChildren, useReducer } from 'react';
import { ActionTypes } from './store/actions';
import initialState, { EnvelopeState } from './store/initialState';
import reducer from './store/reducer';

interface EnvelopeStateProviderValue {
  state: EnvelopeState;
  dispatch: React.Dispatch<ActionTypes>;
}

export const envelopeStateContext =
  React.createContext<EnvelopeStateProviderValue>(undefined);

export const EnvelopeStateProvider = ({
  children,
  __mockDispatch,
}: { __mockDispatch?: React.Dispatch<ActionTypes> } & PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <envelopeStateContext.Provider
      value={{ state, dispatch: __mockDispatch ?? dispatch }}
    >
      {children}
    </envelopeStateContext.Provider>
  );
};

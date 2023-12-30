import React, { PropsWithChildren, useReducer } from 'react';
import initialState, { EnvelopeState } from './store/initialState';
import { ActionTypes } from './store/actions';
import reducer from './store/reducer';

interface EnvelopeStateProviderValue {
  state: EnvelopeState;
  dispatch: React.Dispatch<ActionTypes>;
}

export const envelopeStateContext =
  React.createContext<EnvelopeStateProviderValue>(undefined);

export const EnvelopeStateProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <envelopeStateContext.Provider value={{ state, dispatch }}>
      {children}
    </envelopeStateContext.Provider>
  );
};

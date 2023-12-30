import React, { PropsWithChildren, useReducer } from 'react';
import initialState, { FilterState } from './store/initialState';
import { ActionTypes } from './store/actions';
import reducer from './store/reducer';

interface FilterStateProviderValue {
  state: FilterState;
  dispatch: React.Dispatch<ActionTypes>;
}

export const filterStateContext =
  React.createContext<FilterStateProviderValue>(undefined);

export const FilterStateProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <filterStateContext.Provider value={{ state, dispatch }}>
      {children}
    </filterStateContext.Provider>
  );
};

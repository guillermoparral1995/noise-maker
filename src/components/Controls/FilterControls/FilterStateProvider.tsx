import React, { PropsWithChildren, useReducer } from 'react';
import { ActionTypes } from './store/actions';
import initialState, { FilterState } from './store/initialState';
import reducer from './store/reducer';

interface FilterStateProviderValue {
  state: FilterState;
  dispatch: React.Dispatch<ActionTypes>;
}

export const filterStateContext =
  React.createContext<FilterStateProviderValue>(undefined);

export const FilterStateProvider = ({
  children,
  __mockDispatch,
}: { __mockDispatch?: React.Dispatch<ActionTypes> } & PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <filterStateContext.Provider
      value={{ state, dispatch: __mockDispatch ?? dispatch }}
    >
      {children}
    </filterStateContext.Provider>
  );
};

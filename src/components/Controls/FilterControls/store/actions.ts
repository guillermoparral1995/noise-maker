import { Actions, FilterType } from '../../../../types';

export type ActionTypes =
  | FilterTypeAction
  | FilterCutoffAction
  | FilterResonanceAction;

interface FilterTypeAction {
  type: Actions.UPDATE_FILTER_TYPE;
  payload: FilterType;
}

export const updateFilterType: (filterType: FilterType) => FilterTypeAction = (
  filterType,
) => ({
  type: Actions.UPDATE_FILTER_TYPE,
  payload: filterType,
});

interface FilterCutoffAction {
  type: Actions.UPDATE_FILTER_CUTOFF;
  payload: number;
}

export const updateFilterCutoff: (filterFreq: number) => FilterCutoffAction = (
  cutoff,
) => ({
  type: Actions.UPDATE_FILTER_CUTOFF,
  payload: cutoff,
});

interface FilterResonanceAction {
  type: Actions.UPDATE_FILTER_RESONANCE;
  payload: number;
}

export const updateFilterResonance: (
  resonance: number,
) => FilterResonanceAction = (resonance) => ({
  type: Actions.UPDATE_FILTER_RESONANCE,
  payload: resonance,
});

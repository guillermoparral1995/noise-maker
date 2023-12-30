import { FilterType } from '../../../../types';

export interface FilterState {
  type: FilterType;
  cutoff: number;
  resonance: number;
}

const initialState: FilterState = {
  type: FilterType.HIGHPASS,
  cutoff: 350,
  resonance: 1,
};

export default initialState;

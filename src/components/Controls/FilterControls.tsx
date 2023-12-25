import React, { useContext } from 'react';
import Knob from '../shared/Knob';
import {
  updateFilterFrequency,
  updateFilterQ,
  updateFilterType,
} from '../../store/actions';
import { stateContext } from '../../providers/StateProvider';
import Selector from '../shared/Selector';
import { FilterType } from '../../types';

const FilterControls = () => {
  const { state } = useContext(stateContext);
  return (
    <div>
      <Selector
        options={[FilterType.HIGHPASS, FilterType.LOWPASS]}
        value={state.filter.type}
        action={updateFilterType}
      ></Selector>
      <Knob
        label="filter_freq"
        defaultValue={0}
        value={state.filter.frequency}
        action={updateFilterFrequency}
        min={10}
        max={5000}
      ></Knob>
      <Knob
        label="filter_q"
        defaultValue={1}
        value={state.filter.q}
        action={updateFilterQ}
        min={0.0001}
        max={50}
      ></Knob>
    </div>
  );
};

export default FilterControls;

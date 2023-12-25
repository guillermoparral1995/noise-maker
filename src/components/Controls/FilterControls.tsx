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
import { knobsLimits } from '../../constants/knobsLimits';

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
        defaultValue={knobsLimits.filterFrequency.default}
        value={state.filter.frequency}
        action={updateFilterFrequency}
        min={knobsLimits.filterFrequency.min}
        max={knobsLimits.filterFrequency.max}
      ></Knob>
      <Knob
        label="filter_q"
        defaultValue={knobsLimits.filterQ.default}
        value={state.filter.q}
        action={updateFilterQ}
        min={knobsLimits.filterQ.min}
        max={knobsLimits.filterQ.max}
      ></Knob>
    </div>
  );
};

export default FilterControls;

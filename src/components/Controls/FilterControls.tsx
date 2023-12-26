import React, { useContext } from 'react';
import Knob from '../shared/Knob';
import {
  updateFilterFrequency,
  updateFilterQ,
  updateFilterType,
} from '../../store/actions';
import { stateContext } from '../../providers/StateProvider';
import Selector from '../shared/Selector';
import { FilterType, Knobs } from '../../types';

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
        label={Knobs.FILTER_FREQUENCY}
        value={state.filter.frequency}
        action={updateFilterFrequency}
      ></Knob>
      <Knob
        label={Knobs.FILTER_Q}
        value={state.filter.q}
        action={updateFilterQ}
      ></Knob>
    </div>
  );
};

export default FilterControls;

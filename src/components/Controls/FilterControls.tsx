import React, { useContext } from 'react';
import Knob from '../shared/Knob';
import {
  updateFilterCutoff,
  updateFilterResonance,
  updateFilterType,
} from '../../store/actions';
import { stateContext } from '../../providers/StateProvider';
import Selector from '../shared/Selector';
import { FilterType, Knobs, Selectors } from '../../types';

const FilterControls = () => {
  const { state } = useContext(stateContext);
  return (
    <div>
      <Selector
        label={Selectors.FILTER}
        options={[FilterType.HIGHPASS, FilterType.LOWPASS]}
        value={state.filter.type}
        action={updateFilterType}
      ></Selector>
      <Knob
        label={Knobs.FILTER_CUTOFF}
        value={state.filter.cutoff}
        action={updateFilterCutoff}
      ></Knob>
      <Knob
        label={Knobs.FILTER_RESONANCE}
        value={state.filter.resonance}
        action={updateFilterResonance}
      ></Knob>
    </div>
  );
};

export default FilterControls;

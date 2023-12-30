import React, { useContext } from 'react';
import Knob from '../../shared/Knob';
import {
  updateFilterCutoff,
  updateFilterResonance,
  updateFilterType,
} from './store/actions';
import Selector from '../../shared/Selector';
import { FilterType, Knobs, Selectors } from '../../../types';
import { filterStateContext } from './FilterStateProvider';
import { audioContext } from '../../../providers/AudioContextProvider';

const FilterControls = () => {
  const {
    state: { type, cutoff, resonance },
    dispatch,
  } = useContext(filterStateContext);
  const { filter } = useContext(audioContext);

  filter.type = type;
  filter.frequency.value = cutoff;
  filter.Q.value = resonance;

  return (
    <div>
      <Selector
        label={Selectors.FILTER}
        options={[FilterType.HIGHPASS, FilterType.LOWPASS]}
        value={type}
        dispatch={dispatch}
        action={updateFilterType}
      ></Selector>
      <Knob
        label={Knobs.FILTER_CUTOFF}
        value={cutoff}
        action={updateFilterCutoff}
        dispatch={dispatch}
      ></Knob>
      <Knob
        label={Knobs.FILTER_RESONANCE}
        value={resonance}
        action={updateFilterResonance}
        dispatch={dispatch}
      ></Knob>
    </div>
  );
};

export default FilterControls;

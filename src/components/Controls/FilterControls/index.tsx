import React, { useContext, useEffect } from 'react';
import { audioContext } from '../../../providers/AudioContextProvider';
import { Knobs, Selectors } from '../../../types';
import Knob from '../../shared/Knob';
import Selector from '../../shared/Selector';
import { filterStateContext, FilterStateProvider } from './FilterStateProvider';
import {
  updateFilterCutoff,
  updateFilterResonance,
  updateFilterType,
} from './store/actions';

const FilterControls_ = () => {
  const {
    state: { type, cutoff, resonance },
    dispatch,
  } = useContext(filterStateContext);
  const { filter, lfo1, lfo2 } = useContext(audioContext);

  filter.type = type;
  filter.frequency.value = cutoff;
  filter.Q.value = resonance;

  useEffect(() => {
    if (lfo1.target === Knobs.FILTER_CUTOFF) {
      lfo1.output.connect(filter.frequency);
    }
    if (lfo1.target === Knobs.FILTER_RESONANCE) {
      lfo1.output.connect(filter.Q);
    }
    return () => lfo1.output.disconnect();
  }, [lfo1.target]);

  useEffect(() => {
    if (lfo2.target === Knobs.FILTER_CUTOFF) {
      lfo2.output.connect(filter.frequency);
    }
    if (lfo2.target === Knobs.FILTER_RESONANCE) {
      lfo2.output.connect(filter.Q);
    }
    return () => lfo2.output.disconnect();
  }, [lfo2.target]);

  return (
    <>
      <Selector
        id={Selectors.FILTER}
        value={type}
        dispatch={dispatch}
        action={updateFilterType}
      ></Selector>
      <Knob
        id={Knobs.FILTER_CUTOFF}
        value={cutoff}
        action={updateFilterCutoff}
        dispatch={dispatch}
      ></Knob>
      <Knob
        id={Knobs.FILTER_RESONANCE}
        value={resonance}
        action={updateFilterResonance}
        dispatch={dispatch}
      ></Knob>
    </>
  );
};

export default () => (
  <FilterStateProvider>
    <FilterControls_></FilterControls_>
  </FilterStateProvider>
);

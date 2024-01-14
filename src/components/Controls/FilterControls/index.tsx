import React, { useContext } from 'react';
import useAddMidiListeners from '../../../hooks/useAddMidiListeners';
import useConnectLFOTargets from '../../../hooks/useConnectLFOTargets';
import { audioContext } from '../../../providers/AudioContextProvider';
import { Knobs, Selectors } from '../../../types';
import Knob from '../../shared/Knob';
import Selector from '../../shared/Selector';
import { filterStateContext, FilterStateProvider } from './FilterStateProvider';

export const FilterControls_ = () => {
  const {
    state: { type, cutoff, resonance },
    dispatch,
  } = useContext(filterStateContext);
  const { filter, lfo1, lfo2 } = useContext(audioContext);
  useAddMidiListeners([Knobs.FILTER_CUTOFF, Knobs.FILTER_RESONANCE], dispatch);
  useConnectLFOTargets(lfo1, [
    { knob: Knobs.FILTER_CUTOFF, param: filter.frequency },
    { knob: Knobs.FILTER_RESONANCE, param: filter.Q },
  ]);
  useConnectLFOTargets(lfo2, [
    { knob: Knobs.FILTER_CUTOFF, param: filter.frequency },
    { knob: Knobs.FILTER_RESONANCE, param: filter.Q },
  ]);

  filter.type = type;
  filter.frequency.value = cutoff;
  filter.Q.value = resonance;

  return (
    <>
      <Selector
        id={Selectors.FILTER}
        value={type}
        dispatch={dispatch}
      ></Selector>
      <Knob id={Knobs.FILTER_CUTOFF} value={cutoff} dispatch={dispatch}></Knob>
      <Knob
        id={Knobs.FILTER_RESONANCE}
        value={resonance}
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

import { ControlsRow, Knob, Selector } from '@components';
import useAddMidiListeners from '@hooks/useAddMidiListeners';
import useConnectLFOTargets from '@hooks/useConnectLFOTargets';
import { audioContext } from '@providers/AudioContextProvider';
import { Knobs, Selectors } from '@types';
import React, { useContext } from 'react';
import { filterStateContext, FilterStateProvider } from './FilterStateProvider';
import styles from './index.module.scss';

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
      <h3 className={styles.section_title}>Filter</h3>
      <ControlsRow>
        <Selector
          id={Selectors.FILTER}
          value={type}
          dispatch={dispatch}
        ></Selector>
      </ControlsRow>
      <ControlsRow>
        <Knob
          id={Knobs.FILTER_CUTOFF}
          value={cutoff}
          dispatch={dispatch}
        ></Knob>
        <Knob
          id={Knobs.FILTER_RESONANCE}
          value={resonance}
          dispatch={dispatch}
        ></Knob>
      </ControlsRow>
    </>
  );
};

export default () => (
  <FilterStateProvider>
    <FilterControls_></FilterControls_>
  </FilterStateProvider>
);

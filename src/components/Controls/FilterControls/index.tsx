import { round, throttle } from 'lodash';
import React, { useCallback, useContext, useEffect } from 'react';
import { ControlChangeMessageEvent } from 'webmidi';
import { knobsValues } from '../../../constants/knobsValues';
import { audioContext } from '../../../providers/AudioContextProvider';
import { midiContext } from '../../../providers/MIDIProvider';
import { Knobs, Selectors } from '../../../types';
import Knob from '../../shared/Knob';
import Selector from '../../shared/Selector';
import { filterStateContext, FilterStateProvider } from './FilterStateProvider';
import {
  ActionTypes,
  updateFilterCutoff,
  updateFilterResonance,
} from './store/actions';

type ActionBuilder = (payload: number) => ActionTypes;

const FilterControls_ = () => {
  const {
    state: { type, cutoff, resonance },
    dispatch,
  } = useContext(filterStateContext);
  const { filter, lfo1, lfo2 } = useContext(audioContext);
  const midiInput = useContext(midiContext);

  filter.type = type;
  filter.frequency.value = cutoff;
  filter.Q.value = resonance;

  const handleUpdate = (action: ActionBuilder, value: number) => {
    dispatch(action(value));
  };

  const throttledUpdate = useCallback(throttle(handleUpdate, 100), [dispatch]);

  useEffect(() => {
    midiInput.addListener('controlchange', (e: ControlChangeMessageEvent) => {
      const value = round(e.value as number, 2);
      if (
        e.controller.number === knobsValues[Knobs.FILTER_CUTOFF].midiControl
      ) {
        throttledUpdate(updateFilterCutoff, value);
      }

      if (
        e.controller.number === knobsValues[Knobs.FILTER_RESONANCE].midiControl
      ) {
        throttledUpdate(updateFilterResonance, value);
      }
    });
  }, []);

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

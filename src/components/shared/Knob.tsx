import { round, throttle } from 'lodash';
import { KnobChangeEvent, Knob as PrimeReactKnob } from 'primereact/knob';
import React, { useCallback, useEffect } from 'react';
import { knobsValues } from '../../constants/knobsValues';
import type { ActionTypes, Knobs } from '../../types';

interface KnobProps {
  id: Knobs;
  value: number;
  dispatch: React.Dispatch<ActionTypes>;
}

export const Knob = ({ id, value, dispatch }: KnobProps) => {
  useEffect(() => {
    return () => throttledHandleChange.cancel();
  }, []);

  const handleChange = (e: KnobChangeEvent) => {
    dispatch(knobsValues[id].action(round(e.value, 2)));
  };

  const throttledHandleChange = useCallback(throttle(handleChange, 50), [
    dispatch,
  ]);

  return (
    <div className="knob-container">
      <label htmlFor={id}>{knobsValues[id].label}</label>
      <PrimeReactKnob
        defaultValue={knobsValues[id].default}
        value={value}
        id={id}
        name={id}
        onChange={throttledHandleChange}
        min={knobsValues[id].min}
        max={knobsValues[id].max}
        step={knobsValues[id].step ?? 0.01}
        strokeWidth={5}
        size={50}
      ></PrimeReactKnob>
    </div>
  );
};

export default Knob;

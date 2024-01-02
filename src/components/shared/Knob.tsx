import { throttle } from 'lodash';
import { KnobChangeEvent, Knob as PrimeReactKnob } from 'primereact/knob';
import React, { useCallback, useEffect } from 'react';
import { knobsValues } from '../../constants/knobsValues';
import type { ActionBuilder, ActionTypes, Knobs } from '../../types';

interface KnobProps {
  id: Knobs;
  value: number;
  dispatch: React.Dispatch<ActionTypes>;
  action: ActionBuilder<number>;
}

export const Knob = ({ id, value, action, dispatch }: KnobProps) => {
  useEffect(() => {
    return () => throttledHandleChange.cancel();
  }, []);

  const handleChange = (e: KnobChangeEvent) => {
    dispatch(action(Math.round(100 * e.value) / 100));
  };

  const throttledHandleChange = useCallback(throttle(handleChange, 50), [
    dispatch,
    action,
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

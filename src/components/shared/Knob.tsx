import { throttle } from 'lodash';
import { KnobChangeEvent, Knob as PrimeReactKnob } from 'primereact/knob';
import React, { useCallback, useEffect } from 'react';
import { knobsLimits } from '../../constants/knobsLimits';
import type { ActionBuilder, ActionTypes, Knobs } from '../../types';

interface KnobProps {
  label: Knobs;
  value: number;
  dispatch: React.Dispatch<ActionTypes>;
  action: ActionBuilder<number>;
}

export const Knob = ({ label, value, action, dispatch }: KnobProps) => {
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
      <label htmlFor={label}>{label}</label>
      <PrimeReactKnob
        defaultValue={knobsLimits[label].default}
        value={value}
        id={label}
        name={label}
        onChange={throttledHandleChange}
        min={knobsLimits[label].min}
        max={knobsLimits[label].max}
        step={knobsLimits[label].step ?? 0.01}
        strokeWidth={5}
        size={50}
      ></PrimeReactKnob>
    </div>
  );
};

export default Knob;

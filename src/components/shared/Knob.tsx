import React, { BaseSyntheticEvent, useContext } from 'react';
import { stateContext } from '../../providers/StateProvider';
import type { ActionBuilder } from '../../types';

interface KnobProps {
  label: string;
  defaultValue: number;
  action: ActionBuilder<number>;
  min: number;
  max: number;
}

export const Knob = ({ label, defaultValue, action, min, max }: KnobProps) => {
  const { dispatch } = useContext(stateContext);
  const handleChange = (e: BaseSyntheticEvent) => {
    // range inputs return value as string even if params are specified as numbers
    dispatch(action(parseFloat(e.target.value)));
  };

  return (
    <>
      <input
        type="range"
        defaultValue={defaultValue}
        name={label}
        onChange={(e) => handleChange(e)}
        min={min}
        max={max}
        step={0.01}
      ></input>
      <label htmlFor={label}>{label}</label>
    </>
  );
};

export default Knob;

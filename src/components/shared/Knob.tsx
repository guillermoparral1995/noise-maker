import React, { BaseSyntheticEvent, useContext } from 'react';
import { stateContext } from '../../providers/StateProvider';
import type { ActionBuilder } from '../../types';

interface KnobProps {
  label: string;
  value: number;
  defaultValue: number;
  action: ActionBuilder<number>;
  min: number;
  max: number;
}

export const Knob = ({
  label,
  defaultValue,
  value,
  action,
  min,
  max,
}: KnobProps) => {
  const { dispatch } = useContext(stateContext);

  const handleChange = (e: BaseSyntheticEvent) => {
    // range inputs return value as string even if params are specified as numbers
    dispatch(action(parseFloat(e.target.value)));
  };

  return (
    <>
      <label htmlFor={label}>{label}</label>
      <div>
        <input
          type="range"
          defaultValue={defaultValue}
          name={label}
          onChange={(e) => handleChange(e)}
          min={min}
          max={max}
          step={0.01}
        ></input>
        <span>{value}</span>
      </div>
    </>
  );
};

export default Knob;

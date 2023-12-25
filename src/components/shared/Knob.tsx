import React, {
  BaseSyntheticEvent,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { stateContext } from '../../providers/StateProvider';
import type { ActionBuilder } from '../../types';
import { throttle } from 'lodash';

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
  useEffect(() => {
    return () => throttledHandleChange.cancel();
  });
  const handleChange = (e: BaseSyntheticEvent) => {
    // range inputs return value as string even if params are specified as numbers
    dispatch(action(parseFloat(e.target.value)));
  };

  const throttledHandleChange = useMemo(() => throttle(handleChange, 1000), []);

  return (
    <>
      <label htmlFor={label}>{label}</label>
      <div>
        <input
          type="range"
          defaultValue={defaultValue}
          name={label}
          onChange={throttledHandleChange}
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

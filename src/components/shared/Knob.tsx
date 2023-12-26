import React, {
  BaseSyntheticEvent,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import { stateContext } from '../../providers/StateProvider';
import type { ActionBuilder, Knobs } from '../../types';
import { throttle } from 'lodash';
import { knobsLimits } from '../../constants/knobsLimits';

interface KnobProps {
  label: Knobs;
  value: number;
  action: ActionBuilder<number>;
}

export const Knob = ({ label, value, action }: KnobProps) => {
  const { dispatch } = useContext(stateContext);

  useEffect(() => {
    return () => throttledHandleChange.cancel();
  }, []);

  const handleChange = (e: BaseSyntheticEvent) => {
    // range inputs return value as string even if params are specified as numbers
    dispatch(action(parseFloat(e.target.value)));
  };

  const throttledHandleChange = useCallback(throttle(handleChange, 200), [
    dispatch,
    action,
  ]);

  return (
    <>
      <label htmlFor={label}>{label}</label>
      <div>
        <input
          type="range"
          defaultValue={knobsLimits[label].default}
          name={label}
          onChange={throttledHandleChange}
          min={knobsLimits[label].min}
          max={knobsLimits[label].max}
          step={0.01}
        ></input>
        <span>{value}</span>
      </div>
    </>
  );
};

export default Knob;

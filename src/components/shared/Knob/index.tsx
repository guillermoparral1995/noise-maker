import { round, throttle } from 'lodash';
import { KnobChangeEvent, Knob as PrimeReactKnob } from 'primereact/knob';
import React, { KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { knobsValues } from '../../../constants/knobsValues';
import type { ActionTypes, Knobs } from '../../../types';
import styles from './index.module.scss';

interface KnobProps {
  id: Knobs;
  value: number;
  dispatch: React.Dispatch<ActionTypes>;
}

export const Knob = ({ id, value, dispatch }: KnobProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  useEffect(() => {
    return () => throttledHandleChange.cancel();
  }, []);

  const handleChange = (e: KnobChangeEvent) => {
    dispatch(knobsValues[id].action(round(e.value, 2)));
  };

  const throttledHandleChange = useCallback(throttle(handleChange, 50), [
    dispatch,
  ]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (isFocused) {
      if (event.code === 'ArrowUp') {
        dispatch(
          knobsValues[id].action(
            round(value + (knobsValues[id].step ?? 0.01), 2),
          ),
        );
      }

      if (event.code === 'ArrowDown') {
        dispatch(
          knobsValues[id].action(
            round(value - (knobsValues[id].step ?? 0.01), 2),
          ),
        );
      }
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div
      data-testid={id}
      tabIndex={0}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <label id={`knob_label_${id}`} className={styles.label}>
        {knobsValues[id].label}
      </label>
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
        pt={{
          root: {
            'aria-labelledby': `knob_label_${id}`,
          },
        }}
      ></PrimeReactKnob>
    </div>
  );
};

export default Knob;

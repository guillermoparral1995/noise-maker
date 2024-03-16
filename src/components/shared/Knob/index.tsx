import { round, throttle } from 'lodash';
import React, { KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { WebAudioKnob } from 'webaudio-controls-react-typescript';
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

  const handleChange = (e: number) => {
    dispatch(knobsValues[id].action(round(e as number, 2)));
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
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      data-testid={id}
      tabIndex={-1}
    >
      <p className={styles.label}>{knobsValues[id].label}</p>
      <WebAudioKnob
        value={value}
        diameter={50}
        defvalue={knobsValues[id].default}
        min={knobsValues[id].min}
        max={knobsValues[id].max}
        step={knobsValues[id].step ?? 0.01}
        bodyColor="#f0f0f0"
        highlightColor="#ffffff"
        indicatorColor="mediumpurple"
        onKnobInput={throttledHandleChange}
        id={id}
      ></WebAudioKnob>
      <p className={styles.label}>{value}</p>
    </div>
  );
};

export default Knob;

import { knobsValues } from '@constants/knobsValues';
import { useBreakpoints } from '@hooks/useBreakpoints';
import { midiContext } from '@providers/MIDIProvider';
import { Knobs } from '@types';
import { round } from 'lodash';
import React, { BaseSyntheticEvent, useContext, useEffect } from 'react';
import { envelopeStateContext } from '../../EnvelopeControls/EnvelopeStateProvider';
import { updatePitchbend } from '../../EnvelopeControls/store/actions';
import styles from './index.module.scss';

export const PitchbendWheel = () => {
  const { selectedInput: midiInput } = useContext(midiContext);
  const { state, dispatch } = useContext(envelopeStateContext);
  const { isDesktop } = useBreakpoints();

  useEffect(() => {
    if (midiInput) {
      midiInput.addListener('pitchbend', (e) => {
        const multiplier =
          (knobsValues[Knobs.PITCHBEND].max -
            knobsValues[Knobs.PITCHBEND].min) /
          2;
        const value = round((e.value as number) * multiplier, 2);
        dispatch(updatePitchbend(value));
      });
    }
  }, [midiInput]);

  const handleChange = (e: BaseSyntheticEvent) => {
    const pitchbendValue = round(e.target.value as number, 2);
    dispatch(updatePitchbend(pitchbendValue));
  };

  const handleDragEnd = () => {
    dispatch(updatePitchbend(0));
  };

  return (
    <div id={styles.pitchbend_wheel_container}>
      <input
        id={styles.pitchbend_wheel}
        className={isDesktop ? styles.desktop : ''}
        data-testid="pitchbend_wheel"
        type="range"
        min={knobsValues[Knobs.PITCHBEND].min}
        max={knobsValues[Knobs.PITCHBEND].max}
        step={knobsValues[Knobs.PITCHBEND].step}
        value={state.pitchbend}
        onChange={handleChange}
        onMouseUp={handleDragEnd}
      ></input>
    </div>
  );
};

export default PitchbendWheel;

import { round } from 'lodash';
import React, { BaseSyntheticEvent, useContext, useEffect } from 'react';
import { knobsValues } from '../../../constants/knobsValues';
import { midiContext } from '../../../providers/MIDIProvider';
import { Knobs } from '../../../types';
import { envelopeStateContext } from '../../Controls/EnvelopeControls/EnvelopeStateProvider';
import { updatePitchbend } from '../../Controls/EnvelopeControls/store/actions';
import styles from './index.module.scss';

export const PitchbendWheel = () => {
  const { selectedInput: midiInput } = useContext(midiContext);
  const { state, dispatch } = useContext(envelopeStateContext);

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
    <input
      id={styles.pitchbend_wheel}
      type="range"
      min={knobsValues[Knobs.PITCHBEND].min}
      max={knobsValues[Knobs.PITCHBEND].max}
      step={knobsValues[Knobs.PITCHBEND].step}
      value={state.pitchbend}
      onChange={handleChange}
      onMouseUp={handleDragEnd}
    ></input>
  );
};

export default PitchbendWheel;

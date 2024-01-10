import { round } from 'lodash';
import { useContext, useEffect } from 'react';
import { ControlChangeMessageEvent } from 'webmidi';
import { knobsValues } from '../constants/knobsValues';
import { midiContext } from '../providers/MIDIProvider';
import { ActionTypes, Knobs } from '../types';
import useThrottledUpdate from './useThrottledUpdate';

export default (knobs: Knobs[], dispatch: React.Dispatch<ActionTypes>) => {
  const { selectedInput: midiInput } = useContext(midiContext);
  const throttledUpdate = useThrottledUpdate(dispatch);
  useEffect(() => {
    if (midiInput) {
      midiInput.addListener('controlchange', (e: ControlChangeMessageEvent) => {
        knobs.forEach((knob) => {
          if (e.controller.number === knobsValues[knob].midiControl) {
            const multiplier = knobsValues[knob].max - knobsValues[knob].min;
            const offset = knobsValues[knob].min;
            const value = round((e.value as number) * multiplier + offset, 2);
            throttledUpdate(knobsValues[knob].action, value);
          }
        });
      });
    }
  }, []);
};

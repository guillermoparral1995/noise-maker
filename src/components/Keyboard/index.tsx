import { round, throttle } from 'lodash';
import React, { useCallback, useContext, useEffect } from 'react';
import { ControlChangeMessageEvent } from 'webmidi';
import { knobsValues } from '../../constants/knobsValues';
import noteTable from '../../constants/noteTable';
import { midiContext } from '../../providers/MIDIProvider';
import { Knobs, Selectors } from '../../types';
import { envelopeStateContext } from '../Controls/EnvelopeControls/EnvelopeStateProvider';
import {
  ActionTypes,
  updateDetune,
} from '../Controls/EnvelopeControls/store/actions';
import Knob from '../shared/Knob';
import Selector from '../shared/Selector';
import Key from './Key';
import './index.scss';

type ActionBuilder = (payload: number) => ActionTypes;

const Keyboard = () => {
  const { state, dispatch } = useContext(envelopeStateContext);
  const midiInput = useContext(midiContext);
  const handleUpdate = (action: ActionBuilder, value: number) => {
    dispatch(action(value));
  };

  const throttledUpdate = useCallback(throttle(handleUpdate, 100), [dispatch]);

  useEffect(() => {
    midiInput.addListener('controlchange', (e: ControlChangeMessageEvent) => {
      const value = round(e.value as number, 2);
      if (e.controller.number === knobsValues[Knobs.DETUNE].midiControl) {
        throttledUpdate(updateDetune, value);
      }
    });
  }, []);
  return (
    <>
      <div id="keyboard-controls" className="column">
        <Selector
          id={Selectors.WAVEFORM}
          dispatch={dispatch}
          value={state.waveform}
        ></Selector>
        <Knob id={Knobs.DETUNE} value={state.detune} dispatch={dispatch}></Knob>
      </div>
      <div id="keyboard-container">
        {Object.entries(noteTable).map(([note, frequency]) => (
          <Key key={note} identifier={note} frequency={frequency}></Key>
        ))}
      </div>
    </>
  );
};

export default Keyboard;

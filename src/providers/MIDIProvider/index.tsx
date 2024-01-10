import React, { PropsWithChildren, useEffect, useReducer } from 'react';
import { Input, WebMidi } from 'webmidi';
import {
  ActionTypes,
  updateMIDIError,
  updateMIDIInput,
  updateMIDILoading,
} from './store/actions';
import { initialState } from './store/initialState';
import { reducer } from './store/reducer';

interface MIDIContextValue {
  dispatch: React.Dispatch<ActionTypes>;
  inputs: string[];
  selectedInput?: Input;
}

export const midiContext = React.createContext<MIDIContextValue>(undefined);

export const MIDIProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const enableMidi = async () => {
    try {
      await WebMidi.enable({ sysex: true });
      if (WebMidi.inputs.length) {
        dispatch(updateMIDIInput(WebMidi.inputs[0].name));
      }
      dispatch(updateMIDILoading(false));
    } catch (e) {
      console.error('Could not start Web MIDI', e);
      dispatch(updateMIDILoading(false));
      dispatch(updateMIDIError(true));
    }
  };

  useEffect(() => {
    enableMidi();
  }, []);

  if (state.loading) return;
  if (!state.loading && !state.error) {
    const inputs = WebMidi.inputs.length
      ? WebMidi.inputs.map((input) => input.name)
      : [];
    return (
      <midiContext.Provider
        value={{
          dispatch,
          inputs,
          selectedInput: state.input
            ? WebMidi.getInputByName(state.input)
            : undefined,
        }}
      >
        {children}
      </midiContext.Provider>
    );
  }
};

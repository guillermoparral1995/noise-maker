import React, { PropsWithChildren, useEffect, useReducer } from 'react';
import { Input, WebMidi } from 'webmidi';
import {
  ActionTypes,
  updateMIDIError,
  updateMIDIInput,
  updateMIDILoading,
} from './store/actions';
import { initialState, MIDIContextState } from './store/initialState';
import { reducer } from './store/reducer';

interface MIDIContextMocks {
  inputs?: string[];
  state?: MIDIContextState;
}

interface MIDIContextValue {
  dispatch: React.Dispatch<ActionTypes>;
  inputs: string[];
  selectedInput?: Input;
}

export const midiContext = React.createContext<MIDIContextValue>(undefined);

export const MIDIProvider = ({
  children,
  __mocks,
}: { __mocks?: MIDIContextMocks } & PropsWithChildren) => {
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
  const isLoading = __mocks?.state ? __mocks.state.loading : state.loading;
  const isError = __mocks?.state ? __mocks.state.error : state.error;

  if (isLoading) return;
  if (!isLoading && !isError) {
    const inputs = WebMidi.inputs.map((input) => input.name);
    const input = __mocks?.state?.input ?? state.input;
    const selectedInput = input ? WebMidi.getInputByName(input) : undefined;
    return (
      <midiContext.Provider
        value={{
          dispatch,
          inputs,
          selectedInput,
        }}
      >
        {children}
      </midiContext.Provider>
    );
  }
};

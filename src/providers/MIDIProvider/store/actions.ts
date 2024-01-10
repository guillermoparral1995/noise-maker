import { Actions } from '../../../types';

export type ActionTypes = MIDILoadingAction | MIDIErrorAction | MIDIInputAction;

export type MIDILoadingAction = {
  type: Actions.UPDATE_MIDI_LOADING;
  payload: boolean;
};

export const updateMIDILoading: (loading: boolean) => MIDILoadingAction = (
  loading,
) => ({
  type: Actions.UPDATE_MIDI_LOADING,
  payload: loading,
});

export type MIDIErrorAction = {
  type: Actions.UPDATE_MIDI_ERROR;
  payload: boolean;
};

export const updateMIDIError: (error: boolean) => MIDIErrorAction = (
  error,
) => ({
  type: Actions.UPDATE_MIDI_ERROR,
  payload: error,
});

export type MIDIInputAction = {
  type: Actions.UPDATE_MIDI_INPUT;
  payload: string;
};

export const updateMIDIInput: (input: string) => MIDIInputAction = (input) => ({
  type: Actions.UPDATE_MIDI_INPUT,
  payload: input,
});

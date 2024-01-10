import { Actions } from '../../../types';
import { ActionTypes } from './actions';
import { MIDIContextState } from './initialState';

export const reducer = (state: MIDIContextState, action: ActionTypes) => {
  const { type, payload } = action;
  switch (type) {
    case Actions.UPDATE_MIDI_LOADING:
      return {
        ...state,
        loading: payload,
      };
    case Actions.UPDATE_MIDI_ERROR:
      return {
        ...state,
        error: payload,
      };
    case Actions.UPDATE_MIDI_INPUT:
      return {
        ...state,
        input: payload,
      };
    default:
      return state;
  }
};

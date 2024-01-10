export interface MIDIContextState {
  loading: boolean;
  error: boolean;
  input: string;
}

export const initialState: MIDIContextState = {
  loading: true,
  error: false,
  input: '',
};

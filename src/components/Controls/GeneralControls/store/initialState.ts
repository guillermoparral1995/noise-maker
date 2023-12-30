export interface GeneralControlsState {
  volume: number;
  pan: number;
}

const initialState: GeneralControlsState = {
  volume: 0.5,
  pan: 0,
};

export default initialState;

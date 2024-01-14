export interface DelayState {
  active: boolean;
  feedback: number;
  delayTime: number;
}

const initialState: DelayState = {
  active: false,
  feedback: 0.3,
  delayTime: 0.5,
};

export default initialState;

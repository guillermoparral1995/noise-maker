export interface DelayState {
  feedback: number;
  delayTime: number;
  trails: boolean;
}

const initialState: DelayState = {
  feedback: 0.3,
  delayTime: 0.5,
  trails: false,
};

export default initialState;

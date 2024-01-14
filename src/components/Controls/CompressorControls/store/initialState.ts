export interface CompressorState {
  threshold: number;
  ratio: number;
  knee: number;
  attack: number;
  release: number;
}

const initialState: CompressorState = {
  threshold: -24,
  ratio: 12,
  knee: 30,
  attack: 0.003,
  release: 0.25,
};

export default initialState;

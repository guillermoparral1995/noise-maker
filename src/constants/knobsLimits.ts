interface KnobLimit {
  min: number;
  max: number;
  default: number;
}

export const knobsLimits: Record<string, KnobLimit> = {
  volume: {
    min: 0,
    max: 1,
    default: 0.5,
  },
  pan: {
    min: -1,
    max: 1,
    default: 0,
  },
  attack: {
    min: 0,
    max: 5,
    default: 0,
  },
  decay: {
    min: 0,
    max: 5,
    default: 0,
  },
  sustain: {
    min: 0,
    max: 1,
    default: 1,
  },
  release: {
    min: 0,
    max: 1,
    default: 0,
  },
  filterFrequency: {
    min: 10,
    max: 5000,
    default: 350,
  },
  filterQ: {
    min: 0.0001,
    max: 50,
    default: 1,
  },
};

interface KnobLimit {
  min: number;
  max: number;
  default: number;
}

enum Knobs {
  VOLUME = 'volume',
  PAN = 'pan',
  ATTACK = 'attack',
  DECAY = 'decay',
  SUSTAIN = 'sustain',
  RELEASE = 'release',
  FILTER_FREQUENCY = 'filterFrequency',
  FILTER_Q = 'filterQ',
}

export const knobsLimits: Record<Knobs, KnobLimit> = {
  [Knobs.VOLUME]: {
    min: 0,
    max: 1,
    default: 0.5,
  },
  [Knobs.PAN]: {
    min: -1,
    max: 1,
    default: 0,
  },
  [Knobs.ATTACK]: {
    min: 0,
    max: 5,
    default: 0,
  },
  [Knobs.DECAY]: {
    min: 0,
    max: 5,
    default: 0,
  },
  [Knobs.SUSTAIN]: {
    min: 0,
    max: 1,
    default: 1,
  },
  [Knobs.RELEASE]: {
    min: 0,
    max: 5,
    default: 0,
  },
  [Knobs.FILTER_FREQUENCY]: {
    min: 10,
    max: 5000,
    default: 350,
  },
  [Knobs.FILTER_Q]: {
    min: 0.0001,
    max: 50,
    default: 1,
  },
};

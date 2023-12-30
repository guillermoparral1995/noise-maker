import { Knobs } from '../types';

interface KnobLimit {
  min: number;
  max: number;
  default: number;
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
  [Knobs.FILTER_CUTOFF]: {
    min: 10,
    max: 5000,
    default: 350,
  },
  [Knobs.FILTER_RESONANCE]: {
    min: 0.0001,
    max: 50,
    default: 1,
  },
  [Knobs.LFO_FREQUENCY]: {
    min: 0.2,
    max: 10,
    default: 1,
  },
  [Knobs.LFO_AMPLITUDE]: {
    min: 0,
    max: 1,
    default: 0.5,
  },
};

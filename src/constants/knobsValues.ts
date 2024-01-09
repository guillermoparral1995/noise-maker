import { Knobs } from '../types';

interface KnobValue {
  label: string;
  min: number;
  max: number;
  default: number;
  midiControl: number;
  step?: number;
}

export const knobsValues: Record<Knobs, KnobValue> = {
  [Knobs.VOLUME]: {
    label: 'Volume',
    min: 0,
    max: 1,
    default: 0.5,
    midiControl: 74,
  },
  [Knobs.PAN]: {
    label: 'Pan',
    min: -1,
    max: 1,
    default: 0,
    midiControl: 18,
  },
  [Knobs.DETUNE]: {
    label: 'Detune',
    min: -1200,
    max: 1200,
    default: 0,
    midiControl: 75,
    step: 1,
  },
  [Knobs.ATTACK]: {
    label: 'Attack',
    min: 0,
    max: 5,
    default: 0,
    midiControl: 93,
  },
  [Knobs.DECAY]: {
    label: 'Decay',
    min: 0,
    max: 5,
    default: 0,
    midiControl: 91,
  },
  [Knobs.SUSTAIN]: {
    label: 'Sustain',
    min: 0,
    max: 1,
    default: 1,
    midiControl: 73,
  },
  [Knobs.RELEASE]: {
    label: 'Release',
    min: 0,
    max: 5,
    default: 0,
    midiControl: 79,
  },
  [Knobs.FILTER_CUTOFF]: {
    label: 'Cut-off',
    min: 10,
    max: 5000,
    default: 350,
    midiControl: 71,
    step: 1,
  },
  [Knobs.FILTER_RESONANCE]: {
    label: 'Resonance',
    min: 0.0001,
    max: 50,
    default: 1,
    midiControl: 19,
    step: 0.1,
  },
  [Knobs.LFO_1_FREQUENCY]: {
    label: 'Frequency',
    min: 0.2,
    max: 10,
    default: 1,
    midiControl: 76,
  },
  [Knobs.LFO_1_AMPLITUDE]: {
    label: 'Amplitude',
    min: 0,
    max: 1,
    default: 0.5,
    midiControl: 16,
  },
  [Knobs.LFO_2_FREQUENCY]: {
    label: 'Frequency',
    min: 0.2,
    max: 10,
    default: 1,
    midiControl: 77,
  },
  [Knobs.LFO_2_AMPLITUDE]: {
    label: 'Amplitude',
    min: 0,
    max: 1,
    default: 0.5,
    midiControl: 17,
  },
};

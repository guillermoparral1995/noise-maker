import {
  updateAttack,
  updateDecay,
  updateDetune,
  updatePitchbend,
  updateRelease,
  updateSustain,
} from '../components/Controls/EnvelopeControls/store/actions';
import {
  updateFilterCutoff,
  updateFilterResonance,
} from '../components/Controls/FilterControls/store/actions';
import {
  updatePan,
  updateVolume,
} from '../components/Controls/GeneralControls/store/actions';
import {
  updateLFO1Amplitude,
  updateLFO1Frequency,
  updateLFO2Amplitude,
  updateLFO2Frequency,
} from '../components/Controls/LFOControls/store/actions';
import { ActionBuilder, Knobs } from '../types';

interface KnobValue {
  label: string;
  min: number;
  max: number;
  default: number;
  midiControl?: number;
  action: ActionBuilder<number>;
  step?: number;
}

export const knobsValues: Record<Knobs, KnobValue> = {
  [Knobs.VOLUME]: {
    label: 'Volume',
    min: 0,
    max: 1,
    default: 0.5,
    midiControl: 74,
    action: updateVolume,
  },
  [Knobs.PAN]: {
    label: 'Pan',
    min: -1,
    max: 1,
    default: 0,
    midiControl: 18,
    action: updatePan,
  },
  [Knobs.DETUNE]: {
    label: 'Detune',
    min: -1200,
    max: 1200,
    default: 0,
    midiControl: 75,
    action: updateDetune,
    step: 1,
  },
  [Knobs.PITCHBEND]: {
    label: 'Pitchbend',
    min: -300,
    max: 300,
    default: 0,
    action: updatePitchbend,
    step: 1,
  },
  [Knobs.ATTACK]: {
    label: 'Attack',
    min: 0,
    max: 5,
    default: 0,
    midiControl: 93,
    action: updateAttack,
  },
  [Knobs.DECAY]: {
    label: 'Decay',
    min: 0,
    max: 5,
    default: 0,
    midiControl: 91,
    action: updateDecay,
  },
  [Knobs.SUSTAIN]: {
    label: 'Sustain',
    min: 0,
    max: 1,
    default: 1,
    midiControl: 73,
    action: updateSustain,
  },
  [Knobs.RELEASE]: {
    label: 'Release',
    min: 0,
    max: 5,
    default: 0,
    midiControl: 79,
    action: updateRelease,
  },
  [Knobs.FILTER_CUTOFF]: {
    label: 'Cut-off',
    min: 10,
    max: 5000,
    default: 350,
    midiControl: 71,
    action: updateFilterCutoff,
    step: 1,
  },
  [Knobs.FILTER_RESONANCE]: {
    label: 'Resonance',
    min: 0.0001,
    max: 50,
    default: 1,
    midiControl: 19,
    action: updateFilterResonance,
    step: 0.1,
  },
  [Knobs.LFO_1_FREQUENCY]: {
    label: 'Frequency',
    min: 0.2,
    max: 10,
    default: 1,
    midiControl: 76,
    action: updateLFO1Frequency,
  },
  [Knobs.LFO_1_AMPLITUDE]: {
    label: 'Amplitude',
    min: 0,
    max: 1,
    default: 0.5,
    midiControl: 16,
    action: updateLFO1Amplitude,
  },
  [Knobs.LFO_2_FREQUENCY]: {
    label: 'Frequency',
    min: 0.2,
    max: 10,
    default: 1,
    midiControl: 77,
    action: updateLFO2Frequency,
  },
  [Knobs.LFO_2_AMPLITUDE]: {
    label: 'Amplitude',
    min: 0,
    max: 1,
    default: 0.5,
    midiControl: 17,
    action: updateLFO2Amplitude,
  },
};

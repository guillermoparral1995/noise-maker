import {
  FilterType,
  Knobs,
  LFO1Target,
  LFO2Target,
  Selectors,
  Waveform,
} from '../types';

interface DropdownOption {
  label: string;
  value: Waveform | FilterType | LFO1Target | LFO2Target;
}

interface SelectorValues {
  label: string;
  options: DropdownOption[];
}

const waveforms: DropdownOption[] = [
  {
    label: 'Sine',
    value: Waveform.SINE,
  },
  {
    label: 'Square',
    value: Waveform.SQUARE,
  },
  {
    label: 'Sawtooth',
    value: Waveform.SAWTOOTH,
  },
  {
    label: 'Triangle',
    value: Waveform.TRIANGLE,
  },
];

const filterTypes: DropdownOption[] = [
  {
    label: 'Low-pass',
    value: FilterType.LOWPASS,
  },
  {
    label: 'High-pass',
    value: FilterType.HIGHPASS,
  },
];

const lfo1Targets: DropdownOption[] = [
  {
    label: 'Off',
    value: 'off',
  },
  {
    label: 'Volume',
    value: Knobs.VOLUME,
  },
  {
    label: 'Pan',
    value: Knobs.PAN,
  },
  {
    label: 'Cut-off',
    value: Knobs.FILTER_CUTOFF,
  },
  {
    label: 'Resonance',
    value: Knobs.FILTER_RESONANCE,
  },
  {
    label: 'Detune',
    value: Knobs.DETUNE,
  },
];

export const selectorValues: Record<Selectors, SelectorValues> = {
  [Selectors.WAVEFORM]: {
    label: 'Waveform',
    options: waveforms,
  },
  [Selectors.LFO_1_WAVEFORM]: {
    label: 'Waveform',
    options: waveforms,
  },
  [Selectors.LFO_2_WAVEFORM]: {
    label: 'Waveform',
    options: waveforms,
  },
  [Selectors.FILTER]: {
    label: 'Type',
    options: filterTypes,
  },
  [Selectors.LFO_1_TARGET]: {
    label: 'Target',
    options: lfo1Targets,
  },
  [Selectors.LFO_2_TARGET]: {
    label: 'Target',
    options: [
      ...lfo1Targets,
      {
        label: 'LFO 1 Frequency',
        value: Knobs.LFO_1_FREQUENCY,
      },
      {
        label: 'LFO 1 Amplitude',
        value: Knobs.LFO_1_AMPLITUDE,
      },
    ],
  },
};

import {
  updateLFO1Target,
  updateLFO2Target,
} from '@providers/AudioContextProvider/store/actions';
import { updateMIDIInput } from '@providers/MIDIProvider/store/actions';
import {
  ActionBuilder,
  FilterType,
  Knobs,
  LFO1Target,
  LFO2Target,
  Selectors,
  Waveform,
} from '@types';
import { updateWaveform } from '../components/Controls/EnvelopeControls/store/actions';
import { updateFilterType } from '../components/Controls/FilterControls/store/actions';
import {
  updateLFO1Waveform,
  updateLFO2Waveform,
} from '../components/Controls/LFOControls/store/actions';

type DropdownValue = Waveform | FilterType | LFO1Target | LFO2Target | string;

export interface DropdownOption {
  label: string;
  value: DropdownValue;
}

interface SelectorValues {
  label: string;
  action: ActionBuilder<DropdownValue>;
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
    action: updateWaveform,
    options: waveforms,
  },
  [Selectors.LFO_1_WAVEFORM]: {
    label: 'Waveform',
    action: updateLFO1Waveform,
    options: waveforms,
  },
  [Selectors.LFO_2_WAVEFORM]: {
    label: 'Waveform',
    action: updateLFO2Waveform,
    options: waveforms,
  },
  [Selectors.FILTER]: {
    label: 'Type',
    action: updateFilterType,
    options: filterTypes,
  },
  [Selectors.LFO_1_TARGET]: {
    label: 'Target',
    action: updateLFO1Target,
    options: lfo1Targets,
  },
  [Selectors.LFO_2_TARGET]: {
    label: 'Target',
    action: updateLFO2Target,
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
  [Selectors.MIDI_INPUT]: {
    label: 'MIDI Input',
    action: updateMIDIInput,
    options: [],
  },
};

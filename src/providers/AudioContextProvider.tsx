import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { stateContext } from './StateProvider';
import { Knobs } from '../types';
import { knobsLimits } from '../constants/knobsLimits';

interface AudioContextProviderValue {
  context: AudioContext;
  output: AudioNode;
}

export const audioContext =
  React.createContext<AudioContextProviderValue>(undefined);

export const AudioContextProvider = ({ children }: PropsWithChildren) => {
  const { state } = useContext(stateContext);
  const context = useMemo(() => new AudioContext(), []);
  const volumeNode: GainNode = useMemo(() => new GainNode(context), []);
  const pannerNode: StereoPannerNode = useMemo(
    () => new StereoPannerNode(context),
    [],
  );
  const filterNode: BiquadFilterNode = useMemo(
    () => new BiquadFilterNode(context),
    [],
  );
  const lfoNode: OscillatorNode = useMemo(
    () =>
      new OscillatorNode(context, {
        type: state.lfo.waveform,
        frequency: state.lfo.frequency,
      }),
    [state.lfo.waveform, state.lfo.frequency],
  );
  const lfoGainNode: GainNode = useMemo(() => context.createGain(), []);
  lfoNode.connect(lfoGainNode);

  volumeNode.gain.value = state.volume;
  pannerNode.pan.value = state.pan;
  filterNode.type = state.filter.type;
  filterNode.frequency.value = state.filter.cutoff;
  filterNode.Q.value = state.filter.resonance;

  useEffect(() => {
    lfoNode.connect(lfoGainNode);
    lfoNode.start();

    return () => lfoNode.disconnect();
  }, [state.lfo.waveform, state.lfo.frequency]);

  useEffect(() => {
    filterNode.connect(volumeNode);
    volumeNode.connect(pannerNode);
    pannerNode.connect(context.destination);
  }, []);

  useEffect(() => {
    const knob = Knobs[state.lfo.target as keyof typeof Knobs];
    if (knob) {
      const range =
        ((knobsLimits[knob].max - knobsLimits[knob].min) / 2) *
        state.lfo.amplitude;
      lfoGainNode.gain.value = range;
      switch (state.lfo.target) {
        case Knobs.VOLUME:
          lfoGainNode.connect(volumeNode.gain);
          break;
        case Knobs.PAN:
          lfoGainNode.connect(pannerNode.pan);
          break;
        case Knobs.FILTER_CUTOFF:
          lfoGainNode.connect(filterNode.frequency);
          break;
        case Knobs.FILTER_RESONANCE:
          lfoGainNode.connect(filterNode.Q);
          break;
        default:
          break;
      }
    }
    return () => lfoGainNode.disconnect();
  }, [
    state.lfo.target,
    state.lfo.amplitude,
    volumeNode.gain.value,
    pannerNode.pan.value,
    filterNode.frequency.value,
  ]);

  return (
    <audioContext.Provider
      value={{
        context,
        output: filterNode,
      }}
    >
      {children}
    </audioContext.Provider>
  );
};

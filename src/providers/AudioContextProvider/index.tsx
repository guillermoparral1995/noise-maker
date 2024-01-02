import React, {
  PropsWithChildren,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { ActionTypes, LFO1Target, LFO2Target } from '../../types';
import { initialState } from './store/initialState';
import { reducer } from './store/reducer';

interface AudioContextProviderValue {
  context: AudioContext;
  volume: GainNode;
  pan: StereoPannerNode;
  filter: BiquadFilterNode;
  lfo1: {
    output: GainNode;
    target: LFO1Target;
  };
  lfo2: {
    output: GainNode;
    target: LFO2Target;
  };
  dispatch: React.Dispatch<ActionTypes>;
  output: AudioNode;
}

export const audioContext =
  React.createContext<AudioContextProviderValue>(undefined);

export const AudioContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);
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
  const lfo1OutputNode: GainNode = useMemo(() => new GainNode(context), []);
  const lfo2OutputNode: GainNode = useMemo(() => new GainNode(context), []);

  useEffect(() => {
    filterNode.connect(volumeNode);
    volumeNode.connect(pannerNode);
    pannerNode.connect(context.destination);
  }, []);

  return (
    <audioContext.Provider
      value={{
        context,
        volume: volumeNode,
        pan: pannerNode,
        filter: filterNode,
        lfo1: {
          output: lfo1OutputNode,
          target: state.lfo1Target,
        },
        lfo2: {
          output: lfo2OutputNode,
          target: state.lfo2Target,
        },
        output: filterNode,
        dispatch,
      }}
    >
      {children}
    </audioContext.Provider>
  );
};

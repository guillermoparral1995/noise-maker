import React, {
  PropsWithChildren,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import {
  AnalyserNodeMock,
  AudioContextMock,
  AudioNodeMock,
  BiquadFilterNodeMock,
  GainNodeMock,
  StereoPannerNodeMock,
} from '../../../__mocks__';
import { ActionTypes, LFO1Target, LFO2Target } from '../../types';
import { initialState } from './store/initialState';
import { reducer } from './store/reducer';

export interface LFO<T> {
  output: GainNode;
  target: T;
}

export interface LFOMock<T> {
  output: GainNodeMock;
  target: T;
}

interface AudioContextProviderMocks {
  context: AudioContextMock;
  volume?: GainNodeMock;
  pan?: StereoPannerNodeMock;
  filter?: BiquadFilterNodeMock;
  lfo1?: LFOMock<LFO1Target>;
  lfo2?: LFOMock<LFO2Target>;
  analyser?: AnalyserNodeMock;
  dispatch?: React.Dispatch<ActionTypes>;
  output?: AudioNodeMock;
}

interface AudioContextProviderParams {
  context: AudioContext;
  volume: GainNode;
  pan: StereoPannerNode;
  filter: BiquadFilterNode;
  lfo1: LFO<LFO1Target>;
  lfo2: LFO<LFO2Target>;
  analyser: AnalyserNode;
  dispatch: React.Dispatch<ActionTypes>;
  output: AudioNode;
}

type AudioContextProviderValue = { __isMock: boolean } & (
  | AudioContextProviderParams
  | AudioContextProviderMocks
);

export const audioContext =
  React.createContext<AudioContextProviderValue>(undefined);

export const AudioContextProvider = ({
  children,
  __mocks,
}: { __mocks?: AudioContextProviderMocks } & PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  if (__mocks?.context) {
    return (
      <audioContext.Provider
        value={{
          __isMock: true,
          context: __mocks.context,
          volume: __mocks.volume,
          pan: __mocks.pan,
          filter: __mocks.filter,
          lfo1: {
            output: __mocks.lfo1?.output,
            target: __mocks.lfo1?.target,
          },
          lfo2: {
            output: __mocks.lfo2?.output,
            target: __mocks.lfo2?.target,
          },
          analyser: __mocks.analyser,
          output: __mocks.output,
          dispatch: __mocks.dispatch,
        }}
      >
        {children}
      </audioContext.Provider>
    );
  }
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
  const analyser = useMemo(
    () => new AnalyserNode(context, { fftSize: 512 }),
    [],
  );
  const lfo1OutputNode: GainNode = useMemo(() => new GainNode(context), []);
  const lfo2OutputNode: GainNode = useMemo(() => new GainNode(context), []);

  useEffect(() => {
    filterNode.connect(volumeNode);
    volumeNode.connect(pannerNode);
    pannerNode.connect(analyser);
    analyser.connect(context.destination);
  }, []);

  return (
    <audioContext.Provider
      value={{
        __isMock: false,
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
        analyser,
        output: filterNode,
        dispatch,
      }}
    >
      {children}
    </audioContext.Provider>
  );
};

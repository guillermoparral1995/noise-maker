import React, {
  PropsWithChildren,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { ActionTypes, Actions, LFOTarget } from '../types';

interface AudioContextProviderValue {
  context: AudioContext;
  volume: GainNode;
  pan: StereoPannerNode;
  filter: BiquadFilterNode;
  lfo: {
    output: GainNode;
    target: LFOTarget;
  };
  dispatch: React.Dispatch<ActionTypes>;
  output: AudioNode;
}

interface AudioContextState {
  lfoTarget: LFOTarget;
}

const initialState: AudioContextState = {
  lfoTarget: 'off',
};

export type LFOTargetAction = {
  type: Actions.UPDATE_LFO_TARGET;
  payload: LFOTarget;
};

export const updateLFOTarget: (target: LFOTarget) => LFOTargetAction = (
  target,
) => ({
  type: Actions.UPDATE_LFO_TARGET,
  payload: target,
});

const reducer = (state: AudioContextState, action: ActionTypes) => {
  const { type, payload } = action;
  switch (type) {
    case Actions.UPDATE_LFO_TARGET:
      return {
        ...state,
        lfoTarget: payload,
      };
    default:
      return state;
  }
};

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
  const lfoOutputNode: GainNode = useMemo(() => new GainNode(context), []);

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
        lfo: {
          output: lfoOutputNode,
          target: state.lfoTarget,
        },
        output: filterNode,
        dispatch,
      }}
    >
      {children}
    </audioContext.Provider>
  );
};

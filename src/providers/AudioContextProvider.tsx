import React, { PropsWithChildren, useContext } from 'react';
import { stateContext } from './StateProvider';

interface AudioContextProviderValue {
  context: AudioContext;
  output: AudioNode;
  volume: GainNode;
  panner: StereoPannerNode;
}

export const audioContext =
  React.createContext<AudioContextProviderValue>(undefined);

export const AudioContextProvider = ({ children }: PropsWithChildren) => {
  const { state } = useContext(stateContext);
  const context = new AudioContext();
  const volumeNode: GainNode = context.createGain();
  const pannerNode: StereoPannerNode = context.createStereoPanner();
  const filterNode: BiquadFilterNode = context.createBiquadFilter();

  filterNode.connect(volumeNode);
  pannerNode.connect(context.destination);
  volumeNode.connect(pannerNode);

  volumeNode.gain.value = state.volume;
  pannerNode.pan.value = state.pan;
  filterNode.type = state.filter.type;
  filterNode.frequency.value = state.filter.frequency;
  filterNode.Q.value = state.filter.q;

  return (
    <audioContext.Provider
      value={{
        context,
        output: filterNode,
        volume: volumeNode,
        panner: pannerNode,
      }}
    >
      {children}
    </audioContext.Provider>
  );
};

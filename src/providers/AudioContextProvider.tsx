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

  pannerNode.connect(context.destination);
  volumeNode.connect(pannerNode);

  volumeNode.gain.value = state.volume;
  pannerNode.pan.value = state.pan;

  return (
    <audioContext.Provider
      value={{
        context,
        output: volumeNode,
        volume: volumeNode,
        panner: pannerNode,
      }}
    >
      {children}
    </audioContext.Provider>
  );
};

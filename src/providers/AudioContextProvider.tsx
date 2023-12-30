import React, { PropsWithChildren, useEffect, useMemo } from 'react';

interface AudioContextProviderValue {
  context: AudioContext;
  volume: GainNode;
  pan: StereoPannerNode;
  filter: BiquadFilterNode;
  output: AudioNode;
}

export const audioContext =
  React.createContext<AudioContextProviderValue>(undefined);

export const AudioContextProvider = ({ children }: PropsWithChildren) => {
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
        output: filterNode,
      }}
    >
      {children}
    </audioContext.Provider>
  );
};

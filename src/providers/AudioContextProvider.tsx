import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from 'react';
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
  const context = useMemo(() => new AudioContext(), []);
  const volumeNode: GainNode = useMemo(() => context.createGain(), []);
  const pannerNode: StereoPannerNode = useMemo(
    () => context.createStereoPanner(),
    [],
  );
  const filterNode: BiquadFilterNode = useMemo(
    () => context.createBiquadFilter(),
    [],
  );

  useEffect(() => {
    filterNode.connect(volumeNode);
    pannerNode.connect(context.destination);
    volumeNode.connect(pannerNode);
  }, []);

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

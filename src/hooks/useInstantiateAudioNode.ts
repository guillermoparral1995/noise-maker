import { useContext, useMemo } from 'react';
import { GainNodeMock, OscillatorNodeMock } from '../../__mocks__';
import { audioContext } from '../providers/AudioContextProvider';
import { Waveform } from '../types';

export const useInstantiateOscillatorNode = (
  waveform: Waveform,
  frequency: number,
) => {
  const { __isMock, context } = useContext(audioContext);

  const oscillator = useMemo(
    () =>
      __isMock
        ? new OscillatorNodeMock()
        : new OscillatorNode(context as AudioContext, {
            type: waveform,
            frequency,
          }),
    [],
  );

  return oscillator;
};

export const useInstantiateGainNode = () => {
  const { __isMock, context } = useContext(audioContext);

  const gainNode = useMemo(
    () =>
      __isMock ? new GainNodeMock() : new GainNode(context as AudioContext),
    [],
  );

  return gainNode;
};

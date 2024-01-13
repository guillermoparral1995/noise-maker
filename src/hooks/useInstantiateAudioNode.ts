import { useContext, useMemo } from 'react';
import { GainNodeMock, OscillatorNodeMock } from '../../__mocks__';
import { audioContext } from '../providers/AudioContextProvider';
import { Waveform } from '../types';

export const useInstantiateOscillatorNode = (
  waveform: Waveform,
  frequency: number,
  __mockOscillator?: OscillatorNodeMock,
) => {
  const { __isMock, context } = useContext(audioContext);

  const oscillator = useMemo(
    () =>
      __isMock
        ? __mockOscillator ?? new OscillatorNodeMock()
        : new OscillatorNode(context as AudioContext, {
            type: waveform,
            frequency,
          }),
    [],
  );

  return oscillator;
};

export const useInstantiateGainNode = (__mockGainNode?: GainNodeMock) => {
  const { __isMock, context } = useContext(audioContext);

  const gainNode = useMemo(
    () =>
      __isMock
        ? __mockGainNode ?? new GainNodeMock()
        : new GainNode(context as AudioContext),
    [],
  );

  return gainNode;
};

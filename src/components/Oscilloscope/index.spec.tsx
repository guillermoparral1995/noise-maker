import { cleanup, render } from '@testing-library/react';
import React from 'react';
import Oscilloscope from '.';
import { AnalyserNodeMock, AudioContextMock } from '../../../__mocks__';
import { AudioContextProvider } from '../../providers/AudioContextProvider';
import 'jest-canvas-mock';

describe('Oscilloscope', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render correctly', async () => {
    const mockContext = new AudioContextMock();
    const mockAnalyser = new AnalyserNodeMock();
    const { findByTestId } = render(
      <AudioContextProvider
        __mocks={{ context: mockContext, analyser: mockAnalyser }}
      >
        <Oscilloscope />
      </AudioContextProvider>,
    );

    const emptyBufferArray = new Uint8Array(256).fill(0);
    expect(mockAnalyser.__mockGetByteTimeDomainData).toHaveBeenCalledTimes(2);
    expect(mockAnalyser.__mockGetByteTimeDomainData).toHaveBeenNthCalledWith(
      1,
      emptyBufferArray,
    );
    const oscilloscope = await findByTestId('oscilloscope');
    const ctx = (oscilloscope as HTMLCanvasElement).getContext('2d');
    expect(ctx.__getEvents()).toMatchSnapshot();
    expect(oscilloscope).toMatchSnapshot();
  });
});

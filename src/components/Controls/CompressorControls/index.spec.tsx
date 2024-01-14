import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import React from 'react';
import { CompressorControls_ as CompressorControls } from '.';
import {
  AudioContextMock,
  DynamicsCompressorNodeMock,
} from '../../../../__mocks__';
import { AudioContextProvider } from '../../../providers/AudioContextProvider';
import { Knobs } from '../../../types';
import { CompressorStateProvider } from './CompressorStateProvider';

const __mockGetInputByName = jest.fn();
jest.mock('webmidi', () => {
  return {
    ...jest.requireActual('webmidi'),
    WebMidi: {
      inputs: [],
      enable: jest.fn(),
      getInputByName: () => __mockGetInputByName(),
    },
  };
});

describe('Compressor controls', () => {
  afterEach(() => {
    cleanup();
  });

  const mockContext = new AudioContextMock();
  const mockCompressor = new DynamicsCompressorNodeMock({ ratio: 12 });

  it('should render correctly', async () => {
    const { findByTestId } = render(
      <AudioContextProvider
        __mocks={{ context: mockContext, compressor: mockCompressor }}
      >
        <CompressorStateProvider>
          <div data-testid="compressor-controls">
            <CompressorControls></CompressorControls>
          </div>
        </CompressorStateProvider>
      </AudioContextProvider>,
    );

    const controls = await findByTestId('compressor-controls');
    expect(controls).toMatchSnapshot();
  });

  it('should adjust param when knob is moved', async () => {
    render(
      <AudioContextProvider
        __mocks={{ context: mockContext, compressor: mockCompressor }}
      >
        <CompressorStateProvider>
          <CompressorControls></CompressorControls>
        </CompressorStateProvider>
      </AudioContextProvider>,
    );

    const knob = screen.getByTestId(Knobs.COMPRESSOR_RATIO);
    act(() => {
      knob.focus();
    });
    fireEvent.keyDown(knob, { key: 'ArrowUp', code: 'ArrowUp' });
    expect(mockCompressor.ratio.value).toEqual(12.01);
  });
});

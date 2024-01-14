import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import React from 'react';
import { DelayControls_ as DelayControls } from '.';
import {
  AudioContextMock,
  AudioNodeMock,
  DelayNodeMock,
  GainNodeMock,
} from '../../../../__mocks__';
import { AudioContextProvider } from '../../../providers/AudioContextProvider';
import { Knobs } from '../../../types';
import { DelayStateProvider } from './DelayStateProvider';

describe('Delay', () => {
  afterEach(() => {
    cleanup();
  });

  const mockContext = new AudioContextMock();
  const mockDelay = new DelayNodeMock();
  const mockFeedback = new GainNodeMock();
  const mockOutput = new AudioNodeMock();

  it('should render correctly', async () => {
    const { findByTestId } = render(
      <AudioContextProvider
        __mocks={{ context: mockContext, delay: mockDelay }}
      >
        <DelayStateProvider>
          <div data-testid="delay-controls">
            <DelayControls></DelayControls>
          </div>
        </DelayStateProvider>
      </AudioContextProvider>,
    );

    const controls = await findByTestId('delay-controls');
    expect(controls).toMatchSnapshot();
  });

  it('should adjust param when knob is moved', async () => {
    render(
      <AudioContextProvider
        __mocks={{ context: mockContext, delay: mockDelay }}
      >
        <DelayStateProvider>
          <DelayControls __mockFeedback={mockFeedback}></DelayControls>
        </DelayStateProvider>
      </AudioContextProvider>,
    );

    const timeKnob = screen.getByTestId(Knobs.DELAY_TIME);
    act(() => {
      timeKnob.focus();
    });
    fireEvent.keyDown(timeKnob, { key: 'ArrowUp', code: 'ArrowUp' });
    expect(mockDelay.delayTime.value).toEqual(0.51);

    const feedbackKnob = screen.getByTestId(Knobs.DELAY_FEEDBACK);
    act(() => {
      feedbackKnob.focus();
    });
    fireEvent.keyDown(feedbackKnob, { key: 'ArrowUp', code: 'ArrowUp' });
    expect(mockFeedback.gain.value).toEqual(0.31);
  });

  it('should turn on delay when switch is pressed', async () => {
    render(
      <AudioContextProvider
        __mocks={{ context: mockContext, delay: mockDelay, output: mockOutput }}
      >
        <DelayStateProvider>
          <DelayControls __mockFeedback={mockFeedback}></DelayControls>
        </DelayStateProvider>
      </AudioContextProvider>,
    );

    const delaySwitch = screen.getByRole('checkbox');
    fireEvent.click(delaySwitch);
    expect(mockDelay.__mockConnect).toHaveBeenNthCalledWith(1, mockFeedback);
    expect(mockFeedback.__mockConnect).toHaveBeenCalledWith(mockDelay);
    expect(mockDelay.__mockConnect).toHaveBeenLastCalledWith(mockOutput);
  });

  it('should turn off delay when switch is pressed again', async () => {
    render(
      <AudioContextProvider
        __mocks={{ context: mockContext, delay: mockDelay, output: mockOutput }}
      >
        <DelayStateProvider>
          <DelayControls __mockFeedback={mockFeedback}></DelayControls>
        </DelayStateProvider>
      </AudioContextProvider>,
    );

    const delaySwitch = screen.getByRole('checkbox');
    fireEvent.click(delaySwitch);
    fireEvent.click(delaySwitch);

    expect(mockDelay.__mockDisconnect).toHaveBeenCalled();
    expect(mockFeedback.__mockDisconnect).toHaveBeenCalled();
  });
});

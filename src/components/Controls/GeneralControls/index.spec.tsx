import { knobsValues } from '@constants/knobsValues';
import {
  AudioContextMock,
  GainNodeMock,
  StereoPannerNodeMock,
  withMockedMIDIInput,
  withMockedMIDINoInput,
} from '@mocks';
import { AudioContextProvider, LFOMock } from '@providers/AudioContextProvider';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { Actions, Knobs, LFO1Target, LFO2Target } from '@types';
import React from 'react';
import { GeneralControls_ as GeneralControls } from '.';
import { GeneralControlsStateProvider } from './GeneralControlsStateProvider';

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

describe('General controls', () => {
  const mockContext = new AudioContextMock();
  const mockVolume = new GainNodeMock();
  const mockPan = new StereoPannerNodeMock();
  const mockLfo1: LFOMock<LFO1Target> = {
    target: 'off',
    output: new GainNodeMock(),
  };
  const mockLfo2: LFOMock<LFO2Target> = {
    target: 'off',
    output: new GainNodeMock(),
  };

  afterEach(() => {
    cleanup();
  });

  it('should render correctly', async () => {
    const { findByTestId } = render(
      withMockedMIDINoInput(
        <AudioContextProvider
          __mocks={{
            context: mockContext,
            volume: mockVolume,
            pan: mockPan,
            lfo1: mockLfo1,
            lfo2: mockLfo2,
          }}
        >
          <GeneralControlsStateProvider>
            <div data-testid="general-controls">
              <GeneralControls></GeneralControls>
            </div>
          </GeneralControlsStateProvider>
        </AudioContextProvider>,
      ),
    );

    const controls = await findByTestId('general-controls');
    expect(controls).toMatchSnapshot();
  });

  it('should adjust param when knob is moved', async () => {
    render(
      withMockedMIDINoInput(
        <AudioContextProvider
          __mocks={{
            context: mockContext,
            volume: mockVolume,
            pan: mockPan,
            lfo1: mockLfo1,
            lfo2: mockLfo2,
          }}
        >
          <GeneralControlsStateProvider>
            <GeneralControls></GeneralControls>
          </GeneralControlsStateProvider>
        </AudioContextProvider>,
      ),
    );

    const knob = screen.getByTestId(Knobs.VOLUME);
    act(() => {
      knob.focus();
    });
    act(() => {
      fireEvent.keyDown(knob, { key: 'ArrowUp', code: 'ArrowUp' });
    });
    expect(mockVolume.gain.value).toEqual(0.51);
  });

  it('should trigger dispatch on MIDI knob change', async () => {
    const mockDispatch = jest.fn();
    let mockEventName: string;
    const mockAddListener = jest.fn(
      (eventName: string, listener: (e: object) => void) => {
        mockEventName = eventName;
        listener({
          value: 0.1,
          controller: { number: knobsValues[Knobs.VOLUME].midiControl },
        });
      },
    );

    __mockGetInputByName.mockReturnValue({
      addListener: mockAddListener,
    });

    const { findByTestId } = render(
      withMockedMIDIInput(
        <AudioContextProvider
          __mocks={{
            context: mockContext,
            volume: mockVolume,
            pan: mockPan,
            lfo1: mockLfo1,
            lfo2: mockLfo2,
          }}
        >
          <GeneralControlsStateProvider __mockDispatch={mockDispatch}>
            <GeneralControls></GeneralControls>
          </GeneralControlsStateProvider>
        </AudioContextProvider>,
      ),
    );

    await findByTestId(Knobs.VOLUME);
    expect(mockEventName).toEqual('controlchange');
    expect(mockDispatch).toHaveBeenCalledWith({
      type: Actions.UPDATE_VOLUME,
      payload: 0.1,
    });
  });

  it('should connect lfo1 with param', async () => {
    const mockLfo1: LFOMock<LFO1Target> = {
      target: Knobs.VOLUME,
      output: new GainNodeMock(),
    };
    const mockDispatch = jest.fn();
    const { findByTestId } = render(
      withMockedMIDINoInput(
        <AudioContextProvider
          __mocks={{
            context: mockContext,
            volume: mockVolume,
            pan: mockPan,
            lfo1: mockLfo1,
            lfo2: mockLfo2,
          }}
        >
          <GeneralControlsStateProvider __mockDispatch={mockDispatch}>
            <GeneralControls></GeneralControls>
          </GeneralControlsStateProvider>
        </AudioContextProvider>,
      ),
    );
    await findByTestId(Knobs.VOLUME);

    expect(mockLfo1.output.__mockConnect).toHaveBeenCalledWith(mockVolume.gain);
    expect(mockLfo2.output.__mockConnect).not.toHaveBeenCalled();
  });

  it('should connect lfo2 with param', async () => {
    const mockLfo2: LFOMock<LFO2Target> = {
      target: Knobs.PAN,
      output: new GainNodeMock(),
    };
    const mockDispatch = jest.fn();
    const { findByTestId } = render(
      withMockedMIDINoInput(
        <AudioContextProvider
          __mocks={{
            context: mockContext,
            volume: mockVolume,
            pan: mockPan,
            lfo1: mockLfo1,
            lfo2: mockLfo2,
          }}
        >
          <GeneralControlsStateProvider __mockDispatch={mockDispatch}>
            <GeneralControls></GeneralControls>
          </GeneralControlsStateProvider>
        </AudioContextProvider>,
      ),
    );
    await findByTestId(Knobs.VOLUME);

    expect(mockLfo2.output.__mockConnect).toHaveBeenCalledWith(mockPan.pan);
    expect(mockLfo1.output.__mockConnect).not.toHaveBeenCalled();
  });
});

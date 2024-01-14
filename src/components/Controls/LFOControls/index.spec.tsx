import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { LFOControls_ as LFOControls } from '.';
import {
  AudioContextMock,
  GainNodeMock,
  OscillatorNodeMock,
} from '../../../../__mocks__';
import { knobsValues } from '../../../constants/knobsValues';
import {
  AudioContextProvider,
  LFOMock,
} from '../../../providers/AudioContextProvider';
import {
  withMockedMIDIInput,
  withMockedMIDINoInput,
} from '../../../providers/MIDIProvider';
import { Actions, Knobs, LFO1Target, LFO2Target } from '../../../types';
import { LFOStateProvider } from './LFOStateProvider';

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

describe('LFO controls', () => {
  const mockContext = new AudioContextMock();
  const mockLfo1: LFOMock<LFO1Target> = {
    output: new GainNodeMock(),
  };
  const mockLfo2: LFOMock<LFO2Target> = {
    output: new GainNodeMock(),
  };

  afterEach(() => {
    cleanup();
  });

  it('should render correctly', async () => {
    const mockLfo1Oscillator = new OscillatorNodeMock();
    const mockLfo2Oscillator = new OscillatorNodeMock();
    const { findByTestId } = render(
      withMockedMIDINoInput(
        <AudioContextProvider
          __mocks={{
            context: mockContext,
            lfo1: mockLfo1,
            lfo2: mockLfo2,
          }}
        >
          <LFOStateProvider>
            <div data-testid="lfo-controls">
              <LFOControls
                __mockLFO1={mockLfo1Oscillator}
                __mockLFO2={mockLfo2Oscillator}
              ></LFOControls>
            </div>
          </LFOStateProvider>
        </AudioContextProvider>,
      ),
    );

    const controls = await findByTestId('lfo-controls');
    expect(mockLfo1Oscillator.__mockConnect).toHaveBeenCalledWith(
      mockLfo1.output,
    );
    expect(mockLfo2Oscillator.__mockConnect).toHaveBeenCalledWith(
      mockLfo2.output,
    );
    expect(mockLfo1Oscillator.__mockStart).toHaveBeenCalled();
    expect(mockLfo2Oscillator.__mockStart).toHaveBeenCalled();
    expect(controls).toMatchSnapshot();
  });

  it('should update lfo 1 output gain when target changes ', async () => {
    const { findByTestId } = render(
      withMockedMIDINoInput(
        <AudioContextProvider
          __mocks={{
            context: mockContext,
            lfo1: mockLfo1,
            lfo2: mockLfo2,
          }}
        >
          <LFOStateProvider>
            <LFOControls></LFOControls>
          </LFOStateProvider>
        </AudioContextProvider>,
      ),
    );

    await findByTestId(Knobs.LFO_1_FREQUENCY);
    await userEvent.click(screen.getAllByRole('button')[0]);
    await userEvent.click(screen.getByText('Volume'));

    expect(mockLfo1.output.gain.value).toEqual(0.25);
  });

  it('should update lfo 2 output gain when target changes ', async () => {
    const { findByTestId } = render(
      withMockedMIDINoInput(
        <AudioContextProvider
          __mocks={{
            context: mockContext,
            lfo1: mockLfo1,
            lfo2: mockLfo2,
          }}
        >
          <LFOStateProvider>
            <LFOControls></LFOControls>
          </LFOStateProvider>
        </AudioContextProvider>,
      ),
    );

    await findByTestId(Knobs.LFO_1_FREQUENCY);
    await userEvent.click(screen.getAllByRole('button')[2]);

    await userEvent.click(screen.getByText('LFO 1 Frequency'));

    expect(mockLfo2.output.gain.value).toEqual(2.45);
  });

  it('should trigger lfo 1 dispatch on MIDI knob change', async () => {
    const mockDispatch = jest.fn();
    let mockEventName: string;
    const mockAddListener = jest.fn(
      (eventName: string, listener: (e: object) => void) => {
        mockEventName = eventName;
        listener({
          value: 1,
          controller: {
            number: knobsValues[Knobs.LFO_1_FREQUENCY].midiControl,
          },
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
            lfo1: mockLfo1,
            lfo2: mockLfo2,
          }}
        >
          <LFOStateProvider __mockDispatch={mockDispatch}>
            <LFOControls></LFOControls>
          </LFOStateProvider>
        </AudioContextProvider>,
      ),
    );

    await findByTestId(Knobs.LFO_1_FREQUENCY);
    expect(mockEventName).toEqual('controlchange');
    expect(mockDispatch).toHaveBeenCalledWith({
      type: Actions.UPDATE_LFO_1_FREQUENCY,
      payload: 10,
    });
  });

  it('should trigger lfo 2 dispatch on MIDI knob change', async () => {
    const mockDispatch = jest.fn();
    let mockEventName: string;
    const mockAddListener = jest.fn(
      (eventName: string, listener: (e: object) => void) => {
        mockEventName = eventName;
        listener({
          value: 0.1,
          controller: {
            number: knobsValues[Knobs.LFO_2_AMPLITUDE].midiControl,
          },
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
            lfo1: mockLfo1,
            lfo2: mockLfo2,
          }}
        >
          <LFOStateProvider __mockDispatch={mockDispatch}>
            <LFOControls></LFOControls>
          </LFOStateProvider>
        </AudioContextProvider>,
      ),
    );

    await findByTestId(Knobs.LFO_2_AMPLITUDE);
    expect(mockEventName).toEqual('controlchange');
    expect(mockDispatch).toHaveBeenCalledWith({
      type: Actions.UPDATE_LFO_2_AMPLITUDE,
      payload: 0.1,
    });
  });

  it('should connect lfo2 with param', async () => {
    const mockLfo2: LFOMock<LFO2Target> = {
      target: Knobs.LFO_1_AMPLITUDE,
      output: new GainNodeMock(),
    };
    const mockDispatch = jest.fn();
    const { findByTestId } = render(
      withMockedMIDINoInput(
        <AudioContextProvider
          __mocks={{
            context: mockContext,
            lfo1: mockLfo1,
            lfo2: mockLfo2,
          }}
        >
          <LFOStateProvider __mockDispatch={mockDispatch}>
            <LFOControls></LFOControls>
          </LFOStateProvider>
        </AudioContextProvider>,
      ),
    );
    await findByTestId(Knobs.LFO_2_AMPLITUDE);

    expect(mockLfo2.output.__mockConnect).toHaveBeenCalledWith(
      mockLfo1.output.gain,
    );
  });
});

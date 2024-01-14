import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { FilterControls_ as FilterControls } from '.';
import {
  AudioContextMock,
  BiquadFilterNodeMock,
  GainNodeMock,
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
import { FilterStateProvider } from './FilterStateProvider';

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

describe('Filter controls', () => {
  const mockContext = new AudioContextMock();
  const mockFilter = new BiquadFilterNodeMock();
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
            filter: mockFilter,
            lfo1: mockLfo1,
            lfo2: mockLfo2,
          }}
        >
          <FilterStateProvider>
            <div data-testid="filter-controls">
              <FilterControls></FilterControls>
            </div>
          </FilterStateProvider>
        </AudioContextProvider>,
      ),
    );

    const controls = await findByTestId('filter-controls');
    expect(controls).toMatchSnapshot();
  });

  it('should trigger dispatch on MIDI knob change', async () => {
    const mockDispatch = jest.fn();
    let mockEventName: string;
    const mockAddListener = jest.fn(
      (eventName: string, listener: (e: object) => void) => {
        mockEventName = eventName;
        listener({
          value: 1,
          controller: { number: knobsValues[Knobs.FILTER_CUTOFF].midiControl },
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
            filter: mockFilter,
            lfo1: mockLfo1,
            lfo2: mockLfo2,
          }}
        >
          <FilterStateProvider __mockDispatch={mockDispatch}>
            <FilterControls></FilterControls>
          </FilterStateProvider>
        </AudioContextProvider>,
      ),
    );

    await findByTestId(Knobs.FILTER_CUTOFF);
    expect(mockEventName).toEqual('controlchange');
    expect(mockDispatch).toHaveBeenCalledWith({
      type: Actions.UPDATE_FILTER_CUTOFF,
      payload: 5000,
    });
  });

  it('should connect lfo1 with param', async () => {
    const mockLfo1: LFOMock<LFO1Target> = {
      target: Knobs.FILTER_CUTOFF,
      output: new GainNodeMock(),
    };
    const mockDispatch = jest.fn();
    const { findByTestId } = render(
      withMockedMIDIInput(
        <AudioContextProvider
          __mocks={{
            context: mockContext,
            filter: mockFilter,
            lfo1: mockLfo1,
            lfo2: mockLfo2,
          }}
        >
          <FilterStateProvider __mockDispatch={mockDispatch}>
            <FilterControls></FilterControls>
          </FilterStateProvider>
        </AudioContextProvider>,
      ),
    );
    await findByTestId(Knobs.FILTER_CUTOFF);

    expect(mockLfo1.output.__mockConnect).toHaveBeenCalledWith(
      mockFilter.frequency,
    );
    expect(mockLfo2.output.__mockConnect).not.toHaveBeenCalled();
  });

  it('should connect lfo2 with param', async () => {
    const mockLfo2: LFOMock<LFO2Target> = {
      target: Knobs.FILTER_RESONANCE,
      output: new GainNodeMock(),
    };
    const mockDispatch = jest.fn();
    const { findByTestId } = render(
      withMockedMIDIInput(
        <AudioContextProvider
          __mocks={{
            context: mockContext,
            filter: mockFilter,
            lfo1: mockLfo1,
            lfo2: mockLfo2,
          }}
        >
          <FilterStateProvider __mockDispatch={mockDispatch}>
            <FilterControls></FilterControls>
          </FilterStateProvider>
        </AudioContextProvider>,
      ),
    );
    await findByTestId(Knobs.FILTER_CUTOFF);

    expect(mockLfo2.output.__mockConnect).toHaveBeenCalledWith(mockFilter.Q);
    expect(mockLfo1.output.__mockConnect).not.toHaveBeenCalled();
  });
});

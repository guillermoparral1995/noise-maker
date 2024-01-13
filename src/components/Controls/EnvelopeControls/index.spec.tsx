import { cleanup, render } from '@testing-library/react';
import React from 'react';
import EnvelopeControls from '.';
import { knobsValues } from '../../../constants/knobsValues';
import {
  withMockedMIDIInput,
  withMockedMIDINoInput,
} from '../../../providers/MIDIProvider';
import { Actions, Knobs } from '../../../types';
import { EnvelopeStateProvider } from './EnvelopeStateProvider';

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

describe('Envelope controls', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render correctly', async () => {
    const { findByTestId } = render(
      withMockedMIDINoInput(
        <EnvelopeStateProvider>
          <div data-testid="envelope-controls">
            <EnvelopeControls></EnvelopeControls>
          </div>
        </EnvelopeStateProvider>,
      ),
    );

    const controls = await findByTestId('envelope-controls');
    expect(controls).toMatchSnapshot();
  });

  it('should trigger dispatch on MIDI knob change', async () => {
    const mockDispatch = jest.fn();
    let mockEventName: string;
    const mockAddListener = jest.fn(
      (eventName: string, listener: (e: object) => void) => {
        mockEventName = eventName;
        listener({
          value: 0.5,
          controller: { number: knobsValues[Knobs.ATTACK].midiControl },
        });
      },
    );

    __mockGetInputByName.mockReturnValue({
      addListener: mockAddListener,
    });

    const { findByTestId } = render(
      withMockedMIDIInput(
        <EnvelopeStateProvider __mockDispatch={mockDispatch}>
          <EnvelopeControls></EnvelopeControls>
        </EnvelopeStateProvider>,
      ),
    );

    await findByTestId(Knobs.ATTACK);
    expect(mockEventName).toEqual('controlchange');
    expect(mockDispatch).toHaveBeenCalledWith({
      type: Actions.UPDATE_ATTACK,
      payload: 2.5,
    });
  });
});

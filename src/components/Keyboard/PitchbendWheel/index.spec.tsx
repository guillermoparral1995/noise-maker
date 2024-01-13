import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import PitchbendWheel from '.';
import { MIDIProvider } from '../../../providers/MIDIProvider';
import { Actions } from '../../../types';
import { EnvelopeStateProvider } from '../../Controls/EnvelopeControls/EnvelopeStateProvider';

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

describe('Pitchbend wheel', () => {
  it('should render correctly', async () => {
    const { findByTestId } = render(
      <MIDIProvider
        __mocks={{
          state: { loading: false, error: false },
        }}
      >
        <EnvelopeStateProvider>
          <PitchbendWheel></PitchbendWheel>
        </EnvelopeStateProvider>
      </MIDIProvider>,
    );

    const pitchbendWheel = await findByTestId('pitchbend_wheel');
    expect(pitchbendWheel).toMatchSnapshot();
  });

  it('should dispatch event when changing input', async () => {
    const mockDispatch = jest.fn();
    const { findByTestId } = render(
      <MIDIProvider
        __mocks={{
          state: { loading: false, error: false },
        }}
      >
        <EnvelopeStateProvider __mockDispatch={mockDispatch}>
          <PitchbendWheel></PitchbendWheel>
        </EnvelopeStateProvider>
      </MIDIProvider>,
    );

    const pitchbendWheel = await findByTestId('pitchbend_wheel');
    fireEvent.change(pitchbendWheel, { target: { value: 100 } });

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: 100,
      type: Actions.UPDATE_PITCHBEND,
    });
  });

  it('should dispatch event when dragging ends', async () => {
    const mockDispatch = jest.fn();
    const { findByTestId } = render(
      <MIDIProvider
        __mocks={{
          state: { loading: false, error: false },
        }}
      >
        <EnvelopeStateProvider __mockDispatch={mockDispatch}>
          <PitchbendWheel></PitchbendWheel>
        </EnvelopeStateProvider>
      </MIDIProvider>,
    );

    const pitchbendWheel = await findByTestId('pitchbend_wheel');
    fireEvent.mouseDown(pitchbendWheel);
    fireEvent.mouseUp(pitchbendWheel);

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: 0,
      type: Actions.UPDATE_PITCHBEND,
    });
  });

  it('should dispatch event when using MIDI input', async () => {
    const mockDispatch = jest.fn();
    let mockEventName: string;
    const mockAddListener = jest.fn(
      (eventName: string, listener: (e: object) => void) => {
        mockEventName = eventName;
        listener({ value: 0.5 });
      },
    );

    __mockGetInputByName.mockReturnValue({
      addListener: mockAddListener,
    });

    const { findByTestId } = render(
      <MIDIProvider
        __mocks={{
          state: { loading: false, error: false, input: 'midi input' },
        }}
      >
        <EnvelopeStateProvider __mockDispatch={mockDispatch}>
          <PitchbendWheel></PitchbendWheel>
        </EnvelopeStateProvider>
      </MIDIProvider>,
    );

    await findByTestId('pitchbend_wheel');

    expect(mockAddListener).toHaveBeenCalled();
    expect(mockEventName).toEqual('pitchbend');
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: 150,
      type: Actions.UPDATE_PITCHBEND,
    });
  });
});

import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import Key from '.';
import {
  AudioContextMock,
  AudioNodeMock,
  DelayNodeMock,
  GainNodeMock,
  OscillatorNodeMock,
  withMockedMIDIInput,
  withMockedMIDINoInput,
} from '../../../../__mocks__';
import noteTable, { Notes } from '../../../constants/noteTable';
import {
  AudioContextProvider,
  LFOMock,
} from '../../../providers/AudioContextProvider';
import { Knobs, LFO1Target, LFO2Target } from '../../../types';
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

const checkSoundIsPlayed = (
  mockOscillator: OscillatorNodeMock,
  mockEnvelope: GainNodeMock,
) => {
  expect(mockEnvelope.gain.__mockCancelAndHoldAtTime).toHaveBeenCalledWith(
    1000,
  );
  expect(mockEnvelope.gain.__mockSetValueAtTime).toHaveBeenCalledWith(0, 1000);
  expect(clearTimeout).toHaveBeenCalled();
  expect(mockOscillator.__mockConnect).toHaveBeenCalledWith(mockEnvelope);
  expect(mockEnvelope.gain.__mockLinearRampToValueAtTime).toHaveBeenCalledWith(
    1,
    1000,
  );
};

const checkSoundIsStopped = (
  mockOscillator: OscillatorNodeMock,
  mockEnvelope: GainNodeMock,
) => {
  expect(mockEnvelope.gain.__mockCancelAndHoldAtTime).toHaveBeenCalledWith(
    1000,
  );
  expect(
    mockEnvelope.gain.__mockExponentialRampToValueAtTime,
  ).toHaveBeenCalledWith(0.001, 1000);
  expect(setTimeout).toHaveBeenCalledWith(
    expect.any(Function),
    1000 * 1000 + 10,
  );
  jest.runAllTimers();

  expect(mockOscillator.__mockDisconnect).toHaveBeenCalled();
};

describe('Key', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
    jest.spyOn(global, 'clearTimeout');
  });
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  const mockContext = new AudioContextMock();
  const mockLfo1: LFOMock<LFO1Target> = {
    target: 'off',
    output: new GainNodeMock(),
  };
  const mockLfo2: LFOMock<LFO2Target> = {
    target: 'off',
    output: new GainNodeMock(),
  };
  const mockOutput = new AudioNodeMock();
  const mockOscillator = new OscillatorNodeMock();
  const mockEnvelope = new GainNodeMock();
  const mockDelay = {
    node: new DelayNodeMock(),
  };

  it('should render correctly', async () => {
    const { findByTestId } = render(
      withMockedMIDINoInput(
        <AudioContextProvider
          __mocks={{
            context: mockContext,
            lfo1: mockLfo1,
            lfo2: mockLfo2,
            delay: mockDelay,
            output: mockOutput,
          }}
        >
          <EnvelopeStateProvider>
            <Key
              identifier={Notes.C3}
              frequency={noteTable[Notes.C3]}
              __mockOscillator={mockOscillator}
              __mockEnvelope={mockEnvelope}
            ></Key>
            ,
          </EnvelopeStateProvider>
        </AudioContextProvider>,
      ),
    );

    const key = await findByTestId(Notes.C3);
    expect(mockOscillator.__mockStart).toHaveBeenCalled();
    expect(mockEnvelope.__mockConnect).toHaveBeenCalledWith(mockOutput);
    expect(key).toMatchSnapshot();
  });

  it('should play sound on mouse down', async () => {
    const { findByTestId } = render(
      withMockedMIDINoInput(
        <AudioContextProvider
          __mocks={{
            context: mockContext,
            lfo1: mockLfo1,
            lfo2: mockLfo2,
            delay: mockDelay,
          }}
        >
          <EnvelopeStateProvider>
            <Key
              identifier={Notes.C3}
              frequency={noteTable[Notes.C3]}
              __mockOscillator={mockOscillator}
              __mockEnvelope={mockEnvelope}
            ></Key>
            ,
          </EnvelopeStateProvider>
        </AudioContextProvider>,
      ),
    );

    const key = await findByTestId(Notes.C3);
    fireEvent.mouseDown(key);
    checkSoundIsPlayed(mockOscillator, mockEnvelope);
    expect(key).toMatchSnapshot();
  });

  it('should play sound on MIDI press', async () => {
    const mockAddListener = jest.fn(
      (eventName: string, listener: (e: object) => void) => {
        if (eventName === 'noteon') {
          listener({ note: { identifier: Notes.C3 } });
        }
      },
    );

    __mockGetInputByName.mockReturnValue({
      addListener: mockAddListener,
      removeListener: jest.fn(),
    });

    const { findByTestId } = render(
      withMockedMIDIInput(
        <AudioContextProvider
          __mocks={{
            context: mockContext,
            lfo1: mockLfo1,
            lfo2: mockLfo2,
            delay: mockDelay,
          }}
        >
          <EnvelopeStateProvider>
            <Key
              identifier={Notes.C3}
              frequency={noteTable[Notes.C3]}
              __mockOscillator={mockOscillator}
              __mockEnvelope={mockEnvelope}
            ></Key>
            ,
          </EnvelopeStateProvider>
        </AudioContextProvider>,
      ),
    );

    const key = await findByTestId(Notes.C3);

    expect(mockAddListener).toHaveBeenCalledTimes(2);
    expect(mockAddListener).toHaveBeenLastCalledWith(
      'noteoff',
      expect.any(Function),
    );
    expect(mockAddListener).toHaveBeenNthCalledWith(
      1,
      'noteon',
      expect.any(Function),
    );

    checkSoundIsPlayed(mockOscillator, mockEnvelope);
    expect(key).toMatchSnapshot();
  });

  it('should stop sound on mouse up', async () => {
    const { findByTestId } = render(
      withMockedMIDINoInput(
        <AudioContextProvider
          __mocks={{
            context: mockContext,
            lfo1: mockLfo1,
            lfo2: mockLfo2,
            delay: mockDelay,
          }}
        >
          <EnvelopeStateProvider>
            <Key
              identifier={Notes.C3}
              frequency={noteTable[Notes.C3]}
              __mockOscillator={mockOscillator}
              __mockEnvelope={mockEnvelope}
            ></Key>
            ,
          </EnvelopeStateProvider>
        </AudioContextProvider>,
      ),
    );

    const key = await findByTestId(Notes.C3);
    fireEvent.mouseDown(key);
    fireEvent.mouseUp(key);

    checkSoundIsStopped(mockOscillator, mockEnvelope);
    expect(key).toMatchSnapshot();
  });

  it('should stop sound on MIDI unpress', async () => {
    const mockAddListener = jest.fn(
      (eventName: string, listener: (e: object) => void) => {
        if (eventName === 'noteoff') {
          listener({ note: { identifier: Notes.C3 } });
        }
      },
    );

    __mockGetInputByName.mockReturnValue({
      addListener: mockAddListener,
      removeListener: jest.fn(),
    });

    const { findByTestId } = render(
      withMockedMIDIInput(
        <AudioContextProvider
          __mocks={{
            context: mockContext,
            lfo1: mockLfo1,
            lfo2: mockLfo2,
            delay: mockDelay,
          }}
        >
          <EnvelopeStateProvider>
            <Key
              identifier={Notes.C3}
              frequency={noteTable[Notes.C3]}
              __mockOscillator={mockOscillator}
              __mockEnvelope={mockEnvelope}
            ></Key>
            ,
          </EnvelopeStateProvider>
        </AudioContextProvider>,
      ),
    );

    const key = await findByTestId(Notes.C3);
    checkSoundIsStopped(mockOscillator, mockEnvelope);
    expect(key).toMatchSnapshot();
  });

  it('should connect lfo1 with oscillator detune', async () => {
    const mockLfo1: LFOMock<LFO1Target> = {
      target: Knobs.DETUNE,
      output: new GainNodeMock(),
    };
    const { findByTestId } = render(
      withMockedMIDIInput(
        <AudioContextProvider
          __mocks={{
            context: mockContext,
            lfo1: mockLfo1,
            lfo2: mockLfo2,
            delay: mockDelay,
          }}
        >
          <EnvelopeStateProvider>
            <Key
              identifier={Notes.C3}
              frequency={noteTable[Notes.C3]}
              __mockOscillator={mockOscillator}
            ></Key>
            ,
          </EnvelopeStateProvider>
        </AudioContextProvider>,
      ),
    );
    await findByTestId(Notes.C3);

    expect(mockLfo1.output.__mockConnect).toHaveBeenCalledWith(
      mockOscillator.detune,
    );
    expect(mockLfo2.output.__mockConnect).not.toHaveBeenCalled();
  });

  it('should connect lfo2 with oscillator detune', async () => {
    const mockLfo2: LFOMock<LFO2Target> = {
      target: Knobs.DETUNE,
      output: new GainNodeMock(),
    };
    const { findByTestId } = render(
      withMockedMIDIInput(
        <AudioContextProvider
          __mocks={{
            context: mockContext,
            lfo1: mockLfo1,
            lfo2: mockLfo2,
            delay: mockDelay,
          }}
        >
          <EnvelopeStateProvider>
            <Key
              identifier={Notes.C3}
              frequency={noteTable[Notes.C3]}
              __mockOscillator={mockOscillator}
            ></Key>
            ,
          </EnvelopeStateProvider>
        </AudioContextProvider>,
      ),
    );
    await findByTestId(Notes.C3);

    expect(mockLfo2.output.__mockConnect).toHaveBeenCalledWith(
      mockOscillator.detune,
    );
    expect(mockLfo1.output.__mockConnect).not.toHaveBeenCalledWith();
  });
});

import { FilterType } from '../src/types';

export class AudioContextMock {
  currentTime: number;
  constructor() {}
}

export class AudioNodeMock extends EventTarget {
  automationRate: number;
  defaultValue: number;
  maxValue: number;
  minValue: number;
  channelCount: number;
  channelCountMode: ChannelCountMode;
  channelInterpretation: ChannelInterpretation;
  context: BaseAudioContext;
  numberOfInputs: number;
  numberOfOutputs: number;

  __mockConnect = jest.fn();
  __mockDisconnect = jest.fn();

  constructor() {
    super();
  }

  connect() {
    return this.__mockConnect();
  }

  disconnect() {
    return this.__mockDisconnect();
  }
}

export class GainNodeMock extends AudioNodeMock {
  gain: AudioParam;
  constructor() {
    super();
  }
}

export class StereoPannerNodeMock extends AudioNodeMock {
  pan: AudioParam;
  constructor() {
    super();
  }
}

export class BiquadFilterNodeMock extends AudioNodeMock {
  Q: AudioParam;
  type: FilterType;
  frequency: AudioParam;
  constructor() {
    super();
  }
}

export class AnalyserNodeMock extends AudioNodeMock {
  fftSize: number = 512;
  frequencyBinCount: number = 256;

  __mockGetByteTimeDomainData = jest.fn();
  constructor() {
    super();
  }

  getByteTimeDomainData(array: Uint8Array) {
    return this.__mockGetByteTimeDomainData(array);
  }
}

export class OscillatorNodeMock extends AudioNodeMock {
  type: string;
  detune: AudioParam;
  frequency: AudioParam;

  __mockStart = jest.fn();
  __mockStop = jest.fn();
  constructor() {
    super();
  }

  start(currentTime?: number) {
    return this.__mockStart(currentTime);
  }

  stop(currentTime?: number) {
    return this.__mockStop(currentTime);
  }
}

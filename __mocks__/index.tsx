import { FilterType } from '../src/types';

class AudioParamMock {
  value: number;
  defaultValue: number;
  minValue: number;
  maxValue: number;
  automationRate: AutomationRate;

  __mockExponentialRampToValueAtTime = jest.fn();
  __mockLinearRampToValueAtTime = jest.fn();
  __mockCancelAndHoldAtTime = jest.fn();
  __mockSetValueAtTime = jest.fn();
  __mockCancelScheduledValues = jest.fn();
  __mockSetTargetAtTime = jest.fn();
  __mockSetValueCurveAtTime = jest.fn();
  constructor() {}

  exponentialRampToValueAtTime(value: number, time: number) {
    return this.__mockExponentialRampToValueAtTime(value, time);
  }

  linearRampToValueAtTime(value: number, time: number) {
    return this.__mockLinearRampToValueAtTime(value, time);
  }

  cancelAndHoldAtTime(time: number) {
    return this.__mockCancelAndHoldAtTime(time);
  }

  setValueAtTime(value: number, time: number) {
    return this.__mockSetValueAtTime(value, time);
  }

  cancelScheduledValues() {
    return this.__mockCancelScheduledValues();
  }

  setTargetAtTime() {
    return this.__mockSetTargetAtTime();
  }

  setValueCurveAtTime() {
    return this.__mockSetValueCurveAtTime();
  }
}

export class AudioContextMock {
  currentTime: number;
  constructor() {
    this.currentTime = 1000;
  }
}

export class AudioNodeMock extends EventTarget {
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

  // TODO: this is hard to type!
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  connect(node: any) {
    return this.__mockConnect(node);
  }

  disconnect() {
    return this.__mockDisconnect();
  }
}

export class GainNodeMock extends AudioNodeMock {
  gain: AudioParamMock;
  constructor() {
    super();

    this.gain = new AudioParamMock();
  }
}

export class StereoPannerNodeMock extends AudioNodeMock {
  pan: AudioParamMock;
  constructor() {
    super();

    this.pan = new AudioParamMock();
  }
}

export class BiquadFilterNodeMock extends AudioNodeMock {
  Q: AudioParamMock;
  type: FilterType;
  frequency: AudioParamMock;
  constructor() {
    super();

    this.type = FilterType.HIGHPASS;
    this.Q = new AudioParamMock();
    this.frequency = new AudioParamMock();
  }
}

export class AnalyserNodeMock extends AudioNodeMock {
  fftSize: number;
  frequencyBinCount: number;

  __mockGetByteTimeDomainData = jest.fn();
  constructor() {
    super();

    this.fftSize = 512;
    this.frequencyBinCount = 256;
  }

  getByteTimeDomainData(array: Uint8Array) {
    return this.__mockGetByteTimeDomainData(array);
  }
}

export class OscillatorNodeMock extends AudioNodeMock {
  type: string;
  detune: AudioParamMock;
  frequency: AudioParamMock;

  __mockStart = jest.fn();
  __mockStop = jest.fn();
  constructor() {
    super();
    this.detune = new AudioParamMock();
    this.type = 'sine';
    this.frequency = new AudioParamMock();
  }

  start(currentTime?: number) {
    return this.__mockStart(currentTime);
  }

  stop(currentTime?: number) {
    return this.__mockStop(currentTime);
  }
}
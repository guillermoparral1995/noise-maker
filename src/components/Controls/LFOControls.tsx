import React, { useContext, useEffect, useCallback, useState } from 'react';
import { stateContext } from '../../providers/StateProvider';
import Selector from '../shared/Selector';
import {
  updateLFOAmplitude,
  updateLFOFrequency,
  updateLFOTarget,
  updateLFOWaveform,
} from '../../store/actions';
import { audioContext } from '../../providers/AudioContextProvider';
import { Knobs, Waveform } from '../../types';
import Knob from '../shared/Knob';

const LFOControls = () => {
  const {
    state: {
      lfo: { target, waveform, frequency, amplitude },
    },
  } = useContext(stateContext);
  const { volume, panner, filter, context } = useContext(audioContext);
  const [oscillator, setOscillator] = useState<OscillatorNode>();
  const [ampNode, setAmpNode] = useState<GainNode>();

  useEffect(() => {
    if (ampNode) ampNode.disconnect();
    return () => oscillator.stop();
  }, []);

  const connectToTarget = useCallback(
    (ampNode: GainNode) => {
      if (target === 'volume') {
        if (ampNode) ampNode.disconnect();
        ampNode.connect(volume.gain);
      }
      if (target === 'pan') {
        if (ampNode) ampNode.disconnect();
        ampNode.connect(panner.pan);
      }
      if (target === 'filterFrequency') {
        if (ampNode) ampNode.disconnect();
        ampNode.connect(filter.frequency);
      }
      if (target === 'off') {
        if (ampNode) ampNode.disconnect();
      }
    },
    [target],
  );

  useEffect(() => {
    if (ampNode) ampNode.disconnect();
    const osc = new OscillatorNode(context, {
      type: waveform,
      frequency: frequency,
    });
    const amp = new GainNode(context, { gain: amplitude });
    osc.start();
    osc.connect(amp);
    connectToTarget(amp);
    setOscillator(osc);
    setAmpNode(amp);
  }, [waveform, frequency, amplitude]);

  useEffect(() => {
    connectToTarget(ampNode);
  }, [target]);

  return (
    <div>
      <Selector
        options={['off', 'volume', 'pan', 'filterFrequency']}
        value={target}
        action={updateLFOTarget}
      ></Selector>
      <Selector
        options={[
          Waveform.SINE,
          Waveform.SQUARE,
          Waveform.SAWTOOTH,
          Waveform.TRIANGLE,
        ]}
        value={waveform}
        action={updateLFOWaveform}
      ></Selector>
      <Knob
        label={Knobs.LFO_FREQUENCY}
        value={frequency}
        action={updateLFOFrequency}
      ></Knob>
      <Knob
        label={Knobs.LFO_AMPLITUDE}
        value={amplitude}
        action={updateLFOAmplitude}
      ></Knob>
    </div>
  );
};

export default LFOControls;

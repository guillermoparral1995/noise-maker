import { useEffect } from 'react';
import { LFO, LFOMock } from '../providers/AudioContextProvider';
import { Knobs, LFO1Target, LFO2Target } from '../types';

interface Connection {
  knob: Knobs;
  param: AudioParam;
}

export default (
  lfo: LFO<LFO1Target | LFO2Target> | LFOMock<LFO1Target | LFO2Target>,
  connections: Connection[],
) => {
  useEffect(() => {
    connections.forEach((connection) => {
      if (lfo.target === connection.knob) {
        lfo.output.connect(connection.param);
      }
    });
    return () => lfo.output.disconnect();
  }, [lfo.target]);
};

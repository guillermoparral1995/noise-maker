import React, { BaseSyntheticEvent, useContext } from 'react';
import { stateContext } from '../../providers/StateProvider';
import { updateWaveform } from '../../store/actions';
import { Waveform } from '../../types';

const Selector = () => {
  const { state, dispatch } = useContext(stateContext);

  const handleSelect = (e: BaseSyntheticEvent) => {
    dispatch(updateWaveform(e.target.value));
  };
  return (
    <select name="waveform" onChange={handleSelect} value={state.waveform}>
      <option value={Waveform.SINE}>Sine</option>
      <option value={Waveform.SQUARE}>Square</option>
      <option value={Waveform.SAWTOOTH}>Sawtooth</option>
      <option value={Waveform.TRIANGLE}>Triangle</option>
    </select>
  );
};

export default Selector;

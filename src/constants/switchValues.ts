import { switchDelay } from '../components/Controls/DelayControls/store/actions';
import { Switchs } from '../types';

export const switchValues = {
  [Switchs.DELAY]: {
    label: 'Delay',
    action: switchDelay,
  },
};

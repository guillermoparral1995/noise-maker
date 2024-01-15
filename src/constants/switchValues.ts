import { switchDelayTrails } from '../components/Controls/DelayControls/store/actions';
import { switchDelay } from '../providers/AudioContextProvider/store/actions';
import { Switchs } from '../types';

export const switchValues = {
  [Switchs.DELAY]: {
    label: 'Delay',
    action: switchDelay,
  },

  [Switchs.DELAY_TRAILS]: {
    label: 'Trails',
    action: switchDelayTrails,
  },
};

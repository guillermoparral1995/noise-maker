import { switchDarkMode } from '../components/Config/ThemeSelector/store/actions';
import { switchDelayTrails } from '../components/Controls/DelayControls/store/actions';
import { switchDelay } from '../providers/AudioContextProvider/store/actions';
import { ActionBuilder, Switchs } from '../types';

type SwitchValues = Record<
  Switchs,
  { label: string; action?: ActionBuilder<boolean> }
>;

export const switchValues: SwitchValues = {
  [Switchs.DELAY]: {
    label: 'Delay',
    action: switchDelay,
  },
  [Switchs.DELAY_TRAILS]: {
    label: 'Trails',
    action: switchDelayTrails,
  },
  [Switchs.THEME]: {
    label: 'Dark mode',
    action: switchDarkMode,
  },
};

import { Actions } from '../../../../types';

export type ActionTypes = ThemeAction;

interface ThemeAction {
  type: Actions.SWITCH_DARK_MODE;
  payload: boolean;
}

export const switchDarkMode: (darkMode: boolean) => ThemeAction = (
  darkMode: boolean,
) => ({
  type: Actions.SWITCH_DARK_MODE,
  payload: darkMode,
});

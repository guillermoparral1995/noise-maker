import { PrimeReactContext } from 'primereact/api';
import React, { useContext, useEffect, useReducer } from 'react';
import { Switchs } from '../../../types';
import Switch from '../../shared/Switch';
import initialState from './store/initialState';
import reducer from './store/reducer';

const LIGHT_THEME = 'themes/lara-light-purple/theme.css';
const DARK_THEME = 'themes/lara-dark-purple/theme.css';

const ThemeSelector = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { changeTheme } = useContext(PrimeReactContext);

  useEffect(() => {
    const currentTheme = state.darkMode ? LIGHT_THEME : DARK_THEME;
    const newTheme = state.darkMode ? DARK_THEME : LIGHT_THEME;
    changeTheme(currentTheme, newTheme, 'theme-link');
  }, [state.darkMode]);
  return (
    <Switch
      id={Switchs.THEME}
      value={state.darkMode}
      dispatch={dispatch}
    ></Switch>
  );
};

export default ThemeSelector;

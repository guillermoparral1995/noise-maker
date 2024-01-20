import React from 'react';
import DesktopView from './components/Display/DesktopView';
import { useBreakpoints } from './hooks/useBreakpoints';

const App = () => {
  const { isMobile, isTablet, isDesktop } = useBreakpoints();
  if (isDesktop) {
    return <DesktopView></DesktopView>;
  }
  return <div>Hola!!!</div>;
};

export default App;

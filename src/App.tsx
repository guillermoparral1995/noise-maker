import React from 'react';
import DesktopView from './components/Display/DesktopView';
import MobileView from './components/Display/MobileView';
import { useBreakpoints } from './hooks/useBreakpoints';

const App = () => {
  const { isDesktop } = useBreakpoints();
  if (isDesktop) {
    return <DesktopView></DesktopView>;
  }
  return <MobileView></MobileView>;
};

export default App;

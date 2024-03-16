import { useBreakpoints } from '@hooks/useBreakpoints';
import React from 'react';
import DesktopView from './components/Display/DesktopView';
import MobileView from './components/Display/MobileView';

const App = () => {
  const { isDesktop } = useBreakpoints();
  if (isDesktop) {
    return <DesktopView></DesktopView>;
  }
  return <MobileView></MobileView>;
};

export default App;

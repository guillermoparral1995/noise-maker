import { useBreakpoints } from '@hooks/useBreakpoints';
import React, { lazy, Suspense } from 'react';

const DesktopView = lazy(() => import('./components/Display/DesktopView'));
const MobileView = lazy(() => import('./components/Display/MobileView'));

const App = () => {
  const { isDesktop } = useBreakpoints();
  if (isDesktop) {
    return (
      <Suspense>
        <DesktopView></DesktopView>
      </Suspense>
    );
  }
  return (
    <Suspense>
      <MobileView></MobileView>
    </Suspense>
  );
};

export default App;

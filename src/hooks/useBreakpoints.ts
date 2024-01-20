import { useEffect, useState } from 'react';

export const useBreakpoints = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  const handleResize = () => setWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile: width <= 1024,
    isDesktop: width > 1024,
  };
};

import { useEffect, useState } from 'react';

export const useBreakpoints = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  const handleResize = () => setWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile: width <= 480,
    isTablet: width > 480 && width <= 768,
    isDesktop: width > 768,
  };
};

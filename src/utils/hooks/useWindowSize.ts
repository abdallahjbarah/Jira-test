import { useState, useEffect } from 'react';

type DeviceType = 'Mobile' | 'Tablet' | 'Laptop';

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
  type: DeviceType | undefined;
}

export default function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
    type: undefined,
  });

  useEffect(() => {
    function handleResize(): void {
      if (window.innerWidth <= 640) {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
          type: 'Mobile',
        });
      } else if (window.innerWidth > 640 && window.innerWidth < 1024) {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
          type: 'Tablet',
        });
      } else {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
          type: 'Laptop',
        });
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

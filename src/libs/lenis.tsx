import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

interface ScrollContextType {
  lenis: Lenis | null;
  scroll: number;
  progress: number;
  scrollToSlide: (index: number) => void;
}

const ScrollContext = createContext<ScrollContextType>({
  lenis: null,
  scroll: 0,
  progress: 0,
  scrollToSlide: () => {},
});

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [scrollData, setScrollData] = useState({ scroll: 0, progress: 0 });
  const reqIdRef = useRef<number | null>(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    setLenis(lenisInstance);

    const onScroll = ({ scroll, progress }: { scroll: number; progress: number }) => {
      setScrollData({ scroll, progress });
    };

    lenisInstance.on('scroll', onScroll);

    const raf = (time: number) => {
      lenisInstance.raf(time);
      reqIdRef.current = requestAnimationFrame(raf);
    };

    reqIdRef.current = requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
      if (reqIdRef.current !== null) {
        cancelAnimationFrame(reqIdRef.current);
      }
    };
  }, []);

  const scrollToSlide = (index: number) => {
    if (lenis) {
      lenis.scrollTo(window.innerHeight * index, { lerp: 0.07 });
    }
  };

  return (
    <ScrollContext.Provider value={{ lenis, ...scrollData, scrollToSlide }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);
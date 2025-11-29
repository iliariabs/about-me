import React, { useRef, useEffect } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { Slide } from '../slides/Slide';

interface Props {
  index: number;
  slideInstance: Slide;
  children: React.ReactNode;
  marginTop?: number | string;
  marginBottom?: number | string;
  paddingY?: number | string;
}

export default function SlideWrapper({ index,
                                      slideInstance,
                                      children,
                                      marginTop,
                                      marginBottom,
                                      paddingY
                                    }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (containerRef.current) {
      slideInstance.mount(containerRef.current);
    }
    return () => slideInstance.unmount();
  }, [slideInstance]);

  useEffect(() => {
    slideInstance.setReducedMotion(prefersReduced);
  }, [prefersReduced, slideInstance]);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleScroll = () => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    let progress = 0;

    if (slideInstance.isSticky) {
      const slideHeight = containerRef.current.offsetHeight;

      const slideTop = rect.top;
      const slideBottom = rect.bottom;

      if (slideTop >= viewportHeight) {
        progress = 0;
      }
      else if (slideBottom <= 0) {
        progress = 1;
      } else {
        const total = slideHeight;
        progress = (viewportHeight - slideTop) / total;
        progress = Math.min(Math.max(progress, 0), 1);
      }
    } else {
      const start = viewportHeight;
      const end = viewportHeight * 0.2;
      progress = (start - rect.top) / (start - end);
      progress = Math.min(Math.max(progress, 0), 1);
    }

    slideInstance.update(progress);
  };

  handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slideInstance]);

    return (
      <section
        ref={containerRef}
        style={{
          marginTop,
          marginBottom,
          paddingTop: paddingY,
          paddingBottom: paddingY
        }}
        className={
          slideInstance.isSticky
            ? "relative w-full"
            : "relative w-full h-screen overflow-hidden"
        }
        data-index={index}
      >
        {children}
      </section>
    );


}

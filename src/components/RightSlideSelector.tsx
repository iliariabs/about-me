import { useRef, useEffect, useState, useCallback } from 'react';
import clsx from 'clsx';
import { useScroll } from '../libs/lenis';
import AccessibleButton from './AccessibleButton';

interface SlideItem {
  id: string;
  title: string;
}

interface Props {
  slides: SlideItem[];
}

export default function RightSlideSelector({ slides }: Props) {
  const { lenis } = useScroll();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const sectionElsRef = useRef<(HTMLElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  const collectSections = useCallback(() => {
    sectionElsRef.current = slides.map((_, idx) => {
      const section = document.querySelector<HTMLElement>(`section[data-index="${idx}"]`);
      if (!section) return null;
      const stickyInner = section.querySelector<HTMLElement>('[data-sticky-inner]');
      return stickyInner || section;
    });
  }, [slides]);

  const updateActiveIndex = useCallback(() => {
    const els = sectionElsRef.current;
    if (!els || els.length === 0) return;

    const viewportCenter = window.innerHeight / 2;
    let found = -1;

    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (viewportCenter >= rect.top && viewportCenter <= rect.bottom) {
        found = i;
        break;
      }
    }

    if (found === -1) {
      let minDist = Infinity;
      for (let i = 0; i < els.length; i++) {
        const el = els[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const rectCenter = (rect.top + rect.bottom) / 2;
        const dist = Math.abs(rectCenter - viewportCenter);
        if (dist < minDist) {
          minDist = dist;
          found = i;
        }
      }
    }

    if (found !== -1) {
      setActiveIndex(prev => (prev === found ? prev : found));
    }
  }, []);

  useEffect(() => {
    collectSections();
    updateActiveIndex();

    const tick = () => {
      rafRef.current = null;
      updateActiveIndex();
    };

    const onScroll = () => {
      if (rafRef.current == null) {
        rafRef.current = window.requestAnimationFrame(tick);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [collectSections, updateActiveIndex]);

  useEffect(() => {
    collectSections();
    updateActiveIndex();
  }, [slides, collectSections, updateActiveIndex]);

  const handleClick = async (idx: number) => {
    const targetEl = sectionElsRef.current[idx];
    if (!targetEl) return;

    const sectionTop = targetEl.getBoundingClientRect().top + window.scrollY;
    const sectionHeight = targetEl.offsetHeight;
    const viewportHeight = window.innerHeight;

    const scrollTo = sectionHeight > viewportHeight
      ? sectionTop + sectionHeight - viewportHeight
      : sectionTop;

    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(scrollTo, { duration: 0, immediate: true });
    } else {
      window.scrollTo({ top: scrollTo, behavior: 'auto' });
    }
  };

  return (
    <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
      {slides.map((slide, idx) => (
        <div key={slide.id} className="group relative flex items-center justify-end">
          <span
            className={clsx(
              "absolute right-8 px-2 py-1 text-xs font-bold rounded bg-green-400 text-black opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap",
            )}
          >
            {slide.title}
          </span>

          <AccessibleButton
            label={`Go to slide ${slide.title}`}
            onClick={() => handleClick(idx)}
            className={clsx(
              "w-3 h-3 rounded-full transition-all duration-300 border border-green-500",
              activeIndex === idx
                ? "bg-green-400 scale-125 border-transparent"
                : "bg-transparent hover:bg-gray-700"
            )}
          />
        </div>
      ))}
    </nav>
  );
}

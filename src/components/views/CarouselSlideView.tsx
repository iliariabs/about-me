import React, { useRef, useEffect, useState } from "react";

interface Item {
  id: number;
  title: string;
  category: string;
  image: string;
  link: string;
}

interface Props {
  title: string;
  items: Item[];
  gap?: number;
}

export const CarouselSlideView: React.FC<Props> = ({ title, items, gap = 150 }) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = items.length;
  const sectionHeight = `${total * 100}vh`;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const slideHeight = el.offsetHeight;

      let progress = 0;
      if (rect.top >= vh) {
        progress = 0;
      } else if (rect.bottom <= 0) {
        progress = 1;
      } else {
        progress = (vh - rect.top) / slideHeight;
        progress = Math.min(Math.max(progress, 0), 1);
      }

      const gapFraction = Math.min(gap / slideHeight, 0.25);
      const usable = 1 - gapFraction;
      const pAdj = usable === 0 ? 1 : Math.min(progress / usable, 1);
      const idx = Math.floor(pAdj * Math.max(total - 1, 1));

      setActiveIndex(idx);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [total, gap]);

  const scrollToIndex = (i: number) => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const elementTopAbsolute = window.scrollY + rect.top;
    const vh = window.innerHeight;
    const slideHeight = el.offsetHeight;

    const gapFraction = Math.min(gap / slideHeight, 0.25);
    const usable = 1 - gapFraction;

    const targetPAdj = total === 1 ? 1 : i / (total - 1);
    const targetProgress = targetPAdj * usable;

    let targetScrollY = elementTopAbsolute + targetProgress * slideHeight - vh;

    const minScrollY = elementTopAbsolute;
    const maxScrollY = elementTopAbsolute + slideHeight - vh;

    targetScrollY = Math.max(minScrollY, Math.min(targetScrollY, maxScrollY)) + 2;

    window.scrollTo({ top: targetScrollY});
  };

  return (
    <section
      ref={containerRef as any}
      className="relative w-full bg-black z-10"
      data-slide="sticky-carousel"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center items-center overflow-hidden">
        <h2 className="absolute top-24 text-5xl md:text-7xl font-black text-center text-green-400 font-mono z-20 bg-black md:bg-black rounded-xl px-4">
          {title}
        </h2>

        <div className="relative w-full max-w-6xl h-[500px]">
          {items.map((item, i) => (
            <div
              key={item.id}
              className={`carousel-frame absolute inset-0 transition-all duration-700 rounded-3xl overflow-hidden shadow-2xl ${
                i === activeIndex ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 z-0"
              }`}
            >
              <img src={item.image} alt={item.title} className="w-full h-full object-contain bg-gray-800" />
              <div className="absolute bottom-8 left-8 p-4 bg-black/80 rounded-lg text-green-400 font-mono">
                <span className="text-xs font-bold uppercase tracking-wider">{item.category}</span>
                <h3 className="mt-1 text-2xl font-semibold">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-green-400 hover:decoration-green-200 transition-all"
                  >
                    {item.title}
                  </a>
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-50">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === activeIndex ? "bg-green-400 scale-125" : "bg-green-800"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
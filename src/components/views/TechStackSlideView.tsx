import React from 'react';
import { techStack } from '../../data/techStack';

export const TechStackSlideView: React.FC = () => {

  const initialCardStyle: React.CSSProperties = {
    position: 'relative',
    opacity: 0,
    transform: 'translateY(60px) scale(0.95)',
    transition: 'none',
    pointerEvents: 'none',
  };

  return (
    <section
      className="w-full bg-black text-white"
      data-slide="techstack"
      aria-label="Tech stack"
    >
      <h2
        className="md:text-5xl font-black text-green-500 mb-12 tracking-tighter text-center"
      >
        Tech Stack
      </h2>

      <div className="tech-cards-wrap max-w-7xl mx-auto px-8 md:px-0 grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-12">
        {techStack.map((stack) => (
          <article
            key={stack.domain}
            className="tech-card bg-gray-900/90 backdrop-blur-3xl border border-green-800/40 rounded-3xl p-0 md:p-12 flex flex-col items-center space-y-0 md:space-y-8 shadow-2xl hover:shadow-green-500/30 hover:border-green-500/60 transition-all duration-700"
            style={initialCardStyle}
            aria-labelledby={`tech-${stack.domain}`}
          >
            <h3
              id={`tech-${stack.domain}`}
              className="text-2xl md:text-3xl font-bold text-green-400"
            >
              {stack.domain}
            </h3>

            <div className="flex flex-wrap justify-center gap-8 md:gap-4 sd:gap-0">
              {stack.icons.map((icon) => (
                <a
                  key={icon.name}
                  href={icon.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus:outline-none"
                  aria-label={icon.name}
                >
                  <img
                    src={`https://skillicons.dev/icons?i=${icon.name}`}
                    alt={icon.name}
                    className="w-12 h-12 md:w-16 md:h-16 hover:scale-125 transition-transform duration-500"
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .tech-card, h2 {
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </section>
  );
};

import React from 'react';
import clsx from 'clsx';

interface Props {
  title: string;
  subtitle: string;
  description: string[];
  imageUrl: string;
  imageLeft?: boolean;
}

export const TextImageSlideView: React.FC<Props> = ({
  title,
  subtitle,
  description,
  imageUrl,
  imageLeft = false,
}) => {
  return (
    <div
      className={clsx(
        'w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center',
        imageLeft && 'lg:grid-flow-dense'
      )}
    >
      <div
        className={clsx(
          'flex flex-col justify-center space-y-8',
          imageLeft ? 'lg:order-2' : 'lg:order-1'
        )}
        data-target="text"
      >
        <div className="space-y-3">
          <span className="text-sm font-bold tracking-widest uppercase text-green-500">
            {subtitle}
          </span>
          <h2 className="text-5xl md:text-7xl font-black leading-tight">{title}</h2>
        </div>
        <div className="space-y-4">
          {description.map((line, idx) => (
            <p
              key={idx}
              className="text-lg md:text-xl text-gray-300 max-w-lg leading-relaxed"
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      <div className={clsx(
        'relative h-[50vh] md:h-[75vh] overflow-visible rounded-3xl',
        imageLeft ? 'lg:order-1' : 'lg:order-2'
      )}>
        <div data-target="image" className="relative w-full h-full">
        <div
          className="absolute inset-0 chromatic-red pointer-events-none"
          style={{
            WebkitMaskImage: `url(${imageUrl})`,
            maskImage: `url(${imageUrl})`,
            WebkitMaskSize: 'cover',
            maskSize: 'cover',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
            transform: 'translateX(14px) translateY(9px) rotate(2.5deg)',
            filter: 'blur(12px)',
          }}
        />

        <div
          className="absolute inset-0 chromatic-green pointer-events-none"
          style={{
            WebkitMaskImage: `url(${imageUrl})`,
            maskImage: `url(${imageUrl})`,
            WebkitMaskSize: 'cover',
            maskSize: 'cover',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
            transform: 'translateX(-12px) translateY(-7px) rotate(-2deg)',
            filter: 'blur(10px)',
          }}
        />

        <img
          src={imageUrl}
          alt={title}
          className="relative w-full h-full object-cover rounded-3xl"
          style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.35))' }}
          loading="lazy"
        />
      </div>

      </div>
    </div>
  );
};
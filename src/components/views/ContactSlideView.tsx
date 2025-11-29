import React from 'react';
import clsx from 'clsx';

export interface IconLink {
  id: string;
  href: string;
  src: string;
  alt?: string;
}

export interface ContactFields {
  email?: string;
  extra?: string;
}

interface Props {
  title: string;
  subtitle: string;
  contact: ContactFields;
  icons: IconLink[]; 
  imageUrl: string;
  imageLeft?: boolean;
}

export const ContactSlideView: React.FC<Props> = ({
  title,
  subtitle,
  contact,
  icons,
  imageUrl,
  imageLeft = false,
}) => {
  const sectionHeight = '200vh';

  return (
    <section 
      className="relative w-full bg-black z-10" 
      style={{ height: sectionHeight }}
      data-slide="contact" 
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        <div
          className={clsx(
            'w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative',
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

            <div className="space-y-3">
              {contact.email && (
                <div className="flex flex-col">
                  <label className="text-xs uppercase tracking-widest text-gray-400">Email</label>
                  <a
                    href={`mailto:${contact.email}`}
                    className="mt-1 text-lg md:text-xl text-gray-100 underline decoration-green-400 hover:decoration-green-200"
                  >
                    {contact.email}
                  </a>
                </div>
              )}

              {contact.extra && (
                <p className="mt-2 text-gray-300 max-w-lg leading-relaxed">
                  {contact.extra}
                </p>
              )}
            </div>

            <div className="pt-4">
              <div className="flex items-center gap-4">
                {icons.map((icon) => (
                  <a
                    key={icon.id}
                    href={icon.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-wrap inline-block w-12 h-12 rounded-lg bg-gray-900 flex items-center justify-center overflow-visible transition-transform hover:scale-110"
                    aria-label={icon.alt || icon.id}
                  >
                    <img
                      src={icon.src}
                      alt={icon.alt || icon.id}
                      className="w-8 h-8"
                      draggable={false}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className={clsx(
              'relative h-[50vh] md:h-[75vh] overflow-visible rounded-3xl',
              imageLeft ? 'lg:order-1' : 'lg:order-2'
            )}>
              <div data-target="image" className="relative w-full h-full">
                <div
                  className="chromatic-red absolute inset-0 pointer-events-none opacity-0"
                  style={{
                    WebkitMaskImage: `url(${imageUrl})`,
                    maskImage: `url(${imageUrl})`,
                    WebkitMaskSize: 'cover',
                    maskSize: 'cover',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                    filter: 'blur(12px)',
                  }}
                />
        
                <div
                  className="chromatic-green absolute inset-0 pointer-events-none opacity-0"
                  style={{
                    WebkitMaskImage: `url(${imageUrl})`,
                    maskImage: `url(${imageUrl})`,
                    WebkitMaskSize: 'cover',
                    maskSize: 'cover',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                    filter: 'blur(10px)',
                  }}
                />
         
                <img
                  src={imageUrl}
                  alt={title}
                  className="relative w-full h-full object-cover rounded-3xl z-10"
                  style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.35))' }}
                  loading="lazy"
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
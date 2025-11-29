import React from 'react';

interface Props {
  title: string;
  subtitle: string;
  description: string[];
}

export const TitleSlideView: React.FC<Props> = ({
  title,
  subtitle,
  description,
}) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center space-y-6 px-6 max-w-4xl mx-auto">
      
      <span
        data-target="subtitle"
        className="text-sm font-bold tracking-widest uppercase text-green-500"
      >
        {subtitle}
      </span>

      <h1
        data-target="title"
        className="text-6xl md:text-8xl font-black leading-tight"
      >
        {title}
      </h1>

      <p
        data-target="description"
        className="text-lg md:text-2xl text-gray-300 max-w-2xl"
      >
        {description}
      </p>
    </div>
  );
};

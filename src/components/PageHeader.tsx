import React from "react";

interface PageHeaderProps {
  title: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between h-12 px-6 bg-black border-b border-green-400 select-none">
        <h1 className="text-green-400 font-mono font-bold text-xl md:text-2xl">
          {title}
        </h1>
        <h2 className="text-gray-500 font-mono text-xs md:text-2xs">/* Reserved Space */</h2>
      </div>
    </header>
  );
};

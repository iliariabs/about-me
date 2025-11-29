import React from 'react';
import clsx from 'clsx';

interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const AccessibleButton = React.forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ label, className, children, ...props }, ref) => {
    return (
      <button
        aria-label={label}
        ref={ref}
        className={clsx(
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
AccessibleButton.displayName = "AccessibleButton";

export default AccessibleButton;
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Input({
  label,
  error,
  startIcon,
  endIcon,
  fullWidth = false,
  className = '',
  ...props
}: InputProps) {
  const baseStyles = `
    bg-neutral-950 
    text-white 
    rounded-full 
    border-none 
    transition-all 
    duration-300 
    shadow-sm 
    shadow-white 
    hover:-translate-y-1 
    hover:shadow-md 
    hover:shadow-white 
    focus:outline-none 
    focus:ring-2 
    focus:ring-green-500
  `;

  const widthStyles = fullWidth ? 'w-full' : '';
  const paddingStyles = `
    ${startIcon ? 'pl-12' : 'pl-6'} 
    ${endIcon ? 'pr-12' : 'pr-6'}
  `;

  return (
    <div className={`relative ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label className="block text-sm font-medium text-neutral-400 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {startIcon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400">
            {startIcon}
          </div>
        )}
        <input
          className={`
            ${baseStyles}
            ${widthStyles}
            ${paddingStyles}
            ${error ? 'ring-2 ring-red-500' : ''}
            ${className}
            h-12 sm:h-14
          `}
          {...props}
        />
        {endIcon && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400">
            {endIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

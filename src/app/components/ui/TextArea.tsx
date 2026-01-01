import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  rows?: number;
}

export function TextArea({
  label,
  error,
  fullWidth = false,
  rows = 4,
  className = '',
  ...props
}: TextAreaProps) {
  const baseStyles = `
    bg-neutral-950 
    text-white 
    rounded-2xl 
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
    px-6 
    py-4
    resize-vertical
    min-h-[120px]
  `;

  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <div className={`relative ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label className="block text-sm font-medium text-neutral-400 mb-2">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        className={`
          ${baseStyles}
          ${widthStyles}
          ${error ? 'ring-2 ring-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

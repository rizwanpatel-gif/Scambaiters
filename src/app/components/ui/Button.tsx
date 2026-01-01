import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  fullWidth?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Button({
  variant = 'primary',
  size = 'medium',
  children,
  fullWidth = false,
  isLoading = false,
  disabled = false,
  onClick,
  className = ''
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-sans font-medium transition-all duration-300 rounded-lg backdrop-blur-sm whitespace-nowrap overflow-hidden tracking-wide';
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-blue-600/90 to-indigo-600/90 hover:from-blue-700/90 hover:to-indigo-700/90 text-white shadow-md hover:shadow-lg',
    secondary: 'bg-gradient-to-r from-purple-600/90 to-pink-600/90 hover:from-purple-700/90 hover:to-pink-700/90 text-white shadow-md hover:shadow-lg',
    outline: 'border border-gray-700/50 bg-gray-900/50 hover:bg-gray-800/50 text-gray-100 hover:text-white shadow-sm hover:shadow-md'
  };

  const sizeStyles = {
    small: 'px-3 py-1.5 text-sm leading-relaxed',
    medium: 'px-4 py-2 text-sm leading-relaxed',
    large: 'px-6 py-2.5 text-base leading-relaxed'
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${widthStyles} ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <div className="flex items-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
}

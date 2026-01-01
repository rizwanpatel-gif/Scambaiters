import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
  className?: string;
  onClick?: () => void;
}

export function Card({
  children,
  variant = 'elevated',
  className = '',
  onClick
}: CardProps) {
  const baseStyles = 'rounded-xl transition-all duration-300 backdrop-blur-sm overflow-hidden font-sans';
  
  const variantStyles = {
    elevated: 'bg-gradient-to-br from-gray-900/80 to-gray-800/80 shadow-lg hover:shadow-xl hover:-translate-y-0.5 border border-gray-700/20',
    outlined: 'bg-gradient-to-br from-gray-900/30 to-gray-800/30 border border-gray-700/30 hover:border-blue-500/30',
    filled: 'bg-gradient-to-br from-gray-900/90 to-gray-800/90 hover:from-gray-800/90 hover:to-gray-700/90'
  };

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function CardHeader({ title, subtitle, action }: CardHeaderProps) {
  return (
    <div className="flex items-center justify-between p-6">
      <div>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        {subtitle && (
          <p className="mt-1 text-sm text-neutral-400">{subtitle}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`px-6 pb-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardActions({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex items-center justify-end gap-4 px-6 py-4 border-t border-neutral-700 ${className}`}>
      {children}
    </div>
  );
}

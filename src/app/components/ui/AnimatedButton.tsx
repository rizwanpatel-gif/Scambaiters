import { useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Spinner } from './Spinner';

interface AnimatedButtonProps extends Omit<HTMLMotionProps<"button">, 'variant' | 'children'> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export function AnimatedButton({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  className = '',
  onClick,
  ...props
}: AnimatedButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-[#1a2942] hover:bg-[#243757] text-white',
    outline: 'border border-[#1a2942] hover:bg-[#1a2942] text-white'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setRipples(prev => [...prev, { x, y, id: Date.now() }]);
    onClick?.(e);

    // Clean up ripples after animation
    setTimeout(() => {
      setRipples(prev => prev.slice(1));
    }, 600);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={loading}
      className={`
        relative overflow-hidden rounded-lg transition-colors duration-200
        ${variants[variant]} ${sizes[size]} ${className}
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-2
      `}
      onClick={handleClick}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        {loading && <Spinner size="sm" />}
        {!loading && icon}
        <div>{children}</div>
      </div>
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute bg-white/30 rounded-full w-4 h-4"
          style={{
            left: ripple.x - 8,
            top: ripple.y - 8,
          }}
        />
      ))}
    </motion.button>
  );
}

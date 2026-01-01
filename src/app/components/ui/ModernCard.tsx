import { motion } from 'framer-motion';

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function ModernCard({ children, className = '', hover = true, onClick }: ModernCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -5, scale: 1.01 } : undefined}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-xl
        bg-gradient-to-b from-[#051530] to-[#0a1f3f]
        border border-[#1a2942]
        shadow-lg hover:shadow-xl hover:shadow-blue-500/10
        ${hover ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Hover gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent pointer-events-none"
      />
    </motion.div>
  );
}

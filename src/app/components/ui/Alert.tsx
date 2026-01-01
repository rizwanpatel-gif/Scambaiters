import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, XCircle, Info, X } from 'lucide-react';

interface AlertProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  onClose?: () => void;
}

export function Alert({ type = 'info', title, message, onClose }: AlertProps) {
  const variants = {
    success: {
      icon: <CheckCircle className="w-5 h-5 text-green-400" />,
      bg: 'bg-green-500/10',
      border: 'border-green-500/20',
      text: 'text-green-400'
    },
    error: {
      icon: <XCircle className="w-5 h-5 text-red-400" />,
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
      text: 'text-red-400'
    },
    warning: {
      icon: <AlertCircle className="w-5 h-5 text-yellow-400" />,
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/20',
      text: 'text-yellow-400'
    },
    info: {
      icon: <Info className="w-5 h-5 text-blue-400" />,
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      text: 'text-blue-400'
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`
        rounded-lg ${variants[type].bg} ${variants[type].border} border
        p-4 shadow-lg backdrop-blur-sm
      `}
    >
      <div className="flex items-start gap-3">
        {variants[type].icon}
        <div className="flex-1">
          <h3 className={`font-medium ${variants[type].text}`}>
            {title}
          </h3>
          <p className="mt-1 text-sm text-white/80">
            {message}
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </motion.div>
  );
}

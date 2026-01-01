import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Check } from 'lucide-react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export function FormInput({
  label,
  error,
  success,
  helperText,
  startIcon,
  endIcon,
  required,
  id,
  className = '',
  ...props
}: FormInputProps) {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

  const baseInputStyles = `
    w-full bg-[#051530] text-white rounded-lg border
    px-4 py-2.5 transition-all duration-200
    placeholder:text-gray-500
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2
  `;

  const getInputStyles = () => {
    if (error) {
      return 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20';
    }
    if (success) {
      return 'border-green-500/50 focus:border-green-500 focus:ring-green-500/20';
    }
    if (focused) {
      return 'border-blue-500/50 focus:border-blue-500 focus:ring-blue-500/20';
    }
    return 'border-[#1a2942] focus:border-blue-500';
  };

  return (
    <div className="space-y-1">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-200"
      >
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>

      <div className="relative">
        {startIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {startIcon}
          </div>
        )}

        <input
          id={inputId}
          className={`
            ${baseInputStyles}
            ${getInputStyles()}
            ${startIcon ? 'pl-10' : ''}
            ${endIcon || error || success ? 'pr-10' : ''}
            ${className}
          `}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            setTouched(true);
          }}
          aria-invalid={!!error}
          aria-describedby={`${inputId}-description`}
          {...props}
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
          {endIcon}
          <AnimatePresence mode="wait">
            {error && touched && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-red-400"
              >
                <AlertCircle className="w-5 h-5" />
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-green-400"
              >
                <Check className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {(error || helperText) && touched && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            id={`${inputId}-description`}
            className={`text-sm ${error ? 'text-red-400' : 'text-gray-400'}`}
          >
            {error || helperText}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

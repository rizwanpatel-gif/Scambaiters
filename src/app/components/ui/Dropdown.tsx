import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownProps {
  trigger: React.ReactNode;
  items: {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  }[];
}

export function Dropdown({ trigger, items }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 rounded-xl bg-[#051530] border border-[#1a2942] 
                     shadow-lg shadow-black/20 overflow-hidden z-50"
          >
            {items.map((item, index) => (
              <motion.button
                key={index}
                whileHover={{ backgroundColor: 'rgba(26, 41, 66, 0.8)' }}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-4 py-3 text-sm text-white hover:text-blue-400
                         transition-colors duration-200 gap-2"
              >
                {item.icon}
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

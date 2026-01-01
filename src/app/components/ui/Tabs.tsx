import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  variant?: 'pills' | 'underline';
}

export function Tabs({ tabs, defaultTab, variant = 'pills' }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);

  const variants = {
    pills: {
      container: 'glass-card p-1.5 rounded-xl',
      tab: 'px-6 py-2.5 rounded-lg transition-all duration-300',
      active: 'bg-gradient-to-r from-[#FF61D2] to-[#FE9090] text-white shadow-lg shadow-pink-500/20',
      inactive: 'text-white/70 hover:bg-white/10',
      indicator: {
        initial: { borderRadius: '0.75rem' },
        animate: { borderRadius: '0.75rem' }
      }
    },
    underline: {
      container: 'border-b border-white/10',
      tab: 'px-6 py-2.5 transition-all duration-300 relative',
      active: 'gradient-text font-medium',
      inactive: 'text-white/70 hover:text-white/90',
      indicator: {
        initial: { width: 0, left: '50%' },
        animate: { width: '100%', left: 0 }
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className={`flex items-center gap-2 ${variants[variant].container}`}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative flex items-center gap-2 text-sm font-medium
                ${variants[variant].tab}
                ${isActive ? variants[variant].active : variants[variant].inactive}
              `}
              role="tab"
              aria-selected={isActive}
              aria-controls={`${tab.id}-panel`}
            >
              {tab.icon && (
                <motion.span
                  animate={{ rotate: isActive ? 360 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {tab.icon}
                </motion.span>
              )}
              {tab.label}
              {isActive && variant === 'underline' && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#FF61D2] to-[#FE9090]"
                  initial={variants[variant].indicator.initial}
                  animate={variants[variant].indicator.animate}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="relative min-h-[200px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -20 }
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ 
              duration: 0.3,
              ease: "easeOut"
            }}
            className="glass-card p-6 rounded-xl"
            role="tabpanel"
            id={`${activeTab}-panel`}
            aria-labelledby={activeTab}
          >
            {tabs.find(tab => tab.id === activeTab)?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

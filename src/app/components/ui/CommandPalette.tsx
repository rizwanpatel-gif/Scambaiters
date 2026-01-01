import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command } from 'lucide-react';
import { useState,useEffect } from 'react';

interface CommandPaletteProps {
  onSearch: (query: string) => void;
}

export function CommandPalette({ onSearch }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
        </Dialog.Overlay>
        <Dialog.Content asChild>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg
                     bg-[#051530] border border-[#1a2942] rounded-2xl shadow-2xl z-50
                     p-4 focus:outline-none"
          >
            <div className="flex items-center space-x-3 px-3 py-2 bg-[#0a1f3f] rounded-lg">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search anything..."
                className="flex-1 bg-transparent border-none text-white placeholder-gray-400
                         focus:outline-none text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onSearch(e.currentTarget.value);
                    setOpen(false);
                  }
                }}
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 rounded border 
                           border-[#1a2942] bg-[#051530] px-2 py-0.5 text-xs text-gray-400">
                <Command className="w-3 h-3" /> K
              </kbd>
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="text-sm font-medium text-gray-400 px-2">Quick Links</h3>
              <nav className="space-y-1">
                <QuickLink href="/feed" label="Feed" />
                <QuickLink href="/communities" label="Communities" />
                <QuickLink href="/settings" label="Settings" />
              </nav>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white
                 hover:bg-[#1a2942] rounded-lg transition-colors duration-200"
    >
      <span className="text-sm">{label}</span>
    </a>
  );
}

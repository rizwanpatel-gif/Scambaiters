import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, Bell, Menu } from 'lucide-react';
import Image from 'next/image';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="glass-effect border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <Image 
                src="/scambaitersymbol.png" 
                alt="Scambaiters Logo" 
                width={32} 
                height={32}
                className="hover-effect"
              />
              <span className="gradient-text text-xl font-bold">Scambaiters</span>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="w-full h-10 pl-10 pr-4 glass-card text-white placeholder-white/50
                           focus:outline-none focus:ring-2 focus:ring-[#FF61D2]/50 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-card p-2 rounded-lg hover:bg-white/10"
              >
                <Bell className="w-5 h-5 text-white/70" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-card p-2 rounded-lg hover:bg-white/10 md:hidden"
              >
                <Menu className="w-5 h-5 text-white/70" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex items-center space-x-2 glass-card px-4 py-2 rounded-lg
                         bg-gradient-to-r from-[#FF61D2] to-[#FE9090] text-white"
              >
                <span>Create Post</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

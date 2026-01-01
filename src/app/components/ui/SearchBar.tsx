import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

export function SearchBar({ placeholder = "Search posts by title... (Press Enter)", onSearch }: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch?.(e.currentTarget.value);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder={placeholder}
          className="w-full h-12 pl-12 pr-4 rounded-full bg-[#051530] border border-[#1a2942]
                   text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                   focus:ring-blue-500 focus:border-transparent transition-all duration-300
                   shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20"
          onKeyDown={handleKeyDown}
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
          ⌘K
        </div>
      </div>
    </div>
  );
}

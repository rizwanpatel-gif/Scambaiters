import React from 'react';
import Link from 'next/link';
import { Home, Users, MessageSquare, Settings, Plus } from 'lucide-react';

export function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 md:relative md:top-0 
                    bg-gradient-to-r from-[#051530] to-[#0a1f3f] backdrop-blur-lg 
                    border-t md:border-t-0 md:border-r border-[#1a2942] p-4">
      <div className="flex md:flex-col justify-around md:space-y-8 items-center md:items-start">
        <NavItem href="/feed" icon={<Home />} label="Feed" />
        <NavItem href="/communities" icon={<Users />} label="Communities" />
        <NavItem href="/comments" icon={<MessageSquare />} label="Comments" />
        <button className="md:order-first p-3 rounded-full bg-blue-600 hover:bg-blue-700 
                         transition-all duration-300 shadow-lg hover:shadow-blue-500/50">
          <Plus className="w-6 h-6 text-white" />
        </button>
        <NavItem href="/settings" icon={<Settings />} label="Settings" />
      </div>
    </nav>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

function NavItem({ href, icon, label }: NavItemProps) {
  return (
    <Link href={href} className="group flex flex-col md:flex-row items-center space-y-1 
                                md:space-y-0 md:space-x-3 text-gray-400 hover:text-white 
                                transition-colors duration-300">
      <div className="p-2 rounded-xl group-hover:bg-[#1a2942] transition-colors duration-300">
        {React.cloneElement(icon as any, { className: 'w-6 h-6' })}
      </div>
      <span className="text-xs md:text-sm">{label}</span>
    </Link>
  );
}

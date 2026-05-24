"use client"
import { IconBuildingCommunity, IconHomeFilled, IconMessageCircle, IconSettingsFilled } from '@tabler/icons-react'
import { useRouter, usePathname } from 'next/navigation'
import React from 'react'

const navItems = [
  { icon: IconHomeFilled,          label: 'Feed',        path: '/' },
  { icon: IconBuildingCommunity,   label: 'Communities', path: '/user' },
  { icon: IconMessageCircle,       label: 'Comments',    path: '/comments' },
  { icon: IconSettingsFilled,      label: 'Settings',    path: '/user' },
];

function SidebarNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="w-full px-3">
      <p className="text-[10px] font-semibold text-black/30 uppercase tracking-widest px-3 mb-2">Menu</p>
      <ul className="space-y-0.5">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = pathname === path;
          return (
            <li key={label}>
              <button
                onClick={() => router.push(path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-[#0A0A0A] text-white'
                    : 'text-black/55 hover:bg-black/[0.05] hover:text-black'
                }`}
              >
                <Icon size={17} />
                <span>{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default SidebarNav;

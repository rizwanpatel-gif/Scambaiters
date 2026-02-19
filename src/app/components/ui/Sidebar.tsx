"use client"

import React from 'react'
import User from './user'
import SidebarNav from './sidebarNav'
import Volunteer from './Volunteer'

function Sidebar() {
  return (
    <aside className="w-full min-h-screen flex flex-col sticky top-0 bg-[#0A0A0A] overflow-y-auto">

      {/* Brand */}
      <div className="px-5 py-5 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <img
            src="/lastlogo.png"
            className="w-7 h-7 rounded-lg object-cover"
            alt="Scambaiters"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <span className="text-white font-bold text-base tracking-tight">Scambaiters</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 py-4 space-y-6 overflow-y-auto">
        <User />
        <div className="border-t border-white/10 pt-5">
          <SidebarNav />
        </div>
        <div className="border-t border-white/10 pt-5">
          <Volunteer />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar;

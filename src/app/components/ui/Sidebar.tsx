"use client"

import React from 'react'
import User from './user'
import SidebarNav from './sidebarNav'
import Volunteer from './Volunteer'

function Sidebar() {
  return (
    <aside className="w-full flex flex-col bg-[#F2F2F2]">

      {/* Brand card */}
      <div className="px-3 pt-3 pb-1 flex-shrink-0">
        <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-black/[0.04]">
          <div className="flex items-center gap-2.5">
            <img
              src="/lastlogo.png"
              className="w-7 h-7 rounded-lg object-cover"
              alt="Scambaiters"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <span className="text-[#0A0A0A] font-bold text-base tracking-tight">Scambaiters</span>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 px-3 py-2 space-y-2.5 overflow-y-auto pb-4">

        {/* User card */}
        <div className="bg-white rounded-2xl p-3 shadow-sm border border-black/[0.04]">
          <User />
        </div>

        {/* Menu card */}
        <div className="bg-white rounded-2xl p-3 shadow-sm border border-black/[0.04]">
          <SidebarNav />
        </div>

        {/* Community card */}
        <div className="bg-white rounded-2xl p-3 shadow-sm border border-black/[0.04]">
          <Volunteer />
        </div>

      </div>
    </aside>
  )
}

export default Sidebar;

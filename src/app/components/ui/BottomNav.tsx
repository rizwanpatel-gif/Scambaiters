"use client"

import { IconHomeFilled, IconBuildingCommunity, IconPlus, IconUserFilled, IconSearch } from '@tabler/icons-react'
import { useRouter, usePathname } from 'next/navigation'

export function BottomNav() {
  const router = useRouter()
  const pathname = usePathname()

  if (pathname.startsWith('/Account')) return null

  const items = [
    { icon: IconHomeFilled,        label: 'Home',        path: '/' },
    { icon: IconBuildingCommunity, label: 'Communities', path: '/user' },
    { icon: IconPlus,              label: '',            path: '/post', isCreate: true },
    { icon: IconSearch,            label: 'Search',      path: '/' },
    { icon: IconUserFilled,        label: 'Profile',     path: '/user' },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-black/[0.06] z-50">
      <div className="flex items-center justify-around px-2 pt-2 pb-3">
        {items.map(({ icon: Icon, label, path, isCreate }) => {
          const isActive = pathname === path && !isCreate
          if (isCreate) {
            return (
              <button
                key="create"
                onClick={() => router.push(path)}
                className="flex items-center justify-center w-12 h-12 bg-[#0A0A0A] rounded-full shadow-md active:scale-95 transition-transform"
              >
                <Icon size={22} className="text-white" />
              </button>
            )
          }
          return (
            <button
              key={label}
              onClick={() => router.push(path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors ${
                isActive ? 'text-[#0A0A0A]' : 'text-black/30 hover:text-black/60'
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
              {label && <span className="text-[10px] font-medium">{label}</span>}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

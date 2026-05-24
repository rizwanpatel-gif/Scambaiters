'use client'

import { IconPlus, IconSpeakerphone, IconUserFilled } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const actions = [
  { icon: IconPlus,          label: 'Create Post', path: '/post' },
  { icon: IconUserFilled,    label: 'Members',     path: '/user' },
  { icon: IconSpeakerphone,  label: 'Awareness',   path: '/user' },
];

function Volunteer() {
  const router = useRouter();

  return (
    <div className="w-full px-3">
      <p className="text-[10px] font-semibold text-black/30 uppercase tracking-widest px-3 mb-2">Community</p>
      <ul className="space-y-0.5">
        {actions.map(({ icon: Icon, label, path }) => (
          <li key={label}>
            <button
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-black/55 hover:bg-black/[0.05] hover:text-black transition-all duration-150"
              onClick={() => router.push(path)}
            >
              <Icon size={17} />
              <span>{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Volunteer;

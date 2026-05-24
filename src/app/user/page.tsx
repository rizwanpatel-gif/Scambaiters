"use client"

import Sidebar from '../components/ui/Sidebar'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import {
  IconUser, IconMail, IconBuildingCommunity,
  IconLogout, IconKey, IconChevronRight, IconShield
} from '@tabler/icons-react'

interface UserData {
  _id: string
  username: string
  email: string
  gender?: string
}

interface Community {
  _id: string
  name: string
}

const AVATAR_COLORS = ['#FFD6E0', '#FFF5CC', '#C8F5E0', '#CCE8FF', '#E8CCFF', '#FFE0CC']

export default function Page() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [communities, setCommunities] = useState<Community[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const cu = await axios.get('/api/user/currentuser')
        if (!cu.data.data?._id) {
          router.push('/Account/login')
          return
        }
        setUser(cu.data.data)
        const comRes = await axios.post('/api/communities/followedCommunity', { userId: cu.data.data._id })
        setCommunities(comRes.data.com || [])
      } catch {
        router.push('/Account/login')
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  const handleLogout = async () => {
    try {
      await axios.post('/api/user/logout').catch(() => {})
    } finally {
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      toast.success('Logged out!')
      router.push('/Account/login')
    }
  }

  const avatarColor = user ? AVATAR_COLORS[user.username.charCodeAt(0) % AVATAR_COLORS.length] : '#F2F2F2'
  const initial = user?.username?.charAt(0)?.toUpperCase() || '?'

  if (isLoading) {
    return (
      <div className="h-screen overflow-hidden flex bg-[#F2F2F2]">
        <div className="hidden md:flex w-[264px] lg:w-[282px] flex-shrink-0 h-screen overflow-y-auto">
          <Sidebar />
        </div>
        <main className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-black/10 border-t-black/40 rounded-full animate-spin" />
        </main>
      </div>
    )
  }

  return (
    <div className="h-screen overflow-hidden flex bg-[#F2F2F2]">

      {/* ── Sidebar ── */}
      <div className="hidden md:flex w-[264px] lg:w-[282px] flex-shrink-0 h-screen overflow-y-auto">
        <Sidebar />
      </div>

      {/* ── Main ── */}
      <main className="flex-1 h-screen overflow-y-auto pb-16 md:pb-6">
        <div className="max-w-xl mx-auto px-4 py-6 space-y-3">

          {/* ── Profile card ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-black/[0.04] overflow-hidden">
            {/* Banner strip */}
            <div className="h-24 w-full" style={{ backgroundColor: avatarColor }} />
            {/* Avatar + info */}
            <div className="px-5 pb-5">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-black/50 border-4 border-white shadow-sm -mt-8 mb-3"
                style={{ backgroundColor: avatarColor }}
              >
                {initial}
              </div>
              <h1 className="text-lg font-bold text-[#0A0A0A] capitalize">{user?.username}</h1>
              <div className="flex items-center gap-1.5 mt-1">
                <IconMail size={13} className="text-black/30" />
                <p className="text-sm text-black/40">{user?.email}</p>
              </div>
              {user?.gender && (
                <div className="flex items-center gap-1.5 mt-0.5">
                  <IconUser size={13} className="text-black/30" />
                  <p className="text-sm text-black/40 capitalize">{user.gender}</p>
                </div>
              )}
            </div>
          </div>

          {/* ── Communities card ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-black/[0.04] p-4">
            <p className="text-[10px] font-semibold text-black/30 uppercase tracking-widest mb-3">
              Joined Communities
            </p>
            {communities.length === 0 ? (
              <div className="flex flex-col items-center py-6 gap-2">
                <div className="w-10 h-10 rounded-full bg-[#F2F2F2] flex items-center justify-center text-lg">🏘️</div>
                <p className="text-sm text-black/30">No communities joined yet</p>
              </div>
            ) : (
              <ul className="space-y-1">
                {communities.map((c) => {
                  const bg = AVATAR_COLORS[c.name.charCodeAt(0) % AVATAR_COLORS.length]
                  return (
                    <li key={c._id}>
                      <button
                        onClick={() => router.push(`/community/${c._id}`)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F2F2F2] transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold text-black/50" style={{ backgroundColor: bg }}>
                          {c.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="flex-1 text-sm font-medium text-[#0A0A0A] text-left capitalize">{c.name}</span>
                        <IconChevronRight size={14} className="text-black/20 group-hover:text-black/40 transition-colors" />
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* ── Activity card (placeholder) ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-black/[0.04] p-4">
            <p className="text-[10px] font-semibold text-black/30 uppercase tracking-widest mb-3">Activity</p>
            <div className="flex gap-3">
              {[
                { label: 'Posts', value: '—', color: '#FFF5CC' },
                { label: 'Comments', value: '—', color: '#C8F5E0' },
                { label: 'Likes given', value: '—', color: '#CCE8FF' },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex-1 rounded-2xl p-3 text-center" style={{ backgroundColor: color }}>
                  <p className="text-base font-bold text-[#0A0A0A]">{value}</p>
                  <p className="text-[11px] text-black/45 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Settings card ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-black/[0.04] p-4">
            <p className="text-[10px] font-semibold text-black/30 uppercase tracking-widest mb-3">Settings</p>
            <ul className="space-y-1">

              <li>
                <button
                  onClick={() => toast('Coming soon!', { icon: '🔒' })}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#F2F2F2] transition-colors group text-left"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#CCE8FF] flex items-center justify-center flex-shrink-0">
                    <IconKey size={15} className="text-black/50" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#0A0A0A]">Change Password</p>
                    <p className="text-xs text-black/30">Update your account password</p>
                  </div>
                  <IconChevronRight size={14} className="text-black/20 group-hover:text-black/40 transition-colors" />
                </button>
              </li>

              <li>
                <button
                  onClick={() => toast('Coming soon!', { icon: '🛡️' })}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#F2F2F2] transition-colors group text-left"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#C8F5E0] flex items-center justify-center flex-shrink-0">
                    <IconShield size={15} className="text-black/50" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#0A0A0A]">Privacy & Safety</p>
                    <p className="text-xs text-black/30">Manage your privacy settings</p>
                  </div>
                  <IconChevronRight size={14} className="text-black/20 group-hover:text-black/40 transition-colors" />
                </button>
              </li>

              <li className="pt-1 border-t border-black/[0.05] mt-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-red-50 transition-colors group text-left"
                >
                  <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                    <IconLogout size={15} className="text-red-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-red-500">Log Out</p>
                    <p className="text-xs text-red-400/70">Sign out of your account</p>
                  </div>
                </button>
              </li>

            </ul>
          </div>

        </div>
      </main>
    </div>
  )
}

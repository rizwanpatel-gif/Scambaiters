"use client"

import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import Sidebar from '../components/ui/Sidebar'
import MediaUpload from '../components/ui/MediaUpload'
import {
  IconArrowLeft, IconPhoto, IconX,
  IconBuildingCommunity, IconAlignLeft, IconHeading
} from '@tabler/icons-react'

interface MediaFile {
  url: string
  type: 'image' | 'video'
  publicId: string
}

export default function Page() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [communityName, setCommunityName] = useState('')
  const [communities, setCommunities] = useState<string[]>([])
  const [filteredCommunities, setFilteredCommunities] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isValidCommunity, setIsValidCommunity] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const init = async () => {
      try {
        const cu = await axios.get('/api/user/currentuser')
        if (!cu.data.data?._id) {
          toast.error('Please login to create a post')
          router.push('/Account/login')
          return
        }
        setAuthChecked(true)
        const res = await axios.get('/api/communities/communitynames')
        if (Array.isArray(res.data.data)) setCommunities(res.data.data)
      } catch {
        toast.error('Please login to create a post')
        router.push('/Account/login')
      }
    }
    init()
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleCommunityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setCommunityName(val)
    if (!val.trim()) {
      setFilteredCommunities([])
      setShowSuggestions(false)
      setIsValidCommunity(false)
      return
    }
    const filtered = communities.filter(c => c.toLowerCase().includes(val.toLowerCase()))
    setFilteredCommunities(filtered)
    setShowSuggestions(true)
    setIsValidCommunity(communities.some(c => c.toLowerCase() === val.toLowerCase()))
  }

  const selectCommunity = (name: string) => {
    setCommunityName(name)
    setIsValidCommunity(true)
    setShowSuggestions(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) { toast.error('Title is required'); return }
    if (!content.trim()) { toast.error('Content is required'); return }
    if (!isValidCommunity) { toast.error('Select a valid community'); return }
    if (title.length > 100) { toast.error('Title too long (max 100 chars)'); return }

    try {
      setLoading(true)
      const cu = await axios.get('/api/user/currentuser')
      const formData = new FormData()
      formData.append('name', communityName)
      formData.append('userid', cu.data.data._id)
      formData.append('title', title.trim())
      formData.append('content', content.trim())

      for (const file of mediaFiles) {
        try {
          const res = await fetch(file.url)
          const blob = await res.blob()
          const f = new File([blob], `file-${Date.now()}.${file.type === 'image' ? 'jpg' : 'mp4'}`, {
            type: file.type === 'image' ? 'image/jpeg' : 'video/mp4'
          })
          formData.append('files', f)
        } catch {
          toast.error('Error processing a file')
        }
      }

      const response = await axios.post('/api/post', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      if (response.status === 200) {
        toast.success('Post created!')
        router.push('/')
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        toast.error('Please login to create a post')
        router.push('/Account/login')
      } else {
        toast.error(err.response?.data?.message || 'Failed to create post')
      }
    } finally {
      setLoading(false)
    }
  }

  if (!authChecked) {
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
        <div className="max-w-2xl mx-auto px-4 py-6">

          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center w-8 h-8 rounded-xl bg-white shadow-sm border border-black/[0.06] hover:bg-[#F2F2F2] transition-colors"
            >
              <IconArrowLeft size={16} className="text-black/50" />
            </button>
            <h1 className="text-xl font-bold text-[#0A0A0A]">Create Post</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">

            {/* Community selector */}
            <div className="bg-white rounded-2xl shadow-sm border border-black/[0.04] p-4" ref={dropdownRef}>
              <label className="text-[10px] font-semibold text-black/30 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                <IconBuildingCommunity size={12} />
                Community
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={communityName}
                  onChange={handleCommunityChange}
                  onFocus={() => communityName && setShowSuggestions(true)}
                  placeholder="Search for a community…"
                  disabled={loading}
                  className={`w-full h-10 px-3 rounded-xl text-sm font-medium text-[#0A0A0A] placeholder-black/25 outline-none transition-all border ${
                    communityName
                      ? isValidCommunity
                        ? 'border-green-400 bg-green-50'
                        : 'border-red-300 bg-red-50'
                      : 'border-black/[0.08] bg-[#F2F2F2] focus:border-black/20 focus:bg-white'
                  }`}
                />
                {communityName && (
                  <button
                    type="button"
                    onClick={() => { setCommunityName(''); setIsValidCommunity(false); setShowSuggestions(false) }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-black/25 hover:text-black/50"
                  >
                    <IconX size={13} />
                  </button>
                )}
                {showSuggestions && filteredCommunities.length > 0 && (
                  <div className="absolute z-20 w-full mt-1.5 bg-white rounded-xl shadow-lg border border-black/[0.06] max-h-48 overflow-y-auto">
                    {filteredCommunities.map((name) => (
                      <button
                        key={name}
                        type="button"
                        onClick={() => selectCommunity(name)}
                        className="w-full text-left px-3 py-2.5 text-sm text-[#0A0A0A] hover:bg-[#F2F2F2] transition-colors capitalize flex items-center gap-2"
                      >
                        <div className="w-6 h-6 rounded-lg bg-[#FFF5CC] flex items-center justify-center text-xs font-bold text-black/40">
                          {name.charAt(0).toUpperCase()}
                        </div>
                        {name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {communityName && !isValidCommunity && (
                <p className="text-xs text-red-400 mt-1.5">Pick a community from the list</p>
              )}
              {isValidCommunity && (
                <p className="text-xs text-green-500 mt-1.5">✓ Community selected</p>
              )}
            </div>

            {/* Title */}
            <div className="bg-white rounded-2xl shadow-sm border border-black/[0.04] p-4">
              <label className="text-[10px] font-semibold text-black/30 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                <IconHeading size={12} />
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your post a title…"
                maxLength={100}
                disabled={loading}
                className="w-full h-10 px-3 rounded-xl text-sm font-medium text-[#0A0A0A] placeholder-black/25 outline-none border border-black/[0.08] bg-[#F2F2F2] focus:border-black/20 focus:bg-white transition-all"
              />
              <p className="text-[11px] text-black/25 mt-1.5 text-right">{title.length}/100</p>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl shadow-sm border border-black/[0.04] p-4">
              <label className="text-[10px] font-semibold text-black/30 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                <IconAlignLeft size={12} />
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your scam report, warning, or story…"
                maxLength={5000}
                rows={7}
                disabled={loading}
                className="w-full px-3 py-2.5 rounded-xl text-sm text-[#0A0A0A] placeholder-black/25 outline-none border border-black/[0.08] bg-[#F2F2F2] focus:border-black/20 focus:bg-white transition-all resize-none leading-relaxed"
              />
              <p className="text-[11px] text-black/25 mt-1.5 text-right">{content.length}/5000</p>
            </div>

            {/* Media */}
            <div className="bg-white rounded-2xl shadow-sm border border-black/[0.04] p-4">
              <label className="text-[10px] font-semibold text-black/30 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                <IconPhoto size={12} />
                Media (optional)
              </label>
              <MediaUpload onMediaUpload={setMediaFiles} />
              {mediaFiles.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                  {mediaFiles.map((file, i) => (
                    <div key={file.publicId} className="relative rounded-xl overflow-hidden aspect-video bg-[#F2F2F2]">
                      {file.type === 'image' ? (
                        <img src={file.url} alt={`media ${i + 1}`} className="w-full h-full object-cover" />
                      ) : (
                        <video src={file.url} className="w-full h-full object-cover" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => router.back()}
                className="text-sm font-semibold text-black/40 hover:text-black/70 transition-colors px-4 py-2.5"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !isValidCommunity || !title.trim() || !content.trim()}
                className="flex items-center gap-2 bg-[#0A0A0A] hover:bg-[#333] disabled:opacity-35 text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all duration-200"
              >
                {loading
                  ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Publishing…</>
                  : 'Publish Post'
                }
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  )
}

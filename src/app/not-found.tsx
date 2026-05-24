"use client"

import { useRouter } from "next/navigation"
import { IconArrowLeft, IconShieldOff } from "@tabler/icons-react"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">

        {/* Icon */}
        <div className="flex items-center justify-center mx-auto mb-6">
          <div className="w-20 h-20 rounded-3xl bg-white shadow-sm border border-black/[0.06] flex items-center justify-center">
            <IconShieldOff size={36} className="text-black/20" />
          </div>
        </div>

        {/* Text */}
        <h1 className="text-5xl font-black text-[#0A0A0A] mb-2 tracking-tight">404</h1>
        <p className="text-base font-semibold text-black/50 mb-1">Page not found</p>
        <p className="text-sm text-black/30 mb-8 leading-relaxed">
          This page doesn't exist or may have been removed.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={() => router.push("/")}
            className="w-full h-11 bg-[#0A0A0A] hover:bg-[#333] text-white text-sm font-bold rounded-2xl transition-colors duration-200"
          >
            Go to Feed
          </button>
          <button
            onClick={() => router.back()}
            className="w-full h-11 bg-white border border-black/[0.08] hover:bg-[#F2F2F2] text-[#0A0A0A] text-sm font-semibold rounded-2xl transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <IconArrowLeft size={15} />
            Go Back
          </button>
        </div>

        {/* Pastel accent */}
        <div className="flex justify-center gap-2 mt-8">
          {["#FFD6E0", "#FFF5CC", "#C8F5E0", "#CCE8FF"].map((c) => (
            <div key={c} className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />
          ))}
        </div>
      </div>
    </div>
  )
}

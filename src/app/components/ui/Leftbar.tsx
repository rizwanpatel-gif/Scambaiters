"use client"

import { IconCampfireFilled, IconPlus, IconShieldFilled, IconUser } from "@tabler/icons-react"
import JoinCard from "./JoinCard"
import Pinned from "./Pinned"
import { useRouter } from "next/navigation"

function Leftbar() {
  const router = useRouter();

  return (
    <aside className="w-full bg-[#F2F2F2]">
      <div className="p-3 space-y-2.5">

        {/* ── Quick Actions card ── */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-black/[0.04]">
          <p className="text-[10px] font-semibold text-black/30 uppercase tracking-widest mb-3">Quick Actions</p>
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: IconPlus,          label: 'Post',    onClick: () => router.push('/post'),           bg: '#FFF5CC' },
              { icon: IconCampfireFilled, label: 'Report',  onClick: () => window.open('https://cybercrime.gov.in/Webform/Index.aspx','_blank'), bg: '#FFD6E0', extra: 'fire-icon' },
              { icon: IconShieldFilled,  label: 'Safety',  onClick: () => window.open('https://cybercrime.gov.in/Webform/Crime_OnlineSafetyTips.aspx','_blank'), bg: '#C8F5E0' },
              { icon: IconUser,          label: 'Profile', onClick: () => router.push('/user'),           bg: '#CCE8FF' },
            ].map(({ icon: Icon, label, onClick, bg, extra }) => (
              <button
                key={label}
                onClick={onClick}
                className="flex flex-col items-center gap-1.5 p-3 rounded-2xl border border-black/[0.08] hover:border-black/[0.2] hover:-translate-y-0.5 transition-all duration-200 group"
                style={{ backgroundColor: bg }}
              >
                <Icon className={`text-[#0A0A0A] opacity-70 group-hover:opacity-100 transition-opacity ${extra ?? ''}`} size={18} />
                <span className="text-[10px] font-semibold text-black/50 group-hover:text-black/80 transition-colors">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Pinned card ── */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-black/[0.04]">
          <p className="text-[10px] font-semibold text-black/30 uppercase tracking-widest mb-3">Pinned</p>
          <Pinned />
        </div>

        {/* ── Suggested Communities card ── */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-black/[0.04]">
          <p className="text-[10px] font-semibold text-black/30 uppercase tracking-widest mb-3">Suggested</p>
          <div className="space-y-2">
            <JoinCard head="banglore"  main="Protecting from scammers"    bol={true} src="https://i.pinimg.com/736x/66/73/81/667381b29f4265915a80dc31884b4105.jpg" />
            <JoinCard head="delhi"     main="Towards a safer future"       bol={true} src="https://i.pinimg.com/736x/91/69/9e/91699ec84f9e861897c17f11ce6d5b98.jpg" />
            <JoinCard head="mumbai"    main="The safe town"                bol={true} src="https://i.pinimg.com/736x/75/21/48/752148c7c34a5944ca2f64711be04bcf.jpg" />
          </div>
        </div>

      </div>
    </aside>
  );
}

export default Leftbar;

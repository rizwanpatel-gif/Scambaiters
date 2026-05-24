"use client"

import axios from 'axios'
import { useEffect, useState } from 'react';

const CARD_PASTELS = ['#FFD6E0', '#FFF5CC', '#C8F5E0', '#CCE8FF', '#E8CCFF', '#FFE0CC'];

function JoinCard({ head, main, bol, src }: {
  head?: string;
  main?: string;
  bol?: boolean;
  src?: string;
}) {
  const [name, setname] = useState("")
  const idx = (head ?? '').split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const bg = CARD_PASTELS[idx % CARD_PASTELS.length];

  useEffect(() => {
    if (!bol) {
      axios.post("/api/user/userdetail", { userId: head })
        .then(r => setname(r.data.data.username))
        .catch(() => {});
    }
  }, []);

  return (
    <div
      className="w-full rounded-2xl border border-black/[0.06] hover:border-black/[0.12] hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
      style={{ backgroundColor: bg }}
    >
      <div className="flex items-center gap-3 p-3">
        <img
          src={src}
          alt="Community"
          className="rounded-full h-9 w-9 object-cover flex-shrink-0 border-2 border-black/10"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/36/0a0a0a/ffffff?text=C'; }}
        />
        <div className="min-w-0">
          <h2 className="text-sm font-bold text-[#0A0A0A] truncate capitalize">{bol ? head : name}</h2>
          <p className="text-[11px] text-black/45 truncate">{main}</p>
        </div>
      </div>
    </div>
  )
}

export default JoinCard;

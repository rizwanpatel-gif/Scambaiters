"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios';

function User() {
  const [name, setname] = useState("Sign Up");
  const [email, setemail] = useState("Log In");
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/user/currentuser");
        setemail(response.data.data.email);
        setname(response.data.data.username);
      } catch (error) { }
    };
    fetchUser();
  }, []);

  return (
    <div className="px-4 pt-1 pb-2">

      {/* ── Collaboration Avatars ── */}
      <div className="flex items-center gap-3 mb-3">
        <div className="relative flex-shrink-0" style={{ width: 56 }}>
          {/* Your avatar */}
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVF9XCN-3m0QhFLhp6NOK63wB2hRJXfmBcpg&s"
            className="w-9 h-9 rounded-full object-cover border-[2.5px] border-white relative z-10"
            alt="You"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/36/ffffff/000000?text=U'; }}
          />
          {/* Scambaiters logo — overlapping */}
          <img
            src="/lastlogo.png"
            className="w-9 h-9 rounded-full object-cover border-[2.5px] border-white absolute top-0 left-5 z-20"
            alt="Scambaiters"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/36/ffffff/000000?text=S'; }}
          />
        </div>

        <div className="flex flex-col min-w-0">
          <span className="text-[10px] text-black/40 uppercase tracking-widest font-semibold mb-0.5">
            Collab
          </span>
          <span className="text-[11px] text-black/30 leading-tight">
            Protecting together
          </span>
        </div>
      </div>

      {/* ── User Info ── */}
      <button
        className="block text-[#0A0A0A] font-semibold text-sm hover:text-gray-600 transition-colors truncate w-full text-left"
        onClick={() => router.push("/Account/login")}
      >
        {name}
      </button>
      <button
        className="block text-black/40 text-xs hover:text-black/60 transition-colors truncate w-full text-left mt-0.5"
        onClick={() => router.push("/Account/signup")}
      >
        {email}
      </button>
    </div>
  );
}

export default User;

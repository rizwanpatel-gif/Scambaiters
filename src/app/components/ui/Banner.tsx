import React from 'react'
import { IconPlus } from '@tabler/icons-react'

function Banner({ name }: { name: string }) {
  return (
    <div className="w-full">
      <div className="w-full h-40 overflow-hidden">
        <img
          src="https://i.pinimg.com/474x/cb/be/53/cbbe53813cb8c0c85ddeda0d23de874d.jpg"
          className="w-full h-full object-cover"
          alt="Banner"
        />
      </div>
      <div className="bg-white px-5 pb-4 flex items-end gap-4">
        <div className="w-16 h-16 rounded-2xl overflow-hidden border-4 border-white shadow-md -mt-8 flex-shrink-0">
          <img
            src="https://i.pinimg.com/474x/11/17/0b/11170b186c0eaa633d1d4379f0063b8b.jpg"
            className="w-full h-full object-cover"
            alt="Avatar"
          />
        </div>
        <div className="flex-1 flex items-center justify-between pb-1">
          <h1 className="text-lg font-bold text-[#0A0A0A] capitalize">{name}</h1>
          <button className="flex items-center gap-1.5 bg-[#0A0A0A] hover:bg-[#333] text-white text-xs font-bold px-4 py-2 rounded-full transition-colors">
            <IconPlus size={13} />
            Join
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;

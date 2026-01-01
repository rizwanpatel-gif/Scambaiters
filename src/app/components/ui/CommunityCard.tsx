import React from 'react';
import Image from 'next/image';
import { MoreHorizontal } from 'lucide-react';

interface CommunityCardProps {
  name: string;
  description: string;
  imageUrl: string;
  memberCount?: number;
  onJoin?: () => void;
}

export function CommunityCard({ name, description, imageUrl, memberCount, onJoin }: CommunityCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#051530] to-[#0a1f3f]
                    border border-[#1a2942] hover:border-blue-500/50 transition-all duration-500
                    shadow-lg hover:shadow-xl hover:shadow-blue-500/10">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
      
      <div className="relative p-4 flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-white/10">
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{name}</h3>
            <p className="text-sm text-gray-400 line-clamp-2">{description}</p>
            {memberCount && (
              <p className="text-xs text-gray-500 mt-1">{memberCount.toLocaleString()} members</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={onJoin}
            className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium
                     hover:bg-blue-700 transition-colors duration-300
                     shadow-lg hover:shadow-blue-500/50"
          >
            Join
          </button>
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors duration-300">
            <MoreHorizontal className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}

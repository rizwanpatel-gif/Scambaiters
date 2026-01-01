import { motion } from 'framer-motion';
import { IconMessageCircle, IconShare, IconShield, IconBrain } from "@tabler/icons-react";
import { useState } from "react";
import Image from 'next/image';
import { toast } from "react-hot-toast";
import SummaryModal from "./SummaryModal";

interface MediaItem {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  width?: number;
  height?: number;
  alt?: string;
}

interface PostCardProps {
  postId: string;    
  name: string;
  title: string;
  content: string;
  communityId?: string;
  createdAt?: string;
  media?: Array<MediaItem>;
  likes?: number;
  comments?: number;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
}

export function ModernPostCard({
  postId,
  name,
  title,
  content,
  communityId,
  createdAt,
  media,
  likes = 0,
  comments = 0,
  onLike,
  onComment,
  onShare
}: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.();
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="glass-card overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-[#FF61D2] to-[#FE9090]">
            {/* Avatar placeholder */}
            <div className="w-full h-full bg-white/10" />
          </div>
          <div>
            <h3 className="font-medium text-white">{name}</h3>
            <p className="text-sm text-white/60">{createdAt}</p>
          </div>
        </div>
        <button 
          onClick={() => setShowSummary(true)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <IconBrain className="w-5 h-5 text-[#FF61D2]" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h2 className="text-xl font-semibold gradient-text">{title}</h2>
        <p className="text-white/80">{content}</p>
        
        {media && media.length > 0 && (
          <div className="mt-4 rounded-xl overflow-hidden">
            {/* Media content here */}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-4 py-3 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 text-white/60 hover:text-[#FF61D2] transition-colors"
          >
            <motion.div
              whileTap={{ scale: 1.4 }}
              className={isLiked ? "text-[#FF61D2]" : ""}
            >
              ❤️
            </motion.div>
            <span>{likes}</span>
          </button>
          
          <button
            onClick={onComment}
            className="flex items-center gap-2 text-white/60 hover:text-[#41A4FF] transition-colors"
          >
            <IconMessageCircle className="w-5 h-5" />
            <span>{comments}</span>
          </button>
          
          <button
            onClick={onShare}
            className="flex items-center gap-2 text-white/60 hover:text-[#62FFAA] transition-colors"
          >
            <IconShare className="w-5 h-5" />
          </button>
        </div>

        <button className="flex items-center gap-2 text-white/60 hover:text-[#FFD600] transition-colors">
          <IconShield className="w-5 h-5" />
        </button>
      </div>

      {/* Summary Modal */}
      <SummaryModal
        isOpen={showSummary}
        onClose={() => setShowSummary(false)}
        postId={postId}
      />
    </motion.article>
  );
}

"use client"

import { IconMessageCircle, IconShare, IconShield, IconBrain } from "@tabler/icons-react"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import SummaryModal from "./SummaryModal";

/* ── Curated 2026 pastel palette ── */
const PASTEL_PALETTE = [
  '#FFD6E0', // soft rose
  '#FFE0CC', // warm peach
  '#FFF5CC', // butter yellow
  '#C8F5E0', // fresh mint
  '#CCE8FF', // calm sky
  '#E8CCFF', // dreamy lavender
  '#D0EDD0', // sage green
  '#FFE8CC', // apricot
  '#F5D0FF', // light lilac
  '#CCFFEE', // spearmint
  '#FFD0D8', // blush pink
  '#D0F5FF', // ice blue
];

const getCardColor = (id: string) => {
  const hash = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return PASTEL_PALETTE[hash % PASTEL_PALETTE.length];
};

interface MediaItem {
  fileId: string;
  filename: string;
  contentType: string;
}

interface PostCardProps {
  postId: string;
  name: string;
  title: string;
  content: string;
  communityId?: string;
  Tlike: number;
  comments?: number;
  media?: MediaItem[];
}

function PostCard({ postId, name, title, content, communityId, Tlike, comments, media }: PostCardProps) {
  const router = useRouter();
  const cardColor = getCardColor(postId);

  const [likeCount, setLikeCount] = useState(Tlike || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summarizedContent, setSummarizedContent] = useState("");
  const [lastSummarizeTime, setLastSummarizeTime] = useState(0);

  useEffect(() => {
    const checkLike = async () => {
      try {
        const cu = await axios.get("/api/user/currentuser");
        if (cu.data.data?._id) {
          const u = await axios.get(`/api/user/${cu.data.data._id}`);
          setHasLiked(u.data.data?.postLiked?.some((id: string) => id === postId) ?? false);
        }
      } catch { }
    };
    checkLike();
  }, [postId]);

  const handleLike = async () => {
    try {
      const cu = await axios.get("/api/user/currentuser");
      if (!cu.data.data?._id) {
        toast.error("Please login to like posts");
        router.push("/Account/login");
        return;
      }
      setHasLiked(prev => !prev);
      setLikeCount(prev => hasLiked ? Math.max(0, prev - 1) : prev + 1);
      axios.post("/api/post/likes", { userId: cu.data.data._id, postId }).catch(() => { });
    } catch { }
  };

  const handleSummarize = async () => {
    const now = Date.now();
    if (now - lastSummarizeTime < 10000) {
      toast.error("Please wait 10 seconds before trying again.");
      return;
    }
    try {
      setIsSummarizing(true);
      setIsSummaryModalOpen(true);
      setLastSummarizeTime(now);
      const res = await axios.post("/api/summarize", { content });
      if (res.data.summary) setSummarizedContent(res.data.summary);
      else toast.error("Failed to generate summary");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to generate summary.");
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleJoin = async () => {
    try {
      const cu = await axios.get("/api/user/currentuser");
      await axios.post("/api/user/join", { id: cu.data.data._id, userid: communityId });
      toast.success("Joined community!");
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error("Please login to join");
        router.push("/Account/login");
      } else {
        toast.error("Failed to join community");
      }
    }
  };

  const isImg = (ct: string) => ct.startsWith('image/');
  const isVid = (ct: string) => ct.startsWith('video/');

  return (
    <>
      <article
        className="w-full max-w-xl my-4 mx-auto rounded-[28px] overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer"
        style={{
          backgroundColor: cardColor,
          boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
        }}
        onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.14)')}
        onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.08)')}
      >

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src="https://via.placeholder.com/36/0a0a0a/ffffff?text=S"
              alt="avatar"
              className="w-8 h-8 rounded-full border-2 border-black/10 flex-shrink-0 object-cover"
            />
            <div className="min-w-0">
              <h3
                className="text-sm font-bold text-[#0A0A0A] truncate cursor-pointer hover:underline underline-offset-2"
                onClick={() => router.push(`/community/${communityId}`)}
              >
                {name}
              </h3>
              <p className="text-[11px] text-black/40">community</p>
            </div>
          </div>
          <button
            className="flex-shrink-0 text-[11px] font-bold text-white bg-[#0A0A0A] hover:bg-[#333] px-3.5 py-1.5 rounded-full transition-colors duration-200"
            onClick={handleJoin}
          >
            Join
          </button>
        </div>

        {/* ── Media ── */}
        {media && media.length > 0 && (
          <div className="relative overflow-hidden mx-3 rounded-2xl bg-black/5 mb-3">
            {isImg(media[activeMediaIndex].contentType) && (
              <img
                src={`/api/media?id=${media[activeMediaIndex].fileId}`}
                alt={media[activeMediaIndex].filename}
                className="w-full max-h-64 object-cover"
              />
            )}
            {isVid(media[activeMediaIndex].contentType) && (
              <video
                src={`/api/media?id=${media[activeMediaIndex].fileId}`}
                className="w-full max-h-64 object-contain"
                controls
              />
            )}
            {media.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                {media.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveMediaIndex(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${i === activeMediaIndex ? 'bg-black scale-125' : 'bg-black/30'}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Body ── */}
        <div className="px-5 pb-4">
          <h2
            className="text-base font-bold text-[#0A0A0A] mb-1.5 cursor-pointer hover:underline underline-offset-2 leading-snug"
            onClick={() => router.push(`/comments/${postId}`)}
          >
            {title}
          </h2>
          <p
            className="text-[13px] text-black/55 leading-relaxed cursor-pointer"
            style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
            onClick={() => router.push(`/comments/${postId}`)}
          >
            {content}
          </p>
        </div>

        {/* ── Actions ── */}
        <div className="flex items-center gap-0.5 px-4 py-3 border-t border-black/[0.07]">
          <button
            className={`flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-full transition-all duration-200 ${
              hasLiked
                ? 'bg-black/10 text-[#0A0A0A]'
                : 'text-black/45 hover:bg-black/8 hover:text-[#0A0A0A]'
            }`}
            onClick={handleLike}
          >
            <IconShield size={14} className={hasLiked ? 'fill-current' : ''} />
            {likeCount}
          </button>

          <button
            className="flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-full text-black/45 hover:bg-black/8 hover:text-[#0A0A0A] transition-all duration-200"
            onClick={() => router.push(`/comments/${postId}`)}
          >
            <IconMessageCircle size={14} />
            {comments || 0}
          </button>

          <button
            className="flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-full text-black/45 hover:bg-black/8 hover:text-[#0A0A0A] transition-all duration-200 disabled:opacity-40"
            onClick={handleSummarize}
            disabled={isSummarizing}
          >
            <IconBrain size={14} />
            {isSummarizing ? '...' : 'AI'}
          </button>

          <button className="flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-full text-black/45 hover:bg-black/8 hover:text-[#0A0A0A] transition-all duration-200 ml-auto">
            <IconShare size={14} />
          </button>
        </div>

      </article>

      <SummaryModal
        isOpen={isSummaryModalOpen}
        onClose={() => setIsSummaryModalOpen(false)}
        postId={postId}
        originalContent={content}
        summarizedContent={summarizedContent}
        isLoading={isSummarizing}
      />
    </>
  );
}

export default PostCard;

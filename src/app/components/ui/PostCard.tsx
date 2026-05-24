"use client"

import { IconMessageCircle, IconShare, IconShield, IconBrain } from "@tabler/icons-react"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import SummaryModal from "./SummaryModal";

const PASTEL_PALETTE = [
  '#FFD6E0', '#FFE0CC', '#FFF5CC', '#C8F5E0',
  '#CCE8FF', '#E8CCFF', '#D0EDD0', '#FFE8CC',
  '#F5D0FF', '#CCFFEE', '#FFD0D8', '#D0F5FF',
];

const getCardColor = (id: string) => {
  const hash = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return PASTEL_PALETTE[hash % PASTEL_PALETTE.length];
};

const formatCount = (n: number) => {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
};

interface MediaItem { fileId: string; filename: string; contentType: string; }

interface PostCardProps {
  postId: string;
  name: string;
  title: string;
  content: string;
  communityId?: string;
  Tlike: number;
  comments?: number;
  media?: MediaItem[];
  showFullContent?: boolean;
}

function PostCard({ postId, name, title, content, communityId, Tlike, comments, media, showFullContent }: PostCardProps) {
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

  const requireAuth = async (): Promise<boolean> => {
    try {
      const cu = await axios.get("/api/user/currentuser");
      if (!cu.data.data?._id) {
        toast.error("Please login to continue");
        router.push("/Account/login");
        return false;
      }
      return true;
    } catch {
      toast.error("Please login to continue");
      router.push("/Account/login");
      return false;
    }
  };

  const handleLike = async () => {
    if (!(await requireAuth())) return;
    setHasLiked(prev => !prev);
    setLikeCount(prev => hasLiked ? Math.max(0, prev - 1) : prev + 1);
    try {
      const cu = await axios.get("/api/user/currentuser");
      axios.post("/api/post/likes", { userId: cu.data.data._id, postId }).catch(() => {});
    } catch {}
  };

  const handleComment = async () => {
    if (!(await requireAuth())) return;
    router.push(`/comments/${postId}`);
  };

  const handleSummarize = async () => {
    if (!(await requireAuth())) return;
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
    if (!(await requireAuth())) return;
    try {
      const cu = await axios.get("/api/user/currentuser");
      await axios.post("/api/user/join", { id: cu.data.data._id, userid: communityId });
      toast.success("Joined community!");
    } catch (error: any) {
      toast.error("Failed to join community");
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/comments/${postId}`;
    navigator.clipboard.writeText(url).then(() => toast.success("Link copied!")).catch(() => {});
  };

  const isImg = (ct: string) => ct.startsWith('image/');
  const isVid = (ct: string) => ct.startsWith('video/');

  return (
    <>
      <article
        className="w-full my-3 rounded-[28px] overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
        style={{ backgroundColor: cardColor, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}
        onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.13)')}
        onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)')}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-black/50">{name?.charAt(0)?.toUpperCase() || 'S'}</span>
            </div>
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
              <img src={`/api/media?id=${media[activeMediaIndex].fileId}`} alt={media[activeMediaIndex].filename} className="w-full max-h-64 object-cover" />
            )}
            {isVid(media[activeMediaIndex].contentType) && (
              <video src={`/api/media?id=${media[activeMediaIndex].fileId}`} className="w-full max-h-64 object-contain" controls />
            )}
            {media.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                {media.map((_, i) => (
                  <button key={i} onClick={() => setActiveMediaIndex(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${i === activeMediaIndex ? 'bg-black scale-125' : 'bg-black/30'}`} />
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
            style={showFullContent ? undefined : { display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
            onClick={() => !showFullContent && router.push(`/comments/${postId}`)}
          >
            {content}
          </p>
        </div>

        {/* ── Actions ── */}
        <div className="flex items-center gap-1 px-4 py-3 border-t border-black/[0.07]">

          {/* Like */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 text-[12px] font-bold px-3 py-1.5 rounded-full transition-all duration-200 ${
              hasLiked ? 'bg-black/12 text-[#0A0A0A]' : 'text-black/45 hover:bg-black/[0.07] hover:text-[#0A0A0A]'
            }`}
          >
            <IconShield size={14} className={hasLiked ? 'fill-current' : ''} />
            <span>{formatCount(likeCount)}</span>
          </button>

          {/* Comment */}
          <button
            onClick={handleComment}
            className="flex items-center gap-1.5 text-[12px] font-bold px-3 py-1.5 rounded-full text-black/45 hover:bg-black/[0.07] hover:text-[#0A0A0A] transition-all duration-200"
          >
            <IconMessageCircle size={14} />
            <span>{formatCount(comments || 0)}</span>
          </button>

          {/* Summarize */}
          <button
            onClick={handleSummarize}
            disabled={isSummarizing}
            className="flex items-center gap-1.5 text-[12px] font-bold px-3 py-1.5 rounded-full text-black/45 hover:bg-black/[0.07] hover:text-[#0A0A0A] transition-all duration-200 disabled:opacity-40"
          >
            <IconBrain size={14} />
            <span>{isSummarizing ? '...' : 'AI'}</span>
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-[12px] font-bold px-3 py-1.5 rounded-full text-black/45 hover:bg-black/[0.07] hover:text-[#0A0A0A] transition-all duration-200 ml-auto"
          >
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

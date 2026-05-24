"use client"

import PostCard from '../../components/ui/PostCard';
import Sidebar from '../../components/ui/Sidebar';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { IconArrowLeft, IconSend } from '@tabler/icons-react';

interface Comment {
  comment: string;
  userId: string;
  createdAt?: string;
}

interface Post {
  _id: string;
  name: string;
  communitid: string;
  title: string;
  content: string;
  __v: number;
  likes: number;
  updatedAt: string;
  comments: Comment[];
}

export default function Page() {
  const projectId = useParams().id;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [post, setPost] = useState<Post>({
    _id: "", name: "", communitid: "", title: "", content: "",
    __v: 0, likes: 0, updatedAt: "", comments: []
  });

  useEffect(() => {
    const loadPost = async () => {
      setIsPageLoading(true);
      try {
        const response = await axios.post("/api/post/singlepost", { postId: projectId });
        if (response.data.data) {
          setPost(response.data.data);
          setPostComments(response.data.data.comments || []);
        } else {
          toast.error("Post not found");
          router.push("/");
        }
      } catch {
        toast.error("Failed to load post");
      } finally {
        setIsPageLoading(false);
      }
    };
    loadPost();
  }, [projectId]);

  const submitComment = async () => {
    if (!comment.trim()) { toast.error("Write a comment first"); return; }
    setIsLoading(true);
    const commentText = comment.trim();
    try {
      const cu = await axios.get("/api/user/currentuser");
      if (!cu.data.data?._id) {
        toast.error("Please login to comment");
        router.push("/Account/login");
        return;
      }
      const newComment = { comment: commentText, userId: cu.data.data._id, createdAt: new Date().toISOString() };
      setPostComments(prev => [...prev, newComment]);
      setComment("");
      await axios.post("/api/post/comments", { userId: cu.data.data._id, postId: post._id, comment: commentText });
    } catch (error: any) {
      setPostComments(prev => prev.slice(0, -1));
      setComment(commentText);
      if (error?.response?.status === 401) {
        toast.error("Please login to comment");
        router.push("/Account/login");
      } else {
        toast.error("Failed to post comment.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitComment(); }
  };

  const formatDate = (iso?: string) => {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const getInitial = (userId: string) => userId?.charAt(0)?.toUpperCase() || 'U';

  const AVATAR_COLORS = ['#FFD6E0','#FFF5CC','#C8F5E0','#CCE8FF','#E8CCFF','#FFE0CC'];
  const getAvatarColor = (userId: string) => {
    const hash = userId.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    return AVATAR_COLORS[hash % AVATAR_COLORS.length];
  };

  /* ── Loading ── */
  if (isPageLoading) {
    return (
      <div className="h-screen overflow-hidden flex bg-[#F2F2F2]">
        <div className="hidden md:flex w-[264px] lg:w-[282px] flex-shrink-0 h-screen overflow-y-auto">
          <Sidebar />
        </div>
        <main className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-2 border-black/10 border-t-black/50 rounded-full animate-spin" />
            <p className="text-sm text-black/30 font-medium">Loading post…</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden flex bg-[#F2F2F2]">

      {/* ── Left Sidebar ── */}
      <div className="hidden md:flex w-[264px] lg:w-[282px] flex-shrink-0 h-screen overflow-y-auto">
        <Sidebar />
      </div>

      {/* ── Main scrollable area ── */}
      <main className="flex-1 h-screen overflow-y-auto pb-16 md:pb-6">
        <div className="w-[90%] max-w-3xl mx-auto px-2 py-5">

          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm font-semibold text-black/40 hover:text-black/70 transition-colors mb-4 group"
          >
            <IconArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            Back
          </button>

          {/* Post card */}
          <PostCard
            postId={post._id}
            name={post.name}
            title={post.title}
            content={post.content}
            communityId={post.communitid}
            Tlike={post.likes}
            comments={postComments.length}
            showFullContent
          />

          {/* ── Comment input card ── */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-black/[0.04] mb-3 mt-1">
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-[#F2F2F2] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-black/35">U</span>
              </div>
              <div className="flex-1">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onKeyDown={handleKeyPress}
                  rows={2}
                  className="w-full resize-none bg-transparent outline-none text-sm text-[#0A0A0A] placeholder-black/25 leading-relaxed"
                  placeholder="Add a comment… (Enter to post)"
                  disabled={isLoading}
                />
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/[0.06]">
                  <span className="text-[11px] text-black/25">Shift+Enter for new line</span>
                  <button
                    onClick={submitComment}
                    disabled={isLoading || !comment.trim()}
                    className="flex items-center gap-1.5 bg-[#0A0A0A] hover:bg-[#333] disabled:opacity-35 text-white text-[12px] font-bold px-4 py-1.5 rounded-full transition-all duration-200"
                  >
                    <IconSend size={12} />
                    {isLoading ? 'Posting…' : 'Post'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Comments list ── */}
          <div className="space-y-2">
            <p className="text-[10px] font-semibold text-black/30 uppercase tracking-widest px-1 mb-3">
              {postComments.length} {postComments.length === 1 ? 'Comment' : 'Comments'}
            </p>

            {postComments.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/[0.04] text-center">
                <div className="w-12 h-12 rounded-full bg-[#F2F2F2] flex items-center justify-center mx-auto mb-3 text-xl">💬</div>
                <p className="text-sm font-semibold text-black/40">No comments yet</p>
                <p className="text-[12px] text-black/25 mt-1">Be the first to share your thoughts.</p>
              </div>
            ) : (
              postComments.map((item, index) => (
                <div
                  key={`${item.userId}-${index}`}
                  className="bg-white rounded-2xl px-4 py-3.5 shadow-sm border border-black/[0.04] hover:shadow transition-shadow duration-200"
                >
                  <div className="flex gap-3 items-start">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: getAvatarColor(item.userId) }}
                    >
                      <span className="text-xs font-bold text-black/50">{getInitial(item.userId)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[12px] font-bold text-[#0A0A0A]">Community Member</span>
                        {item.createdAt && (
                          <span className="text-[11px] text-black/25">{formatDate(item.createdAt)}</span>
                        )}
                      </div>
                      <p className="text-sm text-black/70 leading-relaxed">{item.comment}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </main>

    </div>
  );
}

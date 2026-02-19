"use client"

import { IconSearch, IconX } from "@tabler/icons-react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import PostCard from "./PostCard";

/* ── Skeleton ── */
const PASTEL_SKELETONS = ['#FFD6E0', '#FFF5CC', '#C8F5E0', '#CCE8FF'];

const PostSkeleton = ({ i }: { i: number }) => (
  <div
    className="w-full max-w-xl my-4 mx-auto rounded-[28px] p-5 animate-pulse"
    style={{ backgroundColor: PASTEL_SKELETONS[i % PASTEL_SKELETONS.length] }}
  >
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-black/10"></div>
        <div className="space-y-1.5">
          <div className="h-3 w-24 bg-black/10 rounded-full"></div>
          <div className="h-2 w-14 bg-black/[0.07] rounded-full"></div>
        </div>
      </div>
      <div className="h-7 w-12 bg-black/10 rounded-full"></div>
    </div>
    <div className="h-4 w-3/4 bg-black/10 rounded-full mb-2"></div>
    <div className="space-y-2">
      <div className="h-3 w-full bg-black/[0.07] rounded-full"></div>
      <div className="h-3 w-5/6 bg-black/[0.07] rounded-full"></div>
      <div className="h-3 w-4/6 bg-black/[0.07] rounded-full"></div>
    </div>
    <div className="flex gap-2 mt-4 pt-3 border-t border-black/[0.07]">
      <div className="h-6 w-12 bg-black/10 rounded-full"></div>
      <div className="h-6 w-12 bg-black/10 rounded-full"></div>
      <div className="h-6 w-10 bg-black/10 rounded-full"></div>
    </div>
  </div>
);

function MainContent() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/post/postdata");
      setPosts(res.data.postdata);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const searchPosts = useCallback(async (query: string) => {
    if (!query.trim()) { setSearchResults([]); setShowSearchResults(false); return; }
    try {
      setIsSearching(true);
      const res = await axios.get(`/api/search?q=${encodeURIComponent(query)}`);
      setSearchResults(res.data.posts);
      setShowSearchResults(true);
    } catch {
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => { fetchPosts(); }, []);

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowSearchResults(false);
  };

  const displayPosts = showSearchResults ? searchResults : posts;

  return (
    <div className="w-full max-w-2xl flex flex-col items-center mx-auto px-4 sm:px-6 py-8 gap-0">

      {/* ── Search bar ── */}
      <div className="w-full mb-6">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none">
            {isSearching
              ? <div className="w-4 h-4 border-2 border-white/30 border-t-white/70 rounded-full animate-spin" />
              : <IconSearch size={16} />
            }
          </div>
          <input
            type="text"
            className="w-full h-11 pl-10 pr-10 bg-[#1A1A1A] border border-white/[0.08] hover:border-white/[0.18] focus:border-white/40 rounded-2xl text-sm text-[#F0F0F0] placeholder-white/25 outline-none transition-all duration-200 font-medium"
            placeholder="Search posts... (Enter to search)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') searchPosts(searchQuery); }}
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
            >
              <IconX size={14} />
            </button>
          )}
        </div>
      </div>

      {/* ── Heading ── */}
      <div className="w-full flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-[#F0F0F0] !text-xl">
          {showSearchResults ? `Results (${searchResults.length})` : 'Feed'}
        </h1>
        {showSearchResults && (
          <button onClick={handleClearSearch} className="text-xs text-white/40 hover:text-white transition-colors font-medium underline underline-offset-2">
            Clear
          </button>
        )}
      </div>

      {/* ── Empty search ── */}
      {showSearchResults && searchResults.length === 0 && !isSearching && (
        <div className="text-center py-16">
          <p className="text-white/30 text-sm">No results for &ldquo;{searchQuery}&rdquo;</p>
        </div>
      )}

      {/* ── Skeletons ── */}
      {isLoading && !showSearchResults && (
        <div className="w-full">
          {[0, 1, 2].map(i => <PostSkeleton key={i} i={i} />)}
        </div>
      )}

      {/* ── Empty state ── */}
      {!isLoading && !showSearchResults && posts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="w-16 h-16 rounded-full bg-[#1A1A1A] flex items-center justify-center text-3xl">🛡️</div>
          <h2 className="text-[#F0F0F0] font-bold text-lg">No posts yet</h2>
          <p className="text-white/35 text-sm max-w-xs">Be the first to share a scam report or warning with the community.</p>
        </div>
      )}

      {/* ── Posts ── */}
      {!isLoading && displayPosts.map((post: any) => (
        <PostCard
          key={post._id}
          postId={post._id}
          name={post.name}
          title={post.title}
          content={post.content}
          communityId={post.communitid}
          Tlike={post.likes || 0}
          comments={post.comments?.length || 0}
          media={post.media}
        />
      ))}

    </div>
  );
}

export default MainContent;

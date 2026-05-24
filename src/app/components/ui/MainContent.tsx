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
    <div className="w-full max-w-xl flex flex-col items-center mx-auto px-3 sm:px-4 pt-4 pb-8 gap-0">

      {/* ── Mobile sticky top bar ── */}
      <div className="md:hidden w-full sticky top-0 z-40 bg-[#F2F2F2] pb-3 pt-1">
        <div className="flex items-center gap-2.5">
          <img src="/lastlogo.png" className="w-7 h-7 rounded-lg object-cover flex-shrink-0"
            alt="Scambaiters" onError={(e) => { (e.target as HTMLImageElement).style.display='none'; }} />
          <div className="flex-1 relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/30 pointer-events-none">
              {isSearching
                ? <div className="w-3.5 h-3.5 border-2 border-black/20 border-t-black/50 rounded-full animate-spin" />
                : <IconSearch size={15} />
              }
            </div>
            <input
              type="text"
              className="w-full h-10 pl-9 pr-9 bg-white border border-black/[0.08] rounded-full text-sm text-[#0A0A0A] placeholder-black/25 outline-none shadow-sm font-medium"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') searchPosts(searchQuery); }}
            />
            {searchQuery && (
              <button onClick={handleClearSearch}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-black/30">
                <IconX size={13} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Desktop Search bar ── */}
      <div className="hidden md:block w-full mb-6">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30 pointer-events-none">
            {isSearching
              ? <div className="w-4 h-4 border-2 border-black/20 border-t-black/50 rounded-full animate-spin" />
              : <IconSearch size={16} />
            }
          </div>
          <input
            type="text"
            className="w-full h-11 pl-10 pr-10 bg-white border border-black/[0.08] hover:border-black/[0.18] focus:border-black/30 rounded-2xl text-sm text-[#0A0A0A] placeholder-black/25 outline-none transition-all duration-200 font-medium shadow-sm"
            placeholder="Search posts... (Enter to search)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') searchPosts(searchQuery); }}
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-black/30 hover:text-black/60 transition-colors"
            >
              <IconX size={14} />
            </button>
          )}
        </div>
      </div>

      {/* ── Heading ── */}
      <div className="w-full flex items-center justify-between mb-4 mt-2 md:mt-0">
        <h1 className="text-xl font-bold text-[#0A0A0A] !text-xl">
          {showSearchResults ? `Results (${searchResults.length})` : 'Feed'}
        </h1>
        {showSearchResults && (
          <button onClick={handleClearSearch} className="text-xs text-black/40 hover:text-black transition-colors font-medium underline underline-offset-2">
            Clear
          </button>
        )}
      </div>

      {/* ── Empty search ── */}
      {showSearchResults && searchResults.length === 0 && !isSearching && (
        <div className="text-center py-16">
          <p className="text-black/40 text-sm">No results for &ldquo;{searchQuery}&rdquo;</p>
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
          <div className="w-16 h-16 rounded-full bg-[#F0F0F0] flex items-center justify-center text-3xl">🛡️</div>
          <h2 className="text-[#0A0A0A] font-bold text-lg">No posts yet</h2>
          <p className="text-black/40 text-sm max-w-xs">Be the first to share a scam report or warning with the community.</p>
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

"use client"

import PostCard from '../../components/ui/PostCard';
import Sidebar from '../../components/ui/Sidebar';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IconPlus, IconUsers } from '@tabler/icons-react';

function Page() {
  const Id = useParams().id;
  const [posts, setPosts] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const res = await axios.post("/api/communities/posts", { communityId: Id });
        setPosts(res.data.data.posts || []);
        setName(res.data.data.name || "");
        setDes(res.data.data.descripton || "");
      } catch (e) {
        console.error("Failed to fetch community", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCommunity();
  }, [Id]);

  return (
    <div className="h-screen overflow-hidden flex bg-[#F2F2F2]">

      {/* ── Left Sidebar ── */}
      <div className="hidden md:flex w-[264px] lg:w-[282px] flex-shrink-0 h-screen overflow-y-auto">
        <Sidebar />
      </div>

      {/* ── Main scrollable area ── */}
      <main className="flex-1 h-screen overflow-y-auto pb-16 md:pb-6">

        {/* ── Banner ── */}
        <div className="w-full">
          <div className="w-full h-40 md:h-52 overflow-hidden">
            <img
              src="https://i.pinimg.com/474x/cb/be/53/cbbe53813cb8c0c85ddeda0d23de874d.jpg"
              className="w-full h-full object-cover"
              alt="Community banner"
            />
          </div>

          {/* Community identity row */}
          <div className="bg-white px-5 pb-4 pt-0 flex items-end gap-4">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border-4 border-white shadow-md -mt-8 md:-mt-10 flex-shrink-0">
              <img
                src="https://i.pinimg.com/474x/11/17/0b/11170b186c0eaa633d1d4379f0063b8b.jpg"
                className="w-full h-full object-cover"
                alt="Community avatar"
              />
            </div>
            <div className="flex-1 flex items-center justify-between pb-1 min-w-0">
              <div className="min-w-0">
                <h1 className="text-lg font-bold text-[#0A0A0A] capitalize truncate">
                  {name || '—'}
                </h1>
                <p className="text-xs text-black/35 flex items-center gap-1 mt-0.5">
                  <IconUsers size={11} />
                  Community
                </p>
              </div>
              <button className="flex-shrink-0 flex items-center gap-1.5 bg-[#0A0A0A] hover:bg-[#333] text-white text-xs font-bold px-4 py-2 rounded-full transition-colors duration-200 ml-3">
                <IconPlus size={13} />
                Join
              </button>
            </div>
          </div>
        </div>

        {/* ── Body: Posts + Info columns ── */}
        <div className="flex flex-col lg:flex-row gap-3 p-4">

          {/* Posts column */}
          <div className="flex-1 min-w-0">

            {/* Pinned card */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-black/[0.04] mb-4">
              <p className="text-[10px] font-semibold text-black/30 uppercase tracking-widest mb-3">Pinned</p>
              <div className="flex gap-3">
                <div className="flex-1 h-32 rounded-xl overflow-hidden">
                  <img
                    src="https://i.pinimg.com/736x/49/59/cd/4959cd3181c1a770d2b1d6a91474d19e.jpg"
                    alt="Pinned 1"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 h-32 rounded-xl overflow-hidden">
                  <img
                    src="https://i.pinimg.com/736x/9d/be/22/9dbe226f8d37ddd559f5f99869325338.jpg"
                    alt="Pinned 2"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Posts list */}
            <p className="text-[10px] font-semibold text-black/30 uppercase tracking-widest mb-3 px-1">Posts</p>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="w-8 h-8 border-2 border-black/10 border-t-black/40 rounded-full animate-spin" />
              </div>
            ) : posts.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 shadow-sm border border-black/[0.04] text-center">
                <div className="text-3xl mb-3">📭</div>
                <p className="text-sm font-semibold text-black/40">No posts yet</p>
                <p className="text-xs text-black/25 mt-1">Be the first to post in this community.</p>
              </div>
            ) : (
              posts.map((post: any) => (
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
              ))
            )}
          </div>

          {/* Info column */}
          <div className="w-full lg:w-72 flex-shrink-0 space-y-3">

            {/* About card */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-black/[0.04]">
              <p className="text-[10px] font-semibold text-black/30 uppercase tracking-widest mb-3">About</p>
              <h2 className="text-sm font-bold text-[#0A0A0A] capitalize mb-2">{name}</h2>
              <p className="text-sm text-black/50 leading-relaxed">
                {des || 'No description available for this community.'}
              </p>
            </div>

            {/* Hall of fame card */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-black/[0.04]">
              <p className="text-[10px] font-semibold text-black/30 uppercase tracking-widest mb-3">Hall of Fame</p>
              <div className="flex items-center gap-3 py-1">
                <div className="w-9 h-9 rounded-full bg-[#FFF5CC] flex items-center justify-center flex-shrink-0 text-lg">🏆</div>
                <div>
                  <p className="text-sm font-semibold text-[#0A0A0A]">Top Contributors</p>
                  <p className="text-xs text-black/30 mt-0.5">Coming soon</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default Page;

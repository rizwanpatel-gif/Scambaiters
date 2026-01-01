"use client"

import { IconMessageCircle, IconShare, IconShield, IconBrain } from "@tabler/icons-react"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect, memo, useCallback } from "react";
import { toast } from "react-hot-toast";
import SummaryModal from "./SummaryModal";
import Image from 'next/image';
import { useMemo } from 'react';

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
    communityId: string;
    Tlike: number;
    comments: number;
    media?: MediaItem[];
}

const OptimizedPostCard = memo(function PostCard({
    postId, 
    name, 
    title, 
    content, 
    communityId, 
    Tlike, 
    comments, 
    media
}: PostCardProps) {
    const router = useRouter();
    const [likeCount, setLikeCount] = useState(Tlike || 0);
    const [hasLiked, setHasLiked] = useState(false);
    const [activeMediaIndex, setActiveMediaIndex] = useState(0);
    const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
    const [isSummarizing, setIsSummarizing] = useState(false);
    const [summarizedContent, setSummarizedContent] = useState("");
    const [lastSummarizeTime, setLastSummarizeTime] = useState(0);
    const [cardColor, setCardColor] = useState("rgb(255, 255, 255)");

    // Memoized functions
    const handleLike = useCallback(async () => {
        try {
            const currentUser = await axios.get("/api/user/currentuser");
            if (!currentUser.data.data?._id) {
                toast.error("Please login to like posts");
                router.push("/Account/login");
                return;
            }

            if (hasLiked) {
                setLikeCount(prev => prev - 1);
                setHasLiked(false);
            } else {
                setLikeCount(prev => prev + 1);
                setHasLiked(true);
            }

            await axios.post("/api/post/likes", {
                userId: currentUser.data.data._id,
                postId: postId
            });
        } catch (error: any) {
            // Revert the optimistic update
            if (hasLiked) {
                setLikeCount(prev => prev + 1);
                setHasLiked(true);
            } else {
                setLikeCount(prev => prev - 1);
                setHasLiked(false);
            }
            
            if (error?.response?.status === 401) {
                toast.error("Please login to like posts");
                router.push("/Account/login");
            } else {
                toast.error("Failed to update like");
            }
        }
    }, [hasLiked, postId, router]);

    const handleSummarize = useCallback(async () => {
        if (isSummarizing) return;
        
        const now = Date.now();
        if (now - lastSummarizeTime < 60000) {
            toast.error("Please wait a minute before requesting another summary");
            return;
        }

        try {
            setIsSummarizing(true);
            setIsSummaryModalOpen(true);
            setLastSummarizeTime(now);

            const response = await axios.post("/api/summarize", { text: content });
            setSummarizedContent(response.data.summary);
        } catch (error) {
            toast.error("Failed to generate summary");
            setIsSummaryModalOpen(false);
        } finally {
            setIsSummarizing(false);
        }
    }, [content, isSummarizing, lastSummarizeTime]);

    // Check like status on mount
    useEffect(() => {
        const checkLikeStatus = async () => {
            try {
                const currentUser = await axios.get("/api/user/currentuser");
                if (currentUser.data.data?._id) {
                    const user = await axios.get(`/api/user/${currentUser.data.data._id}`);
                    if (user.data.data?.postLiked) {
                        setHasLiked(user.data.data.postLiked.includes(postId));
                    }
                }
            } catch (error) {
                console.error("Failed to check like status:", error);
            }
        };

        checkLikeStatus();
    }, [postId]);

    // Media helper functions
    const isImage = useCallback((contentType: string) => contentType.startsWith('image/'), []);
    const isVideo = useCallback((contentType: string) => contentType.startsWith('video/'), []);

    const mediaControls = useMemo(() => {
        if (!media || media.length <= 1) return null;

        return (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {media.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveMediaIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                            index === activeMediaIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                        aria-label={`View media item ${index + 1}`}
                    />
                ))}
            </div>
        );
    }, [media, activeMediaIndex]);

    return (
        <>
            <article 
                className="w-full max-w-xl my-6 rounded-[38px] shadow-lg p-4 transition-transform transform hover:-translate-y-1 bg-white dark:bg-neutral-900 mx-auto flex flex-col gap-4"
                style={{ backgroundColor: cardColor }}
            >
                <header className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                        <div className="rounded-full w-10 h-10 overflow-hidden relative">
                            <Image 
                                src="https://via.placeholder.com/50" 
                                alt="Profile" 
                                width={40} 
                                height={40}
                                className="rounded-full"
                            />
                        </div>
                        <div className="ml-3">
                            <h3 
                                className="text-lg md:text-xl text-black font-semibold font-Roboto Flex cursor-pointer hover:underline"
                                onClick={() => router.push(`/community/${communityId}`)}
                            >
                                {name}
                            </h3>
                        </div>
                    </div>
                    <button 
                        className="text-white bg-black hover:bg-gray-800 mr-2 w-16 md:w-20 h-10 rounded-[38px] text-base md:text-lg font-Roboto Flex font-bold transition-colors"
                        onClick={() => router.push(`/community/${communityId}`)}
                    >
                        Join
                    </button>
                </header>
                
                <h2 className="text-black text-xl md:text-2xl font-Roboto Flex font-bold mb-2 md:mb-4">
                    {title}
                </h2>
                
                <div className="mb-2 md:mb-4">
                    <p 
                        className="text-black text-base md:text-lg font-semibold font-Roboto Flex cursor-pointer hover:opacity-90"
                        style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}
                        onClick={() => router.push(`/comments/${postId}`)}
                    >
                        {content}
                    </p>
                </div>

                {media && media.length > 0 && (
                    <div className="mb-2 md:mb-4">
                        <div className="relative rounded-lg overflow-hidden bg-black/5">
                            {isImage(media[activeMediaIndex].contentType) ? (
                                <Image
                                    src={`/api/media?id=${media[activeMediaIndex].fileId}`}
                                    alt={media[activeMediaIndex].filename}
                                    width={800}
                                    height={600}
                                    className="w-full max-h-72 md:max-h-[500px] object-contain"
                                />
                            ) : isVideo(media[activeMediaIndex].contentType) ? (
                                <video
                                    src={`/api/media?id=${media[activeMediaIndex].fileId}`}
                                    className="w-full max-h-72 md:max-h-[500px] object-contain"
                                    controls
                                />
                            ) : null}
                            {mediaControls}
                        </div>
                    </div>
                )}
                
                <footer className="flex flex-wrap gap-4 mt-2">
                    <button 
                        className={`flex items-center gap-2 transition-colors ${hasLiked ? 'text-green-600' : 'text-black'} hover:opacity-80`}
                        onClick={handleLike}
                    >
                        <IconShield className={hasLiked ? 'fill-current' : ''} />
                        <span>{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}</span>
                    </button>
                    
                    <button 
                        className="flex items-center gap-2 text-black hover:opacity-80"
                        onClick={() => router.push(`/comments/${postId}`)}
                    >
                        <IconMessageCircle />
                        <span>{comments || 0} {(comments || 0) === 1 ? 'Comment' : 'Comments'}</span>
                    </button>
                    
                    <button 
                        className="flex items-center gap-2 text-black hover:opacity-80"
                        onClick={handleSummarize}
                        disabled={isSummarizing}
                    >
                        <IconBrain />
                        <span>{isSummarizing ? 'Summarizing...' : 'Summarize'}</span>
                    </button>
                    
                    <button className="flex items-center gap-2 text-black hover:opacity-80">
                        <IconShare />
                        Share
                    </button>
                </footer>
            </article>

            <SummaryModal
                isOpen={isSummaryModalOpen}
                onClose={() => setIsSummaryModalOpen(false)}
                originalContent={content}
                summarizedContent={summarizedContent}
                isLoading={isSummarizing}
            />
        </>
    );
});

export default OptimizedPostCard;

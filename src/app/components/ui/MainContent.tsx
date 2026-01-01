"use client"

import { IconSearch } from "@tabler/icons-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useMemo } from "react";
import OptimizedPostCard from "./OptimizedPostCard";
// import { useCache } from "../context/CacheContext";
import PostCard from "./PostCard";
import { debounce } from "lodash";

// Loading skeleton component
const PostSkeleton = () => (
    <div className="glass-card w-full max-w-xl my-6 p-6 mx-auto flex flex-col gap-4 animate-pulse">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
                <div className="rounded-full w-10 h-10 bg-white/10"></div>
                <div className="space-y-2">
                    <div className="h-4 w-24 bg-white/10 rounded-full"></div>
                    <div className="h-3 w-16 bg-white/5 rounded-full"></div>
                </div>
            </div>
            <div className="w-16 h-10 bg-gray-300 dark:bg-gray-600 rounded-[38px]"></div>
        </div>
        
        <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
        
        <div className="space-y-2">
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-4 w-4/6 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-4 w-3/6 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
        
        <div className="flex gap-4 mt-2">
            <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-4 w-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
    </div>
);

function MainContent() {
const[posts,setposts]=useState([]);
const[searchQuery, setSearchQuery] = useState("");
const[isSearching, setIsSearching] = useState(false);
const[searchResults, setSearchResults] = useState([]);
const[showSearchResults, setShowSearchResults] = useState(false);
const[isLoading, setIsLoading] = useState(true);
const router =useRouter()

const Posts= async function () {
    try {
        setIsLoading(true);
        const response=await axios.get("http://localhost:3000/api/post/postdata");
        console.log(response.data.postdata)
        setposts(response.data.postdata);
    } catch (error) {
        console.log(error)
    } finally {
        setIsLoading(false);
    }
}

// Search function - only called when user hits Enter
const searchPosts = useCallback(async (query: string) => {
    if (!query.trim()) {
        setSearchResults([]);
        setShowSearchResults(false);
        return;
    }

    try {
        setIsSearching(true);
        const response = await axios.get(`/api/search?q=${encodeURIComponent(query)}`);
        setSearchResults(response.data.posts);
        setShowSearchResults(true);
    } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
    } finally {
        setIsSearching(false);
    }
}, []);

useEffect(()=>{
Posts()
},[])

const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
};

const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        searchPosts(searchQuery);
    }
};

const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowSearchResults(false);
};

// Determine which posts to display
const displayPosts = showSearchResults ? searchResults : posts;

    return (
        <div className="w-full max-w-2xl flex flex-col items-center mx-auto px-2 sm:px-4 md:px-8 py-4 gap-6">
            <div className="flex w-full justify-center items-center mb-4 relative">
                <div className="relative w-full">
                    <input 
                        type="text" 
                        className="w-full p-2 h-12 sm:h-16 bg-neutral-950 shadow-sm shadow-white border-none transition-transform transform hover:-translate-y-1 hover:shadow-md hover:shadow-white rounded-full border-green-300 pr-12 text-white" 
                        placeholder="Search posts by title... (Press Enter)"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onKeyDown={handleSearchSubmit}
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        {isSearching ? (
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        ) : searchQuery ? (
                            <button 
                                onClick={handleClearSearch}
                                className="text-white hover:text-gray-300"
                            >
                                ✕
                            </button>
                        ) : (
                            <IconSearch className="text-white" size={24} />
                        )}
                    </div>
                </div>
            </div>
            
            <h1 className="text-3xl font-Rampart font-extrabold text-white self-start ml-2 mb-4">
                {showSearchResults ? `Search Results (${searchResults.length})` : 'Feed'}
            </h1>
            
            {showSearchResults && searchResults.length === 0 && !isSearching && (
                <div className="text-white text-center py-8">
                    <p>No posts found for {searchQuery}</p>
                    <button 
                        onClick={handleClearSearch}
                        className="mt-2 text-blue-400 hover:text-blue-300 underline"
                    >
                        Clear search
                    </button>
                </div>
            )}
            
            {/* Show loading skeletons while initial posts are loading */}
            {isLoading && !showSearchResults && (
                <div className="w-full">
                    {[1, 2, 3].map((index) => (
                        <PostSkeleton key={index} />
                    ))}
                </div>
            )}
            
            {/* Show actual posts when loaded */}
            {!isLoading && displayPosts.map((post:any) => (
                <PostCard 
                    postId={post._id} 
                    name={post.name} 
                    title={post.title} 
                    content={post.content} 
                    communityId={post.communitid} 
                    Tlike={post.likes || 0} 
                    comments={post.comments?.length || 0} 
                    media={post.media} 
                    key={post._id} 
                />
            ))}
        </div>
    )
}

export default MainContent

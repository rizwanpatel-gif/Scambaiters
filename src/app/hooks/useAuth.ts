"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { toast } from 'react-hot-toast';

export function useAuth() {
    const router = useRouter();

    const getCurrentUser = useCallback(async () => {
        try {
            const response = await axios.get("/api/user/currentuser");
            return response.data.data;
        } catch (error) {
            return null;
        }
    }, []);

    const requireAuth = useCallback(async () => {
        const user = await getCurrentUser();
        if (!user) {
            toast.error("Please login to continue");
            router.push("/Account/login");
            return null;
        }
        return user;
    }, [router, getCurrentUser]);

    return {
        getCurrentUser,
        requireAuth
    };
}

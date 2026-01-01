"use client"

import React, { createContext, useContext, useReducer, useCallback } from 'react';

interface CacheState {
    posts: Record<string, any>;
    communities: Record<string, any>;
    users: Record<string, any>;
}

type CacheAction =
    | { type: 'SET_POST'; payload: { id: string; data: any } }
    | { type: 'SET_COMMUNITY'; payload: { id: string; data: any } }
    | { type: 'SET_USER'; payload: { id: string; data: any } }
    | { type: 'CLEAR_CACHE' };

const CacheContext = createContext<{
    state: CacheState;
    setPost: (id: string, data: any) => void;
    setCommunity: (id: string, data: any) => void;
    setUser: (id: string, data: any) => void;
    clearCache: () => void;
} | null>(null);

const initialState: CacheState = {
    posts: {},
    communities: {},
    users: {},
};

function cacheReducer(state: CacheState, action: CacheAction): CacheState {
    switch (action.type) {
        case 'SET_POST':
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [action.payload.id]: {
                        data: action.payload.data,
                        timestamp: Date.now(),
                    },
                },
            };
        case 'SET_COMMUNITY':
            return {
                ...state,
                communities: {
                    ...state.communities,
                    [action.payload.id]: {
                        data: action.payload.data,
                        timestamp: Date.now(),
                    },
                },
            };
        case 'SET_USER':
            return {
                ...state,
                users: {
                    ...state.users,
                    [action.payload.id]: {
                        data: action.payload.data,
                        timestamp: Date.now(),
                    },
                },
            };
        case 'CLEAR_CACHE':
            return initialState;
        default:
            return state;
    }
}

export function CacheProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(cacheReducer, initialState);

    const setPost = useCallback((id: string, data: any) => {
        dispatch({ type: 'SET_POST', payload: { id, data } });
    }, []);

    const setCommunity = useCallback((id: string, data: any) => {
        dispatch({ type: 'SET_COMMUNITY', payload: { id, data } });
    }, []);

    const setUser = useCallback((id: string, data: any) => {
        dispatch({ type: 'SET_USER', payload: { id, data } });
    }, []);

    const clearCache = useCallback(() => {
        dispatch({ type: 'CLEAR_CACHE' });
    }, []);

    return (
        <CacheContext.Provider value={{ state, setPost, setCommunity, setUser, clearCache }}>
            {children}
        </CacheContext.Provider>
    );
}

export function useCache() {
    const context = useContext(CacheContext);
    if (!context) {
        throw new Error('useCache must be used within a CacheProvider');
    }
    return context;
}

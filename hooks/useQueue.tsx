import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';
import { Post } from '../types';

interface QueueContextType {
  queue: Post[];
  addToQueue: (post: Omit<Post, 'id' | 'status'>) => void;
  removeFromQueue: (postId: string) => void;
  updatePost: (post: Post) => void;
}

const QueueContext = createContext<QueueContextType | undefined>(undefined);

const mockQueue: Post[] = [
    {
        id: 'post1',
        pageId: '1',
        text: 'Just tasted the most amazing ramen in Tokyo! 🍜 The broth was rich and the noodles were perfectly chewy. A must-try for any foodie visiting Japan! #GourmetTravels #TokyoEats #RamenLover',
        imageUrl: 'https://picsum.photos/seed/food1/1200/630',
        status: 'queued',
        scheduledAt: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // tomorrow
    },
    {
        id: 'post2',
        pageId: '2',
        text: 'Excited to announce our new AI-powered analytics platform! 🚀 It provides real-time insights to help businesses make smarter decisions. Learn more at our website. #AI #Tech #Innovation',
        imageUrl: 'https://picsum.photos/seed/tech1/1200/630',
        status: 'queued',
        scheduledAt: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    }
];

export const QueueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [queue, setQueue] = useState<Post[]>(mockQueue);

  const addToQueue = useCallback((postData: Omit<Post, 'id' | 'status'>) => {
    const newPost: Post = {
      ...postData,
      id: `post-${Date.now()}`,
      status: 'queued',
    };
    setQueue(prevQueue => [...prevQueue, newPost]);
  }, []);

  const removeFromQueue = useCallback((postId: string) => {
    setQueue(prevQueue => prevQueue.filter(post => post.id !== postId));
  }, []);

  const updatePost = useCallback((updatedPost: Post) => {
    setQueue(prevQueue => prevQueue.map(post => (post.id === updatedPost.id ? updatedPost : post)));
  }, []);

  const value = useMemo(() => ({ queue, addToQueue, removeFromQueue, updatePost }), [queue, addToQueue, removeFromQueue, updatePost]);

  return <QueueContext.Provider value={value}>{children}</QueueContext.Provider>;
};

export const useQueue = (): QueueContextType => {
  const context = useContext(QueueContext);
  if (context === undefined) {
    throw new Error('useQueue must be used within a QueueProvider');
  }
  return context;
};

import React from 'react';
import { Post } from '../types';
import { useAuth } from '../hooks/useAuth';
import Card from './Card';

interface PostPreviewProps {
  post: Post;
  actions?: React.ReactNode;
}

const PostPreview: React.FC<PostPreviewProps> = ({ post, actions }) => {
  const { pages } = useAuth();
  const page = pages.find(p => p.id === post.pageId);

  if (!page) {
    return null; // Or some fallback UI
  }

  return (
    <Card className="max-w-xl mx-auto">
      <div className="flex items-center mb-4">
        <img src={page.avatarUrl} alt={page.name} className="h-10 w-10 rounded-full mr-3" />
        <div>
          <p className="font-semibold text-gray-800">{page.name}</p>
          {post.scheduledAt && (
            <p className="text-xs text-gray-500">
              Scheduled for: {post.scheduledAt.toLocaleString()}
            </p>
          )}
        </div>
      </div>
      <p className="text-gray-800 whitespace-pre-wrap mb-4">{post.text}</p>
      {post.imageUrl && (
        <div className="rounded-lg overflow-hidden border border-gray-200">
          <img src={post.imageUrl} alt="Post visual" className="w-full object-cover" />
        </div>
      )}
      {actions && (
        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end space-x-2">
            {actions}
        </div>
      )}
    </Card>
  );
};

export default PostPreview;

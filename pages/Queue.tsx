import React from 'react';
import { FacebookPage } from '../types';
import { useQueue } from '../hooks/useQueue';
import PostPreview from '../components/PostPreview';
import Button from '../components/Button';

interface QueueProps {
  pages: FacebookPage[];
}

const Queue: React.FC<QueueProps> = () => {
  const { queue, removeFromQueue } = useQueue();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Scheduled Posts</h1>
        <p className="mt-1 text-sm text-gray-500">
          Here are the posts that are scheduled to be published.
        </p>
      </div>

      {queue.length > 0 ? (
        <div className="grid gap-8 lg:grid-cols-2">
          {queue
            .slice()
            .sort((a, b) => (a.scheduledAt?.getTime() ?? 0) - (b.scheduledAt?.getTime() ?? 0))
            .map((post) => (
              <PostPreview 
                key={post.id} 
                post={post}
                actions={
                  <>
                    <Button variant="secondary">Edit</Button>
                    <Button variant="danger" onClick={() => removeFromQueue(post.id)}>Delete</Button>
                  </>
                }
              />
            ))}
        </div>
      ) : (
        <div className="text-center py-12 px-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Your queue is empty</h3>
          <p className="mt-1 text-sm text-gray-500">
            Create a new post from the Dashboard to see it here.
          </p>
        </div>
      )}
    </div>
  );
};

export default Queue;

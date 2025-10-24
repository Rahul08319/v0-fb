export interface User {
  name: string;
  avatarUrl: string;
}

export interface FacebookPage {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Post {
  id: string;
  pageId: string;
  text: string;
  imageUrl?: string;
  status: 'draft' | 'queued' | 'posted' | 'error';
  scheduledAt: Date | null;
}

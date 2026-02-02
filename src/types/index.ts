export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio?: string;
  coverImage?: string;
}

export interface WebApp {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  author: User;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  tags: string[];
  createdAt: string;
  appType: 'link' | 'code' | 'package';
  appUrl?: string;
  codeSnippet?: string;
  featured?: boolean;
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  createdAt: string;
  likes: number;
}

export interface AgentConfig {
  name: string;
  personality: string;
  knowledge: string[];
  contactRules: string;
}

export interface DiscussionPost {
  id: string;
  title: string;
  content: string;
  author: User;
  category: 'tutorial' | 'tips' | 'showcase' | 'question';
  tags: string[];
  likes: number;
  replies: number;
  views: number;
  createdAt: string;
  thumbnail?: string;
}

export interface RankingItem {
  rank: number;
  app: WebApp;
  trendingScore?: number;
}

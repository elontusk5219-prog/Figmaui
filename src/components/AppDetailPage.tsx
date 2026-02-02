import { useState } from 'react';
import { WebApp, Comment } from '../types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import {
  Heart,
  MessageCircle,
  Share2,
  ArrowLeft,
  ExternalLink,
  Code,
  User,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AppDetailPageProps {
  app: WebApp;
  onBack: () => void;
  onViewProfile: (userId: string) => void;
}

const mockComments: Comment[] = [
  {
    id: '1',
    user: {
      id: '4',
      name: '张三',
      username: 'zhangsan',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangsan',
    },
    content: '这个应用太棒了！界面很简洁，功能也很实用。',
    createdAt: '2026-01-30',
    likes: 12,
  },
  {
    id: '2',
    user: {
      id: '5',
      name: '赵丽',
      username: 'zhaoli',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhaoli',
    },
    content: '能分享一下技术栈吗？想学习一下',
    createdAt: '2026-01-29',
    likes: 8,
  },
];

export function AppDetailPage({ app, onBack, onViewProfile }: AppDetailPageProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(app.likes);
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    toast.success(isLiked ? '取消点赞' : '点赞成功！');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('链接已复制到剪贴板！');
  };

  const handleComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      user: {
        id: 'current',
        name: '当前用户',
        username: 'current',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=current',
      },
      content: newComment,
      createdAt: new Date().toISOString().split('T')[0],
      likes: 0,
    };

    setComments([comment, ...comments]);
    setNewComment('');
    toast.success('评论发布成功！');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 顶部操作栏 */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="px-3 py-2 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onBack} className="-ml-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <div className="flex items-center gap-1">
            <Button
              variant={isLiked ? 'default' : 'ghost'}
              size="icon"
              onClick={handleLike}
              className={isLiked ? "bg-primary text-white hover:bg-primary/90 rounded-full" : "rounded-full"}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleShare} className="rounded-full">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4 pb-8">
        {/* 应用预览 */}
        <div className="bg-white">
          <img
            src={app.thumbnail}
            alt={app.title}
            className="w-full aspect-video object-cover"
          />
          <div className="p-4 grid grid-cols-2 gap-3">
            {app.appType === 'link' && app.appUrl && (
              <Button className="w-full bg-primary hover:bg-primary/90 shadow-md shadow-primary/20" asChild>
                <a href={app.appUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  打开应用
                </a>
              </Button>
            )}
            {app.appType === 'code' && app.codeSnippet && (
              <Button className="w-full" variant="outline" asChild>
                <a href={app.codeSnippet} target="_blank" rel="noopener noreferrer">
                  <Code className="w-4 h-4 mr-2" />
                  查看代码
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* 应用信息 */}
        <div className="bg-white p-4 space-y-4">
          <div>
            <h1 className="text-xl font-bold mb-2">{app.title}</h1>
            <p className="text-gray-600 text-sm leading-relaxed">{app.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {app.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-gray-100 font-normal">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between py-3 border-t border-b border-gray-50">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={app.author.avatar} alt={app.author.name} />
                <AvatarFallback>{app.author.name[0]}</AvatarFallback>
              </Avatar>
              <div onClick={() => onViewProfile(app.author.id)} className="cursor-pointer">
                <p className="font-bold text-sm">{app.author.name}</p>
                <p className="text-xs text-gray-500">@{app.author.username}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewProfile(app.author.id)}
              className="rounded-full text-xs h-8"
            >
              <User className="w-3 h-3 mr-1" />
              主页
            </Button>
          </div>
        </div>

        {/* 评论区 */}
        <div className="bg-white p-4 space-y-5">
          <h2 className="text-lg font-bold flex items-center gap-2">
            评论 <span className="text-gray-400 text-sm font-normal">{comments.length}</span>
          </h2>

          {/* 发表评论 */}
          <div className="flex gap-3">
             <Avatar className="w-8 h-8">
                <AvatarFallback>我</AvatarFallback>
             </Avatar>
             <div className="flex-1 space-y-2">
                <Textarea
                  placeholder="说点好听的..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={2}
                  className="bg-gray-50 border-none resize-none focus:ring-1 focus:ring-primary/20 text-sm"
                />
                <div className="flex justify-end">
                  <Button onClick={handleComment} size="sm" className="h-8 text-xs bg-primary hover:bg-primary/90">发送</Button>
                </div>
             </div>
          </div>

          {/* 评论列表 */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="w-8 h-8 mt-1">
                  <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                  <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-gray-700">{comment.user.name}</span>
                    <button className="flex items-center gap-1 text-gray-400 hover:text-pink-500 transition-colors">
                       <Heart className="w-3 h-3" />
                       <span className="text-xs">{comment.likes}</span>
                    </button>
                  </div>
                  <p className="text-gray-800 text-sm">{comment.content}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-400">{comment.createdAt}</span>
                    <button className="text-xs text-gray-500 font-medium">回复</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

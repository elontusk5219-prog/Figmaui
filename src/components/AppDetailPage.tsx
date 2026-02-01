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
    <div className="min-h-screen bg-gray-50">
      {/* 顶部操作栏 */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            返回
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant={isLiked ? 'default' : 'outline'}
              size="sm"
              onClick={handleLike}
            >
              <Heart className={`w-4 h-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
              {likes}
            </Button>
            <Button variant="outline" size="sm">
              <MessageCircle className="w-4 h-4 mr-1" />
              {comments.length}
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-1" />
              分享
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧主内容 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 应用预览 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img
                src={app.thumbnail}
                alt={app.title}
                className="w-full aspect-video object-cover"
              />
              {app.appType === 'link' && app.appUrl && (
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <Button className="w-full" asChild>
                    <a href={app.appUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      打开应用
                    </a>
                  </Button>
                </div>
              )}
              {app.appType === 'code' && app.codeSnippet && (
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <Button className="w-full" variant="outline" asChild>
                    <a href={app.codeSnippet} target="_blank" rel="noopener noreferrer">
                      <Code className="w-4 h-4 mr-2" />
                      查看代码
                    </a>
                  </Button>
                </div>
              )}
            </div>

            {/* 应用信息 */}
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">{app.title}</h1>
                <p className="text-gray-600">{app.description}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {app.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={app.author.avatar} alt={app.author.name} />
                    <AvatarFallback>{app.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{app.author.name}</p>
                    <p className="text-sm text-gray-500">@{app.author.username}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => onViewProfile(app.author.id)}
                >
                  <User className="w-4 h-4 mr-1" />
                  查看主页
                </Button>
              </div>
            </div>

            {/* 评论区 */}
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
              <h2 className="text-xl font-semibold">评论 ({comments.length})</h2>

              {/* 发表评论 */}
              <div className="space-y-3">
                <Textarea
                  placeholder="说说你的想法..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                />
                <div className="flex justify-end">
                  <Button onClick={handleComment}>发表评论</Button>
                </div>
              </div>

              <Separator />

              {/* 评论列表 */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar>
                      <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                      <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{comment.user.name}</span>
                        <span className="text-sm text-gray-500">{comment.createdAt}</span>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <button className="hover:text-pink-600 transition-colors flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {comment.likes}
                        </button>
                        <button className="hover:text-blue-600 transition-colors">
                          回复
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧信息 */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-4 space-y-3">
              <h3 className="font-semibold">应用信息</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">发布时间</span>
                  <span>{app.createdAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">应用类型</span>
                  <span>
                    {app.appType === 'link' && '在线应用'}
                    {app.appType === 'code' && '代码片段'}
                    {app.appType === 'package' && '组件包'}
                    {app.appType === 'python' && 'Python脚本'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">点赞数</span>
                  <span>{likes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">评论数</span>
                  <span>{comments.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">分享数</span>
                  <span>{app.shares}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

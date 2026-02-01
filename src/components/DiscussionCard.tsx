import { DiscussionPost } from '../types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Heart, MessageCircle, Eye } from 'lucide-react';

interface DiscussionCardProps {
  post: DiscussionPost;
  onClick: () => void;
}

const categoryLabels = {
  tutorial: '教程',
  tips: '经验',
  showcase: '作品展示',
  question: '提问',
};

const categoryColors = {
  tutorial: 'bg-blue-100 text-blue-700 border-blue-200',
  tips: 'bg-green-100 text-green-700 border-green-200',
  showcase: 'bg-purple-100 text-purple-700 border-purple-200',
  question: 'bg-orange-100 text-orange-700 border-orange-200',
};

export function DiscussionCard({ post, onClick }: DiscussionCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-4 hover:shadow-md transition-all cursor-pointer border border-gray-100"
    >
      <div className="flex gap-3">
        {/* 左侧头像 */}
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarImage src={post.author.avatar} alt={post.author.name} />
          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
        </Avatar>

        {/* 右侧内容 */}
        <div className="flex-1 min-w-0">
          {/* 分类和标题 */}
          <div className="flex items-start gap-2 mb-2">
            <Badge
              variant="outline"
              className={`text-xs flex-shrink-0 ${categoryColors[post.category]}`}
            >
              {categoryLabels[post.category]}
            </Badge>
            <h3 className="font-medium line-clamp-2 flex-1">{post.title}</h3>
          </div>

          {/* 内容预览 */}
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{post.content}</p>

          {/* 标签 */}
          <div className="flex flex-wrap gap-1 mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* 底部信息 */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{post.author.name}</span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>{post.replies}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{post.views}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

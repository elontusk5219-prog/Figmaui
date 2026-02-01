import { WebApp } from '../types';
import { Heart, MessageCircle, Share2, ExternalLink, Code, Package, FileCode } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

interface AppCardProps {
  app: WebApp;
  onClick: () => void;
}

export function AppCard({ app, onClick }: AppCardProps) {
  const getAppTypeIcon = () => {
    switch (app.appType) {
      case 'link':
        return <ExternalLink className="w-3 h-3" />;
      case 'code':
        return <Code className="w-3 h-3" />;
      case 'package':
        return <Package className="w-3 h-3" />;
      case 'python':
        return <FileCode className="w-3 h-3" />;
    }
  };

  const getAppTypeLabel = () => {
    switch (app.appType) {
      case 'link':
        return '在线应用';
      case 'code':
        return '代码片段';
      case 'package':
        return '组件包';
      case 'python':
        return 'Python脚本';
    }
  };

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer border border-gray-100"
    >
      {/* 缩略图 */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={app.thumbnail}
          alt={app.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          {app.featured && (
            <Badge className="bg-primary text-white border-0 shadow-md">
              精选
            </Badge>
          )}
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
            <span className="mr-1">{getAppTypeIcon()}</span>
            {getAppTypeLabel()}
          </Badge>
        </div>
      </div>

      {/* 内容 */}
      <div className="p-4">
        <h3 className="font-semibold mb-2 line-clamp-1">{app.title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{app.description}</p>

        {/* 标签 */}
        <div className="flex flex-wrap gap-1 mb-3">
          {app.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs bg-gray-50">
              {tag}
            </Badge>
          ))}
        </div>

        {/* 作者和互动数据 */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={app.author.avatar} alt={app.author.name} />
              <AvatarFallback>{app.author.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-700">{app.author.name}</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-primary" />
              <span>{app.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <span>{app.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
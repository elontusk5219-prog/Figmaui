import { WebApp } from '../types';
import { Heart, ExternalLink, Code, Package } from 'lucide-react';
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
    }
  };

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100"
    >
      {/* 缩略图 */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={app.thumbnail}
          alt={app.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-1.5 right-1.5 flex gap-1">
          {app.featured && (
            <Badge className="bg-primary/90 text-white border-0 shadow-sm text-[10px] px-1.5 h-5">
              精选
            </Badge>
          )}
        </div>
        <div className="absolute bottom-1.5 left-1.5">
           <div className="bg-black/50 backdrop-blur-md rounded-full px-2 py-0.5 flex items-center gap-1 text-[10px] text-white">
              {getAppTypeIcon()}
              <span>
                {app.appType === 'link' && 'Link'}
                {app.appType === 'code' && 'Code'}
                {app.appType === 'package' && 'Pkg'}
              </span>
           </div>
        </div>
      </div>

      {/* 内容 */}
      <div className="p-3">
        <h3 className="font-semibold mb-1 text-sm line-clamp-1">{app.title}</h3>
        <p className="text-xs text-gray-500 mb-2 line-clamp-2">{app.description}</p>

        {/* 作者和互动数据 */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <div className="flex items-center gap-1.5">
            <Avatar className="w-5 h-5">
              <AvatarImage src={app.author.avatar} alt={app.author.name} />
              <AvatarFallback className="text-[10px]">{app.author.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-gray-600 truncate max-w-[60px]">{app.author.name}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <div className="flex items-center gap-0.5">
              <Heart className="w-3 h-3 text-primary" />
              <span>{app.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

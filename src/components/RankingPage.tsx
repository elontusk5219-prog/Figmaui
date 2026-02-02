import { useState } from 'react';
import { WebApp } from '../types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { ArrowLeft, TrendingUp, Heart, Eye, Calendar, Crown, Award, Medal } from 'lucide-react';

interface RankingPageProps {
  apps: WebApp[];
  onBack: () => void;
  onAppClick: (appId: string) => void;
}

export function RankingPage({ apps, onBack, onAppClick }: RankingPageProps) {
  const [activeTab, setActiveTab] = useState('hot');

  // 热门排行 - 按点赞数
  const hotApps = [...apps].sort((a, b) => b.likes - a.likes).slice(0, 20);
  
  // 浏览排行 - 按浏览数
  const viewApps = [...apps].sort((a, b) => b.views - a.views).slice(0, 20);
  
  // 最新排行 - 按日期
  const newApps = [...apps].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 20);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Award className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-orange-400" />;
    return null;
  };

  const getRankBadge = (rank: number) => {
    if (rank <= 3) {
      const colors = ['bg-gradient-to-r from-yellow-400 to-orange-500', 'bg-gradient-to-r from-gray-300 to-gray-400', 'bg-gradient-to-r from-orange-300 to-orange-400'];
      return (
        <div className={`w-6 h-6 rounded-full ${colors[rank - 1]} flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
          {rank}
        </div>
      );
    }
    return (
      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-xs font-semibold">
        {rank}
      </div>
    );
  };

  const RankingList = ({ apps: rankApps, metric }: { apps: WebApp[]; metric: 'likes' | 'views' | 'date' }) => (
    <div className="space-y-3 pb-8">
      {rankApps.map((app, index) => (
        <div
          key={app.id}
          onClick={() => onAppClick(app.id)}
          className="bg-white rounded-xl p-3 flex items-center gap-3 active:scale-[0.99] transition-transform cursor-pointer border-b border-gray-50 last:border-0"
        >
          {/* 排名 */}
          <div className="flex-shrink-0 w-6 flex justify-center">
            {getRankBadge(index + 1)}
          </div>

          {/* 缩略图 */}
          <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-gray-100">
            <img
              src={app.thumbnail}
              alt={app.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 内容 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-medium text-sm line-clamp-1 flex items-center gap-1">
                {app.title}
                {index < 3 && getRankIcon(index + 1)}
              </h3>
              {metric === 'likes' && (
                  <div className="flex items-center gap-1 text-xs font-medium text-primary bg-primary/5 px-1.5 py-0.5 rounded-full">
                    <Heart className="w-3 h-3" />
                    <span>{app.likes}</span>
                  </div>
              )}
              {metric === 'views' && (
                  <div className="flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full">
                    <Eye className="w-3 h-3" />
                    <span>{app.views}</span>
                  </div>
              )}
            </div>
            
            <p className="text-xs text-gray-500 line-clamp-1 mb-2">{app.description}</p>
            
            <div className="flex items-center gap-2">
              <Avatar className="w-4 h-4">
                <AvatarImage src={app.author.avatar} alt={app.author.name} />
                <AvatarFallback className="text-[10px]">{app.author.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-xs text-gray-500">{app.author.name}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full bg-white p-1 h-10 shadow-sm rounded-xl grid grid-cols-3 mb-4 sticky top-16 z-30">
            <TabsTrigger 
              value="hot" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg text-xs font-medium transition-all"
            >
              🔥 热门榜
            </TabsTrigger>
            <TabsTrigger 
              value="views" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg text-xs font-medium transition-all"
            >
              👀 浏览榜
            </TabsTrigger>
            <TabsTrigger 
              value="new" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg text-xs font-medium transition-all"
            >
              ✨ 最新榜
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hot" className="mt-0">
            <RankingList apps={hotApps} metric="likes" />
          </TabsContent>

          <TabsContent value="views" className="mt-0">
            <RankingList apps={viewApps} metric="views" />
          </TabsContent>

          <TabsContent value="new" className="mt-0">
            <RankingList apps={newApps} metric="date" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

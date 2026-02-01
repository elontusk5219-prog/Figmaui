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
        <div className={`w-8 h-8 rounded-full ${colors[rank - 1]} flex items-center justify-center text-white font-bold shadow-md`}>
          {rank}
        </div>
      );
    }
    return (
      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-semibold">
        {rank}
      </div>
    );
  };

  const RankingList = ({ apps: rankApps, metric }: { apps: WebApp[]; metric: 'likes' | 'views' | 'date' }) => (
    <div className="space-y-3">
      {rankApps.map((app, index) => (
        <div
          key={app.id}
          onClick={() => onAppClick(app.id)}
          className="bg-white rounded-xl p-4 hover:shadow-md transition-all cursor-pointer border border-gray-100 flex items-center gap-4"
        >
          {/* 排名 */}
          <div className="flex-shrink-0">
            {getRankBadge(index + 1)}
          </div>

          {/* 缩略图 */}
          <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
            <img
              src={app.thumbnail}
              alt={app.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 内容 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-medium line-clamp-1 flex items-center gap-2">
                {app.title}
                {index < 3 && getRankIcon(index + 1)}
              </h3>
              {app.featured && (
                <Badge variant="secondary" className="bg-red-50 text-primary border-red-200 flex-shrink-0">
                  精选
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-600 line-clamp-1 mb-2">{app.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="w-5 h-5">
                  <AvatarImage src={app.author.avatar} alt={app.author.name} />
                  <AvatarFallback className="text-xs">{app.author.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-600">{app.author.name}</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-500">
                {metric === 'likes' && (
                  <div className="flex items-center gap-1 font-semibold text-primary">
                    <Heart className="w-4 h-4" />
                    <span>{app.likes}</span>
                  </div>
                )}
                {metric === 'views' && (
                  <div className="flex items-center gap-1 font-semibold text-blue-600">
                    <Eye className="w-4 h-4" />
                    <span>{app.views}</span>
                  </div>
                )}
                {metric === 'date' && (
                  <div className="flex items-center gap-1 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{app.createdAt}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            返回
          </Button>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-bold">排行榜</h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white mb-6 p-1 rounded-lg shadow-sm">
            <TabsTrigger value="hot" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              🔥 热门榜
            </TabsTrigger>
            <TabsTrigger value="views" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              👀 浏览榜
            </TabsTrigger>
            <TabsTrigger value="new" className="data-[state=active]:bg-primary data-[state=active]:text-white">
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

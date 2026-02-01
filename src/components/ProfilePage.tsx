import { useState } from 'react';
import { User, WebApp } from '../types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { AppCard } from './AppCard';
import { MasonryGrid } from './MasonryGrid';
import { ArrowLeft, MessageCircle, Settings, MapPin, Calendar, Link as LinkIcon } from 'lucide-react';

interface ProfilePageProps {
  user: User;
  apps: WebApp[];
  onBack: () => void;
  onAppClick: (appId: string) => void;
  onChatWithAgent: () => void;
}

export function ProfilePage({
  user,
  apps,
  onBack,
  onAppClick,
  onChatWithAgent,
}: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState('works');
  const userApps = apps.filter((app) => app.author.id === user.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            返回
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-1" />
            设置
          </Button>
        </div>
      </div>

      {/* 封面图 */}
      {user.coverImage && (
        <div className="w-full h-48 md:h-64 bg-gradient-to-r from-purple-400 to-pink-400 overflow-hidden">
          <img
            src={user.coverImage}
            alt="封面"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* 个人信息 */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="relative bg-white rounded-lg shadow-sm -mt-16 mb-6 p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* 头像 */}
            <Avatar className="w-24 h-24 border-4 border-white shadow-md">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-2xl">{user.name[0]}</AvatarFallback>
            </Avatar>

            {/* 信息 */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
                <div>
                  <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
                  <p className="text-gray-600">@{user.username}</p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={onChatWithAgent}>
                    <MessageCircle className="w-4 h-4 mr-1" />
                    与AI助手对话
                  </Button>
                  <Button variant="outline">关注</Button>
                </div>
              </div>

              {user.bio && (
                <p className="text-gray-700 mb-4">{user.bio}</p>
              )}

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  加入于 2025年12月
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  中国
                </div>
              </div>

              <div className="flex gap-6 mt-4 text-sm">
                <div>
                  <span className="font-semibold">{userApps.length}</span>
                  <span className="text-gray-600 ml-1">作品</span>
                </div>
                <div>
                  <span className="font-semibold">1.2k</span>
                  <span className="text-gray-600 ml-1">关注者</span>
                </div>
                <div>
                  <span className="font-semibold">345</span>
                  <span className="text-gray-600 ml-1">关注中</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 标签页 */}
        <div className="bg-white rounded-lg shadow-sm">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="border-b border-gray-200 px-6">
              <TabsList className="bg-transparent">
                <TabsTrigger value="works" className="data-[state=active]:border-b-2 data-[state=active]:border-purple-600">
                  作品 ({userApps.length})
                </TabsTrigger>
                <TabsTrigger value="liked" className="data-[state=active]:border-b-2 data-[state=active]:border-purple-600">
                  点赞过的
                </TabsTrigger>
                <TabsTrigger value="collections" className="data-[state=active]:border-b-2 data-[state=active]:border-purple-600">
                  收藏
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              <TabsContent value="works" className="mt-0">
                {userApps.length > 0 ? (
                  <MasonryGrid>
                    {userApps.map((app) => (
                      <AppCard
                        key={app.id}
                        app={app}
                        onClick={() => onAppClick(app.id)}
                      />
                    ))}
                  </MasonryGrid>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    还没有发布作品
                  </div>
                )}
              </TabsContent>

              <TabsContent value="liked" className="mt-0">
                <div className="text-center py-12 text-gray-500">
                  暂无点赞的作品
                </div>
              </TabsContent>

              <TabsContent value="collections" className="mt-0">
                <div className="text-center py-12 text-gray-500">
                  暂无收藏
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

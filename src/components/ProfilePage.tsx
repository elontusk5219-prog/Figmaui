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
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 顶部导航 - Mobile Transparent/Float */}
      <div className="fixed top-0 left-0 right-0 z-40 p-3 flex justify-between items-start pointer-events-none">
        <Button variant="secondary" size="icon" onClick={onBack} className="pointer-events-auto shadow-sm bg-black/20 text-white hover:bg-black/30 border-none rounded-full backdrop-blur-sm h-8 w-8">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Button variant="secondary" size="icon" className="pointer-events-auto shadow-sm bg-black/20 text-white hover:bg-black/30 border-none rounded-full backdrop-blur-sm h-8 w-8">
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {/* 封面图 */}
      <div className="w-full h-40 bg-gradient-to-r from-primary/80 to-purple-500 overflow-hidden relative">
        {user.coverImage && (
          <img
            src={user.coverImage}
            alt="封面"
            className="w-full h-full object-cover opacity-80"
          />
        )}
      </div>

      {/* 个人信息卡片 */}
      <div className="relative px-4 -mt-10 mb-4">
        <div className="flex flex-col items-start gap-3">
          {/* 头像 */}
          <div className="relative">
             <Avatar className="w-20 h-20 border-[3px] border-white shadow-md">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-xl">{user.name[0]}</AvatarFallback>
             </Avatar>
          </div>

          {/* 名字和ID */}
          <div className="w-full">
            <h1 className="text-xl font-bold">{user.name}</h1>
            <p className="text-gray-500 text-sm">@{user.username}</p>
          </div>

          {/* 简介 */}
          {user.bio && (
             <p className="text-gray-700 text-sm leading-relaxed w-full">{user.bio}</p>
          )}

          {/* 统计 */}
          <div className="flex gap-6 text-sm w-full py-2">
             <div className="flex flex-col items-center">
               <span className="font-bold text-gray-900">{userApps.length}</span>
               <span className="text-xs text-gray-500">作品</span>
             </div>
             <div className="flex flex-col items-center">
               <span className="font-bold text-gray-900">1.2k</span>
               <span className="text-xs text-gray-500">关注者</span>
             </div>
             <div className="flex flex-col items-center">
               <span className="font-bold text-gray-900">345</span>
               <span className="text-xs text-gray-500">关注中</span>
             </div>
          </div>

          {/* 按钮 */}
          <div className="flex gap-2 w-full">
            <Button onClick={onChatWithAgent} className="flex-1 bg-gradient-to-r from-primary to-pink-500 text-white border-none shadow-md shadow-primary/20 h-9">
              <MessageCircle className="w-4 h-4 mr-1.5" />
              AI 助手
            </Button>
            <Button variant="outline" className="flex-1 h-9">关注</Button>
          </div>
        </div>
      </div>

      {/* 标签页 */}
      <div className="bg-white min-h-[300px]">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="sticky top-[60px] z-30 bg-white border-b border-gray-100">
            <TabsList className="w-full h-10 bg-transparent p-0 flex justify-around">
              <TabsTrigger 
                value="works" 
                className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none bg-transparent"
              >
                作品 {userApps.length}
              </TabsTrigger>
              <TabsTrigger 
                value="liked" 
                className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none bg-transparent"
              >
                点赞
              </TabsTrigger>
              <TabsTrigger 
                value="collections" 
                className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none bg-transparent"
              >
                收藏
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-3">
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
                <div className="text-center py-12 text-gray-400 text-sm">
                  还没有发布作品
                </div>
              )}
            </TabsContent>

            <TabsContent value="liked" className="mt-0">
              <div className="text-center py-12 text-gray-400 text-sm">
                空空如也
              </div>
            </TabsContent>

            <TabsContent value="collections" className="mt-0">
              <div className="text-center py-12 text-gray-400 text-sm">
                还没有收藏任何内容
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

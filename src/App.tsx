import { useState } from 'react';
import { Header } from './components/Header';
import { AppCard } from './components/AppCard';
import { MasonryGrid } from './components/MasonryGrid';
import { FeaturedSection } from './components/FeaturedSection';
import { AppDetailPage } from './components/AppDetailPage';
import { ProfilePage } from './components/ProfilePage';
import { AgentChatPage } from './components/AgentChatPage';
import { PublishPage } from './components/PublishPage';
import { CommunityPage } from './components/CommunityPage';
import { RankingPage } from './components/RankingPage';
import { mockWebApps, mockUsers, mockDiscussions } from './data/mockData';
import { Toaster } from './components/ui/sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Sparkles, TrendingUp, Clock } from 'lucide-react';

type Page = 'home' | 'ranking' | 'community' | 'detail' | 'profile' | 'agent-chat' | 'publish';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [homeTab, setHomeTab] = useState('recommend');

  const selectedApp = mockWebApps.find((app) => app.id === selectedAppId);
  const selectedUser = mockUsers.find((user) => user.id === selectedUserId);

  const handleAppClick = (appId: string) => {
    setSelectedAppId(appId);
    setCurrentPage('detail');
  };

  const handleViewProfile = (userId: string) => {
    setSelectedUserId(userId);
    setCurrentPage('profile');
  };

  const handleChatWithAgent = () => {
    setCurrentPage('agent-chat');
  };

  const handleNavigate = (page: string) => {
    if (page === 'home') {
      setCurrentPage('home');
      setSelectedAppId(null);
      setSelectedUserId(null);
    } else if (page === 'ranking') {
      setCurrentPage('ranking');
    } else if (page === 'community') {
      setCurrentPage('community');
    } else if (page === 'publish') {
      setCurrentPage('publish');
    } else if (page === 'profile') {
      setSelectedUserId(mockUsers[0].id);
      setCurrentPage('profile');
    }
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedAppId(null);
    setSelectedUserId(null);
  };

  const handlePublishSuccess = () => {
    setCurrentPage('home');
  };

  const handleDiscussionClick = (discussionId: string) => {
    // 可以创建讨论详情页，这里暂时不做处理
    console.log('Discussion clicked:', discussionId);
  };

  // 渲染不同页面
  if (currentPage === 'detail' && selectedApp) {
    return (
      <>
        <AppDetailPage
          app={selectedApp}
          onBack={handleBackToHome}
          onViewProfile={handleViewProfile}
        />
        <Toaster />
      </>
    );
  }

  if (currentPage === 'profile' && selectedUser) {
    return (
      <>
        <ProfilePage
          user={selectedUser}
          apps={mockWebApps}
          onBack={handleBackToHome}
          onAppClick={handleAppClick}
          onChatWithAgent={handleChatWithAgent}
        />
        <Toaster />
      </>
    );
  }

  if (currentPage === 'agent-chat' && selectedUser) {
    return (
      <>
        <AgentChatPage creator={selectedUser} onBack={() => setCurrentPage('profile')} />
        <Toaster />
      </>
    );
  }

  if (currentPage === 'publish') {
    return (
      <>
        <PublishPage onBack={handleBackToHome} onPublish={handlePublishSuccess} />
        <Toaster />
      </>
    );
  }

  if (currentPage === 'community') {
    return (
      <>
        <Header onNavigate={handleNavigate} currentPage={currentPage} />
        <CommunityPage
          discussions={mockDiscussions}
          onBack={handleBackToHome}
          onDiscussionClick={handleDiscussionClick}
        />
        <Toaster />
      </>
    );
  }

  if (currentPage === 'ranking') {
    return (
      <>
        <Header onNavigate={handleNavigate} currentPage={currentPage} />
        <RankingPage
          apps={mockWebApps}
          onBack={handleBackToHome}
          onAppClick={handleAppClick}
        />
        <Toaster />
      </>
    );
  }

  // 首页
  const recommendedApps = mockWebApps.filter(app => app.featured).concat(
    mockWebApps.filter(app => !app.featured).slice(0, 3)
  );
  
  const trendingApps = [...mockWebApps].sort((a, b) => b.likes - a.likes);
  
  const latestApps = [...mockWebApps].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const getDisplayApps = () => {
    switch (homeTab) {
      case 'recommend':
        return recommendedApps;
      case 'trending':
        return trendingApps;
      case 'latest':
        return latestApps;
      default:
        return mockWebApps;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Header onNavigate={handleNavigate} currentPage={currentPage} />

        <main className="max-w-7xl mx-auto px-4 py-8">
          {/* 精选推荐轮播 */}
          <FeaturedSection apps={mockWebApps} onAppClick={handleAppClick} />

          {/* 标签切换 */}
          <div className="mb-6">
            <Tabs value={homeTab} onValueChange={setHomeTab}>
              <TabsList className="bg-white shadow-sm">
                <TabsTrigger
                  value="recommend"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  为你推荐
                </TabsTrigger>
                <TabsTrigger
                  value="trending"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  <TrendingUp className="w-4 h-4 mr-1" />
                  热门应用
                </TabsTrigger>
                <TabsTrigger
                  value="latest"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  <Clock className="w-4 h-4 mr-1" />
                  最新发布
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* 应用卡片网格 */}
          <MasonryGrid>
            {getDisplayApps().map((app) => (
              <AppCard key={app.id} app={app} onClick={() => handleAppClick(app.id)} />
            ))}
          </MasonryGrid>
        </main>
      </div>
      <Toaster />
    </>
  );
}

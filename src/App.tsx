import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNavigation } from './components/BottomNavigation';
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
import { Tabs, TabsList, TabsTrigger } from './components/ui/tabs';
import { Sparkles, TrendingUp, Clock } from 'lucide-react';

type Page = 'home' | 'ranking' | 'community' | 'detail' | 'profile' | 'agent-chat' | 'publish';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [homeTab, setHomeTab] = useState('recommend');

  const selectedApp = mockWebApps.find((app) => app.id === selectedAppId);
  const selectedUser = mockUsers.find((user) => user.id === selectedUserId);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

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
      setSelectedUserId(mockUsers[0].id); // Current user
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
    console.log('Discussion clicked:', discussionId);
  };

  // Main content rendering
  const renderContent = () => {
    if (currentPage === 'detail' && selectedApp) {
      return (
        <AppDetailPage
          app={selectedApp}
          onBack={handleBackToHome}
          onViewProfile={handleViewProfile}
        />
      );
    }

    if (currentPage === 'profile' && selectedUser) {
      return (
        <ProfilePage
          user={selectedUser}
          apps={mockWebApps}
          onBack={handleBackToHome}
          onAppClick={handleAppClick}
          onChatWithAgent={handleChatWithAgent}
        />
      );
    }

    if (currentPage === 'agent-chat' && selectedUser) {
      return (
        <AgentChatPage creator={selectedUser} onBack={() => setCurrentPage('profile')} />
      );
    }

    if (currentPage === 'publish') {
      return (
        <PublishPage onBack={handleBackToHome} onPublish={handlePublishSuccess} />
      );
    }

    if (currentPage === 'community') {
      return (
        <CommunityPage
          discussions={mockDiscussions}
          onBack={handleBackToHome}
          onDiscussionClick={handleDiscussionClick}
        />
      );
    }

    if (currentPage === 'ranking') {
      return (
        <RankingPage
          apps={mockWebApps}
          onBack={handleBackToHome}
          onAppClick={handleAppClick}
        />
      );
    }

    // Home Page
    const recommendedApps = mockWebApps.filter(app => app.featured).concat(
      mockWebApps.filter(app => !app.featured).slice(0, 3)
    );
    
    const trendingApps = [...mockWebApps].sort((a, b) => b.likes - a.likes);
    
    const latestApps = [...mockWebApps].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const getDisplayApps = () => {
      switch (homeTab) {
        case 'recommend': return recommendedApps;
        case 'trending': return trendingApps;
        case 'latest': return latestApps;
        default: return mockWebApps;
      }
    };

    return (
      <main className="px-3 py-4 space-y-6">
        {/* Featured Section */}
        <FeaturedSection apps={mockWebApps} onAppClick={handleAppClick} />

        {/* Tabs */}
        <div className="sticky top-[60px] z-40 bg-gray-50/95 backdrop-blur py-2 -mx-3 px-3">
          <Tabs value={homeTab} onValueChange={setHomeTab} className="w-full">
            <TabsList className="w-full bg-white p-1 h-11 shadow-sm rounded-xl grid grid-cols-3">
              <TabsTrigger
                value="recommend"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg text-xs font-medium transition-all"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                推荐
              </TabsTrigger>
              <TabsTrigger
                value="trending"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg text-xs font-medium transition-all"
              >
                <TrendingUp className="w-3 h-3 mr-1" />
                热门
              </TabsTrigger>
              <TabsTrigger
                value="latest"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg text-xs font-medium transition-all"
              >
                <Clock className="w-3 h-3 mr-1" />
                最新
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Apps Grid */}
        <MasonryGrid>
          {getDisplayApps().map((app) => (
            <AppCard key={app.id} app={app} onClick={() => handleAppClick(app.id)} />
          ))}
        </MasonryGrid>
      </main>
    );
  };

  const showBottomNav = ['home', 'ranking', 'community', 'profile'].includes(currentPage);
  const showHeader = ['home', 'ranking', 'community'].includes(currentPage);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-md bg-gray-50 min-h-screen relative shadow-2xl overflow-x-hidden">
        {showHeader && (
          <Header onNavigate={handleNavigate} currentPage={currentPage} />
        )}
        
        <div className={`pb-24 ${!showHeader ? '' : ''}`}>
          {renderContent()}
        </div>

        {showBottomNav && (
          <BottomNavigation currentPage={currentPage} onNavigate={handleNavigate} />
        )}

        <Toaster />
      </div>
    </div>
  );
}

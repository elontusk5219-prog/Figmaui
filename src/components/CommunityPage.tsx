import { useState } from 'react';
import { DiscussionPost } from '../types';
import { DiscussionCard } from './DiscussionCard';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Plus, Flame, Clock, BookOpen } from 'lucide-react';

interface CommunityPageProps {
  discussions: DiscussionPost[];
  onBack: () => void;
  onDiscussionClick: (discussionId: string) => void;
}

export function CommunityPage({ discussions, onBack, onDiscussionClick }: CommunityPageProps) {
  const [activeTab, setActiveTab] = useState('all');

  const filteredDiscussions = activeTab === 'all' 
    ? discussions 
    : discussions.filter(d => d.category === activeTab);

  const categoryStats = {
    all: discussions.length,
    tutorial: discussions.filter(d => d.category === 'tutorial').length,
    tips: discussions.filter(d => d.category === 'tips').length,
    showcase: discussions.filter(d => d.category === 'showcase').length,
    question: discussions.filter(d => d.category === 'question').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-1" />
              返回
            </Button>
            <h1 className="text-xl font-bold">创作者社区</h1>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-1" />
            发布话题
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* 顶部banner */}
        <div className="bg-gradient-to-r from-primary/10 via-pink-50 to-purple-50 rounded-2xl p-6 mb-6 border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">📚 分享你的创作经验</h2>
              <p className="text-gray-700">
                教程、技巧、作品展示、问题求助，与创作者一起成长
              </p>
            </div>
            <div className="hidden md:flex gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">{discussions.length}</div>
                <div className="text-sm text-gray-600">讨论</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">
                  {discussions.reduce((sum, d) => sum + d.replies, 0)}
                </div>
                <div className="text-sm text-gray-600">回复</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">
                  {discussions.reduce((sum, d) => sum + d.views, 0)}
                </div>
                <div className="text-sm text-gray-600">浏览</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 左侧分类导航 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-4 border border-gray-100 sticky top-20">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                分类
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'all'
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>全部</span>
                    <span className="text-sm">{categoryStats.all}</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('tutorial')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'tutorial'
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>📖 教程</span>
                    <span className="text-sm">{categoryStats.tutorial}</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('tips')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'tips'
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>💡 经验分享</span>
                    <span className="text-sm">{categoryStats.tips}</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('showcase')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'showcase'
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>🎨 作品展示</span>
                    <span className="text-sm">{categoryStats.showcase}</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('question')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'question'
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>❓ 提问求助</span>
                    <span className="text-sm">{categoryStats.question}</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* 右侧讨论列表 */}
          <div className="lg:col-span-3 space-y-3">
            {filteredDiscussions.length > 0 ? (
              filteredDiscussions.map((discussion) => (
                <DiscussionCard
                  key={discussion.id}
                  post={discussion}
                  onClick={() => onDiscussionClick(discussion.id)}
                />
              ))
            ) : (
              <div className="bg-white rounded-xl p-12 text-center text-gray-500">
                暂无讨论，快来发布第一个话题吧！
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

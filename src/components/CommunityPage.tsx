import { useState } from 'react';
import { DiscussionPost } from '../types';
import { DiscussionCard } from './DiscussionCard';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Plus, BookOpen } from 'lucide-react';

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

  const categories = [
    { id: 'all', label: '全部' },
    { id: 'tutorial', label: '教程' },
    { id: 'tips', label: '经验' },
    { id: 'showcase', label: '作品' },
    { id: 'question', label: '求助' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="px-4 py-4 space-y-4">
        {/* Banner */}
        <div className="bg-gradient-to-r from-primary/80 to-pink-600 rounded-2xl p-4 text-white shadow-lg shadow-primary/20">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold">📚 创作者社区</h2>
            <Button size="sm" variant="secondary" className="h-7 text-xs bg-white text-primary hover:bg-white/90 border-0">
              <Plus className="w-3 h-3 mr-1" />
              发布
            </Button>
          </div>
          <p className="text-xs text-white/90">
            分享经验、交流技巧、展示作品，与大家一起成长。
          </p>
        </div>

        {/* Categories */}
        <div className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeTab === cat.id
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'bg-white text-gray-600 border border-gray-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Discussion List */}
        <div className="space-y-3">
          {filteredDiscussions.length > 0 ? (
            filteredDiscussions.map((discussion) => (
              <DiscussionCard
                key={discussion.id}
                post={discussion}
                onClick={() => onDiscussionClick(discussion.id)}
              />
            ))
          ) : (
            <div className="text-center py-12 text-gray-400 text-sm">
              暂无讨论
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

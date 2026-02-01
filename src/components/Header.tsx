import { Plus, Search, User, Home, TrendingUp, MessageSquare, Trophy } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div
            onClick={() => onNavigate('home')}
            className="text-2xl font-bold bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity"
          >
            用用
          </div>

          {/* 搜索框 */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="搜索应用、课程、讨论..."
                className="pl-9 bg-gray-50 border-gray-200 focus:bg-white"
              />
            </div>
          </div>

          {/* 导航和操作 */}
          <div className="flex items-center gap-1">
            <Button
              variant={currentPage === 'home' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onNavigate('home')}
              className={currentPage === 'home' ? 'bg-primary hover:bg-primary/90' : ''}
            >
              <Home className="w-4 h-4 mr-1" />
              首页
            </Button>
            <Button
              variant={currentPage === 'ranking' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onNavigate('ranking')}
              className={currentPage === 'ranking' ? 'bg-primary hover:bg-primary/90' : ''}
            >
              <Trophy className="w-4 h-4 mr-1" />
              排行榜
            </Button>
            <Button
              variant={currentPage === 'community' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onNavigate('community')}
              className={currentPage === 'community' ? 'bg-primary hover:bg-primary/90' : ''}
            >
              <MessageSquare className="w-4 h-4 mr-1" />
              社区
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => onNavigate('publish')}
              className="bg-primary hover:bg-primary/90 ml-2"
            >
              <Plus className="w-4 h-4 mr-1" />
              发布
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('profile')}
              className="ml-1"
            >
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
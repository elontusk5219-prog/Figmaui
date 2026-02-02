import { Search, Bell } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div
            onClick={() => onNavigate('home')}
            className="text-xl font-black bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent cursor-pointer shrink-0"
          >
            用用
          </div>

          {/* 搜索框 - Mobile Optimized */}
          <div className="flex-1">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="搜索应用..."
                className="pl-9 h-9 bg-gray-50 border-none focus:bg-white focus:ring-1 focus:ring-primary/20 rounded-full transition-all text-sm"
              />
            </div>
          </div>

          {/* 右侧操作 */}
          <Button variant="ghost" size="icon" className="shrink-0 relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-white"></span>
          </Button>
        </div>
      </div>
    </header>
  );
}

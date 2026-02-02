import { Home, Trophy, Plus, MessageSquare, User } from 'lucide-react';
import { cn } from './ui/utils';

interface BottomNavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function BottomNavigation({ currentPage, onNavigate }: BottomNavigationProps) {
  const navItems = [
    { id: 'home', label: '首页', icon: Home },
    { id: 'ranking', label: '榜单', icon: Trophy },
    { id: 'publish', label: '发布', icon: Plus, isSpecial: true },
    { id: 'community', label: '讨论', icon: MessageSquare },
    { id: 'profile', label: '我的', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-safe z-50">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-2">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          const Icon = item.icon;

          if (item.isSpecial) {
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="relative -top-5"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-pink-500 flex items-center justify-center shadow-lg text-white transform transition-transform hover:scale-105 active:scale-95">
                  <Icon className="w-7 h-7" />
                </div>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                isActive ? "text-primary" : "text-gray-400 hover:text-gray-600"
              )}
            >
              <Icon className={cn("w-6 h-6", isActive && "fill-current")} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

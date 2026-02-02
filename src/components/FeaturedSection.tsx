import { WebApp } from '../types';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useState } from 'react';

interface FeaturedSectionProps {
  apps: WebApp[];
  onAppClick: (appId: string) => void;
}

export function FeaturedSection({ apps, onAppClick }: FeaturedSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredApps = apps.filter((app) => app.featured);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredApps.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredApps.length) % featuredApps.length);
  };

  if (featuredApps.length === 0) return null;

  const currentApp = featuredApps[currentIndex];

  return (
    <div className="relative bg-gradient-to-br from-primary/5 via-pink-50 to-purple-50 rounded-2xl overflow-hidden border border-primary/10 mb-6">
      <div className="flex flex-col md:grid md:grid-cols-2 gap-4 p-5">
        {/* 图片区域 (Mobile: Top) */}
        <div className="relative order-1 md:order-2">
          <div className="aspect-[16/9] rounded-xl overflow-hidden shadow-lg border-2 border-white">
            <img
              src={currentApp.thumbnail}
              alt={currentApp.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 内容区域 (Mobile: Bottom) */}
        <div className="flex flex-col justify-center order-2 md:order-1">
          <div className="flex items-center justify-between mb-2">
            <Badge className="bg-primary text-white border-0 text-[10px] px-2">
              <Star className="w-3 h-3 mr-1 fill-current" />
              编辑推荐
            </Badge>
          </div>
          
          <h2 className="text-xl font-bold mb-2 line-clamp-1">{currentApp.title}</h2>
          <p className="text-gray-600 mb-3 text-sm line-clamp-2">{currentApp.description}</p>
          
          <div className="flex flex-wrap gap-1.5 mb-4">
            {currentApp.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-white/80 text-[10px]">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => onAppClick(currentApp.id)}
              className="flex-1 bg-primary hover:bg-primary/90 h-9 text-sm"
            >
              立即体验
            </Button>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="rounded-full h-9 w-9"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="rounded-full h-9 w-9"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 指示器 */}
      <div className="flex justify-center gap-1.5 pb-4">
        {featuredApps.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1 rounded-full transition-all ${
              index === currentIndex
                ? 'w-4 bg-primary'
                : 'w-1 bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

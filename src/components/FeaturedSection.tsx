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
    <div className="relative bg-gradient-to-br from-primary/5 via-pink-50 to-purple-50 rounded-2xl overflow-hidden border border-primary/10 mb-8">
      <div className="grid md:grid-cols-2 gap-6 p-8">
        {/* 左侧内容 */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3">
            <Badge className="bg-primary text-white border-0">
              <Star className="w-3 h-3 mr-1 fill-current" />
              编辑推荐
            </Badge>
            <span className="text-sm text-gray-600">
              {currentIndex + 1} / {featuredApps.length}
            </span>
          </div>
          
          <h2 className="text-3xl font-bold mb-3">{currentApp.title}</h2>
          <p className="text-gray-700 mb-4 text-lg">{currentApp.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {currentApp.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-white/80">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => onAppClick(currentApp.id)}
              className="bg-primary hover:bg-primary/90"
            >
              立即体验
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="rounded-full"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="rounded-full"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* 右侧图片 */}
        <div className="relative">
          <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border-4 border-white">
            <img
              src={currentApp.thumbnail}
              alt={currentApp.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* 装饰元素 */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary to-pink-500 rounded-full opacity-20 blur-2xl" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 blur-2xl" />
        </div>
      </div>

      {/* 指示器 */}
      <div className="flex justify-center gap-2 pb-6">
        {featuredApps.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === currentIndex
                ? 'w-8 bg-primary'
                : 'w-1.5 bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Badge } from './ui/badge';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PublishPageProps {
  onBack: () => void;
  onPublish: () => void;
}

export function PublishPage({ onBack, onPublish }: PublishPageProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [appType, setAppType] = useState<'link' | 'code' | 'package' | 'python'>('link');
  const [appUrl, setAppUrl] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const handleAddTag = () => {
    if (tagInput.trim() && tags.length < 5 && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error('请输入应用标题');
      return;
    }
    if (!description.trim()) {
      toast.error('请输入应用描述');
      return;
    }
    if (appType === 'link' && !appUrl.trim()) {
      toast.error('请输入应用链接');
      return;
    }

    toast.success('作品发布成功！');
    setTimeout(() => {
      onPublish();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-1" />
              返回
            </Button>
            <h1 className="text-xl font-semibold">发布新作品</h1>
          </div>
          <Button onClick={handleSubmit}>发布</Button>
        </div>
      </div>

      {/* 表单内容 */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          {/* 应用类型 */}
          <div className="space-y-3">
            <Label>应用类型</Label>
            <RadioGroup value={appType} onValueChange={(value: any) => setAppType(value)}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div
                  className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:border-purple-600 transition-colors ${
                    appType === 'link' ? 'border-purple-600 bg-purple-50' : ''
                  }`}
                  onClick={() => setAppType('link')}
                >
                  <RadioGroupItem value="link" id="link" />
                  <Label htmlFor="link" className="cursor-pointer">在线应用</Label>
                </div>
                <div
                  className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:border-purple-600 transition-colors ${
                    appType === 'code' ? 'border-purple-600 bg-purple-50' : ''
                  }`}
                  onClick={() => setAppType('code')}
                >
                  <RadioGroupItem value="code" id="code" />
                  <Label htmlFor="code" className="cursor-pointer">代码片段</Label>
                </div>
                <div
                  className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:border-purple-600 transition-colors ${
                    appType === 'package' ? 'border-purple-600 bg-purple-50' : ''
                  }`}
                  onClick={() => setAppType('package')}
                >
                  <RadioGroupItem value="package" id="package" />
                  <Label htmlFor="package" className="cursor-pointer">组件包</Label>
                </div>
                <div
                  className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:border-purple-600 transition-colors ${
                    appType === 'python' ? 'border-purple-600 bg-purple-50' : ''
                  }`}
                  onClick={() => setAppType('python')}
                >
                  <RadioGroupItem value="python" id="python" />
                  <Label htmlFor="python" className="cursor-pointer">Python脚本</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* 标题 */}
          <div className="space-y-2">
            <Label htmlFor="title">应用标题 *</Label>
            <Input
              id="title"
              placeholder="给你的应用起个好名字"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* 描述 */}
          <div className="space-y-2">
            <Label htmlFor="description">应用描述 *</Label>
            <Textarea
              id="description"
              placeholder="详细介绍你的应用功能和特点..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          {/* URL/代码链接 */}
          {(appType === 'link' || appType === 'code') && (
            <div className="space-y-2">
              <Label htmlFor="url">
                {appType === 'link' ? '应用链接' : '代码片段链接'} *
              </Label>
              <Input
                id="url"
                placeholder={
                  appType === 'link'
                    ? 'https://example.com/your-app'
                    : 'https://codepen.io/your-code'
                }
                value={appUrl}
                onChange={(e) => setAppUrl(e.target.value)}
              />
            </div>
          )}

          {/* 缩略图 */}
          <div className="space-y-2">
            <Label>应用缩略图</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-600 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600 mb-1">点击上传或拖拽图片</p>
              <p className="text-xs text-gray-500">推荐尺寸：1200x900 像素</p>
            </div>
          </div>

          {/* 标签 */}
          <div className="space-y-2">
            <Label htmlFor="tags">标签 (最多5个)</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                placeholder="添加标签..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                disabled={tags.length >= 5}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddTag}
                disabled={tags.length >= 5}
              >
                添加
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-red-600"
                      onClick={() => handleRemoveTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* 提示信息 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              💡 <strong>发布提示：</strong>清晰的标题和描述能帮助更多人发现你的作品。建议添加相关标签以提高曝光率。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

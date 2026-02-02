import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Badge } from './ui/badge';
import { ArrowLeft, Upload, X, FileCode, Package, Link as LinkIcon, FileUp } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { cn } from './ui/utils';

interface PublishPageProps {
  onBack: () => void;
  onPublish: () => void;
}

export function PublishPage({ onBack, onPublish }: PublishPageProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [appType, setAppType] = useState<'link' | 'code' | 'package'>('link');
  const [appUrl, setAppUrl] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const handleAddTag = () => {
    if (tagInput.trim() && tags.length < 5 && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      toast.success(`已选择文件: ${file.name}`);
    }
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
    if ((appType === 'code' || appType === 'package') && !uploadedFileName) {
      toast.error('请上传代码或压缩包');
      return;
    }

    toast.success('作品发布成功！');
    setTimeout(() => {
      onPublish();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 顶部导航 */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack} className="-ml-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-bold">发布新作品</h1>
          </div>
          <Button onClick={handleSubmit} size="sm" className="bg-primary hover:bg-primary/90">
            发布
          </Button>
        </div>
      </div>

      {/* 表单内容 */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-5 space-y-6">
          {/* 应用类型 */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">应用类型</Label>
            <RadioGroup value={appType} onValueChange={(value: any) => {
              setAppType(value);
              setUploadedFileName(null);
              setAppUrl('');
            }}>
              <div className="grid grid-cols-3 gap-3">
                <div
                  className={cn(
                    "flex flex-col items-center justify-center space-y-2 border-2 rounded-xl p-3 cursor-pointer transition-all",
                    appType === 'link' ? "border-primary bg-primary/5" : "border-gray-100 hover:border-gray-200"
                  )}
                  onClick={() => setAppType('link')}
                >
                  <div className={cn("p-2 rounded-full", appType === 'link' ? "bg-primary text-white" : "bg-gray-100 text-gray-500")}>
                    <LinkIcon className="w-5 h-5" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="link" id="link" className="sr-only" />
                    <Label htmlFor="link" className="cursor-pointer font-medium text-sm">在线应用</Label>
                  </div>
                </div>

                <div
                  className={cn(
                    "flex flex-col items-center justify-center space-y-2 border-2 rounded-xl p-3 cursor-pointer transition-all",
                    appType === 'code' ? "border-primary bg-primary/5" : "border-gray-100 hover:border-gray-200"
                  )}
                  onClick={() => setAppType('code')}
                >
                  <div className={cn("p-2 rounded-full", appType === 'code' ? "bg-primary text-white" : "bg-gray-100 text-gray-500")}>
                    <FileCode className="w-5 h-5" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="code" id="code" className="sr-only" />
                    <Label htmlFor="code" className="cursor-pointer font-medium text-sm">代码片段</Label>
                  </div>
                </div>

                <div
                  className={cn(
                    "flex flex-col items-center justify-center space-y-2 border-2 rounded-xl p-3 cursor-pointer transition-all",
                    appType === 'package' ? "border-primary bg-primary/5" : "border-gray-100 hover:border-gray-200"
                  )}
                  onClick={() => setAppType('package')}
                >
                  <div className={cn("p-2 rounded-full", appType === 'package' ? "bg-primary text-white" : "bg-gray-100 text-gray-500")}>
                    <Package className="w-5 h-5" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="package" id="package" className="sr-only" />
                    <Label htmlFor="package" className="cursor-pointer font-medium text-sm">组件包</Label>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* 标题 */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">应用标题 *</Label>
            <Input
              id="title"
              placeholder="给你的应用起个好名字"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
            />
          </div>

          {/* 描述 */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">应用描述 *</Label>
            <Textarea
              id="description"
              placeholder="详细介绍你的应用功能和特点..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="bg-gray-50 border-gray-200 focus:bg-white transition-colors resize-none"
            />
          </div>

          {/* URL 输入 */}
          {appType === 'link' && (
            <div className="space-y-2">
              <Label htmlFor="url" className="text-sm font-medium">应用链接 *</Label>
              <Input
                id="url"
                placeholder="https://example.com/your-app"
                value={appUrl}
                onChange={(e) => setAppUrl(e.target.value)}
                className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
              />
            </div>
          )}

          {/* 代码/文件上传 */}
          {(appType === 'code' || appType === 'package') && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {appType === 'code' ? '上传代码文件' : '上传组件包'} *
              </Label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer group">
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileUpload}
                  accept={appType === 'code' ? ".js,.jsx,.ts,.tsx,.html,.css,.json" : ".zip,.rar,.tar.gz"}
                />
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                     <FileUp className="w-5 h-5 text-gray-500 group-hover:text-primary" />
                  </div>
                  {uploadedFileName ? (
                    <div className="text-primary font-medium flex items-center gap-2">
                      <FileCode className="w-4 h-4" />
                      {uploadedFileName}
                    </div>
                  ) : (
                    <>
                      <p className="text-sm font-medium text-gray-700">点击或拖拽上传</p>
                      <p className="text-xs text-gray-400">
                        {appType === 'code' ? '支持 .ts, .tsx, .js, .html 等格式' : '支持 .zip, .rar 格式'}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 缩略图 */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">应用缩略图</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer group">
              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400 group-hover:text-primary transition-colors" />
              <p className="text-sm text-gray-600 mb-1">点击上传或拖拽图片</p>
              <p className="text-xs text-gray-400">推荐尺寸：1200x900 像素</p>
            </div>
          </div>

          {/* 标签 */}
          <div className="space-y-2">
            <Label htmlFor="tags" className="text-sm font-medium">标签 (最多5个)</Label>
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
                className="bg-gray-50 border-gray-200 focus:bg-white"
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
                  <Badge key={tag} variant="secondary" className="gap-1 bg-gray-100 hover:bg-gray-200 transition-colors">
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
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4">
            <p className="text-xs text-blue-800 leading-relaxed">
              💡 <strong>发布提示：</strong>
              <br/>
              清晰的标题和描述能帮助更多人发现你的作品。
              <br/>
              对于组件包，请确保包含完整的使用文档。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useRef, useEffect } from 'react';
import { User, AgentConfig } from '../types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { ArrowLeft, Send, Bot, Info } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

interface AgentChatPageProps {
  creator: User;
  onBack: () => void;
}

// 模拟的 AI Agent 配置
const mockAgentConfig: AgentConfig = {
  name: 'AI助手小明',
  personality: '友好、专业、乐于助人',
  knowledge: [
    '创作者的作品集和技术栈',
    '创作者的工作经验和技能',
    '如何联系创作者',
  ],
  contactRules: '只有在访客表现出真诚的合作意向时，才会提供微信/邮箱等私密联系方式',
};

export function AgentChatPage({ creator, onBack }: AgentChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `你好！我是 ${creator.name} 的AI助手 ${mockAgentConfig.name}。我可以帮你了解 ${creator.name} 的作品和专业背景。有什么我可以帮助你的吗？`,
      sender: 'agent',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 滚动到底部
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // 添加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // 模拟 AI 回复
    setTimeout(() => {
      const agentResponse = generateAgentResponse(inputValue);
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: agentResponse,
        sender: 'agent',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const generateAgentResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes('作品') || input.includes('项目')) {
      return `${creator.name} 目前在平台上发布了多个优秀作品，包括番茄钟工具、AI文案生成器等。这些作品涵盖了前端开发、工具应用等多个领域。你可以在他的主页查看完整的作品集。`;
    }

    if (input.includes('技术') || input.includes('技能') || input.includes('栈')) {
      return `${creator.name} 精通 Web 开发技术栈，包括 React、Vue.js、TypeScript 等前端技术，同时也熟悉 Python、Node.js 等后端技术。他特别擅长开发创意型的小应用和工具。`;
    }

    if (input.includes('联系') || input.includes('微信') || input.includes('邮箱') || input.includes('合作')) {
      return `感谢你对 ${creator.name} 的关注！为了保护创作者的隐私，我需要了解更多关于你的合作意向。请问你具体希望在哪个方面与 ${creator.name} 合作呢？（例如：项目合作、技术交流、工作机会等）`;
    }

    if (input.includes('工作') || input.includes('经验') || input.includes('背景')) {
      return `${creator.name} 是一位经验丰富的开发者，专注于创造有趣且实用的 Web 应用。他在用用平台上分享了许多优秀的开源项目，深受社区喜爱。`;
    }

    if (input.includes('你好') || input.includes('hi') || input.includes('hello')) {
      return `你好！很高兴为你服务。我可以帮你了解 ${creator.name} 的作品、技能、工作经验等信息。你想了解什么呢？`;
    }

    // 默认回复
    return `我理解你的问题。关于 ${creator.name}，我可以为你介绍他的作品集、技术能力、以及如何与他取得联系。你最感兴趣的是哪个方面呢？`;
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* 顶部信息栏 */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Avatar className="w-10 h-10">
              <AvatarImage src={creator.avatar} alt={creator.name} />
              <AvatarFallback>{creator.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold">{mockAgentConfig.name}</h2>
                <Badge variant="secondary" className="text-xs">
                  <Bot className="w-3 h-3 mr-1" />
                  AI助手
                </Badge>
              </div>
              <p className="text-sm text-gray-600">代表 {creator.name}</p>
            </div>
          </div>

          <Button variant="outline" size="sm">
            <Info className="w-4 h-4 mr-1" />
            Agent信息
          </Button>
        </div>
      </div>

      {/* 聊天区域 */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="max-w-4xl mx-auto space-y-4 pb-4">
          {/* Agent 信息卡片 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="flex-1 text-sm">
                <p className="font-medium text-blue-900 mb-2">关于这个 AI 助手</p>
                <ul className="space-y-1 text-blue-800">
                  <li>• 性格：{mockAgentConfig.personality}</li>
                  <li>• 可以回答：{mockAgentConfig.knowledge.join('、')}</li>
                  <li>• 联系规则：{mockAgentConfig.contactRules}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 消息列表 */}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex gap-3 max-w-[80%] ${
                  message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <Avatar className="w-8 h-8 flex-shrink-0">
                  {message.sender === 'agent' ? (
                    <>
                      <AvatarImage src={creator.avatar} alt={mockAgentConfig.name} />
                      <AvatarFallback>
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </>
                  ) : (
                    <AvatarFallback>我</AvatarFallback>
                  )}
                </Avatar>

                <div
                  className={`rounded-lg px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-purple-100' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString('zh-CN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* 正在输入提示 */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage src={creator.avatar} alt={mockAgentConfig.name} />
                  <AvatarFallback>
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* 输入区域 */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex gap-2">
          <Input
            placeholder="输入消息..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={!inputValue.trim() || isTyping}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

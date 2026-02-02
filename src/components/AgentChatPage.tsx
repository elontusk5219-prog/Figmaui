import { useState, useRef, useEffect } from 'react';
import { User, AgentConfig } from '../types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { ArrowLeft, Send, Bot, Info, Shield } from 'lucide-react';

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

// 模拟的 AI Agent 配置 - 守门员
const mockAgentConfig: AgentConfig = {
  name: '守门员 Agent',
  personality: '严谨、礼貌、保护隐私',
  knowledge: [
    '创作者的作品集',
    '合作意向初筛',
    '基本信息介绍',
  ],
  contactRules: '严格保护创作者隐私，仅在确认访客意图明确且匹配后提供联系方式',
};

export function AgentChatPage({ creator, onBack }: AgentChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `你好！我是 ${creator.name} 的 AI 守门员。为了保护 ${creator.name} 的专注时间，我会先协助处理您的咨询。请问您有什么事吗？`,
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
      return `${creator.name} 的作品包括番茄钟、AI工具等。我可以为您展示精选列表。`;
    }

    if (input.includes('联系') || input.includes('微信') || input.includes('邮箱') || input.includes('合作')) {
      return `收到您的合作意向。根据我的隐私保护规则，请您先提供一下您的公司/项目背景以及具体的合作需求，我会评估后决定是否转达给 ${creator.name}。`;
    }

    if (input.includes('你好') || input.includes('hi')) {
      return `你好！请直接说明您的来意，我会高效为您服务。`;
    }

    // 默认回复
    return `明白了。这方面的信息我可以帮您记录。还有其他需要我转达的吗？`;
  };

  return (
    <div className="h-[100dvh] flex flex-col bg-gray-50 fixed inset-0 z-50 overflow-hidden">
      {/* 顶部信息栏 */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 p-3 pt-safe-top">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack} className="-ml-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="relative">
              <Avatar className="w-9 h-9 border-2 border-white shadow-sm">
                <AvatarImage src={creator.avatar} alt={creator.name} />
                <AvatarFallback>{creator.name[0]}</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-bold text-sm">{creator.name} 的守门员</h2>
                <Badge variant="secondary" className="text-[10px] px-1 h-4 gap-0.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-indigo-700 border-indigo-100">
                  <Shield className="w-2.5 h-2.5" />
                  AI Agent
                </Badge>
              </div>
              <p className="text-xs text-gray-500">通常在 1 分钟内回复</p>
            </div>
          </div>
        </div>
      </div>

      {/* 聊天区域 */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 bg-gray-50/50">
        <div className="space-y-4 pb-4">
          {/* Agent 信息卡片 */}
          <div className="mx-auto max-w-[90%] bg-white border border-gray-100 shadow-sm rounded-2xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Shield className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1 text-xs">
                <p className="font-bold text-gray-900 mb-1">已开启隐私保护模式</p>
                <p className="text-gray-600 leading-relaxed">
                  我是 {creator.name} 的 AI 守门员。我会过滤骚扰信息，确保您的有效合作意向能直达创作者。
                </p>
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
                className={`flex gap-2 max-w-[85%] ${
                  message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <Avatar className="w-8 h-8 flex-shrink-0 border border-white shadow-sm">
                  {message.sender === 'agent' ? (
                    <>
                      <AvatarImage src={creator.avatar} alt={mockAgentConfig.name} />
                      <AvatarFallback><Bot className="w-4 h-4" /></AvatarFallback>
                    </>
                  ) : (
                    <AvatarFallback className="bg-gray-200">我</AvatarFallback>
                  )}
                </Avatar>

                <div
                  className={`rounded-2xl px-4 py-2.5 shadow-sm text-sm leading-relaxed ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-primary to-pink-500 text-white rounded-tr-sm'
                      : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm'
                  }`}
                >
                  <p>{message.content}</p>
                  <p
                    className={`text-[10px] mt-1 text-right opacity-70 ${
                      message.sender === 'user' ? 'text-white' : 'text-gray-400'
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
              <div className="flex gap-2 max-w-[80%]">
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage src={creator.avatar} />
                  <AvatarFallback><Bot className="w-4 h-4" /></AvatarFallback>
                </Avatar>
                <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* 输入区域 */}
      <div className="bg-white border-t border-gray-100 p-3 pb-safe-bottom">
        <div className="flex gap-2 items-end">
          <Input
            placeholder="发送消息..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="flex-1 bg-gray-50 border-gray-200 focus:bg-white transition-colors rounded-xl"
          />
          <Button 
            onClick={handleSend} 
            disabled={!inputValue.trim() || isTyping}
            size="icon"
            className="bg-primary hover:bg-primary/90 rounded-xl shrink-0"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

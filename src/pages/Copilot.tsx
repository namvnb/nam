import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, 
  Send, 
  Bot, 
  User, 
  Loader2,
  Trash2
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';
import { cn } from '../lib/utils';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
};

export function Copilot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      if (data) setMessages(data);
    } catch (error: any) {
      console.error('Error fetching messages:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Save user message
      const { data: userMsgData, error: userError } = await supabase
        .from('chat_messages')
        .insert([{ user_id: user.id, role: 'user', content: userMessage }])
        .select()
        .single();

      if (userError) throw userError;
      setMessages(prev => [...prev, userMsgData]);

      // Simulate AI response (In a real app, you would call an AI API here)
      setTimeout(async () => {
        const aiResponse = `Đây là phản hồi tự động cho: "${userMessage}". Trong môi trường thực tế, bạn sẽ kết nối với API của OpenAI hoặc mô hình AI khác.`;
        
        const { data: aiMsgData, error: aiError } = await supabase
          .from('chat_messages')
          .insert([{ user_id: user.id, role: 'assistant', content: aiResponse }])
          .select()
          .single();

        if (aiError) throw aiError;
        setMessages(prev => [...prev, aiMsgData]);
        setLoading(false);
      }, 1000);

    } catch (error: any) {
      toast.error('Lỗi khi gửi tin nhắn: ' + error.message);
      setLoading(false);
    }
  };

  const clearHistory = async () => {
    if (!confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử chat?')) return;
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('chat_messages')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
      setMessages([]);
      toast.success('Đã xóa lịch sử chat');
    } catch (error: any) {
      toast.error('Lỗi khi xóa lịch sử: ' + error.message);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Terminal className="w-6 h-6 text-primary" />
            AI Copilot
          </h1>
          <p className="text-slate-500">Trợ lý ảo thông minh hỗ trợ công việc của bạn</p>
        </div>
        <button 
          onClick={clearHistory}
          className="p-2 border border-slate-200 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
          title="Xóa lịch sử"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 glass rounded-3xl overflow-hidden flex flex-col border border-slate-200/50 shadow-sm bg-slate-900">
        {/* Terminal Header */}
        <div className="bg-slate-950 px-4 py-3 flex items-center gap-2 border-b border-slate-800">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          </div>
          <div className="ml-4 text-xs font-mono text-slate-400">ai-copilot-terminal ~ bash</div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 font-mono text-sm">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
              <Bot className="w-12 h-12 opacity-50" />
              <p>Chưa có tin nhắn nào. Hãy bắt đầu trò chuyện!</p>
            </div>
          ) : (
            messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex gap-4 max-w-[80%]",
                  msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  msg.role === 'user' 
                    ? "bg-primary text-white" 
                    : "bg-slate-800 text-emerald-400 border border-slate-700"
                )}>
                  {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={cn(
                  "p-4 rounded-2xl",
                  msg.role === 'user' 
                    ? "bg-primary/10 text-primary-100 border border-primary/20 rounded-tr-none" 
                    : "bg-slate-800 text-slate-300 border border-slate-700 rounded-tl-none"
                )}>
                  {msg.content}
                </div>
              </motion.div>
            ))
          )}
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4 max-w-[80%]"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-800 text-emerald-400 border border-slate-700 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-800 text-slate-300 border border-slate-700 rounded-tl-none flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                <span className="animate-pulse">Đang suy nghĩ...</span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <form onSubmit={handleSend} className="relative flex items-center">
            <span className="absolute left-4 text-emerald-500 font-mono font-bold">{'>'}</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập lệnh hoặc câu hỏi..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-12 text-slate-300 font-mono focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-slate-600"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="absolute right-2 p-2 text-slate-400 hover:text-emerald-400 disabled:opacity-50 disabled:hover:text-slate-400 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

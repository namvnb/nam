import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  Search, 
  Filter, 
  Plus, 
  ThumbsUp, 
  MessageSquare, 
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Clock
} from 'lucide-react';
import { cn } from '../lib/utils';

type IdeaStatus = 'researching' | 'approved' | 'rejected';

type Idea = {
  id: string;
  title: string;
  description: string;
  status: IdeaStatus;
  author: string;
  date: string;
  likes: number;
  comments: number;
};

const mockIdeas: Idea[] = [
  {
    id: '1',
    title: 'Tích hợp AI vào công cụ tìm kiếm',
    description: 'Sử dụng mô hình ngôn ngữ lớn để cải thiện kết quả tìm kiếm nội bộ, giúp nhân viên tìm tài liệu nhanh hơn.',
    status: 'researching',
    author: 'Nguyễn Văn A',
    date: '2023-10-26',
    likes: 24,
    comments: 8
  },
  {
    id: '2',
    title: 'Chương trình khách hàng thân thiết mới',
    description: 'Hệ thống tích điểm dựa trên mức độ tương tác thay vì chỉ dựa trên số tiền chi tiêu.',
    status: 'approved',
    author: 'Trần Thị B',
    date: '2023-10-20',
    likes: 45,
    comments: 12
  },
  {
    id: '3',
    title: 'Chuyển đổi sang kiến trúc Microservices',
    description: 'Chia nhỏ monolith hiện tại thành các services độc lập để dễ dàng scale và maintain.',
    status: 'rejected',
    author: 'Lê Văn C',
    date: '2023-10-15',
    likes: 15,
    comments: 30
  },
  {
    id: '4',
    title: 'Tổ chức Hackathon nội bộ',
    description: 'Sự kiện 2 ngày để các team tự do sáng tạo và phát triển các tính năng mới ngoài roadmap.',
    status: 'approved',
    author: 'Phạm Thị D',
    date: '2023-10-10',
    likes: 56,
    comments: 22
  }
];

export function Ideas() {
  const [ideas, setIdeas] = useState<Idea[]>(mockIdeas);
  const [activeFilter, setActiveFilter] = useState<IdeaStatus | 'all'>('all');

  const filteredIdeas = activeFilter === 'all' 
    ? ideas 
    : ideas.filter(i => i.status === activeFilter);

  const getStatusBadge = (status: IdeaStatus) => {
    switch (status) {
      case 'researching':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
            <Clock className="w-3.5 h-3.5" />
            Đang nghiên cứu
          </span>
        );
      case 'approved':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Đã duyệt
          </span>
        );
      case 'rejected':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <XCircle className="w-3.5 h-3.5" />
            Đã hủy
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Ý tưởng</h1>
          <p className="text-slate-500">Nơi ươm mầm và phát triển các sáng kiến mới</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm ý tưởng..." 
              className="pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm w-64"
            />
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-primary-dark transition-colors shadow-sm shadow-primary/20">
            <Plus className="w-5 h-5" />
            <span>Đề xuất ý tưởng</span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveFilter('all')}
          className={cn(
            "px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap",
            activeFilter === 'all'
              ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
              : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
          )}
        >
          Tất cả
        </button>
        <button
          onClick={() => setActiveFilter('researching')}
          className={cn(
            "px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap",
            activeFilter === 'researching'
              ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
              : "bg-white text-slate-600 hover:bg-amber-50 hover:text-amber-600 border border-slate-200"
          )}
        >
          Đang nghiên cứu
        </button>
        <button
          onClick={() => setActiveFilter('approved')}
          className={cn(
            "px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap",
            activeFilter === 'approved'
              ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
              : "bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200"
          )}
        >
          Đã duyệt
        </button>
        <button
          onClick={() => setActiveFilter('rejected')}
          className={cn(
            "px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap",
            activeFilter === 'rejected'
              ? "bg-red-500 text-white shadow-md shadow-red-500/20"
              : "bg-white text-slate-600 hover:bg-red-50 hover:text-red-600 border border-slate-200"
          )}
        >
          Đã hủy
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredIdeas.map((idea, index) => (
          <motion.div
            key={idea.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass p-6 rounded-3xl hover:shadow-md transition-all group border border-slate-200/50 hover:border-primary/30 flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              {getStatusBadge(idea.status)}
              <button className="text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
              {idea.title}
            </h3>
            <p className="text-slate-500 text-sm mb-6 flex-1">
              {idea.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xs" title={idea.author}>
                  {idea.author.charAt(0)}
                </div>
                <div className="text-sm">
                  <p className="font-medium text-slate-900">{idea.author}</p>
                  <p className="text-slate-500 text-xs">{idea.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-slate-400">
                <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm font-medium">{idea.likes}</span>
                </button>
                <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm font-medium">{idea.comments}</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

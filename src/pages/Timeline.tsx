import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Image as ImageIcon, 
  DollarSign, 
  Plus, 
  Search, 
  Filter,
  MoreVertical,
  Clock
} from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { cn } from '../lib/utils';

type TimelineEvent = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  cost: number;
  date: string;
};

const mockEvents: TimelineEvent[] = [
  {
    id: '1',
    title: 'Khởi động dự án Website Redesign',
    description: 'Họp kick-off với toàn bộ team thiết kế và phát triển. Chốt scope và timeline dự án.',
    imageUrl: 'https://picsum.photos/seed/kickoff/800/400',
    cost: 5000000,
    date: '2023-10-01T09:00:00Z'
  },
  {
    id: '2',
    title: 'Hoàn thành thiết kế UI/UX',
    description: 'Đã duyệt toàn bộ thiết kế giao diện trên Figma. Bắt đầu giai đoạn cắt HTML/CSS.',
    cost: 25000000,
    date: '2023-10-15T14:30:00Z'
  },
  {
    id: '3',
    title: 'Sự kiện ra mắt sản phẩm mới',
    description: 'Tổ chức sự kiện ra mắt tại khách sạn InterContinental với 200 khách mời.',
    imageUrl: 'https://picsum.photos/seed/event/800/400',
    cost: 150000000,
    date: '2023-10-20T18:00:00Z'
  },
  {
    id: '4',
    title: 'Thanh toán đợt 1 cho đối tác',
    description: 'Chuyển khoản thanh toán 30% giá trị hợp đồng cho agency marketing.',
    cost: 45000000,
    date: '2023-10-25T10:15:00Z'
  }
];

export function Timeline() {
  const [events, setEvents] = useState<TimelineEvent[]>(mockEvents);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Lịch sử hoạt động</h1>
          <p className="text-slate-500">Theo dõi các sự kiện và cột mốc quan trọng</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm sự kiện..." 
              className="pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm w-64"
            />
          </div>
          <button className="p-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
          <button className="bg-primary text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-primary-dark transition-colors shadow-sm shadow-primary/20">
            <Plus className="w-5 h-5" />
            <span>Thêm sự kiện</span>
          </button>
        </div>
      </div>

      <div className="relative max-w-3xl mx-auto py-8">
        {/* Vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200"></div>

        <div className="space-y-12">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-24 group"
            >
              {/* Timeline dot */}
              <div className="absolute left-[26px] top-6 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm z-10"></div>
              
              {/* Date label */}
              <div className="absolute left-0 top-5 w-20 text-right">
                <div className="text-sm font-bold text-slate-900">
                  {format(new Date(event.date), 'dd MMM', { locale: vi })}
                </div>
                <div className="text-xs text-slate-500">
                  {format(new Date(event.date), 'HH:mm')}
                </div>
              </div>

              {/* Content card */}
              <div className="glass p-6 rounded-3xl border border-slate-200/50 hover:border-primary/30 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <button className="text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-slate-600 mb-6">
                  {event.description}
                </p>

                {event.imageUrl && (
                  <div className="mb-6 rounded-2xl overflow-hidden border border-slate-100">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title} 
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{format(new Date(event.date), 'EEEE, dd MMMM yyyy', { locale: vi })}</span>
                  </div>

                  {event.cost > 0 && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 text-slate-700 font-medium text-sm border border-slate-100">
                      <DollarSign className="w-4 h-4 text-emerald-500" />
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(event.cost)}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

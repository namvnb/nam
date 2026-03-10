import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Clock, 
  Wallet, 
  TrendingUp, 
  MoreHorizontal,
  Plus
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { supabase } from '../lib/supabase';

const data = [
  { name: 'T2', value: 4000 },
  { name: 'T3', value: 3000 },
  { name: 'T4', value: 2000 },
  { name: 'T5', value: 2780 },
  { name: 'T6', value: 1890 },
  { name: 'T7', value: 2390 },
  { name: 'CN', value: 3490 },
];

export function Dashboard() {
  const [stats, setStats] = useState({
    totalTasks: 0,
    upcomingTasks: 0,
    budget: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      // Mock data for now since we don't have actual data yet
      setStats({
        totalTasks: 124,
        upcomingTasks: 12,
        budget: 45000000,
      });
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Trang tổng quan</h1>
          <p className="text-slate-500">Theo dõi tiến độ và hiệu suất của bạn</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-primary-dark transition-colors shadow-sm shadow-primary/20">
          <Plus className="w-5 h-5" />
          <span>Tạo mới</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass p-6 rounded-3xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <button className="text-slate-400 hover:text-slate-600">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <h3 className="text-slate-500 font-medium mb-1">Tổng công việc</h3>
          <div className="text-3xl font-bold text-slate-900">{stats.totalTasks}</div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-emerald-500 flex items-center font-medium bg-emerald-50 px-2 py-1 rounded-lg">
              <TrendingUp className="w-4 h-4 mr-1" /> +12%
            </span>
            <span className="text-slate-400">so với tháng trước</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-6 rounded-3xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
              <Clock className="w-6 h-6" />
            </div>
            <button className="text-slate-400 hover:text-slate-600">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <h3 className="text-slate-500 font-medium mb-1">Sắp tới hạn</h3>
          <div className="text-3xl font-bold text-slate-900">{stats.upcomingTasks}</div>
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
            Cần hoàn thành trong tuần này
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white">
              <Wallet className="w-6 h-6" />
            </div>
            <button className="text-white/60 hover:text-white">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <h3 className="text-white/60 font-medium mb-1">Ngân sách dự án</h3>
          <div className="text-3xl font-bold">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(stats.budget)}
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-accent h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <span className="text-white/60 whitespace-nowrap">65% đã dùng</span>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass p-6 rounded-3xl lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Biểu đồ tiến độ</h3>
            <select className="bg-slate-50 border-none text-sm font-medium rounded-xl px-3 py-1.5 text-slate-600 focus:ring-0 cursor-pointer">
              <option>Tuần này</option>
              <option>Tháng này</option>
              <option>Năm nay</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#0f172a', fontWeight: 500 }}
                />
                <Area type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass p-6 rounded-3xl flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Ghi chú nhanh</h3>
            <button className="text-primary hover:text-primary-dark">
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto pr-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-colors cursor-pointer group">
                <h4 className="font-medium text-slate-900 mb-1 group-hover:text-primary transition-colors">Họp team thiết kế</h4>
                <p className="text-sm text-slate-500 line-clamp-2">Chuẩn bị tài liệu cho buổi review UI/UX tuần tới. Cần xem lại phần dashboard và mobile responsive.</p>
                <div className="mt-3 text-xs font-medium text-slate-400">Hôm nay, 14:30</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FolderKanban, 
  Calendar, 
  Users, 
  Wallet, 
  MoreVertical,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { supabase } from '../lib/supabase';

type Project = {
  id: string;
  name: string;
  description: string;
  deadline: string;
  budget: number;
  status: 'active' | 'completed' | 'on_hold';
  members: number;
};

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Thiết kế lại toàn bộ giao diện website công ty theo nhận diện thương hiệu mới.',
    deadline: '2023-12-31',
    budget: 150000000,
    status: 'active',
    members: 5
  },
  {
    id: '2',
    name: 'Mobile App V2',
    description: 'Phát triển ứng dụng di động phiên bản 2.0 với các tính năng AI mới.',
    deadline: '2024-03-15',
    budget: 300000000,
    status: 'active',
    members: 8
  },
  {
    id: '3',
    name: 'Marketing Campaign Q4',
    description: 'Chiến dịch marketing cuối năm cho sản phẩm mới.',
    deadline: '2023-11-30',
    budget: 50000000,
    status: 'completed',
    members: 3
  }
];

export function Projects() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [loading, setLoading] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'on_hold': return 'bg-amber-100 text-amber-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Đang chạy';
      case 'completed': return 'Hoàn thành';
      case 'on_hold': return 'Tạm dừng';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dự án</h1>
          <p className="text-slate-500">Quản lý và theo dõi các dự án của bạn</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm dự án..." 
              className="pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm w-64"
            />
          </div>
          <button className="p-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
          <button className="bg-primary text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-primary-dark transition-colors shadow-sm shadow-primary/20">
            <Plus className="w-5 h-5" />
            <span>Thêm dự án</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass p-6 rounded-3xl hover:shadow-md transition-all group cursor-pointer border border-slate-200/50 hover:border-primary/30"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <FolderKanban className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${getStatusColor(project.status)}`}>
                  {getStatusText(project.status)}
                </span>
                <button className="text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors line-clamp-1">
              {project.name}
            </h3>
            <p className="text-slate-500 text-sm mb-6 line-clamp-2 h-10">
              {project.description}
            </p>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-slate-500 gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Deadline</span>
                </div>
                <span className="font-medium text-slate-700">
                  {format(new Date(project.deadline), 'dd MMM, yyyy', { locale: vi })}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-slate-500 gap-2">
                  <Wallet className="w-4 h-4" />
                  <span>Ngân sách</span>
                </div>
                <span className="font-medium text-slate-700">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(project.budget)}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-slate-500 gap-2">
                  <Users className="w-4 h-4" />
                  <span>Thành viên</span>
                </div>
                <div className="flex -space-x-2">
                  {[...Array(Math.min(project.members, 3))].map((_, i) => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                  {project.members > 3 && (
                    <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-medium text-slate-500">
                      +{project.members - 3}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  FolderKanban, 
  Image as ImageIcon, 
  Lightbulb, 
  Link as LinkIcon, 
  History, 
  Users, 
  DollarSign, 
  Bot, 
  Settings,
  LogOut
} from 'lucide-react';
import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';

const navItems = [
  { name: 'Trang tổng quan', path: '/', icon: LayoutDashboard },
  { name: 'Công việc', path: '/tasks', icon: CheckSquare },
  { name: 'Dự án', path: '/projects', icon: FolderKanban },
  { name: 'Kho tài sản', path: '/assets', icon: ImageIcon },
  { name: 'Ý tưởng', path: '/ideas', icon: Lightbulb },
  { name: 'Tài nguyên', path: '/resources', icon: LinkIcon },
  { name: 'Lịch sử hoạt động', path: '/timeline', icon: History },
  { name: 'Đối tác', path: '/partners', icon: Users },
  { name: 'Tài chính', path: '/finance', icon: DollarSign },
  { name: 'AI Copilot', path: '/copilot', icon: Bot },
  { name: 'Cài đặt', path: '/settings', icon: Settings },
];

export function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="w-64 h-screen glass border-r flex flex-col fixed left-0 top-0 z-40">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
          S
        </div>
        <h1 className="text-xl font-bold text-gradient">SaaS Platform</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
              isActive 
                ? "bg-primary/10 text-primary font-medium" 
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-slate-200/50">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  );
}

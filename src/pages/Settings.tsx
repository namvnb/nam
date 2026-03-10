import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Shield, 
  Key, 
  Palette, 
  Globe,
  Save,
  LogOut
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export function Settings() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    // Simulate saving settings
    setTimeout(() => {
      toast.success('Đã lưu cài đặt thành công');
      setLoading(false);
    }, 1000);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Cài đặt</h1>
          <p className="text-slate-500">Quản lý tài khoản và tùy chọn hệ thống</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={loading}
          className="bg-primary text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-primary-dark transition-colors shadow-sm shadow-primary/20 disabled:opacity-70"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Save className="w-5 h-5" />
              <span>Lưu thay đổi</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar Settings Navigation */}
        <div className="space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium transition-colors text-left">
            <User className="w-5 h-5" />
            <span>Hồ sơ cá nhân</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors text-left">
            <Bell className="w-5 h-5" />
            <span>Thông báo</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors text-left">
            <Shield className="w-5 h-5" />
            <span>Bảo mật</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors text-left">
            <Key className="w-5 h-5" />
            <span>API Keys</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors text-left">
            <Palette className="w-5 h-5" />
            <span>Giao diện</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors text-left">
            <Globe className="w-5 h-5" />
            <span>Ngôn ngữ & Khu vực</span>
          </button>
        </div>

        {/* Settings Content */}
        <div className="md:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-6 rounded-3xl border border-slate-200/50"
          >
            <h3 className="text-lg font-bold text-slate-900 mb-6">Thông tin cá nhân</h3>
            
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-primary/20">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors mb-2">
                  Thay đổi ảnh đại diện
                </button>
                <p className="text-sm text-slate-500">JPG, GIF hoặc PNG. Tối đa 2MB.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Họ và tên</label>
                  <input 
                    type="text" 
                    defaultValue="Người dùng"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-white/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Chức vụ</label>
                  <input 
                    type="text" 
                    defaultValue="Quản lý dự án"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-white/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email liên hệ</label>
                <input 
                  type="email" 
                  value={user?.email || ''}
                  disabled
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
                />
                <p className="mt-1.5 text-xs text-slate-500">Email này được sử dụng để đăng nhập và không thể thay đổi.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Giới thiệu ngắn</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-white/50 resize-none"
                  placeholder="Viết vài dòng về bản thân..."
                ></textarea>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass p-6 rounded-3xl border border-red-200/50 bg-red-50/30"
          >
            <h3 className="text-lg font-bold text-red-600 mb-2">Khu vực nguy hiểm</h3>
            <p className="text-slate-600 text-sm mb-6">Các hành động dưới đây không thể hoàn tác. Vui lòng cẩn thận.</p>
            
            <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-red-100">
              <div>
                <h4 className="font-medium text-slate-900">Đăng xuất khỏi thiết bị</h4>
                <p className="text-sm text-slate-500">Đăng xuất tài khoản khỏi phiên làm việc hiện tại.</p>
              </div>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-medium transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Đăng xuất
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

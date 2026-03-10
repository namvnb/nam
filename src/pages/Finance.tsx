import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Search, 
  Filter,
  MoreVertical,
  Calendar as CalendarIcon,
  FolderKanban
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { cn } from '../lib/utils';

type TransactionType = 'income' | 'expense';

type Transaction = {
  id: string;
  date: string;
  amount: number;
  type: TransactionType;
  description: string;
  project: string;
};

const mockTransactions: Transaction[] = [
  { id: '1', date: '2023-10-28', amount: 50000000, type: 'income', description: 'Thanh toán đợt 1 dự án Website', project: 'Website Redesign' },
  { id: '2', date: '2023-10-25', amount: 15000000, type: 'expense', description: 'Mua bản quyền phần mềm thiết kế', project: 'Website Redesign' },
  { id: '3', date: '2023-10-20', amount: 120000000, type: 'income', description: 'Tạm ứng dự án Mobile App', project: 'Mobile App V2' },
  { id: '4', date: '2023-10-15', amount: 8000000, type: 'expense', description: 'Chi phí server tháng 10', project: 'Mobile App V2' },
  { id: '5', date: '2023-10-10', amount: 25000000, type: 'expense', description: 'Chi phí chạy quảng cáo Facebook', project: 'Marketing Campaign Q4' },
  { id: '6', date: '2023-10-05', amount: 200000000, type: 'income', description: 'Thanh toán đợt cuối dự án ERP', project: 'ERP System' },
];

const chartData = [
  { name: 'Tháng 5', income: 400, expense: 240 },
  { name: 'Tháng 6', income: 300, expense: 139 },
  { name: 'Tháng 7', income: 200, expense: 980 },
  { name: 'Tháng 8', income: 278, expense: 390 },
  { name: 'Tháng 9', income: 189, expense: 480 },
  { name: 'Tháng 10', income: 239, expense: 380 },
];

export function Finance() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tài chính</h1>
          <p className="text-slate-500">Quản lý thu chi và ngân sách dự án</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-emerald-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-emerald-600 transition-colors shadow-sm shadow-emerald-500/20">
            <TrendingUp className="w-5 h-5" />
            <span>Thêm khoản thu</span>
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-red-600 transition-colors shadow-sm shadow-red-500/20">
            <TrendingDown className="w-5 h-5" />
            <span>Thêm khoản chi</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-white/60 font-medium mb-1">Tổng số dư</h3>
          <div className="text-3xl font-bold">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(balance)}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-6 rounded-3xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-slate-500 font-medium mb-1">Tổng thu (Tháng này)</h3>
          <div className="text-3xl font-bold text-slate-900">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalIncome)}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass p-6 rounded-3xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600">
              <TrendingDown className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-slate-500 font-medium mb-1">Tổng chi (Tháng này)</h3>
          <div className="text-3xl font-bold text-slate-900">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalExpense)}
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
            <h3 className="text-lg font-bold text-slate-900">Biểu đồ thu chi</h3>
            <select className="bg-slate-50 border-none text-sm font-medium rounded-xl px-3 py-1.5 text-slate-600 focus:ring-0 cursor-pointer">
              <option>6 tháng gần nhất</option>
              <option>Năm nay</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#0f172a', fontWeight: 500 }}
                  formatter={(value: number) => [`${value} Tr VND`, '']}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="income" name="Thu" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="expense" name="Chi" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
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
            <h3 className="text-lg font-bold text-slate-900">Giao dịch gần đây</h3>
            <button className="text-primary hover:text-primary-dark text-sm font-medium">
              Xem tất cả
            </button>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto pr-2">
            {transactions.slice(0, 5).map((t) => (
              <div key={t.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    t.type === 'income' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                  )}>
                    {t.type === 'income' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 text-sm line-clamp-1">{t.description}</h4>
                    <p className="text-xs text-slate-500">{format(new Date(t.date), 'dd/MM/yyyy')}</p>
                  </div>
                </div>
                <div className={cn(
                  "font-bold text-sm whitespace-nowrap",
                  t.type === 'income' ? "text-emerald-600" : "text-red-600"
                )}>
                  {t.type === 'income' ? '+' : '-'}
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(t.amount)}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

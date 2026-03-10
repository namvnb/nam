import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Link as LinkIcon, 
  ExternalLink, 
  Search, 
  Plus, 
  Palette, 
  Code2, 
  Megaphone, 
  Microscope,
  MoreVertical
} from 'lucide-react';
import { cn } from '../lib/utils';

type ResourceCategory = 'design' | 'development' | 'marketing' | 'research';

type Resource = {
  id: string;
  title: string;
  url: string;
  category: ResourceCategory;
  description: string;
  date: string;
};

const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Figma Design System',
    url: 'https://figma.com',
    category: 'design',
    description: 'Hệ thống thiết kế chuẩn của công ty, bao gồm components, colors, typography.',
    date: '2023-10-25'
  },
  {
    id: '2',
    title: 'TailwindCSS Documentation',
    url: 'https://tailwindcss.com',
    category: 'development',
    description: 'Tài liệu tham khảo chính thức cho framework CSS đang sử dụng.',
    date: '2023-10-24'
  },
  {
    id: '3',
    title: 'Q4 Marketing Strategy',
    url: 'https://docs.google.com',
    category: 'marketing',
    description: 'Bản kế hoạch chi tiết cho chiến dịch marketing quý 4.',
    date: '2023-10-20'
  },
  {
    id: '4',
    title: 'User Research Q3',
    url: 'https://notion.so',
    category: 'research',
    description: 'Báo cáo nghiên cứu hành vi người dùng trong quý 3.',
    date: '2023-10-18'
  },
  {
    id: '5',
    title: 'React Hook Form',
    url: 'https://react-hook-form.com',
    category: 'development',
    description: 'Thư viện quản lý form hiệu suất cao cho React.',
    date: '2023-10-15'
  },
  {
    id: '6',
    title: 'Brand Guidelines',
    url: 'https://brand.company.com',
    category: 'design',
    description: 'Hướng dẫn sử dụng logo, màu sắc và nhận diện thương hiệu.',
    date: '2023-10-10'
  }
];

const categories = [
  { id: 'all', label: 'Tất cả', icon: null },
  { id: 'design', label: 'Thiết kế', icon: Palette },
  { id: 'development', label: 'Phát triển', icon: Code2 },
  { id: 'marketing', label: 'Marketing', icon: Megaphone },
  { id: 'research', label: 'Nghiên cứu', icon: Microscope },
];

export function Resources() {
  const [resources, setResources] = useState<Resource[]>(mockResources);
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredResources = activeCategory === 'all' 
    ? resources 
    : resources.filter(r => r.category === activeCategory);

  const getCategoryIcon = (category: ResourceCategory) => {
    switch (category) {
      case 'design': return <Palette className="w-5 h-5 text-pink-500" />;
      case 'development': return <Code2 className="w-5 h-5 text-blue-500" />;
      case 'marketing': return <Megaphone className="w-5 h-5 text-amber-500" />;
      case 'research': return <Microscope className="w-5 h-5 text-emerald-500" />;
    }
  };

  const getCategoryColor = (category: ResourceCategory) => {
    switch (category) {
      case 'design': return 'bg-pink-50 text-pink-700 border-pink-200';
      case 'development': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'marketing': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'research': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  const getCategoryLabel = (category: ResourceCategory) => {
    switch (category) {
      case 'design': return 'Thiết kế';
      case 'development': return 'Phát triển';
      case 'marketing': return 'Marketing';
      case 'research': return 'Nghiên cứu';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tài nguyên</h1>
          <p className="text-slate-500">Lưu trữ và chia sẻ các liên kết hữu ích</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm tài nguyên..." 
              className="pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm w-64"
            />
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-primary-dark transition-colors shadow-sm shadow-primary/20">
            <Plus className="w-5 h-5" />
            <span>Thêm liên kết</span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap",
              activeCategory === cat.id
                ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
            )}
          >
            {cat.icon && <cat.icon className="w-4 h-4" />}
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource, index) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass p-6 rounded-3xl hover:shadow-md transition-all group border border-slate-200/50 hover:border-primary/30 flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
                {getCategoryIcon(resource.category)}
              </div>
              <div className="flex items-center gap-2">
                <span className={cn("px-2.5 py-1 rounded-lg text-xs font-medium border", getCategoryColor(resource.category))}>
                  {getCategoryLabel(resource.category)}
                </span>
                <button className="text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors line-clamp-1">
              {resource.title}
            </h3>
            <p className="text-slate-500 text-sm mb-6 flex-1 line-clamp-2 h-10">
              {resource.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <LinkIcon className="w-4 h-4" />
                <span className="truncate max-w-[150px]">{new URL(resource.url).hostname}</span>
              </div>

              <a 
                href={resource.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
              >
                Truy cập
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

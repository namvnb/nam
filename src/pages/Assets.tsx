import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Image as ImageIcon, 
  Video, 
  FileText, 
  FileCode2, 
  Upload, 
  Search, 
  Filter,
  MoreVertical,
  Download,
  Trash2
} from 'lucide-react';
import { cn } from '../lib/utils';

type AssetType = 'video' | 'image' | 'document' | 'script';

type Asset = {
  id: string;
  name: string;
  type: AssetType;
  size: string;
  date: string;
  url: string;
};

const mockAssets: Asset[] = [
  { id: '1', name: 'Hero_Banner_v2.jpg', type: 'image', size: '2.4 MB', date: '2023-10-25', url: 'https://picsum.photos/seed/hero/800/600' },
  { id: '2', name: 'Product_Demo.mp4', type: 'video', size: '145 MB', date: '2023-10-24', url: '#' },
  { id: '3', name: 'Q4_Report.pdf', type: 'document', size: '4.1 MB', date: '2023-10-20', url: '#' },
  { id: '4', name: 'Marketing_Copy.txt', type: 'script', size: '12 KB', date: '2023-10-18', url: '#' },
  { id: '5', name: 'Logo_Pack.zip', type: 'document', size: '18 MB', date: '2023-10-15', url: '#' },
  { id: '6', name: 'Team_Photo.jpg', type: 'image', size: '5.2 MB', date: '2023-10-10', url: 'https://picsum.photos/seed/team/800/600' },
];

const tabs = [
  { id: 'all', label: 'Tất cả', icon: null },
  { id: 'image', label: 'Hình ảnh', icon: ImageIcon },
  { id: 'video', label: 'Video', icon: Video },
  { id: 'document', label: 'Tài liệu', icon: FileText },
  { id: 'script', label: 'Kịch bản', icon: FileCode2 },
];

export function Assets() {
  const [activeTab, setActiveTab] = useState('all');
  const [assets, setAssets] = useState<Asset[]>(mockAssets);

  const filteredAssets = activeTab === 'all' 
    ? assets 
    : assets.filter(a => a.type === activeTab);

  const getIconForType = (type: AssetType) => {
    switch (type) {
      case 'image': return <ImageIcon className="w-8 h-8 text-blue-500" />;
      case 'video': return <Video className="w-8 h-8 text-purple-500" />;
      case 'document': return <FileText className="w-8 h-8 text-emerald-500" />;
      case 'script': return <FileCode2 className="w-8 h-8 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Kho tài sản</h1>
          <p className="text-slate-500">Quản lý tất cả file và tài nguyên số</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm file..." 
              className="pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm w-64"
            />
          </div>
          <button className="p-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
          <button className="bg-primary text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-primary-dark transition-colors shadow-sm shadow-primary/20">
            <Upload className="w-5 h-5" />
            <span>Tải lên</span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap",
              activeTab === tab.id
                ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
            )}
          >
            {tab.icon && <tab.icon className="w-4 h-4" />}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredAssets.map((asset, index) => (
          <motion.div
            key={asset.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="glass rounded-3xl overflow-hidden group border border-slate-200/50 hover:border-primary/30 hover:shadow-lg transition-all"
          >
            <div className="aspect-square bg-slate-50 relative flex items-center justify-center overflow-hidden">
              {asset.type === 'image' ? (
                <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                getIconForType(asset.type)
              )}
              
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                <button className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                  <Download className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-white text-red-600 flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-medium text-slate-900 truncate" title={asset.name}>
                  {asset.name}
                </h3>
                <button className="text-slate-400 hover:text-slate-600 shrink-0">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{asset.size}</span>
                <span>{asset.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

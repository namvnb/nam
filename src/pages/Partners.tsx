import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Plus, 
  Globe, 
  MoreVertical,
  ExternalLink
} from 'lucide-react';
import { cn } from '../lib/utils';

type Partner = {
  id: string;
  name: string;
  logoUrl: string;
  website: string;
  description: string;
  status: 'active' | 'inactive';
};

const mockPartners: Partner[] = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    logoUrl: 'https://picsum.photos/seed/techcorp/200/200',
    website: 'https://techcorp.example.com',
    description: 'Đối tác chiến lược cung cấp hạ tầng cloud và dịch vụ bảo mật.',
    status: 'active'
  },
  {
    id: '2',
    name: 'Creative Agency',
    logoUrl: 'https://picsum.photos/seed/creative/200/200',
    website: 'https://creative.example.com',
    description: 'Agency phụ trách thiết kế nhận diện thương hiệu và marketing.',
    status: 'active'
  },
  {
    id: '3',
    name: 'Global Logistics',
    logoUrl: 'https://picsum.photos/seed/logistics/200/200',
    website: 'https://logistics.example.com',
    description: 'Đối tác vận chuyển và quản lý chuỗi cung ứng quốc tế.',
    status: 'inactive'
  },
  {
    id: '4',
    name: 'FinTech Partners',
    logoUrl: 'https://picsum.photos/seed/fintech/200/200',
    website: 'https://fintech.example.com',
    description: 'Cung cấp giải pháp thanh toán trực tuyến và ví điện tử.',
    status: 'active'
  },
  {
    id: '5',
    name: 'EduTech Group',
    logoUrl: 'https://picsum.photos/seed/edutech/200/200',
    website: 'https://edutech.example.com',
    description: 'Đối tác đào tạo và phát triển nguồn nhân lực chất lượng cao.',
    status: 'active'
  },
  {
    id: '6',
    name: 'Green Energy',
    logoUrl: 'https://picsum.photos/seed/green/200/200',
    website: 'https://green.example.com',
    description: 'Cung cấp giải pháp năng lượng sạch cho văn phòng.',
    status: 'active'
  }
];

export function Partners() {
  const [partners, setPartners] = useState<Partner[]>(mockPartners);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Đối tác</h1>
          <p className="text-slate-500">Quản lý mạng lưới đối tác và nhà cung cấp</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm đối tác..." 
              className="pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm w-64"
            />
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-primary-dark transition-colors shadow-sm shadow-primary/20">
            <Plus className="w-5 h-5" />
            <span>Thêm đối tác</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {partners.map((partner, index) => (
          <motion.div
            key={partner.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="glass rounded-3xl overflow-hidden group border border-slate-200/50 hover:border-primary/30 hover:shadow-lg transition-all flex flex-col"
          >
            <div className="p-6 flex flex-col items-center text-center border-b border-slate-100 relative">
              <button className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="w-5 h-5" />
              </button>
              
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md mb-4 bg-slate-50">
                <img 
                  src={partner.logoUrl} 
                  alt={partner.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">
                {partner.name}
              </h3>
              
              <span className={cn(
                "px-2.5 py-0.5 rounded-full text-xs font-medium",
                partner.status === 'active' 
                  ? "bg-emerald-100 text-emerald-700" 
                  : "bg-slate-100 text-slate-600"
              )}>
                {partner.status === 'active' ? 'Đang hợp tác' : 'Ngừng hợp tác'}
              </span>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-slate-500 text-sm mb-6 flex-1 text-center line-clamp-3">
                {partner.description}
              </p>
              
              <a 
                href={partner.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-50 text-slate-700 font-medium hover:bg-primary/10 hover:text-primary transition-colors border border-slate-200"
              >
                <Globe className="w-4 h-4" />
                <span>Truy cập Website</span>
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

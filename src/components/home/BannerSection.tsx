import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const BannerSection = () => (
  <div className="grid grid-cols-12 gap-2 mt-4 h-[230px]">
    <div className="col-span-8 bg-gray-300 rounded-sm overflow-hidden relative group">
      <img src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover" alt="Main Banner" />
      <div className="absolute inset-y-0 left-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="bg-black/20 p-2 text-white"><ChevronLeft /></button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="bg-black/20 p-2 text-white"><ChevronRight /></button>
      </div>
    </div>
    <div className="col-span-4 flex flex-col gap-2">
      <div className="h-1/2 bg-gray-300 rounded-sm overflow-hidden">
        <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600" className="w-full h-full object-cover" alt="Sub 1" />
      </div>
      <div className="h-1/2 bg-gray-300 rounded-sm overflow-hidden">
        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600" className="w-full h-full object-cover" alt="Sub 2" />
      </div>
    </div>
  </div>
);

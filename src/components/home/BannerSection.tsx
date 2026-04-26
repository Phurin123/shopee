import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const BannerSection = () => (
  <div className="grid grid-cols-1 md:grid-cols-12 gap-2 mt-4 h-auto md:h-[230px]">
    <div className="col-span-1 md:col-span-8 bg-gray-300 rounded-sm overflow-hidden relative group aspect-[2/1] md:aspect-auto">
      <img src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover absolute md:static inset-0" alt="Main Banner" />
      <div className="absolute inset-y-0 left-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="bg-black/20 p-2 text-white"><ChevronLeft /></button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="bg-black/20 p-2 text-white"><ChevronRight /></button>
      </div>
    </div>
    <div className="hidden md:flex col-span-4 flex-col gap-2">
      <div className="flex-1 bg-gray-300 rounded-sm overflow-hidden relative">
        <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600" className="w-full h-full object-cover absolute inset-0" alt="Sub 1" />
      </div>
      <div className="flex-1 bg-gray-300 rounded-sm overflow-hidden relative">
        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600" className="w-full h-full object-cover absolute inset-0" alt="Sub 2" />
      </div>
    </div>
  </div>
);

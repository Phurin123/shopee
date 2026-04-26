import React from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { TopHeader } from './TopHeader';

export const HomeNavbar = () => (
  <div className="bg-[#ee4d2d] text-white sticky top-0 z-50 shadow-md">
    <TopHeader />
    <div className="max-w-[1200px] mx-auto px-3 py-3 md:py-4 flex flex-wrap md:flex-nowrap items-center justify-between gap-y-3 md:gap-10">
      <div className="text-2xl md:text-4xl font-bold flex items-center gap-1 cursor-pointer order-1">
        <span className="tracking-tighter">Shopee</span>
      </div>
      
      <div className="w-full md:flex-1 md:w-auto order-3 md:order-2 mt-2 md:mt-0">
        <div className="flex bg-white rounded-sm p-1 shadow-sm">
          <input 
            type="text" 
            placeholder="ค้นหาลูกค้าและรับโค้ดส่วนลด" 
            className="w-full px-3 md:px-4 py-1.5 md:py-2 text-black focus:outline-none text-sm"
          />
          <button className="bg-[#fb5533] px-4 md:px-6 py-1.5 md:py-2 rounded-sm hover:bg-[#f53d2d] flex items-center justify-center">
            <Search size={18} />
          </button>
        </div>
        <div className="hidden md:flex gap-3 mt-1 text-[11px] opacity-90">
          <span>รองเท้าแตะผู้หญิง</span>
          <span>กระเป๋าสะพายข้าง</span>
          <span>สายชาร์จ Type C</span>
          <span>ชุดเซ็ต</span>
          <span>แก้วเก็บความเย็น</span>
          <span>iPhone 15 Pro Max</span>
        </div>
      </div>

      <div className="relative cursor-pointer group pr-2 md:pr-4 order-2 md:order-3">
        <ShoppingCart size={24} className="md:w-7 md:h-7" />
        <span className="absolute -top-1 -right-1 bg-white text-[#ee4d2d] text-[10px] font-bold px-1.5 rounded-full border border-[#ee4d2d]">
          18
        </span>
      </div>
    </div>
  </div>
);

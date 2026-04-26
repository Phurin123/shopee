import React from 'react';
import { Bell, ChevronRight } from 'lucide-react';

export const TopHeader = () => (
  <div className="bg-[#ee4d2d] text-white text-[12px] py-1 border-b border-white/10">
    <div className="max-w-[1200px] mx-auto px-4 flex justify-between">
      <div className="flex gap-4">
        <a href="#" className="hover:opacity-80">Seller Centre</a>
        <span className="opacity-30">|</span>
        <a href="#" className="hover:opacity-80">เริ่มต้นขายสินค้า</a>
        <span className="opacity-30">|</span>
        <a href="#" className="hover:opacity-80">ดาวน์โหลด</a>
        <span className="opacity-30">|</span>
        <div className="flex gap-2">ติดตามเราบน <span className="font-bold">f</span> <span className="font-bold">i</span></div>
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-1 cursor-pointer"><Bell size={14} /> การแจ้งเตือน</div>
        <div className="flex items-center gap-1 cursor-pointer">ช่วยเหลือ</div>
        <div className="flex items-center gap-1 cursor-pointer">ไทย <ChevronRight size={12} className="rotate-90" /></div>
        <div className="flex gap-3 font-medium">
          <span className="cursor-pointer">สมัครสมาชิก</span>
          <span className="opacity-30">|</span>
          <span className="cursor-pointer">เข้าสู่ระบบ</span>
        </div>
      </div>
    </div>
  </div>
);

import React from 'react';
import { Zap, ChevronRight } from 'lucide-react';

export const FlashSale = () => (
  <div className="mt-6 bg-white shadow-md rounded-lg overflow-hidden border border-gray-100">
    <div className="p-4 flex justify-between items-center border-b border-gray-100 bg-gradient-to-r from-red-50 to-white">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <h2 className="text-[#ee4d2d] font-black text-xl sm:text-2xl italic tracking-tighter flex items-center">
            FLASH <Zap className="fill-[#ee4d2d]" size={24} /> SALE
          </h2>
          <div className="flex gap-1.5 items-center font-bold">
            <span className="bg-black text-white px-2 py-1 rounded text-xs sm:text-sm shadow-inner">00</span>
            <span className="text-black font-bold">:</span>
            <span className="bg-black text-white px-2 py-1 rounded text-xs sm:text-sm shadow-inner">00</span>
            <span className="text-black font-bold">:</span>
            <span className="bg-black text-white px-2 py-1 rounded text-xs sm:text-sm shadow-inner">00</span>
          </div>
      </div>
      <button className="text-[#ee4d2d] text-sm font-medium flex items-center hover:opacity-80 transition-opacity">ดูทั้งหมด <ChevronRight size={14} /></button>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 divide-x divide-gray-100">
      {[192, 4440, 1361, 436, 465, 772].map((price, i) => (
        <div key={i} className="p-4 relative group cursor-pointer hover:bg-red-50/50 hover:shadow-lg hover:-translate-y-1 hover:z-10 transition-all duration-300 bg-white">
          <div className="absolute top-0 right-0 bg-yellow-300 text-[#ee4d2d] text-[11px] px-2 py-0.5 font-bold rounded-bl-lg shadow-sm z-10">36% ลด</div>
          <div className="aspect-square bg-gray-50 mb-3 overflow-hidden rounded-md relative shadow-inner">
              <img src={`https://picsum.photos/seed/flash${i}/200/200`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={`Flash Sale ${i}`} />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="text-center">
            <div className="text-[#ee4d2d] text-xl font-bold">฿{price.toLocaleString()}</div>
            <div className="w-full bg-red-100 h-4 rounded-full mt-2 relative overflow-hidden shadow-inner border border-red-200">
              <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#ff7337] to-[#ee4d2d] w-[40%] rounded-full" />
              <span className="absolute inset-0 text-[10px] text-white font-bold flex justify-center items-center drop-shadow-md">ขายแล้ว 15</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

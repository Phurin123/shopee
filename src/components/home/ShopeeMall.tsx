import React from 'react';
import { ShieldCheck, RotateCcw, Truck, ChevronRight } from 'lucide-react';

const MALL_BRANDS = [
  { name: "Konvy", discount: "80%", logo: "K" },
  { name: "Lotus's", discount: "70%", logo: "L" },
  { name: "Dodo Love", discount: "80%", logo: "D" },
  { name: "Garnier", discount: "50%", logo: "G" },
  { name: "Dr.PONG", discount: "70%", logo: "P" },
  { name: "EVEANDBOY", discount: "90%", logo: "E" },
  { name: "Oral-B", discount: "ใหม่", logo: "O" },
  { name: "Boots", discount: "80%", logo: "B" },
];

export const ShopeeMall = () => (
  <div className="max-w-[1200px] mx-auto mt-6 bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
    <div className="flex justify-between items-center p-4 border-b border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
        <h2 className="text-[#d0011b] font-bold text-lg md:text-xl uppercase tracking-tight flex items-center gap-2">
          SHOPEE MALL
        </h2>
        <div className="flex flex-wrap gap-3 md:gap-5 text-xs text-gray-700">
          <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-[#d0011b]" /> ของแท้ 100%</span>
          <span className="flex items-center gap-1"><RotateCcw size={14} className="text-[#d0011b]" /> คืนเงิน/สินค้าใน 15 วัน</span>
          <span className="flex items-center gap-1"><Truck size={14} className="text-[#d0011b]" /> ส่งฟรีทั่วไทย</span>
        </div>
      </div>
      <button className="text-[#d0011b] text-sm font-medium flex items-center hover:opacity-80 transition-opacity">
        ดูทั้งหมด <ChevronRight size={16} />
      </button>
    </div>
    
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-[390px] h-[250px] md:h-[450px] bg-red-50 p-3 md:p-4">
        <div className="w-full h-full rounded-lg overflow-hidden relative shadow-sm hover:shadow-md transition-shadow group">
          <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecee?w=800" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Mall Promo" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-4 left-4 bg-gradient-to-r from-[#d0011b] to-[#f53d2d] text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
            โค้ดแบรนด์ลดเพิ่ม 30%
          </div>
        </div>
      </div>
      <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 grid-rows-2">
        {MALL_BRANDS.map((brand, i) => (
          <div key={i} className="border-r border-b border-gray-100 p-4 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg hover:z-10 bg-white relative transition-all duration-300 group">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-gray-300 mb-3 border-2 border-gray-100 shadow-sm group-hover:border-[#d0011b]/30 group-hover:scale-110 group-hover:text-[#d0011b] transition-all duration-300">
              {brand.logo}
            </div>
            <span className="text-[#d0011b] text-sm font-medium px-2 py-0.5 bg-red-50 rounded-full group-hover:bg-[#d0011b] group-hover:text-white transition-colors">
              ลดสูงสุด {brand.discount}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

import React from 'react';

const CATEGORIES = [
  { label: "ความงามและของใช้ส่วนตัว", icon: "💄" },
  { label: "เสื้อผ้าแฟชั่นผู้ชาย", icon: "👕" },
  { label: "กระเป๋า", icon: "👜" },
  { label: "รองเท้าผู้หญิง", icon: "👠" },
  { label: "นาฬิกาและแว่นตา", icon: "⌚" },
  { label: "อุปกรณ์อิเล็กทรอนิกส์", icon: "🎧" },
  { label: "เครื่องใช้ไฟฟ้าในบ้าน", icon: "📺" },
  { label: "กล้องและอุปกรณ์ถ่ายภาพ", icon: "📷" },
  { label: "ของเล่น สินค้าแม่และเด็ก", icon: "🍼" },
  { label: "สัตว์เลี้ยง", icon: "🐶" },
  { label: "ความงามและของใช้ส่วนตัว", icon: "💄" },
  { label: "เสื้อผ้าแฟชั่นผู้หญิง", icon: "👗" },
  { label: "รองเท้าผู้ชาย", icon: "👟" },
  { label: "เครื่องประดับ", icon: "💍" },
  { label: "เครื่องใช้ในบ้าน", icon: "🏠" },
  { label: "มือถือและแท็บเล็ต", icon: "📱" },
  { label: "คอมพิวเตอร์และแล็ปท็อป", icon: "💻" },
  { label: "อาหารและเครื่องดื่ม", icon: "🍜" },
  { label: "กีฬาและกิจกรรมกลางแจ้ง", icon: "🚴" },
  { label: "เกมและอุปกรณ์เสริม", icon: "🎮" },
];

export const CategoryGrid = () => (
  <div className="bg-white mt-4 max-w-[1200px] mx-auto shadow-md rounded-lg overflow-hidden border border-gray-100">
    <div className="p-4 border-b border-gray-100 text-gray-700 font-semibold uppercase text-base tracking-wide flex items-center justify-between">
      <span>หมวดหมู่</span>
    </div>
    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10">
      {CATEGORIES.map((cat, i) => (
        <div key={i} className="border-r border-b border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer p-3 flex flex-col items-center text-center group bg-white hover:z-10 relative">
          <div className="w-16 h-16 mb-2 rounded-2xl bg-gray-50 flex items-center justify-center text-3xl group-hover:-translate-y-1 group-hover:scale-110 transition-transform duration-300 shadow-sm group-hover:shadow-md">
            {cat.icon}
          </div>
          <span className="text-[12px] text-gray-700 leading-tight h-8 flex items-center justify-center group-hover:text-[#ee4d2d] transition-colors">{cat.label}</span>
        </div>
      ))}
    </div>
  </div>
);

import React from 'react';

const SERVICES = [
  { label: "ส่งฟรี", icon: "🚚" },
  { label: "Mall", icon: "🛍️" },
  { label: "ช้อปปี้เครดิต", icon: "💳" },
  { label: "ช้อปปี้มอลล์", icon: "🏢" },
  { label: "ช้อปปี้แฟชั่น", icon: "👕" },
  { label: "ช้อปปี้บิวตี้", icon: "💄" },
  { label: "ซูเปอร์มาร์เก็ต", icon: "🛒" },
  { label: "คูปองส่วนลด", icon: "🎫" },
];

export const ServiceIcons = () => (
  <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 py-6 bg-white mt-4 rounded-lg shadow-md border border-gray-100 px-4">
    {SERVICES.map((item, i) => (
      <div key={i} className="flex flex-col items-center gap-3 cursor-pointer text-center group">
        <div className="w-14 h-14 rounded-[1.25rem] bg-gray-50 border border-gray-100 shadow-sm flex items-center justify-center text-3xl group-hover:-translate-y-2 group-hover:shadow-lg group-hover:bg-red-50 group-hover:border-red-100 transition-all duration-300">
          {item.icon}
        </div>
        <span className="text-[12px] font-medium text-gray-700 group-hover:text-[#ee4d2d] transition-colors">{item.label}</span>
      </div>
    ))}
  </div>
);

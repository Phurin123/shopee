import React from 'react';
import { Truck } from 'lucide-react';

interface HomeProductCardProps {
  title: string;
  price: string | number;
  sold: string | number;
  discount?: string;
  isMall?: boolean;
  isFreeShip?: boolean;
}

export const HomeProductCard = ({ title, price, sold, discount, isMall, isFreeShip }: HomeProductCardProps) => (
  <div className="bg-white border border-gray-200 hover:border-[#ee4d2d] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer relative flex flex-col h-full group rounded-sm overflow-hidden z-0 hover:z-10">
    {discount && (
      <div className="absolute top-0 right-0 z-10">
        <div className="bg-yellow-300 text-[#ee4d2d] px-1 py-0.5 text-[10px] font-bold flex flex-col items-center leading-tight">
          <span>{discount}</span>
          <span className="text-white text-[8px] bg-white/20 w-full text-center">ลด</span>
        </div>
      </div>
    )}
    <div className="aspect-square relative overflow-hidden bg-gray-100">
      <img src={`https://picsum.photos/seed/${Math.random()}/300/300`} alt="product" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      {isMall && (
        <div className="absolute top-0 left-0 bg-[#d0011b] text-white text-[10px] px-1.5 py-0.5 font-bold rounded-br-md shadow-sm">Mall</div>
      )}
      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
    <div className="p-3 flex flex-col flex-1">
      <h3 className="text-[13px] line-clamp-2 mb-2 text-gray-800 leading-snug group-hover:text-[#ee4d2d] transition-colors">
        {title}
      </h3>
      <div className="mt-auto">
        {isFreeShip && (
          <div className="flex items-center gap-1 text-[10px] text-teal-500 font-bold mb-1 border border-teal-500 w-fit px-1">
            <Truck size={10} /> ส่งฟรี
          </div>
        )}
        <div className="flex justify-between items-center">
          <div className="text-[#ee4d2d]">
            <span className="text-[10px]">฿</span>
            <span className="text-base font-medium">{price}</span>
          </div>
          <span className="text-[10px] text-gray-500">ขายแล้ว {sold}</span>
        </div>
      </div>
    </div>
  </div>
);

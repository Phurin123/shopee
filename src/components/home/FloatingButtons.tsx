import React from 'react';
import { ShoppingCart } from 'lucide-react';

export const FloatingButtons = () => (
  <div className="fixed bottom-8 right-8 flex flex-col gap-4">
     <div className="bg-white p-3 rounded-full shadow-2xl border border-gray-100 cursor-pointer hover:scale-110 transition-transform">
        <div className="w-10 h-10 flex items-center justify-center text-2xl">💬</div>
     </div>
     <div className="bg-[#ee4d2d] p-3 rounded-full shadow-2xl cursor-pointer hover:scale-110 transition-transform text-white">
        <ShoppingCart size={28} />
     </div>
  </div>
);

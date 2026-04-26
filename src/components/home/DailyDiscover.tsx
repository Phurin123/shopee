import React from 'react';
import { HomeProductCard } from './HomeProductCard';

export const DailyDiscover = () => {
  const products = [
    { title: "กางเกงชั้นในชาย ผ้าฝ้าย 100% สวมใส่สบาย ระบายอากาศได้ดี", price: "49", sold: "2.4k", isMall: true, discount: "50%", isFreeShip: true },
    { title: "หูฟัง Bluetooth 5.3 ตัดเสียงรบกวน แบตอึด ใช้งานได้ยาวนาน", price: "299", sold: "10k+", isMall: false, discount: "30%", isFreeShip: true },
    { title: "เสื้อยืดคอกลม Minimal Style ผ้าดีไม่ย้วย", price: "89", sold: "5.1k", isMall: true, isFreeShip: false },
    { title: "พาวเวอร์แบงค์ 20000mAh ชาร์จเร็ว รองรับ PD ชาร์จไว", price: "590", sold: "890", isMall: false, discount: "15%", isFreeShip: true },
    { title: "รองเท้าผ้าใบผู้หญิง ทรงเกาหลี พื้นนุ่ม ใส่สบาย", price: "350", sold: "1.2k", isMall: true, isFreeShip: true },
    { title: "เคสมือถือกันกระแทก สำหรับ iPhone ทุกรุ่น", price: "25", sold: "100k+", isMall: false, isFreeShip: false },
    { title: "หม้อทอดไร้น้ำมัน ขนาด 5 ลิตร ล้างง่าย ทนทาน", price: "1,290", sold: "450", isMall: true, discount: "25%", isFreeShip: true },
    { title: "เมาส์ไร้สาย เสียงเงียบ ปรับ DPI ได้ 3 ระดับ", price: "120", sold: "3.2k", isMall: false, isFreeShip: true },
  ];

  const placeholderProducts = Array(10).fill({});

  return (
    <div className="mt-8">
       <div className="sticky top-[110px] z-30 bg-[#f5f5f5] py-4 border-b-4 border-[#ee4d2d]">
          <h2 className="bg-white text-[#ee4d2d] text-center font-bold py-3 uppercase tracking-wider shadow-sm rounded-t-sm">สินค้าแนะนำประจำวัน</h2>
       </div>
       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-4">
          {products.concat(placeholderProducts).map((item, i) => (
            <HomeProductCard 
              key={i} 
              title={item.title || "สินค้าคุณภาพเกรดพรีเมียม รับประกันสินค้าแท้ 100%"}
              price={item.price || "99"}
              sold={item.sold || "100"}
              isMall={item.isMall}
              discount={item.discount}
              isFreeShip={item.isFreeShip}
            />
          ))}
       </div>
       <div className="flex justify-center mt-10">
          <button className="bg-white border border-gray-300 text-gray-700 px-20 py-3 hover:bg-gray-50 hover:border-gray-400 hover:shadow-md transition-all duration-300 rounded shadow-sm font-medium">
            ดูเพิ่มเติม
          </button>
       </div>
    </div>
  );
};

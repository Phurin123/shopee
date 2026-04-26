'use client'

import React from 'react';
import { HomeNavbar } from '@/components/home/HomeNavbar';
import { BannerSection } from '@/components/home/BannerSection';
import { ServiceIcons } from '@/components/home/ServiceIcons';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { FlashSale } from '@/components/home/FlashSale';
import { ShopeeMall } from '@/components/home/ShopeeMall';
import { DailyDiscover } from '@/components/home/DailyDiscover';
import { FloatingButtons } from '@/components/home/FloatingButtons';

export default function Home() {
  return (
    <div className="bg-[#f5f5f5] min-h-screen pb-20 font-sans">
      <HomeNavbar />

      <main className="max-w-[1200px] mx-auto px-4">
        <BannerSection />
        <ServiceIcons />
        <CategoryGrid />
        <FlashSale />
        <ShopeeMall />
        <DailyDiscover />
      </main>

      <FloatingButtons />
    </div>
  );
}
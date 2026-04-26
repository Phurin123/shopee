'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import CartIcon from './CartIcon'
import { User, LogOut, Package, ShoppingBag, Menu, X } from 'lucide-react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    // ✅ แก้ไข 1: ใช้ sticky top-0 และ z-[1000] เพื่อให้ Navbar อยู่เหนือ Banner สีส้มเสมอ
    <nav className="sticky top-0 z-[1000] bg-white shadow-sm px-4 py-3 md:px-6 md:py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl md:text-2xl font-bold text-orange-600 tracking-tight">
          SimpleShop
        </Link>
        
        {/* Right Action Area (Desktop) */}
        <div className="hidden md:flex items-center gap-6 text-black flex-1 justify-end">
          <Link href="/products" className="hover:text-orange-600 transition-colors">สินค้า</Link>
          
          {user ? (
            <>
              <Link href="/my-products" className="hover:text-orange-600 transition-colors">สินค้าของฉัน</Link>
              <Link href="/sell" className="hover:text-orange-600 transition-colors flex items-center gap-1">
                <ShoppingBag className="w-4 h-4" /> ขายสินค้า
              </Link>
              <Link href="/profile" className="hover:text-orange-600 transition-colors flex items-center gap-1">
                <User className="w-4 h-4" /> บัญชีของฉัน
              </Link>
              <div className="flex items-center gap-4 pl-4 border-l">
                <span className="text-sm font-medium">สวัสดี, {user.name}</span>
                <button onClick={logout} className="text-red-500 hover:text-red-600 p-1">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-orange-600 transition-colors">เข้าสู่ระบบ</Link>
              <Link href="/register" className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors">สมัครสมาชิก</Link>
            </>
          )}

          <CartIcon />
        </div>

        {/* Mobile Action Area */}
        <div className="md:hidden flex items-center gap-4">
          <CartIcon />
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="text-gray-600 p-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ✅ แก้ไข 2: เปลี่ยนเป็น absolute top-full เพื่อให้เมนูต่อจาก Navbar พอดี ไม่บัง Navbar เอง */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 flex flex-col py-2 px-4 z-[1001] pb-6 max-h-[calc(100vh-60px)] overflow-y-auto animate-slide-down">
          <Link href="/products" className="py-3 border-b border-gray-50 text-gray-700 hover:text-orange-600 hover:bg-orange-50 px-3 rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>
            🛍️ สินค้า
          </Link>
          
          {user ? (
            <>
              <Link href="/my-products" className="py-3 border-b border-gray-50 text-gray-700 hover:text-orange-600 hover:bg-orange-50 px-3 rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>
                📦 สินค้าของฉัน
              </Link>
              <Link href="/sell" className="py-3 border-b border-gray-50 text-gray-700 hover:text-orange-600 hover:bg-orange-50 px-3 rounded-md transition-colors flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                🛒 ขายสินค้า
              </Link>
              <Link href="/profile" className="py-3 border-b border-gray-50 text-gray-700 hover:text-orange-600 hover:bg-orange-50 px-3 rounded-md transition-colors flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                👤 บัญชีของฉัน
              </Link>
              
              {/* User Info & Logout */}
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-200 mt-2">
                <div className="flex items-center gap-3 px-3 py-2 bg-orange-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center text-orange-700 font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <button 
                  onClick={() => { logout(); setIsMenuOpen(false); }} 
                  className="w-full flex items-center justify-center gap-2 text-red-500 py-2.5 bg-red-50 rounded-md hover:bg-red-100 transition-colors font-medium"
                >
                  <LogOut className="w-4 h-4" /> ออกจากระบบ
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-200 mt-2">
              <Link 
                href="/login" 
                className="py-2.5 text-center border-2 border-orange-600 text-orange-600 rounded-md font-medium hover:bg-orange-50 transition-colors" 
                onClick={() => setIsMenuOpen(false)}
              >
                เข้าสู่ระบบ
              </Link>
              <Link 
                href="/register" 
                className="py-2.5 text-center bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition-colors shadow-sm" 
                onClick={() => setIsMenuOpen(false)}
              >
                สมัครสมาชิก
              </Link>
            </div>
          )}
        </div>
      )}

      {/* ✅ Overlay ปิดเมนูเมื่อกดพื้นหลัง */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/30 z-[999]" 
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  )
}
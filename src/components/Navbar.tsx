'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import CartIcon from './CartIcon'
import { User, LogOut, Package, ShoppingBag } from 'lucide-react'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-white shadow-sm px-4 py-3 md:px-6 md:py-4 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl md:text-2xl font-bold text-orange-600 tracking-tight">
          SimpleShop
        </Link>
        
        {/* Right Action Area */}
        <div className="flex items-center gap-3 md:gap-6 text-black flex-1 justify-end">
          {/* Links */}
          <div className="flex items-center gap-2 md:gap-6 flex-wrap justify-end">
            <Link href="/products" className="text-sm md:text-base hover:text-orange-600 transition-colors">สินค้า</Link>
            
            {user ? (
              <>
                <Link href="/my-products" className="text-sm md:text-base hover:text-orange-600 transition-colors">สินค้าของฉัน</Link>
                <Link href="/sell" className="text-sm md:text-base hover:text-orange-600 transition-colors flex items-center gap-1">
                  <ShoppingBag className="w-3 h-3 md:w-4 md:h-4" /> ขายสินค้า
                </Link>
                <Link href="/profile" className="text-sm md:text-base hover:text-orange-600 transition-colors flex items-center gap-1">
                  <User className="w-3 h-3 md:w-4 md:h-4" /> บัญชีของฉัน
                </Link>
                <div className="hidden sm:flex items-center gap-4 pl-4 border-l">
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
          </div>

          {/* Cart - Visible everywhere */}
          <CartIcon />
          
          {/* User Icon (Mobile Only) */}
          {!user && (
            <Link href="/login" className="md:hidden p-2 text-gray-600">
              <User className="w-6 h-6" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

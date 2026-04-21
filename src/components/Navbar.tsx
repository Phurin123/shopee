'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import CartIcon from './CartIcon'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">SimpleShop</Link>
        
        <div className="flex items-center gap-6 text-black">
          <Link href="/products" className="hover:text-blue-600">สินค้า</Link>
          <CartIcon />
          
          {user ? (
            <>
              <Link href="/my-products" className="hover:text-blue-600">สินค้าของฉัน</Link>
              <Link href="/sell" className="hover:text-blue-600">ขายสินค้า</Link>
              <Link href="/profile" className="hover:text-blue-600">บัญชีของฉัน</Link>
              <span>สวัสดี, {user.name}</span>
              <button onClick={logout} className="text-red-500">ออกจากระบบ</button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-blue-600">เข้าสู่ระบบ</Link>
              <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">สมัครสมาชิก</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
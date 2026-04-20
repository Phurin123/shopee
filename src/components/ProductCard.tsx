'use client'

import { useAuth } from '@/context/AuthContext'

interface Product {
  id: number
  name: string
  price: number
  imageUrl?: string
  stock: number
}

export default function ProductCard({ product }: { product: Product }) {
  const { user } = useAuth()

  const addToCart = async () => {
    if (!user) {
      alert('กรุณาเข้าสู่ระบบก่อน')
      return
    }
    const res = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: product.id, quantity: 1 })
    })
    if (res.ok) {
      alert('เพิ่มสินค้าในตะกร้าเรียบร้อย')
    } else {
      alert('เกิดข้อผิดพลาด')
    }
  }

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md">
      <div className="h-40 bg-gray-100 rounded mb-3 flex items-center justify-center">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="h-full object-cover" />
        ) : (
          <span className="text-gray-400">ไม่มีรูป</span>
        )}
      </div>
      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-blue-600 font-bold mt-1">฿{product.price.toFixed(2)}</p>
      <p className="text-sm text-gray-500">คงเหลือ: {product.stock} ชิ้น</p>
      <button
        onClick={addToCart}
        className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        หยิบใส่ตะกร้า
      </button>
    </div>
  )
}
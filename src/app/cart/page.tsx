'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

interface CartItem {
  id: number
  quantity: number
  product: {
    id: number
    name: string
    price: number
    imageUrl?: string
  }
}

export default function CartPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [cart, setCart] = useState<{ items: CartItem[] } | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchCart = async () => {
    const res = await fetch('/api/cart')
    const data = await res.json()
    setCart(data)
    setLoading(false)
  }

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
    fetchCart()
  }, [user, router])

  const updateQuantity = async (itemId: number, quantity: number) => {
    if (quantity < 1) return
    await fetch(`/api/cart/${itemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity })
    })
    fetchCart()
  }

  const removeItem = async (itemId: number) => {
    await fetch(`/api/cart/${itemId}`, { method: 'DELETE' })
    fetchCart()
  }

  const checkout = async () => {
    const res = await fetch('/api/checkout', { method: 'POST' })
    if (res.ok) {
      alert('สั่งซื้อสำเร็จ!')
      router.push('/orders')
    } else {
      const error = await res.json()
      alert(error.error || 'เกิดข้อผิดพลาด')
    }
  }

  if (loading) return <div>กำลังโหลด...</div>
  if (!cart || cart.items.length === 0) return <div>ตะกร้าของคุณว่างเปล่า</div>

  const total = cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">ตะกร้าสินค้า</h1>
      <div className="space-y-4">
        {cart.items.map(item => (
          <div key={item.id} className="flex items-center gap-4 border-b pb-4">
            <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center">
              {item.product.imageUrl ? <img src={item.product.imageUrl} className="h-full object-cover" /> : '📦'}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{item.product.name}</h3>
              <p className="text-blue-600">฿{item.product.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 border rounded">-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 border rounded">+</button>
            </div>
            <button onClick={() => removeItem(item.id)} className="text-red-500">ลบ</button>
          </div>
        ))}
        <div className="text-right pt-4">
          <p className="text-xl font-bold">รวมทั้งสิ้น: ฿{total.toFixed(2)}</p>
          <button onClick={checkout} className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            ยืนยันการสั่งซื้อ
          </button>
        </div>
      </div>
    </div>
  )
}
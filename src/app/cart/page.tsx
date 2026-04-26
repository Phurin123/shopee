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
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl md:text-2xl font-bold mb-6">ตะกร้าสินค้า</h1>
      <div className="space-y-4">
        {cart.items.map(item => (
          <div key={item.id} className="flex gap-4 border-b pb-4 bg-white p-3 rounded-lg shadow-sm">
            <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
              {item.product.imageUrl ? (
                <img src={item.product.imageUrl} className="w-full h-full object-cover" alt={item.product.name} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl">📦</div>
              )}
            </div>
            
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <h3 className="font-medium text-gray-800 line-clamp-1">{item.product.name}</h3>
                <p className="text-orange-600 font-bold mt-1">฿{item.product.price.toLocaleString()}</p>
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center border rounded-md">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                    className="px-3 py-1 hover:bg-gray-50 border-r"
                  >-</button>
                  <span className="px-4 py-1 text-sm font-medium">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                    className="px-3 py-1 hover:bg-gray-50 border-l"
                  >+</button>
                </div>
                
                <button 
                  onClick={() => removeItem(item.id)} 
                  className="text-gray-400 hover:text-red-500 text-sm transition-colors"
                >ลบ</button>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-white p-6 rounded-lg shadow-sm mt-8 border border-orange-100">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">รวมทั้งสิ้น</p>
            <p className="text-2xl font-bold text-orange-600">฿{total.toLocaleString()}</p>
          </div>
          <button 
            onClick={checkout} 
            className="w-full bg-orange-600 text-white py-3 rounded-md font-bold hover:bg-orange-700 transition-colors shadow-lg"
          >
            สั่งซื้อสินค้า ({cart.items.length})
          </button>
        </div>
      </div>
    </div>
  )
}
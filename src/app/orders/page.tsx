'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

interface Order {
  id: number
  total: number
  status: string
  createdAt: string
  items: {
    id: number
    quantity: number
    price: number
    product: { name: string }
  }[]
}

export default function OrdersPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
    fetch('/api/orders')
      .then(res => res.json())
      .then(setOrders)
  }, [user, router])

  if (!user) return null

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">ประวัติการสั่งซื้อ</h1>
      {orders.length === 0 ? (
        <p>ยังไม่มีคำสั่งซื้อ</p>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="border rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">คำสั่งซื้อ #{order.id}</span>
                <span className={`px-2 py-1 rounded text-sm ${
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                }`}>{order.status}</span>
              </div>
              <div className="text-sm text-gray-500 mb-2">
                วันที่: {new Date(order.createdAt).toLocaleString('th-TH')}
              </div>
              <ul className="border-t pt-2">
                {order.items.map(item => (
                  <li key={item.id} className="flex justify-between py-1">
                    <span>{item.product.name} x {item.quantity}</span>
                    <span>฿{(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="text-right font-bold mt-2">รวม: ฿{order.total.toFixed(2)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
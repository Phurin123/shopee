'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  price: number
  stock: number
  imageUrl?: string
  createdAt: string
}

export default function MyProductsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
    fetch('/api/my-products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [user, router])

  if (!user) return null

  if (loading) return <div>กำลังโหลด...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">สินค้าของฉัน</h1>
        <Link href="/sell" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          + ลงขายสินค้า
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-10">
          <p>คุณยังไม่มีสินค้าที่ลงขาย</p>
          <Link href="/sell" className="text-blue-600 underline">คลิกที่นี่เพื่อลงขายสินค้าตัวแรก</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="border rounded-lg p-4 shadow-sm">
              <div className="h-32 bg-gray-100 rounded mb-3 flex items-center justify-center">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className="h-full object-cover" />
                ) : (
                  <span className="text-gray-400">ไม่มีรูป</span>
                )}
              </div>
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-blue-600 font-bold mt-1">฿{product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500">คงเหลือ: {product.stock} ชิ้น</p>
              <p className="text-xs text-gray-400 mt-1">
                ลงเมื่อ: {new Date(product.createdAt).toLocaleDateString('th-TH')}
              </p>
              {/* สามารถเพิ่มปุ่มแก้ไข/ลบได้ */}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
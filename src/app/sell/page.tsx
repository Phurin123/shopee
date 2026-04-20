'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function SellPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      router.push('/login')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          imageUrl: formData.imageUrl || undefined
        })
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'เกิดข้อผิดพลาด')
      }

      alert('เพิ่มสินค้าสำเร็จ!')
      router.push('/my-products')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="text-center py-10">
        <p>กรุณาเข้าสู่ระบบเพื่อลงขายสินค้า</p>
        <button onClick={() => router.push('/login')} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">เข้าสู่ระบบ</button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">ลงขายสินค้า</h1>
      {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">ชื่อสินค้า *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">รายละเอียด</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">ราคา (บาท) *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">จำนวนในสต็อก *</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            min="0"
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">URL รูปภาพ (ไม่บังคับ)</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? 'กำลังเพิ่ม...' : 'ลงขายสินค้า'}
        </button>
      </form>
    </div>
  )
}
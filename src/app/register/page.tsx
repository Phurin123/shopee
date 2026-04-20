'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await register(name, email, password)
      router.push('/login')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">สมัครสมาชิก</h1>
      {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="ชื่อ-นามสกุล" value={name} onChange={e => setName(e.target.value)} className="w-full border p-2 rounded" required />
        <input type="email" placeholder="อีเมล" value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-2 rounded" required />
        <input type="password" placeholder="รหัสผ่าน" value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-2 rounded" required />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">สมัครสมาชิก</button>
      </form>
      <p className="mt-4 text-center">มีบัญชีแล้ว? <Link href="/login" className="text-blue-600">เข้าสู่ระบบ</Link></p>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      router.push('/')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">เข้าสู่ระบบ</h1>
      {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" placeholder="อีเมล" value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-2 rounded" required />
        <input type="password" placeholder="รหัสผ่าน" value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-2 rounded" required />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">เข้าสู่ระบบ</button>
      </form>
      <p className="mt-4 text-center">ยังไม่มีบัญชี? <Link href="/register" className="text-blue-600">สมัครสมาชิก</Link></p>
    </div>
  )
}
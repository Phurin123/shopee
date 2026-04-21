'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface UserProfile {
  id: number
  username: string
  email: string
  name: string
  phone: string | null
  gender: string | null
  dateOfBirth: string | null
  profilePicture: string | null
}

// Custom Icons
const Icons = {
  User: () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
  Camera: () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>),
  Loader: () => (<svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" /><line x1="4.93" y1="4.93" x2="7.76" y2="7.76" /><line x1="16.24" y1="16.24" x2="19.07" y2="19.07" /><line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" /><line x1="4.93" y1="19.07" x2="7.76" y2="16.24" /><line x1="16.24" y1="7.76" x2="19.07" y2="4.93" /></svg>),
  ChevronLeft: () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>),
  Check: () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>),
  Alert: () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>),
  Order: () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>),
  Settings: () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>),
  X: () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>),
  Mail: () => (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>),
  Phone: () => (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>),
};

// Modal Component สำหรับเปลี่ยนอีเมล/เบอร์โทร
function VerificationModal({
  isOpen,
  onClose,
  type,
  currentValue,
  onVerified
}: {
  isOpen: boolean;
  onClose: () => void;
  type: 'email' | 'phone';
  currentValue: string;
  onVerified: () => void;
}) {
  const [step, setStep] = useState<'input' | 'verify'>('input')
  const [newValue, setNewValue] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [demoCode, setDemoCode] = useState('')
  const [countdown, setCountdown] = useState(0)
  const [verifyCountdown, setVerifyCountdown] = useState(600) // 10 นาที = 600 วินาที

  // รีเซ็ตค่าเมื่อเปิด/ปิดโมดัลหรือเปลี่ยนประเภท
  useEffect(() => {
    if (isOpen) {
      setStep('input')
      setNewValue('')
      setCode('')
      setError('')
      setDemoCode('')
      setCountdown(0)
      setVerifyCountdown(600)
    }
  }, [isOpen, type])

  // ⏱️ useEffect สำหรับนับถอยหลัง 60 วินาที (ปุ่มส่งรหัสใหม่)
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  // ⏱️ useEffect สำหรับนับถอยหลัง 10 นาที (รหัสหมดอายุ)
  useEffect(() => {
    if (step === 'verify' && verifyCountdown > 0) {
      const timer = setTimeout(() => setVerifyCountdown(verifyCountdown - 1), 1000)
      return () => clearTimeout(timer)
    }
    if (verifyCountdown === 0 && step === 'verify') {
      setError('⏰ รหัสหมดอายุแล้ว กรุณาส่งรหัสใหม่')
    }
  }, [step, verifyCountdown])

  // รีเซ็ตเวลานับถอยหลังเมื่อกลับไปที่ขั้นตอนกรอกข้อมูล
  useEffect(() => {
    if (step === 'input') {
      setVerifyCountdown(600)
    }
  }, [step])

  // ฟังก์ชันฟอร์แมตเวลาเป็น MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleSendCode = async () => {
    if (!newValue) {
      setError(`กรุณากรอก${type === 'email' ? 'อีเมล' : 'เบอร์โทรศัพท์'}ใหม่`)
      return
    }

    // Validate format
    if (type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newValue)) {
      setError('รูปแบบอีเมลไม่ถูกต้อง')
      return
    }
    if (type === 'phone' && !/^0\d{9}$/.test(newValue)) {
      setError('รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/verification/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, value: newValue })
      })
      const data = await res.json()

      if (res.ok) {
        setStep('verify')
        setDemoCode(data.demoCode || '')
        setCountdown(60)
        setVerifyCountdown(600) // รีเซ็ต 10 นาทีเมื่อส่งรหัสใหม่
      } else {
        setError(data.error || 'ไม่สามารถส่งรหัสได้')
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ')
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async () => {
    if (verifyCountdown === 0) {
      setError('รหัสหมดอายุแล้ว กรุณาส่งรหัสใหม่')
      return
    }
    if (code.length !== 6) {
      setError('กรุณากรอกรหัส 6 หลัก')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/verification/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, code })
      })
      const data = await res.json()

      if (res.ok) {
        onVerified()
        onClose()
      } else {
        setError(data.error || 'รหัสไม่ถูกต้อง')
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการยืนยัน')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = () => {
    if (countdown === 0 && verifyCountdown > 0) {
      handleSendCode()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">
            {step === 'input' ? `เปลี่ยน${type === 'email' ? 'อีเมล' : 'เบอร์โทรศัพท์'}` : 'ยืนยันรหัส'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <Icons.X />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {error && (
            <div className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded text-sm">
              <Icons.Alert />
              <span>{error}</span>
            </div>
          )}

          {step === 'input' ? (
            <>
              <p className="text-sm text-gray-600">
                {type === 'email'
                  ? `อีเมลปัจจุบัน: ${currentValue}`
                  : `เบอร์ปัจจุบัน: ${currentValue}`}
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {type === 'email' ? 'อีเมลใหม่' : 'เบอร์โทรศัพท์ใหม่'}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {type === 'email' ? <Icons.Mail /> : <Icons.Phone />}
                  </span>
                  <input
                    type={type === 'email' ? 'email' : 'tel'}
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    placeholder={type === 'email' ? 'example@email.com' : '0812345678'}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded text-sm focus:border-orange-500 outline-none transition-all"
                    onKeyDown={(e) => e.key === 'Enter' && handleSendCode()}
                  />
                </div>
              </div>
              {demoCode && (
                <p className="text-xs text-orange-500 bg-orange-50 px-3 py-2 rounded">
                  🔐 รหัสทดสอบ (เฉพาะ Dev): <strong>{demoCode}</strong>
                </p>
              )}
            </>
          ) : (
            <>
              <p className="text-sm text-gray-600 text-center">
                เราได้ส่งรหัสยืนยัน 6 หลักไปยัง{' '}
                <strong className="block mt-1 text-gray-800">
                  {type === 'email' ? newValue : newValue.replace(/(\d{3}).*(\d{2})/, '$1*******$2')}
                </strong>
              </p>

              {/* ⏱️ แสดงเวลานับถอยหลัง */}
              <div className="flex justify-center">
                <div className={`px-4 py-2.5 rounded-lg font-mono text-base font-bold flex items-center gap-2 transition-all duration-300 ${verifyCountdown <= 60
                    ? 'bg-red-100 text-red-600 animate-pulse'
                    : verifyCountdown <= 300
                      ? 'bg-orange-100 text-orange-600'
                      : 'bg-green-100 text-green-600'
                  }`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <polyline points="12 6 12 12 16 14" strokeWidth="2" />
                  </svg>
                  <span>เหลือเวลา: {formatTime(verifyCountdown)}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 text-center">รหัสยืนยัน</label>
                <input
                  type="text"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="000000"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg text-center tracking-[0.8em] font-mono focus:border-orange-500 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                  disabled={verifyCountdown === 0 || loading}
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-2">
                <button
                  onClick={handleResend}
                  disabled={countdown > 0 || verifyCountdown === 0}
                  className={`transition-colors flex items-center gap-1 ${countdown > 0 || verifyCountdown === 0
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-orange-500 hover:text-orange-600 font-medium'
                    }`}
                >
                  {verifyCountdown === 0
                    ? '❌ หมดอายุ'
                    : countdown > 0
                      ? `🔄 ${countdown}วินาที`
                      : '📩 ส่งรหัสใหม่'}
                </button>
                <button onClick={() => { setStep('input'); setError('') }} className="text-gray-500 hover:text-gray-700 transition-colors">
                  ✏️ แก้ไข
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-5 py-4 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded text-sm transition-colors"
          >
            ยกเลิก
          </button>
          <button
            onClick={step === 'input' ? handleSendCode : handleVerify}
            disabled={loading || (step === 'verify' && verifyCountdown === 0)}
            className="px-5 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white rounded text-sm font-medium transition-colors flex items-center gap-2"
          >
            {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
            {step === 'input' ? 'ส่งรหัส' : 'ยืนยัน'}
          </button>
        </div>
      </div>
    </div>
  )
}

// Modal สำหรับเปลี่ยนเบอร์แบบง่าย (ไม่ต้อง OTP)
function SimplePhoneModal({
  isOpen,
  onClose,
  currentValue,
  onUpdated
}: {
  isOpen: boolean;
  onClose: () => void;
  currentValue: string;
  onUpdated: () => void;
}) {
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) { setPhone(''); setError('') }
  }, [isOpen])

  const handleSubmit = async () => {
    if (!phone) { setError('กรุณากรอกเบอร์โทรศัพท์'); return }
    if (!/^0\d{9}$/.test(phone)) { setError('รูปแบบเบอร์ไม่ถูกต้อง (เช่น 0812345678)'); return }

    setLoading(true); setError('')
    try {
      const res = await fetch('/api/profile/update-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      })
      const data = await res.json()
      if (res.ok) { onUpdated(); onClose() }
      else { setError(data.error || 'ไม่สามารถอัปเดตเบอร์ได้') }
    } catch (err) { setError('เกิดข้อผิดพลาดในการเชื่อมต่อ') }
    finally { setLoading(false) }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">เปลี่ยนเบอร์โทรศัพท์</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><Icons.X /></button>
        </div>
        <div className="p-5 space-y-4">
          {error && <div className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded text-sm"><Icons.Alert /><span>{error}</span></div>}
          <p className="text-sm text-gray-600">เบอร์ปัจจุบัน: <strong>{currentValue}</strong></p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">เบอร์โทรศัพท์ใหม่</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Icons.Phone /></span>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} placeholder="0812345678" maxLength={10} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded text-sm focus:border-orange-500 outline-none transition-all" onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} />
            </div>
            <p className="text-xs text-gray-500 mt-1.5">รูปแบบ: 08xxxxxxxx (10 หลัก)</p>
          </div>
        </div>
        <div className="flex justify-end gap-3 px-5 py-4 border-t border-gray-100 bg-gray-50">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded text-sm transition-colors">ยกเลิก</button>
          <button onClick={handleSubmit} disabled={loading} className="px-5 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white rounded text-sm font-medium transition-colors flex items-center gap-2">
            {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
            บันทึก
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ProfilePage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const [profile, setProfile] = useState<UserProfile>({
    id: 0, username: '', email: '', name: '', phone: '', gender: 'male', dateOfBirth: '', profilePicture: null,
  })

  const [previewImage, setPreviewImage] = useState<string | null>(null)

  // State สำหรับ Modal
  const [emailModalOpen, setEmailModalOpen] = useState(false)
  const [phoneModalOpen, setPhoneModalOpen] = useState(false)

  useEffect(() => { fetchProfile() }, [])

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/profile')
      if (res.status === 401) { router.push('/login'); return }
      const data = await res.json()
      let formattedDate = ''
      if (data.dateOfBirth) {
        const date = new Date(data.dateOfBirth)
        formattedDate = date.toISOString().split('T')[0]
      }
      setProfile({ ...data, phone: data.phone || '', gender: data.gender || 'male', dateOfBirth: formattedDate })
      setPreviewImage(data.profilePicture)
    } catch (err) { showMessage('error', 'ไม่สามารถโหลดข้อมูลได้') }
    finally { setLoading(false) }
  }

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 3000)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => setPreviewImage(reader.result as string)
    reader.readAsDataURL(file)
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await fetch('/api/upload-avatar', { method: 'POST', body: formData })
      const data = await res.json()
      if (res.ok) { setProfile(prev => ({ ...prev, profilePicture: data.url })); showMessage('success', 'อัปโหลดรูปสำเร็จ') }
      else { showMessage('error', data.error || 'อัปโหลดไม่สำเร็จ'); setPreviewImage(profile.profilePicture) }
    } catch (err) { showMessage('error', 'เกิดข้อผิดพลาดในการอัปโหลด'); setPreviewImage(profile.profilePicture) }
    finally { setUploading(false); if (fileInputRef.current) fileInputRef.current.value = '' }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { setProfile({ ...profile, [e.target.name]: e.target.value }) }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true)
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: profile.name, phone: profile.phone, gender: profile.gender, dateOfBirth: profile.dateOfBirth || null }),
      })
      const data = await res.json()
      if (res.ok) showMessage('success', 'บันทึกข้อมูลสำเร็จ')
      else showMessage('error', data.error || 'บันทึกไม่สำเร็จ')
    } catch (err) { showMessage('error', 'เกิดข้อผิดพลาดในการบันทึก') }
    finally { setSaving(false) }
  }

  const openEmailModal = () => setEmailModalOpen(true)
  const openPhoneModal = () => setPhoneModalOpen(true)

  const handleEmailVerified = () => {
    showMessage('success', 'เปลี่ยนอีเมลสำเร็จ')
    fetchProfile()
  }

  const handlePhoneUpdated = () => {
    showMessage('success', 'เปลี่ยนเบอร์โทรศัพท์สำเร็จ')
    fetchProfile()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-center">
        <div className="text-orange-500 mb-4"><Icons.Loader /></div>
        <p className="text-gray-500 font-medium">กำลังเตรียมข้อมูลส่วนตัว...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] pb-20 font-sans">
      {/* Toast Notification */}
      {message && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3 px-6 py-3 rounded-full shadow-2xl transition-all duration-500 ${message.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
          }`}>
          {message.type === 'success' ? <Icons.Check /> : <Icons.Alert />}
          <span className="font-medium">{message.text}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => router.push('/')} className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors group">
            <Icons.ChevronLeft />
            <span className="font-medium">กลับหน้าหลัก</span>
          </button>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>MyShop</span><span>/</span><span className="text-gray-900 font-medium">โปรไฟล์</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 px-4 flex flex-col md:flex-row gap-6">

        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-6">
          <div className="flex items-center gap-4 px-2">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center">
              {previewImage ? <img src={previewImage} className="w-full h-full object-cover" alt="avatar" /> : <Icons.User />}
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-gray-900 truncate">{profile.username}</p>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span> ออนไลน์
              </div>
            </div>
          </div>
          <nav className="space-y-1">
            <div className="flex items-center gap-3 px-4 py-3 text-orange-500 font-medium bg-orange-50 rounded-sm cursor-pointer">
              <Icons.User /><span>บัญชีของฉัน</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-sm transition-colors cursor-pointer" onClick={() => router.push('/orders')}>
              <Icons.Order /><span>รายการคำสั่งซื้อ</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-sm transition-colors cursor-pointer">
              <Icons.Settings /><span>การตั้งค่า</span>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="bg-white rounded-sm shadow-sm p-6 md:p-8 border border-gray-100">
            <div className="border-b border-gray-100 pb-5 mb-8">
              <h2 className="text-xl font-bold text-gray-900">โปรไฟล์ของฉัน</h2>
              <p className="text-sm text-gray-500 mt-1">จัดการข้อมูลส่วนตัวเพื่อความปลอดภัยของบัญชี</p>
            </div>

            <div className="flex flex-col-reverse lg:flex-row gap-12">
              {/* Form Side */}
              <form onSubmit={handleSubmit} className="flex-1 space-y-8">

                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <label className="sm:text-right text-gray-500 text-sm">ชื่อผู้ใช้</label>
                  <div className="sm:col-span-3 font-medium text-gray-900">{profile.username}</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <label className="sm:text-right text-gray-500 text-sm">ชื่อ</label>
                  <div className="sm:col-span-3">
                    <input type="text" name="name" value={profile.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 rounded-sm focus:border-orange-500 outline-none transition-all" placeholder="กรอกชื่อของคุณ" required />
                  </div>
                </div>

                {/* อีเมล - มีปุ่มเปลี่ยน */}
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <label className="sm:text-right text-gray-500 text-sm">อีเมล</label>
                  <div className="sm:col-span-3 flex items-center gap-2">
                    <span className="text-gray-800">{profile.email.replace(/(.{2}).*(@.*)/, '$1***$2')}</span>
                    <button type="button" onClick={openEmailModal} className="text-blue-500 text-sm underline hover:text-blue-600 transition-colors ml-2">เปลี่ยน</button>
                  </div>
                </div>

                {/* เบอร์โทรศัพท์ - มีปุ่มเปลี่ยน */}
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <label className="sm:text-right text-gray-500 text-sm">หมายเลขโทรศัพท์</label>
                  <div className="sm:col-span-3 flex items-center gap-2">
                    <span className="text-gray-800">{profile.phone ? profile.phone.replace(/(\d{2}).*(\d{2})/, '$1*******$2') : '-'}</span>
                    <button type="button" onClick={openPhoneModal} className="text-blue-500 text-sm underline hover:text-blue-600 transition-colors ml-2">เปลี่ยน</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <label className="sm:text-right text-gray-500 text-sm">เพศ</label>
                  <div className="sm:col-span-3 flex gap-6">
                    {['male', 'female', 'other'].map((val) => (
                      <label key={val} className="flex items-center gap-2 cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                          <input type="radio" name="gender" value={val} checked={profile.gender === val} onChange={handleChange} className="peer appearance-none w-4 h-4 border-2 border-gray-300 rounded-full checked:border-orange-500 transition-all cursor-pointer" />
                          <div className="absolute w-2 h-2 bg-orange-500 rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
                        </div>
                        <span className="text-gray-700">{val === 'male' ? 'ชาย' : val === 'female' ? 'หญิง' : 'อื่นๆ'}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <label className="sm:text-right text-gray-500 text-sm">วัน/เดือน/ปีเกิด</label>
                  <div className="sm:col-span-3">
                    <input type="date" name="dateOfBirth" value={profile.dateOfBirth || ''} onChange={handleChange} className="px-4 py-2 border border-gray-200 rounded-sm focus:border-orange-500 outline-none transition-all text-gray-700" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-4">
                  <div className="sm:col-start-2 sm:col-span-3">
                    <button type="submit" disabled={saving} className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-8 py-2.5 rounded-sm shadow-sm transition-all font-medium flex items-center justify-center min-w-[100px]">
                      {saving ? <span className="animate-spin mr-2"><Icons.Loader /></span> : 'บันทึก'}
                    </button>
                  </div>
                </div>
              </form>

              {/* Avatar Side */}
              <div className="w-full lg:w-72 flex flex-col items-center lg:border-l border-gray-100 pl-0 lg:pl-12 py-4">
                <div className="relative group cursor-pointer mb-6" onClick={() => fileInputRef.current?.click()}>
                  <div className="w-32 h-32 rounded-full overflow-hidden ring-2 ring-gray-100 ring-offset-2 transition-all group-hover:ring-orange-200 bg-gray-50 flex items-center justify-center">
                    {previewImage ? <img src={previewImage} className="w-full h-full object-cover" alt="Profile" /> : <div className="text-gray-200 scale-[3]"><Icons.User /></div>}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"><Icons.Camera /></div>
                  {uploading && <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white/60 z-10"><div className="text-orange-500"><Icons.Loader /></div></div>}
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="hidden" />
                <button onClick={() => fileInputRef.current?.click()} className="border border-gray-200 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-sm text-sm transition-colors mb-3">เลือกรูปภาพ</button>
                <div className="text-center space-y-1">
                  <p className="text-gray-400 text-xs">ขนาดไฟล์: สูงสุด 1 MB</p>
                  <p className="text-gray-400 text-xs">ไฟล์ที่รองรับ: .JPEG, .PNG</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Email Modal (ใช้ OTP) */}
      <VerificationModal
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        type="email"
        currentValue={profile.email}
        onVerified={handleEmailVerified}
      />

      {/* Phone Modal (ไม่ต้อง OTP) */}
      <SimplePhoneModal
        isOpen={phoneModalOpen}
        onClose={() => setPhoneModalOpen(false)}
        currentValue={profile.phone || '-'}
        onUpdated={handlePhoneUpdated}
      />

    </div>
  )
}
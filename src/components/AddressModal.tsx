// components/AddressModal.tsx
'use client'

import { useState, useEffect } from 'react'
import Icons from '@/components/Icons'

interface AddressData {
  id?: number
  recipientName: string
  phone: string
  addressLine1: string
  addressLine2?: string | null
  subdistrict: string
  district: string
  province: string
  postalCode: string
  isDefault: boolean
}

export default function AddressModal({
  isOpen,
  onClose,
  currentAddress,
  onSaved
}: {
  isOpen: boolean
  onClose: () => void
  currentAddress: AddressData | null
  onSaved: () => void
}) {
  const [form, setForm] = useState<AddressData>({
    recipientName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    subdistrict: '',
    district: '',
    province: '',
    postalCode: '',
    isDefault: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      if (currentAddress) {
        setForm({
          ...currentAddress,
          addressLine2: currentAddress.addressLine2 || ''
        })
      } else {
        setForm({
          recipientName: '',
          phone: '',
          addressLine1: '',
          addressLine2: '',
          subdistrict: '',
          district: '',
          province: '',
          postalCode: '',
          isDefault: false
        })
      }
      setError('')
    }
  }, [isOpen, currentAddress])

  const handleSubmit = async () => {
    if (!form.recipientName || !form.phone || !form.addressLine1 || !form.province || !form.district || !form.subdistrict || !form.postalCode) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วน')
      return
    }

    setLoading(true)
    setError('')

    try {
      const url = form.id 
        ? `/api/profile/address/${form.id}`
        : '/api/profile/address'
      
      const res = await fetch(url, {
        method: form.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      
      const data = await res.json()
      if (res.ok) {
        onSaved()
        onClose()
      } else {
        setError(data.error || 'บันทึกที่อยู่ไม่สำเร็จ')
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative bg-white rounded shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-xl font-medium text-gray-900">
            {form.id ? 'แก้ไขที่อยู่' : 'ที่อยู่ใหม่'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <Icons.X />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1 custom-scrollbar">
          {error && (
            <div className="flex items-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded text-sm border border-red-100">
              <Icons.Alert />
              <span>{error}</span>
            </div>
          )}

          {/* Recipient info side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 font-medium">
              <input
                type="text"
                placeholder="ชื่อ-นามสกุล"
                value={form.recipientName}
                onChange={(e) => setForm({ ...form, recipientName: e.target.value })}
                className="w-full px-3 py-3 border border-gray-200 rounded-sm text-[15px] focus:border-orange-500 outline-none transition-all placeholder:font-normal placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-1.5">
              <input
                type="text"
                placeholder="หมายเลขโทรศัพท์"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3 py-3 border border-gray-200 rounded-sm text-[15px] focus:border-orange-500 outline-none transition-all placeholder:font-normal placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="space-y-4">
            {/* Address fields */}
            <input
              type="text"
              placeholder="จังหวัด"
              value={form.province}
              onChange={(e) => setForm({ ...form, province: e.target.value })}
              className="w-full px-3 py-3 border border-gray-200 rounded-sm text-[15px] focus:border-orange-500 outline-none transition-all placeholder:font-normal"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="อำเภอ/เขต"
                value={form.district}
                onChange={(e) => setForm({ ...form, district: e.target.value })}
                className="w-full px-3 py-3 border border-gray-200 rounded-sm text-[15px] focus:border-orange-500 outline-none transition-all placeholder:font-normal"
              />
              <input
                type="text"
                placeholder="ตำบล/แขวง"
                value={form.subdistrict}
                onChange={(e) => setForm({ ...form, subdistrict: e.target.value })}
                className="w-full px-3 py-3 border border-gray-200 rounded-sm text-[15px] focus:border-orange-500 outline-none transition-all placeholder:font-normal"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="รหัสไปรษณีย์"
                value={form.postalCode}
                onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                className="w-full px-3 py-3 border border-gray-200 rounded-sm text-[15px] focus:border-orange-500 outline-none transition-all placeholder:font-normal"
              />
            </div>

            <textarea
              placeholder="ที่อยู่ (บ้านเลขที่, ชื่ออาคาร, ชั้น...)"
              value={form.addressLine1}
              onChange={(e) => setForm({ ...form, addressLine1: e.target.value })}
              rows={3}
              className="w-full px-3 py-3 border border-gray-200 rounded-sm text-[15px] focus:border-orange-500 outline-none transition-all resize-none placeholder:font-normal"
            />
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={form.isDefault}
                  onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
                  className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-sm transition-all checked:bg-[#ee4d2d] checked:border-[#ee4d2d] cursor-pointer"
                />
                <Icons.Check className="absolute text-white scale-0 peer-checked:scale-100 transition-transform w-3.5 h-3.5 pointer-events-none" />
              </div>
              <span className="text-gray-500 text-[15px] group-hover:text-gray-900 transition-colors">ตั้งเป็นค่าเริ่มต้น</span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onClose}
            className="px-8 py-2.5 text-gray-700 hover:bg-gray-200 rounded-sm text-sm font-medium transition-colors uppercase"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-8 py-2.5 bg-[#ee4d2d] hover:bg-[#d73211] disabled:bg-gray-300 text-white rounded-sm text-sm font-medium transition-colors uppercase flex items-center justify-center min-w-[140px]"
          >
            {loading ? <Icons.Loader className="w-5 h-5 text-white" /> : 'ตกลง'}
          </button>
        </div>
      </div>
    </div>
  )
}
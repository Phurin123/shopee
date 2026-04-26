'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Address {
  id: number
  recipientName: string
  phone: string
  addressLine1: string
  addressLine2: string | null
  subdistrict: string
  district: string
  province: string
  postalCode: string
  isDefault: boolean
}

export default function AddressesPage() {
  const router = useRouter()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [formData, setFormData] = useState({
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

  useEffect(() => {
    fetchAddresses()
  }, [])

  const fetchAddresses = async () => {
    try {
      const res = await fetch('/api/addresses')
      if (res.status === 401) {
        router.push('/login')
        return
      }
      const data = await res.json()
      setAddresses(data)
    } catch (error) {
      console.error('Error fetching addresses:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const url = editingAddress 
      ? `/api/addresses/${editingAddress.id}`
      : '/api/addresses'
    
    const method = editingAddress ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        await fetchAddresses()
        setShowModal(false)
        setEditingAddress(null)
        resetForm()
      }
    } catch (error) {
      console.error('Error saving address:', error)
    }
  }

  const handleEdit = (address: Address) => {
    setEditingAddress(address)
    setFormData({
      recipientName: address.recipientName,
      phone: address.phone,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || '',
      subdistrict: address.subdistrict,
      district: address.district,
      province: address.province,
      postalCode: address.postalCode,
      isDefault: address.isDefault
    })
    setShowModal(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('ต้องการลบที่อยู่นี้?')) return

    try {
      await fetch(`/api/addresses/${id}`, { method: 'DELETE' })
      await fetchAddresses()
    } catch (error) {
      console.error('Error deleting address:', error)
    }
  }

  const handleSetDefault = async (id: number) => {
    try {
      await fetch(`/api/addresses/${id}/set-default`, { method: 'POST' })
      await fetchAddresses()
    } catch (error) {
      console.error('Error setting default address:', error)
    }
  }

  const resetForm = () => {
    setFormData({
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
    setEditingAddress(null)
  }

  const openAddModal = () => {
    resetForm()
    setShowModal(true)
  }

  if (loading) return <div className="text-center py-10">กำลังโหลด...</div>

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">ที่อยู่ของฉัน</h1>
          <button
            onClick={openAddModal}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            เพิ่มที่อยู่ใหม่
          </button>
        </div>

        {/* Address List */}
        <div className="space-y-4">
          {addresses.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              ยังไม่มีที่อยู่ กรุณาเพิ่มที่อยู่ใหม่
            </div>
          ) : (
            addresses.map((address) => (
              <div key={address.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg text-gray-900">
                        {address.recipientName}
                      </h3>
                      <span className="text-gray-600">|</span>
                      <span className="text-gray-600">{address.phone}</span>
                      {address.isDefault && (
                        <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium">
                          ค่าเริ่มต้น
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {address.addressLine1}
                      {address.addressLine2 && `, ${address.addressLine2}`}
                      <br />
                      ตำบล{address.subdistrict} อำเภอ{address.district} จังหวัด{address.province}, {address.postalCode}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleEdit(address)}
                      className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                    >
                      แก้ไข
                    </button>
                    {!address.isDefault && (
                      <>
                        <button
                          onClick={() => handleSetDefault(address.id)}
                          className="text-gray-500 hover:text-gray-700 text-sm border border-gray-300 px-3 py-1 rounded"
                        >
                          ตั้งเป็นค่าตั้งต้น
                        </button>
                        <button
                          onClick={() => handleDelete(address.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          ลบ
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">
                  {editingAddress ? 'แก้ไขที่อยู่' : 'เพิ่มที่อยู่ใหม่'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ชื่อผู้รับ *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.recipientName}
                    onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    เบอร์โทรศัพท์ *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ที่อยู่บรรทัดแรก *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="บ้านเลขที่, หมู่บ้าน, อาคาร"
                    value={formData.addressLine1}
                    onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ที่อยู่บรรทัดที่สอง
                  </label>
                  <input
                    type="text"
                    placeholder="ซอย, ถนน (ถ้ามี)"
                    value={formData.addressLine2}
                    onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ตำบล/แขวง *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subdistrict}
                      onChange={(e) => setFormData({ ...formData, subdistrict: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      อำเภอ/เขต *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      จังหวัด *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.province}
                      onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      รหัสไปรษณีย์ *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isDefault"
                    checked={formData.isDefault}
                    onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                    className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <label htmlFor="isDefault" className="ml-2 text-sm text-gray-700">
                    ตั้งเป็นที่อยู่เริ่มต้น
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                  >
                    {editingAddress ? 'บันทึกการแก้ไข' : 'เพิ่มที่อยู่'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
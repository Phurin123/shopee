import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

// ดึงรายการที่อยู่ทั้งหมด
export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const addresses = await prisma.address.findMany({
    where: { userId: user.id },
    orderBy: [
      { isDefault: 'desc' },
      { createdAt: 'desc' }
    ]
  })
  
  return NextResponse.json(addresses)
}

// เพิ่มที่อยู่ใหม่
export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { recipientName, phone, addressLine1, addressLine2, subdistrict, district, province, postalCode, isDefault } = body

    // ถ้าเป็นที่อยู่ default ให้ unset ที่อยู่เดิม
    if (isDefault) {
      await prisma.address.updateMany({
        where: { userId: user.id, isDefault: true },
        data: { isDefault: false }
      })
    }

    const address = await prisma.address.create({
      data: {
        userId: user.id,
        recipientName,
        phone,
        addressLine1,
        addressLine2: addressLine2 || null,
        subdistrict,
        district,
        province,
        postalCode,
        isDefault: isDefault || false
      }
    })

    return NextResponse.json(address)
  } catch (error) {
    console.error('Create address error:', error)
    return NextResponse.json({ error: 'ไม่สามารถเพิ่มที่อยู่ได้' }, { status: 500 })
  }
}
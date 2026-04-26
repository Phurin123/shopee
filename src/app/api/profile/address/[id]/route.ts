import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

// แก้ไขที่อยู่
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { recipientName, phone, addressLine1, addressLine2, subdistrict, district, province, postalCode, isDefault } = body

    // ถ้าเป็นที่อยู่ default ให้ unset ที่อยู่เดิม
    if (isDefault) {
      await prisma.address.updateMany({
        where: { userId: user.id, isDefault: true, NOT: { id: parseInt(id) } },
        data: { isDefault: false }
      })
    }

    const address = await prisma.address.update({
      where: { id: parseInt(id), userId: user.id },
      data: {
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
    console.error('Update address error:', error)
    return NextResponse.json({ error: 'ไม่สามารถแก้ไขที่อยู่ได้' }, { status: 500 })
  }
}

// ลบที่อยู่
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await prisma.address.delete({
      where: { id: parseInt(id), userId: user.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete address error:', error)
    return NextResponse.json({ error: 'ไม่สามารถลบที่อยู่ได้' }, { status: 500 })
  }
}
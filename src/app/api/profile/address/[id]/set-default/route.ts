import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

// ตั้งเป็นที่อยู่ default
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    // unset ที่อยู่ default เดิมทั้งหมด
    await prisma.address.updateMany({
      where: { userId: user.id, isDefault: true },
      data: { isDefault: false }
    })

    // set ที่อยู่ใหม่เป็น default
    const address = await prisma.address.update({
      where: { id: parseInt(id), userId: user.id },
      data: { isDefault: true }
    })

    return NextResponse.json(address)
  } catch (error) {
    console.error('Set default address error:', error)
    return NextResponse.json({ error: 'ไม่สามารถตั้งเป็นที่อยู่เริ่มต้นได้' }, { status: 500 })
  }
}
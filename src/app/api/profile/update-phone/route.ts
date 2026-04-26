import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { phone } = await req.json()
    
    if (!phone) {
      return NextResponse.json({ error: 'กรุณากรอกเบอร์โทรศัพท์' }, { status: 400 })
    }

    // ตรวจสอบรูปแบบเบอร์ (08xxxxxxxx)
    if (!/^0\d{9}$/.test(phone)) {
      return NextResponse.json({ error: 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง' }, { status: 400 })
    }

    // ตรวจสอบว่าเบอร์นี้ถูกใช้ไปแล้วหรือไม่ (ยกเว้นของผู้ใช้คนปัจจุบัน)
    const existing = await prisma.user.findFirst({
      where: {
        phone: phone,
        NOT: { id: user.id }
      }
    })
    if (existing) {
      return NextResponse.json({ error: 'เบอร์โทรศัพท์นี้ถูกใช้งานแล้ว' }, { status: 400 })
    }

    // อัปเดตเบอร์โทรศัพท์
    await prisma.user.update({
      where: { id: user.id },
      data: { phone }
    })

    return NextResponse.json({ success: true, message: 'อัปเดตเบอร์โทรศัพท์สำเร็จ' })
  } catch (error) {
    console.error('Update phone error:', error)
    return NextResponse.json({ error: 'ไม่สามารถอัปเดตเบอร์โทรศัพท์ได้' }, { status: 500 })
  }
}
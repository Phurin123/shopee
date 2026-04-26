import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

export async function POST(req: Request) {
    const user = await getCurrentUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const { type, code } = await req.json()

        const currentUser = await prisma.user.findUnique({ where: { id: user.id } })

        if (!currentUser?.verificationCode || !currentUser.verificationExpires) {
            return NextResponse.json({ error: 'ไม่พบรหัสยืนยัน' }, { status: 400 })
        }

        if (new Date() > currentUser.verificationExpires) {
            return NextResponse.json({ error: 'รหัสหมดอายุ' }, { status: 400 })
        }

        if (currentUser.verificationCode !== code) {
            return NextResponse.json({ error: 'รหัสไม่ถูกต้อง' }, { status: 400 })
        }

        // อัปเดตข้อมูลจริง
        const updateData: any = {
            verificationCode: null,
            verificationExpires: null,
            newEmail: null,
            newPhone: null
        }

        if (type === 'email' && currentUser.newEmail) {
            updateData.email = currentUser.newEmail
        }
        if (type === 'phone' && currentUser.newPhone) {
            updateData.phone = currentUser.newPhone
        }

        await prisma.user.update({
            where: { id: user.id },
            data: updateData
        })

        return NextResponse.json({ success: true, message: 'ยืนยันสำเร็จ' })
    } catch (error) {
        console.error('Verify error:', error)
        return NextResponse.json({ error: 'การยืนยันล้มเหลว' }, { status: 500 })
    }
}
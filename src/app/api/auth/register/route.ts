import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'

export async function POST(req: Request) {
    try {
        const { email, password, name } = await req.json()

        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) {
            return NextResponse.json({ error: 'อีเมลนี้ถูกใช้แล้ว' }, { status: 400 })
        }

        const hashedPassword = await hashPassword(password)
        const user = await prisma.user.create({
            data: { email, password: hashedPassword, name }
        })

        return NextResponse.json({ message: 'ลงทะเบียนสำเร็จ', userId: user.id })
    } catch (error) {
        console.error("REGISTER ERROR:", error)
        return NextResponse.json({ error: 'เกิดข้อผิดพลาด' }, { status: 500 })
    }
}
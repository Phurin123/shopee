import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import nodemailer from 'nodemailer'

const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString()

// สร้าง Transporter (cache ไว้ใช้ซ้ำ)
let transporter: nodemailer.Transporter

function getTransporter() {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })
    }
    return transporter
}

export async function POST(req: Request) {
    const user = await getCurrentUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const { type, value } = await req.json()

        if (!['email', 'phone'].includes(type)) {
            return NextResponse.json({ error: 'ประเภทไม่ถูกต้อง' }, { status: 400 })
        }

        // ตรวจสอบว่าค่านี้ถูกใช้ไปแล้วหรือไม่
        const existing = await prisma.user.findFirst({
            where: { [type]: value, NOT: { id: user.id } }
        })
        if (existing) {
            return NextResponse.json({
                error: type === 'email' ? 'อีเมลนี้ถูกใช้งานแล้ว' : 'เบอร์นี้ถูกใช้งานแล้ว'
            }, { status: 400 })
        }

        const code = generateCode()
        const expires = new Date(Date.now() + 10 * 60 * 1000) // 10 นาที

        await prisma.user.update({
            where: { id: user.id },
            data: {
                [type === 'email' ? 'newEmail' : 'newPhone']: value,
                verificationCode: code,
                verificationExpires: expires
            }
        })

    // 📧 ส่งอีเมลจริง (เฉพาะกรณีเปลี่ยนอีเมล)
    if (type === 'email') {
        const transporter = getTransporter()

        await transporter.sendMail({
            from: `"MyShop" <${process.env.EMAIL_FROM}>`,
            to: value,
            subject: '🔐 รหัสยืนยันการเปลี่ยนอีเมล - MyShop',
            text: `รหัสยืนยันของคุณคือ: ${code}\n\nรหัสจะหมดอายุใน 10 นาที`,
            html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
            <div style="background: #ee4d2d; padding: 20px; text-align: center;">
              <h2 style="color: white; margin: 0;">🔐 รหัสยืนยันอีเมล</h2>
            </div>
            <div style="padding: 24px;">
              <p style="color: #333; margin: 0 0 16px;">สวัสดีคุณ <strong>${user.username}</strong>,</p>
              <p style="color: #666; margin: 0 0 20px;">คุณได้ขอเปลี่ยนอีเมลที่บัญชี MyShop กรุณารหัสด้านล่างเพื่อยืนยัน:</p>
              
              <div style="background: #f5f5f5; padding: 16px; text-align: center; border-radius: 6px; margin: 20px 0;">
                <span style="font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #ee4d2d;">${code}</span>
              </div>
              
              <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">⏰ รหัสจะหมดอายุใน 10 นาที</p>
              
              <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
              
              <p style="color: #999; font-size: 11px; margin: 0;">
                หากไม่ใช่คุณดำเนินการ กรุณาละเว้นอีเมลนี้
              </p>
            </div>
          </div>
        `,
        })
    }

    return NextResponse.json({
        success: true,
        message: type === 'email' ? 'ส่งรหัสยืนยันทางอีเมลแล้ว' : 'เตรียมเปลี่ยนเบอร์โทรศัพท์'
    })

} catch (error) {
    console.error('Send verification error:', error)
    return NextResponse.json({ error: 'ไม่สามารถส่งรหัสได้' }, { status: 500 })
}
}
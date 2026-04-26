import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

// GET - ดึงข้อมูลโปรไฟล์
export async function GET() {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userProfile = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      phone: true,
      gender: true,
      dateOfBirth: true,
      profilePicture: true,
    }
  })

  return NextResponse.json(userProfile)
}

// PUT - อัปเดตโปรไฟล์
export async function PUT(req: Request) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { name, phone, gender, dateOfBirth } = body

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: name || undefined,
        phone: phone || undefined,
        gender: gender || undefined,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
      },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        phone: true,
        gender: true,
        dateOfBirth: true,
        profilePicture: true,
      }
    })

    return NextResponse.json(updatedUser)
    console.log(updatedUser)
  } catch (error) {
    console.error('Update profile error:', error)
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}
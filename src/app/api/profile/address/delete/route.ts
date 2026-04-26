import { NextResponse } from 'next/server'
import { getCurrentUser } from "@/lib/auth"
import { prisma } from '@/lib/prisma'

export async function DELETE(req: Request) {
  const session = await getCurrentUser()
  if (!session?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await prisma.address.deleteMany({ where: { userId: session.id } })
  return NextResponse.json({ success: true })
}
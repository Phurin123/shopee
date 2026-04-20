import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

export async function DELETE(
  req: Request,
  { params }: { params: { itemId: string } }
) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const cart = await prisma.cart.findUnique({ where: { userId: user.id } })
  if (!cart) return NextResponse.json({ error: 'Cart not found' }, { status: 404 })

  await prisma.cartItem.deleteMany({
    where: { id: parseInt(params.itemId), cartId: cart.id }
  })

  return NextResponse.json({ message: 'Item removed' })
}

export async function PUT(
  req: Request,
  { params }: { params: { itemId: string } }
) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { quantity } = await req.json()
  const cart = await prisma.cart.findUnique({ where: { userId: user.id } })
  if (!cart) return NextResponse.json({ error: 'Cart not found' }, { status: 404 })

  await prisma.cartItem.updateMany({
    where: { id: parseInt(params.itemId), cartId: cart.id },
    data: { quantity }
  })

  return NextResponse.json({ message: 'Updated' })
}
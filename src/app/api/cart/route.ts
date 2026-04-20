import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

// GET /api/cart - ดึงตะกร้าสินค้าของผู้ใช้ปัจจุบัน
export async function GET() {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let cart = await prisma.cart.findUnique({
    where: { userId: user.id },
    include: { items: { include: { product: true } } }
  })

  if (!cart) {
    cart = await prisma.cart.create({ data: { userId: user.id }, include: { items: { include: { product: true } } } })
  }

  return NextResponse.json(cart)
}

// POST /api/cart - เพิ่มสินค้าในตะกร้า
export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { productId, quantity = 1 } = await req.json()

  // หา cart หรือสร้างใหม่
  let cart = await prisma.cart.findUnique({ where: { userId: user.id } })
  if (!cart) {
    cart = await prisma.cart.create({ data: { userId: user.id } })
  }

  const existingItem = await prisma.cartItem.findUnique({
    where: { cartId_productId: { cartId: cart.id, productId } }
  })

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity }
    })
  } else {
    await prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity }
    })
  }

  return NextResponse.json({ message: 'Added to cart' })
}
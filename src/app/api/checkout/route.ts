import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

export async function POST() {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const cart = await prisma.cart.findUnique({
    where: { userId: user.id },
    include: { items: { include: { product: true } } }
  })

  if (!cart || cart.items.length === 0) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
  }

  // ตรวจสอบ stock
  for (const item of cart.items) {
    if (item.product.stock < item.quantity) {
      return NextResponse.json({ error: `สินค้า ${item.product.name} มีไม่พอ` }, { status: 400 })
    }
  }

  // คำนวณยอดรวม
  const total = cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)

  // สร้าง order
  const order = await prisma.order.create({
    data: {
      userId: user.id,
      total,
      status: 'pending',
      items: {
        create: cart.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price
        }))
      }
    }
  })

  // ลด stock
  for (const item of cart.items) {
    await prisma.product.update({
      where: { id: item.productId },
      data: { stock: { decrement: item.quantity } }
    })
  }

  // ล้างตะกร้า
  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } })

  return NextResponse.json({ message: 'Order placed successfully', orderId: order.id })
}
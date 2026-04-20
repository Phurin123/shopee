// src/app/api/products/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

// GET สินค้าทั้งหมด (ไม่ต้อง sellerId)
export async function GET() {
  try {
    const products = await prisma.product.findMany()
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

// POST สร้างสินค้าใหม่ (ต้อง login)
export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { name, description, price, stock, imageUrl } = await req.json()
    
    // validation
    if (!name || price === undefined || stock === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        imageUrl,
        sellerId: user.id
      }
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
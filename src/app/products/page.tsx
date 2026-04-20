'use client'

import { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard'

interface Product {
  id: number
  name: string
  description: string
  price: number
  stock: number
  imageUrl?: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(setProducts)
      .catch(err => console.error('Failed to fetch products:', err))
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">สินค้าทั้งหมด</h1>
      {products.length === 0 ? (
        <p>กำลังโหลดสินค้า...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
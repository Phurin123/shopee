'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function CartIcon() {
  const [itemCount, setItemCount] = useState(0)

  useEffect(() => {
    fetch('/api/cart')
      .then(res => res.json())
      .then(cart => {
        const count = cart.items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0
        setItemCount(count)
      })
  }, [])

  return (
    <Link href="/cart" className="relative">
      🛒
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full px-1.5">
          {itemCount}
        </span>
      )}
    </Link>
  )
}
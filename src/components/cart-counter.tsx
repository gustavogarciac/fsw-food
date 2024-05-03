'use client'

import { Button } from '@/components/ui/button'
import { CartProduct, useCartStore } from '@/stores/cart-store'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import React from 'react'

interface CartCounterProps {
  product: CartProduct
}

export const CartCounter = ({ product }: CartCounterProps) => {
  const { sumItem, decreaseItem } = useCartStore()

  function handleSumItem() {
    sumItem(product)
  }

  function handleDecreaseItem() {
    decreaseItem(product)
  }

  return (
    <div className="flex gap-3 items-center">
      <Button
        size="icon"
        variant="outline"
        onClick={handleDecreaseItem}
        className="p-1.5 w-fit h-fit"
      >
        <ChevronLeftIcon className="w-4 h-4" />
      </Button>
      <span>{product.quantity}</span>
      <Button
        size="icon"
        variant="outline"
        onClick={handleSumItem}
        className="p-1.5 w-fit h-fit"
      >
        <ChevronRightIcon className="w-4 h-4" />
      </Button>
    </div>
  )
}

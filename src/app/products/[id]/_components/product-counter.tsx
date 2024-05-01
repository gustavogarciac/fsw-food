'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import React, { useState } from 'react'

export const ProductCounter = () => {
  const [quantity, setQuantity] = useState(1)

  function increaseQuantity() {
    if (quantity >= 99) return
    setQuantity(quantity + 1)
  }

  function decreaseQuantity() {
    if (quantity <= 1) return
    setQuantity(quantity - 1)
  }

  return (
    <div className="flex gap-3 items-center">
      <Button size="icon" variant="outline" onClick={decreaseQuantity}>
        <ChevronLeftIcon />
      </Button>
      <span>{quantity}</span>
      <Button size="icon" variant="outline" onClick={increaseQuantity}>
        <ChevronRightIcon />
      </Button>
    </div>
  )
}

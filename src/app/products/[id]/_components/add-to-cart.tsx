'use client'

import { Button } from '@/components/ui/button'
import { useCartStore } from '@/stores/cart-store'
import { Product } from '@prisma/client'
import React from 'react'

interface AddToCartButtonProps {
  product: Product
}

export const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const { addItem } = useCartStore()

  function handleAddItemToCart() {
    addItem({ ...product, quantity: 1 })
  }

  return (
    <div>
      <Button className="w-full font-semibold" onClick={handleAddItemToCart}>
        Adicionar à sacola
      </Button>
    </div>
  )
}

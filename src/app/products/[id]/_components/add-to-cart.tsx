'use client'

import { Cart } from '@/components/cart'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useCartStore } from '@/stores/cart-store'
import { Product } from '@prisma/client'
import React from 'react'

interface AddToCartButtonProps {
  product: Product
}

export const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const { addItem, onOpen, open, onClose } = useCartStore()

  function handleAddItemToCart() {
    addItem({ ...product, quantity: 1 })
    onOpen()
  }

  return (
    <div>
      <Button className="w-full font-semibold" onClick={handleAddItemToCart}>
        Adicionar à sacola
      </Button>

      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Carrinho</SheetTitle>
          </SheetHeader>

          <div className="mt-3">
            <Cart />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

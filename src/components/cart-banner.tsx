'use client'

import { useCartStore } from '@/stores/cart-store'
import { formatCurrency } from '@/utils/get-product-total-price'
import { Restaurant } from '@prisma/client'
import React from 'react'
import { Button } from './ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { Cart } from './cart'

interface CartBannerProps {
  restaurant: Pick<Restaurant, 'id'>
}

export const CartBanner = ({ restaurant }: CartBannerProps) => {
  const { items: cartItems, calculateTotalPrice } = useCartStore()

  const restaurantHasProductsOnCart = cartItems.some(
    (product) => product.restaurantId === restaurant.id,
  )

  if (!restaurantHasProductsOnCart) return null

  const totalPrice = calculateTotalPrice()

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full bg-white p-5 pt-3 border-t border-border shadow-md">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground">
            Total sem entrega
          </span>
          <h3 className="font-semibold">
            {formatCurrency(totalPrice)}{' '}
            <span className="text-xs text-muted-foreground">
              / {totalQuantity} {totalQuantity > 1 ? 'itens' : 'item'}
            </span>
          </h3>
        </div>

        <Sheet>
          <SheetTrigger>
            <Button>Ver sacola</Button>
          </SheetTrigger>
          <SheetContent className="p-4">
            <SheetHeader>
              <SheetTitle className="text-left">Carrinho</SheetTitle>
            </SheetHeader>

            <Cart />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

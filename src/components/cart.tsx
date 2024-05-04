'use client'

import { useCartStore } from '@/stores/cart-store'
import React from 'react'
import { CartItem } from './cart-item'
import { Card, CardContent } from './ui/card'
import { formatCurrency } from '@/utils/get-product-total-price'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import Link from 'next/link'

export const Cart = () => {
  const {
    items: productsInCart,
    calculateSubTotalPrice,
    calculateTotalDiscount,
    calculateTotalPrice,
    onClose,
  } = useCartStore()

  const subTotalPrice = calculateSubTotalPrice()
  const totalDiscount = calculateTotalDiscount()
  const totalPrice = calculateTotalPrice()

  if (productsInCart.length === 0) {
    return (
      <div className="h-full flex flex-col pt-5 pb-7">
        <div className="flex-auto flex items-center justify-center">
          <span className="text-muted-foreground">Sua sacola está vazia</span>
        </div>

        <Button asChild>
          <Link href="/" onClick={onClose}>
            Encontrar produtos
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col pt-5 pb-7">
      <div className="space-y-4 flex-auto overflow-y-auto pr-2">
        {productsInCart.map((product) => (
          <CartItem cartProduct={product} key={product.id} />
        ))}
      </div>

      <div className="mt-4">
        <Card>
          <CardContent className="p-5">
            <div className="justify-between flex items-center text-xs py-2">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(subTotalPrice)}</span>
            </div>

            <Separator />

            <div className="justify-between flex items-center text-xs py-2">
              <span className="text-muted-foreground">Entrega</span>
              {Number(productsInCart[0].restaurant.deliveryFee) === 0 ? (
                <span className="font-bold text-primary uppercase">Grátis</span>
              ) : (
                <span>
                  {formatCurrency(
                    Number(productsInCart[0].restaurant.deliveryFee),
                  )}
                </span>
              )}
            </div>

            <Separator />

            <div className="justify-between flex items-center text-xs py-2">
              <span className="text-xs text-muted-foreground">Descontos</span>
              <span>- {formatCurrency(totalDiscount)}</span>
            </div>

            <Separator />

            <div className="justify-between flex items-center py-2">
              <span className="text-base font-bold">Total</span>
              <span className="text-base font-bold">
                {formatCurrency(totalPrice)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-7">
        <Button className="w-full">Finalizar pedido</Button>
      </div>
    </div>
  )
}

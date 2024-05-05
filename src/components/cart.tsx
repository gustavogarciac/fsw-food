'use client'

import { useCartStore } from '@/stores/cart-store'
import React, { useState } from 'react'
import { CartItem } from './cart-item'
import { Card, CardContent } from './ui/card'
import { formatCurrency } from '@/utils/get-product-total-price'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import Link from 'next/link'
import { createOrder } from '@/actions/order'
import { OrderStatus } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { Loader2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'

export const Cart = () => {
  const { data: userData } = useSession()
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

  const {
    items: productsInCart,
    calculateSubTotalPrice,
    calculateTotalDiscount,
    calculateTotalPrice,
    onClose,
    removeAll,
  } = useCartStore()

  const subTotalPrice = calculateSubTotalPrice()
  const totalDiscount = calculateTotalDiscount()
  const totalPrice = calculateTotalPrice()

  const finishOrder = async () => {
    try {
      setIsSubmitLoading(true)
      setIsConfirmDialogOpen(false)
      if (!userData) return

      const restaurant = productsInCart[0].restaurant
      await createOrder({
        subtotalPrice: subTotalPrice,
        totalDiscounts: totalDiscount,
        totalPrice,
        deliveryFee: restaurant.deliveryFee,
        deliveryTimeMinutes: restaurant.deliveryTimeMinutes,
        restaurant: {
          connect: { id: restaurant.id },
        },
        status: OrderStatus.CONFIRMED,
        user: {
          connect: { id: userData.user.id },
        },
        orderProducts: {
          createMany: {
            data: productsInCart.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
            })),
          },
        },
      })

      removeAll()
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitLoading(false)
    }
  }

  const handleFinishOrderClick = () => {
    if (!userData) return

    try {
      setIsConfirmDialogOpen(true)
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitLoading(false)
    }
  }

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

      {/* TOTALS */}
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

      {/* FINISH ORDER BUTTON */}
      <div className="mt-7">
        <Button
          className="w-full"
          onClick={handleFinishOrderClick}
          disabled={isSubmitLoading}
        >
          {isSubmitLoading ? (
            <>
              <Loader2 className="animate-spin w-4 h-4 mr-2" />
              <span>Finalizando...</span>
            </>
          ) : (
            <span>Finalizar pedido</span>
          )}
        </Button>
      </div>

      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={() => setIsConfirmDialogOpen(false)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você deseja finalizar o pedido?</AlertDialogTitle>
            <AlertDialogDescription>
              Após finalizar, você concorda com os termos e condições da nossa
              plataforma.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={finishOrder}>
              Finalizar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

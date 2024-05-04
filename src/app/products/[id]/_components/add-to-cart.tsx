'use client'

import { Cart } from '@/components/cart'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useCartStore } from '@/stores/cart-store'
import { Prisma } from '@prisma/client'
import React, { useState } from 'react'

interface AddToCartButtonProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true
    }
  }>
}

export const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const { addItem, onOpen, open, onClose, items: cartProducts } = useCartStore()
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false)

  function addToCart() {
    addItem({ ...product, quantity: 1 })
    onOpen()
  }

  function handleAddItemToCart() {
    const hasDifferentRestaurantProduct = cartProducts.some(
      (cartProduct) => cartProduct.restaurantId !== product.restaurant.id,
    )

    if (hasDifferentRestaurantProduct) return setIsConfirmationDialogOpen(true)

    addToCart()
  }

  return (
    <div>
      <Button className="w-full font-semibold" onClick={handleAddItemToCart}>
        Adicionar à sacola
      </Button>

      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className="p-4">
          <SheetHeader>
            <SheetTitle className="text-left">Carrinho</SheetTitle>
          </SheetHeader>

          <Cart />
        </SheetContent>
      </Sheet>

      <AlertDialogComponent
        isConfirmationDialogOpen={isConfirmationDialogOpen}
        setIsConfirmationDialogOpen={setIsConfirmationDialogOpen}
        addToCartFn={addToCart}
      />
    </div>
  )
}

interface AlertDialogComponentProps {
  isConfirmationDialogOpen: boolean
  setIsConfirmationDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
  addToCartFn: () => void
}

const AlertDialogComponent = ({
  isConfirmationDialogOpen,
  setIsConfirmationDialogOpen,
  addToCartFn,
}: AlertDialogComponentProps) => {
  return (
    <AlertDialog
      open={isConfirmationDialogOpen}
      onOpenChange={setIsConfirmationDialogOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Você só pode adicionar itens de um restaurante por vez.
          </AlertDialogTitle>
          <AlertDialogDescription>
            Deseja mesmo adicionar esse produto? Isso limpará sua sacola atual.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={addToCartFn}>Adicionar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

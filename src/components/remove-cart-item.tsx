import { TrashIcon } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { CartProduct, useCartStore } from '@/stores/cart-store'

interface RemoveCartItemProps {
  product: CartProduct
}

export const RemoveCartItem = ({ product }: RemoveCartItemProps) => {
  const { removeItem } = useCartStore()

  function handleRemoveCartItem() {
    removeItem(product)
  }

  return (
    <Button
      variant="destructive"
      className="p-0"
      size="icon"
      onClick={handleRemoveCartItem}
    >
      <span className="sr-only">Deletar item</span>
      <TrashIcon className="h-4 w-4" />
    </Button>
  )
}

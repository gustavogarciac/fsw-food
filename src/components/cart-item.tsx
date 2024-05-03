import { CartProduct } from '@/stores/cart-store'
import {
  calculateProductTotalPrice,
  formatCurrency,
} from '@/utils/get-product-total-price'
import Image from 'next/image'
import React from 'react'

import { RemoveCartItem } from './remove-cart-item'
import { CartCounter } from './cart-counter'

interface CartItemProps {
  cartProduct: CartProduct
}

export const CartItem = ({ cartProduct }: CartItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-4">
        <div className="w-28 h-28">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            width={300}
            height={300}
            className="rounded-lg object-cover aspect-square"
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-xs font-semibold truncate">{cartProduct.name}</h3>
          <div className="flex items-center gap-1">
            <h4 className="text-sm font-bold">
              {formatCurrency(
                calculateProductTotalPrice(cartProduct) * cartProduct.quantity,
              )}
            </h4>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(
                  Number(cartProduct.price) * cartProduct.quantity,
                )}
              </span>
            )}
          </div>
          <CartCounter product={cartProduct} />
        </div>
      </div>

      <RemoveCartItem product={cartProduct} />
    </div>
  )
}

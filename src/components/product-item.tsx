import { cn } from '@/lib/utils'
import {
  calculateProductTotalPrice,
  formatCurrency,
} from '@/utils/get-product-total-price'
import { Prisma } from '@prisma/client'
import { ArrowDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true
        }
      }
    }
  }>
  containerClasses?: string
  imageContainerClasses?: string
}

export const ProductItem = ({
  product,
  containerClasses,
  imageContainerClasses,
}: Props) => {
  return (
    <Link
      className={cn('min-w-[150px]', containerClasses)}
      href={`/products/${product.id}`}
    >
      <div className="w-full space-y-2">
        <div
          className={cn(
            'relative overflow-hidden rounded-md w-full h-36',
            imageContainerClasses,
          )}
        >
          <Image
            className="w-full aspect-square object-cover"
            alt={product.name}
            width={300}
            height={300}
            quality={100}
            src={product.imageUrl}
          />

          {product.discountPercentage > 0 && (
            <div className="absolute top-2 left-2 rounded-full bg-primary px-0.5 py-0.5">
              <span className="text-white font-semibold inline-flex items-center text-sm">
                <ArrowDown className="h-4 w-4" />
                {product.discountPercentage}%
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="font-semibold truncate">{product.name}</h2>
          <div className="flex gap-1 items-center">
            <h3 className="font-bold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h3>
            {product.discountPercentage > 0 && (
              <span className="text-muted-foreground line-through text-sm">
                {formatCurrency(Number(product.price))}
              </span>
            )}
          </div>

          <span className="truncate text-muted-foreground text-xs">
            {product.restaurant.name}
          </span>
        </div>
      </div>
    </Link>
  )
}

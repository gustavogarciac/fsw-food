import React from 'react'
import { ProductItem } from './product-item'
import { Skeleton } from './ui/skeleton'
import { Prisma } from '@prisma/client'
import { cn } from '@/lib/utils'

interface ProductListProps {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true
        }
      }
    }
  }>[]
  containerClasses?: string
}

export const ProductListSkeleton = async () => {
  return (
    <div className="flex overflow-x-scroll gap-4 scrollbar-hidden px-5">
      {Array.from({ length: 10 }).map((_, index) => (
        <div className="space-y-2 min-w-[150px]" key={index}>
          <Skeleton className="rounded-md w-full h-36" />

          <div className="flex flex-col gap-1">
            <Skeleton className="w-3/4 h-5" />
            <div className="flex gap-1 items-center">
              <Skeleton className="w-1/2 h-4" />
              <Skeleton className="w-1/2 h-4" />
            </div>

            <Skeleton className="w-3/4 h-5" />
          </div>
        </div>
      ))}
    </div>
  )
}

export const ProductList = async ({
  products,
  containerClasses,
}: ProductListProps) => {
  return (
    <div
      className={cn(
        'flex overflow-x-scroll gap-4 scrollbar-hidden px-5 md:grid md: grid-cols-4 lg:grid-cols-6',
        containerClasses,
      )}
    >
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  )
}

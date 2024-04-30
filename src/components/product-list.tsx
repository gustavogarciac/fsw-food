import { prisma } from '@/lib/prisma'
import React from 'react'
import { ProductItem } from './product-item'
import { Skeleton } from './ui/skeleton'

const getProducts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const products = await prisma.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  })

  return products
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

export const ProductList = async () => {
  const products = await getProducts()

  return (
    <div className="flex overflow-x-scroll gap-4 scrollbar-hidden px-5">
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  )
}

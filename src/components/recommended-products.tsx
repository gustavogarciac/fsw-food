import React from 'react'
import { ProductList } from './product-list'
import { prisma } from '@/lib/prisma'

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

export const RecommendedProducts = async () => {
  const products = await getProducts()

  return <ProductList products={products} />
}

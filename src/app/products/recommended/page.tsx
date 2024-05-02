import { Header } from '@/components/header'
import { ProductItem } from '@/components/product-item'
import { prisma } from '@/lib/prisma'
import React from 'react'

async function getRecommendedProducts() {
  // TODO: Pegar pedidos com mais pedidos
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

const RecommendedProductsPage = async () => {
  const products = await getRecommendedProducts()

  if (!products) return null

  return (
    <>
      <Header />
      <div className="p-5">
        <h2 className="text-lg font-bold pt-6">Pedidos Recomendados</h2>

        <div className="grid grid-cols-2 gap-6 w-full mt-6">
          {products.map((product) => (
            <ProductItem
              product={product}
              key={product.id}
              containerClasses="min-h-[240px]"
              imageContainerClasses="h-52"
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default RecommendedProductsPage

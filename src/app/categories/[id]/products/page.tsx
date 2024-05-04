import { Container } from '@/components/container'
import { Header } from '@/components/header'
import { ProductItem } from '@/components/product-item'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import React from 'react'

async function getCategoryFromId(id: string, pageIndex: number = 0) {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      products: {
        skip: pageIndex * 10,
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })

  if (!category) {
    return null
  }

  return category
}

const CategoriesPage = async ({ params }: { params: { id: string } }) => {
  if (!params.id) redirect('/')

  const category = await getCategoryFromId(params.id, 0)

  if (!category) redirect('/')

  return (
    <Container>
      <Header />
      <div className="p-5">
        <h2 className="text-lg font-bold pt-6">{category.name}</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full mt-6">
          {category.products.map((product) => (
            <ProductItem
              product={product}
              key={product.id}
              imageContainerClasses="h-52"
            />
          ))}
        </div>
      </div>
    </Container>
  )
}

export default CategoriesPage

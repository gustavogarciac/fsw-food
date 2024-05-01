import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { ChevronLeftIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import { ProductDetails } from './_components/product-details'

async function getProductById(id: string) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
      category: true,
    },
  })

  return product
}

async function getSimilarProducts(categoryId: string, baseProductId: string) {
  const products = await prisma.product.findMany({
    where: {
      categoryId,
      NOT: {
        id: baseProductId,
      },
    },
    include: {
      restaurant: true,
      category: true,
    },
    take: 10,
  })

  return products
}

async function ProductIdPage({ params }: { params: { id: string } }) {
  if (!params.id) redirect('/')

  const product = await getProductById(params.id)

  if (!product) redirect('/')

  const similarProducts = await getSimilarProducts(
    product.categoryId,
    product.id,
  )

  return (
    <div className="w-full">
      <div className="relative w-full h-80">
        <Image
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover"
          width={400}
          height={400}
          quality={100}
        />
      </div>

      <Button
        className="absolute rounded-full bg-white text-foreground top-2 left-2 p-0 hover:bg-muted"
        size={'icon'}
        asChild
      >
        <Link href="/">
          <ChevronLeftIcon className="w-6 h-6" />
        </Link>
      </Button>

      <ProductDetails
        product={product}
        complementaryProducts={similarProducts}
      />
    </div>
  )
}

export default ProductIdPage

import {
  calculateProductTotalPrice,
  formatCurrency,
} from '@/utils/get-product-total-price'
import { Prisma } from '@prisma/client'
import { ArrowDown } from 'lucide-react'
import Image from 'next/image'
import { ProductList, ProductListSkeleton } from '@/components/product-list'
import { Suspense } from 'react'
import { Metrics } from '@/components/metrics'

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true
    }
  }>
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true
      category: true
    }
  }>[]
}

export const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  return (
    <div className="py-5">
      <div className="flex items-center gap-1 px-5">
        <Image
          src={product.restaurant.imageUrl}
          alt={product.restaurant.name}
          width={24}
          height={24}
          className="rounded-full aspect-square object-cover"
        />
        <span className="text-sm text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>

      <h1 className="font-semibold text-xl mb-3 mt-1 px-5">{product.name}</h1>

      <div className="flex flex-row justify-between items-center px-5">
        <div className="flex flex-col">
          <div className="flex flex-row gap-2">
            <h2 className="text-xl font-extrabold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h2>

            {product.discountPercentage > 0 && (
              <div className="rounded-full bg-primary px-1 py-0.5">
                <span className="text-white font-semibold inline-flex items-center text-sm">
                  <ArrowDown className="h-4 w-4" />
                  {product.discountPercentage}%
                </span>
              </div>
            )}
          </div>

          <span className="text-sm text-muted-foreground">
            De: {formatCurrency(Number(product.price))}
          </span>
        </div>
      </div>

      <div className="px-5">
        <Metrics
          deliveryFee={Number(product.restaurant.deliveryFee)}
          deliveryTimeMinutes={product.restaurant.deliveryTimeMinutes}
        />
      </div>

      <div className="flex flex-col gap-1 mt-4 px-5">
        <h3 className="font-semibold">Sobre</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>

      <div className="pt-6 space-y-3">
        <h2 className="font-semibold px-5">Produtos recomendados</h2>

        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList
            products={complementaryProducts}
            containerClasses="pl-5"
          />
        </Suspense>
      </div>
    </div>
  )
}

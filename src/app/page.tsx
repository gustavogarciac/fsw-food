import { CategoryList, CategoryListSkeleton } from '@/components/category-list'
import { Header } from '@/components/header'
import { ProductListSkeleton } from '@/components/product-list'
import { PromoBanner } from '@/components/promo-banner'
import { RecommendedProducts } from '@/components/recommended-products'
import {
  RestaurantList,
  RestaurantListSkeleton,
} from '@/components/restaurant-list'
import { SearchInput } from '@/components/search-input'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { Suspense } from 'react'

export default function Home() {
  return (
    <main>
      <Header />

      <div className="px-5 pt-6">
        <SearchInput />
      </div>

      <Suspense fallback={<CategoryListSkeleton />}>
        <div className="px-5 pt-6">
          <CategoryList />
        </div>
      </Suspense>

      <div className="px-5 pt-6">
        <PromoBanner
          alt="Até 30% de desconto em pizzas!"
          src="/promo-banner-01.png"
        />
      </div>

      <div className="pt-6 space-y-3">
        <div className="px-5 flex items-center justify-between gap-2">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button variant="link" className="text-primary p-0 h-fit">
            <Link
              className="flex flex-row gap-1 items-center"
              href={'/products/recommended'}
            >
              Ver todos <ChevronRight size={16} />
            </Link>
          </Button>
        </div>

        <Suspense fallback={<ProductListSkeleton />}>
          <RecommendedProducts />
        </Suspense>
      </div>

      <div className="px-5 pt-6">
        <PromoBanner
          alt="A partir de 17,90 em lanches!"
          src="/promo-banner-02.png"
        />
      </div>

      <div className="pt-6 space-y-3">
        <div className="px-5 flex items-center justify-between gap-2">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>
          <Button variant="link" className="text-primary p-0 h-fit">
            <Link
              href={'/restaurants/recommended'}
              className="flex items-center gap-1"
            >
              Ver todos <ChevronRight size={16} />
            </Link>
          </Button>
        </div>

        <Suspense fallback={<RestaurantListSkeleton />}>
          <RestaurantList />
        </Suspense>
      </div>
    </main>
  )
}

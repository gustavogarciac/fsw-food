import { CategoryList, CategoryListSkeleton } from '@/components/category-list'
import { Header } from '@/components/header'
import { ProductListSkeleton } from '@/components/product-list'
import { RecommendedProducts } from '@/components/recommended-products'
import { SearchInput } from '@/components/search-input'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
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
        <Image
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizzas!"
          width={1440}
          height={400}
          className="w-full h-auto object-contain"
          quality={100}
        />
      </div>

      <div className="pt-6 space-y-3">
        <div className="px-5 flex items-center justify-between gap-2">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button variant="link" className="text-primary p-0 h-fit">
            Ver todos <ChevronRight size={16} />
          </Button>
        </div>

        <Suspense fallback={<ProductListSkeleton />}>
          <RecommendedProducts />
        </Suspense>
      </div>
    </main>
  )
}

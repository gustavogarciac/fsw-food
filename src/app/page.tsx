import { CategoryList, CategoryListSkeleton } from '@/components/category-list'
import { Container } from '@/components/container'
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
import Image from 'next/image'
import Link from 'next/link'

import { Suspense } from 'react'

export default function Home() {
  return (
    <main>
      <Container>
        <Header />
      </Container>

      {/* Desktop Hero Section */}
      <div className="w-full bg-primary hidden md:block">
        <Container containerClasses="relative mt-4 flex justify-between min-h-[422px] px-4 gap-12">
          <div className="flex flex-col max-w-3/4 self-center gap-1 ">
            <h1 className="text-white text-4xl font-extrabold">
              Peça sua comida favorita sem sair de casa
            </h1>
            <p className="text-muted text-base">
              Receba no conforto da sua casa em poucos minutos
            </p>

            <div className="p-2 bg-white rounded-md mt-4">
              <SearchInput />
            </div>
          </div>

          <Image
            src={'/lamen_dish.png'}
            alt="Prato de lamen"
            className="object-contain self-end"
            height={400}
            width={400}
            quality={100}
          />
        </Container>
      </div>

      <div className="px-5 pt-6 md:hidden">
        <SearchInput />
      </div>

      <Container containerClasses="md:mt-4">
        <Suspense fallback={<CategoryListSkeleton />}>
          <div className="px-5 pt-6">
            <CategoryList />
          </div>
        </Suspense>
      </Container>

      <div className="px-5 pt-6 md:hidden">
        <PromoBanner
          alt="Até 30% de desconto em pizzas!"
          src="/promo-banner-01.png"
        />
      </div>

      <Container>
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
      </Container>

      <Container containerClasses="grid md:grid-cols-2 gap-2">
        <div className="px-5 pt-6 hidden md:block">
          <PromoBanner
            alt="Até 30% de desconto em pizzas!"
            src="/promo-banner-01.png"
          />
        </div>
        <div className="px-5 pt-6">
          <PromoBanner
            alt="A partir de 17,90 em lanches!"
            src="/promo-banner-02.png"
          />
        </div>
      </Container>

      <Container>
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
      </Container>
    </main>
  )
}

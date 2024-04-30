import { CategoryList, CategoryListSkeleton } from '@/components/category-list'
import { Header } from '@/components/header'
import { SearchInput } from '@/components/search-input'
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
    </main>
  )
}

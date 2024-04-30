import { CategoryList, CategoryListSkeleton } from '@/components/category-list'
import { Header } from '@/components/header'
import { SearchInput } from '@/components/search-input'
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
    </main>
  )
}

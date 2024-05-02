import { Header } from '@/components/header'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const RecommendedProductsLoading = () => {
  return (
    <>
      <Header />
      <div className="p-5">
        <h2 className="text-lg font-bold pt-6">Carregando...</h2>

        <RecommendedProductsSkeleton />
      </div>
    </>
  )
}

const RecommendedProductsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-6 w-full mt-6">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="flex flex-col w-full gap-2">
          <Skeleton className="h-52 w-full" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex flex-row gap-1">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <Skeleton className="h-4 w-1/3" />
        </div>
      ))}
    </div>
  )
}

export default RecommendedProductsLoading

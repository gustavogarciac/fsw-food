import { Header } from '@/components/header'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const RecommendedRestaurantLoading = () => {
  return (
    <>
      <Header />
      <div className="p-5">
        <h2 className="text-lg font-bold pt-6">Restaurantes Recomendados</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full mt-6">
          <RecommendedRestaurantsListSkeleton />
        </div>
      </div>
    </>
  )
}

export default RecommendedRestaurantLoading

const RecommendedRestaurantsListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full mt-6">
      {Array.from({ length: 10 }).map((_, index) => (
        <div className="flex flex-col gap-2" key={index}>
          <Skeleton className="h-52 w-full" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-2/4" />
        </div>
      ))}
    </div>
  )
}

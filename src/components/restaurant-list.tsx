import React from 'react'
import { prisma } from '../lib/prisma'
import { RestaurantItem } from './restaurant-item'
import { Skeleton } from './ui/skeleton'

async function getRestaurantList() {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const restaurants = await prisma.restaurant.findMany({
    orderBy: {
      name: 'asc',
    },
    take: 9,
  })

  return restaurants
}

export const RestaurantListSkeleton = () => {
  return (
    <div className="flex gap-4 overflow-x-scroll px-5 scrollbar-hidden">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-1">
          <Skeleton className="h-64- w-80 rounded-md aspect-video" />
          <div className="flex flex-row gap-2">
            <Skeleton className="h-3 w-3/4 rounded-md" />
            <Skeleton className="h-3 w-1/4 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  )
}

export const RestaurantList = async () => {
  const restaurants = await getRestaurantList()
  return (
    <div className="flex gap-4 overflow-x-scroll px-5 scrollbar-hidden md:grid md:grid-cols-2 lg:grid-cols-3">
      {restaurants.map((restaurant) => (
        <RestaurantItem key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  )
}

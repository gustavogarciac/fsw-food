import { Header } from '@/components/header'
import { RestaurantItem } from '@/components/restaurant-item'
import { SearchInput } from '@/components/search-input'
import { prisma } from '@/lib/prisma'
import React from 'react'

async function getRestaurants(name: string) {
  const restaurants = await prisma.restaurant.findMany({
    where: {
      name: {
        contains: name,
        mode: 'insensitive',
      },
    },
    take: 10,
  })

  return restaurants
}

const RestaurantsPage = async ({
  searchParams,
}: {
  searchParams: { name: string }
}) => {
  const restaurants = await getRestaurants(searchParams.name)

  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <SearchInput />
      </div>
      <div className="p-5">
        <h2 className="text-lg font-bold pt-6">
          Resultado para a pesquisa: {searchParams.name ?? 'Todos'}...
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full mt-6">
          {restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <RestaurantItem
                restaurant={restaurant}
                key={restaurant.id}
                containerClasses="min-h-[240px]"
                imageContainerClasses="h-52"
              />
            ))
          ) : (
            <p className="text-center w-full mt-6">
              Nenhum restaurante encontrado.
            </p>
          )}
        </div>
      </div>
    </>
  )
}

export default RestaurantsPage

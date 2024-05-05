import { Container } from '@/components/container'
import { Header } from '@/components/header'
import { RestaurantItem } from '@/components/restaurant-item'
import { Button } from '@/components/ui/button'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

async function fetchFavoritesRestaurants(userId: string) {
  const favorites = await prisma.userFavoritesRestaurant.findMany({
    where: {
      userId,
    },
    include: {
      restaurant: true,
    },
  })

  return favorites
}

const FavoritesRestaurantPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user.id) redirect('/')

  const favorites = await fetchFavoritesRestaurants(session.user.id)

  return (
    <Container>
      <Header />
      <div className="p-5">
        <h2 className="text-lg font-bold pt-6">Restaurantes Favoritos</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-6">
          {favorites.length > 0 ? (
            favorites.map((favorite) => (
              <RestaurantItem
                restaurant={favorite.restaurant}
                key={favorite.id}
                containerClasses="min-h-[240px]"
                imageContainerClasses="h-52"
                appearAsFavorite={true}
                userId={session.user.id}
              />
            ))
          ) : (
            <div className="flex flex-col gap-2">
              <span className="text-lg font-bold">
                Você ainda não favoritou nenhum restaurante!
              </span>
              <p className="text-muted-foreground text-sm">
                Experimente favoritar os restaurantes que você mais gosta para
                salvar eles nesta seção!
              </p>
              <Button asChild>
                <Link href={'/'}>Ver restaurantes</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}

export default FavoritesRestaurantPage

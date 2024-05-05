'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

async function favoriteRestaurant(userId: string, restaurantId: string) {
  const userAlreadyFavorited = await prisma.userFavoritesRestaurant.findFirst({
    where: {
      userId,
      restaurantId,
    },
  })

  if (userAlreadyFavorited) {
    throw new Error('User already favorited a restaurant')
  }

  const favoriteRestaurant = await prisma.userFavoritesRestaurant.create({
    data: {
      userId,
      restaurantId,
    },
  })

  revalidatePath(`/restaurants/favorites`)
  return favoriteRestaurant
}

async function removeFavoriteRestaurant(userId: string, restaurantId: string) {
  const userFavorite = await prisma.userFavoritesRestaurant.findFirst({
    where: {
      userId,
      restaurantId,
    },
  })

  if (!userFavorite) throw new Error('User did not favorite this restaurant.')

  await prisma.userFavoritesRestaurant.delete({
    where: {
      id: userFavorite.id,
    },
  })

  revalidatePath('/restaurants/favorites')
}

export { favoriteRestaurant, removeFavoriteRestaurant }

'use client'

import { removeFavoriteRestaurant } from '@/actions/favorite'
import React from 'react'
import { Button } from './ui/button'
import { toast } from './ui/use-toast'

interface RestaurantUnfavoriteButtonProps {
  restaurantId: string
  userId: string
}

export const RestaurantUnfavoriteButton = ({
  restaurantId,
  userId,
}: RestaurantUnfavoriteButtonProps) => {
  async function handleRemoveFavorite() {
    await removeFavoriteRestaurant(userId, restaurantId)
    toast({
      title: 'Restaurante removido dos favoritos',
    })
  }

  return (
    <Button variant={'link'} className="p-0" onClick={handleRemoveFavorite}>
      Remover dos favoritos
    </Button>
  )
}

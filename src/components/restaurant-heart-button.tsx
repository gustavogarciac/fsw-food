'use client'

import React from 'react'
import { Button } from './ui/button'
import { favoriteRestaurant } from '@/actions/favorite'
import { HeartIcon } from 'lucide-react'
import { toast } from './ui/use-toast'
import { ToastAction } from './ui/toast'
import { useRouter } from 'next/navigation'

interface RestaurantHeartButtonProps {
  restaurantId: string
  userId: string
}
export const RestaurantHeartButton = ({
  restaurantId,
  userId,
}: RestaurantHeartButtonProps) => {
  const router = useRouter()
  async function handleFavoriteRestaurantClick() {
    if (!userId) return
    try {
      await favoriteRestaurant(userId, restaurantId)
      toast({
        title: 'Restaurante adicionado aos favoritos!',
        action: (
          <ToastAction
            altText="Ver favoritos"
            onClick={() => router.push(`/restaurants/favorites`)}
          >
            Ver favoritos
          </ToastAction>
        ),
      })
    } catch (error) {
      toast({
        title: 'Você já adicionou esse restaurante aos favoritos!',
        description: 'Você pode acessar seus favoritos na página de favoritos.',
        action: (
          <ToastAction
            altText="Ver favoritos"
            onClick={() => router.push(`/restaurants/favorites`)}
          >
            Ver favoritos
          </ToastAction>
        ),
      })
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="absolute top-2 right-2 p-2 rounded-full h-fit w-fit bg-white/60"
      onClick={handleFavoriteRestaurantClick}
    >
      <HeartIcon className="w-4 h-4 fill-white text-white" />
    </Button>
  )
}

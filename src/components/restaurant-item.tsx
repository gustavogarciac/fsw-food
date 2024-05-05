import { formatCurrency } from '@/utils/get-product-total-price'
import { Restaurant } from '@prisma/client'
import { BikeIcon, ClockIcon, StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { RestaurantHeartButton } from './restaurant-heart-button'
import { RestaurantUnfavoriteButton } from './restaurant-unfavorite-button'

interface RestaurantItemProps {
  userId?: string
  restaurant: Restaurant
  containerClasses?: string
  imageContainerClasses?: string
  appearAsFavorite?: boolean
}

export const RestaurantItem = ({
  restaurant,
  containerClasses,
  imageContainerClasses,
  userId,
  appearAsFavorite = false,
}: RestaurantItemProps) => {
  return (
    <div className={cn('min-w-80 max-w-[min-w-80]', containerClasses)}>
      <div className="w-full space-y-4">
        <div className={cn('w-full relative h-40', imageContainerClasses)}>
          <Link href={`/restaurants/${restaurant.id}`}>
            <Image
              src={restaurant.imageUrl}
              className="w-full h-full object-cover rounded-md"
              width={400}
              height={400}
              quality={100}
              alt=""
            />
          </Link>

          <div className="rounded-full absolute top-2 left-2 flex items-center gap-0.5 bg-white px-2 py-1">
            <StarIcon className="w-5 h-5 fill-yellow-500" />
            <span className="font-bold">5.0</span>
          </div>

          {userId && appearAsFavorite === false ? (
            <RestaurantHeartButton
              restaurantId={restaurant.id}
              userId={userId}
            />
          ) : null}
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-2 justify-between items-center">
            <Link
              className="flex flex-col gap-1"
              href={`/restaurants/${restaurant.id}`}
            >
              <h3 className="font-semibold text-sm">{restaurant.name}</h3>
              <div className="flex gap-3">
                <div className="flex gap-1 items-center">
                  <BikeIcon className="text-primary w-4 h-4" />
                  <span className="text-sm text-muted-foreground">
                    {Number(restaurant.deliveryFee) === 0
                      ? 'Entrega grátis'
                      : formatCurrency(Number(restaurant.deliveryFee))}
                  </span>
                </div>
                <div className="flex gap-1 items-center">
                  <ClockIcon className="text-primary w-4 h-4" />
                  <span className="text-xs text-muted-foreground">
                    {restaurant.deliveryTimeMinutes} min
                  </span>
                </div>
              </div>
            </Link>
            {userId && appearAsFavorite === true && (
              <RestaurantUnfavoriteButton
                restaurantId={restaurant.id}
                userId={userId}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

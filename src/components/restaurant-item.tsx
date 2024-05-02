import { formatCurrency } from '@/utils/get-product-total-price'
import { Restaurant } from '@prisma/client'
import { BikeIcon, ClockIcon, HeartIcon, StarIcon } from 'lucide-react'
import Image from 'next/image'
import { Button } from './ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface RestaurantItemProps {
  restaurant: Restaurant
  containerClasses?: string
  imageContainerClasses?: string
}

export const RestaurantItem = ({
  restaurant,
  containerClasses,
  imageContainerClasses,
}: RestaurantItemProps) => {
  return (
    <Link
      className={cn('min-w-80 max-w-[min-w-80]', containerClasses)}
      href={`/restaurants/${restaurant.id}`}
    >
      <div className="w-full space-y-4">
        <div className={cn('w-full relative h-40', imageContainerClasses)}>
          <Image
            src={restaurant.imageUrl}
            className="w-full h-full object-cover rounded-md"
            width={400}
            height={400}
            quality={100}
            alt=""
          />

          <div className="rounded-full absolute top-2 left-2 flex items-center gap-0.5 bg-white px-2 py-1">
            <StarIcon className="w-5 h-5 fill-yellow-500" />
            <span className="font-bold">5.0</span>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-2 right-2 p-2 rounded-full h-fit w-fit bg-white/60"
          >
            <HeartIcon className="w-4 h-4 fill-white text-white" />
          </Button>
        </div>
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
      </div>
    </Link>
  )
}

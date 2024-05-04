import { CartBanner } from '@/components/cart-banner'
import { CategoryItem } from '@/components/category-item'
import { Container } from '@/components/container'
import { Header } from '@/components/header'
import { Metrics } from '@/components/metrics'
import { ProductList, ProductListSkeleton } from '@/components/product-list'
import { SearchInput } from '@/components/search-input'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { ChevronLeftIcon, HeartIcon, StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'

async function getRestaurantById(id: string) {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })

  return restaurant
}

const RestaurantIdPage = async ({ params }: { params: { id: string } }) => {
  if (!params.id) redirect('/')

  const restaurant = await getRestaurantById(params.id)

  if (!restaurant) redirect('/')

  return (
    <div className="w-full">
      <Container>
        {/* Header and Search Input */}
        <div className="hidden md:block">
          <Header />
          <div className="px-5 pt-6">
            <SearchInput />
          </div>
        </div>

        {/* Image on Mobile */}
        <div className="relative w-full h-52 md:hidden">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="h-full w-full object-cover"
            width={400}
            height={400}
            quality={100}
          />
          <Button
            className="absolute rounded-full bg-white text-foreground top-2 left-2 p-0 hover:bg-muted"
            size={'icon'}
            asChild
          >
            <Link href="/">
              <ChevronLeftIcon className="w-6 h-6" />
            </Link>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-2 right-2 p-2 rounded-full h-fit w-fit bg-white/60"
          >
            <HeartIcon className="w-4 h-4 fill-white text-white" />
          </Button>
        </div>

        <div className="flex flex-row gap-1 md:p-5">
          <div className="relative aspect-video hidden md:block w-2/3">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              className="h-full w-full object-cover rounded-md"
              width={600}
              height={600}
              quality={100}
            />
          </div>

          {/* Restaurant Info */}
          <div className="md:w-1/3 w-full">
            <div className="flex items-center justify-between gap-1 p-5">
              <div className="flex items-center gap-2">
                <Image
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  width={40}
                  height={40}
                  className="rounded-full aspect-square object-cover"
                />
                <span className="text-xl font-bold">{restaurant.name}</span>
              </div>

              {/* Rating */}
              <div className="rounded-full px-2 py-1 flex gap-1 items-center bg-gray-800 text-white">
                <StarIcon className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                <span className="font-bold">5.0</span>
              </div>
            </div>

            {/* Metrics */}
            <div className="px-5">
              <Metrics
                deliveryFee={Number(restaurant.deliveryFee)}
                deliveryTimeMinutes={restaurant.deliveryTimeMinutes}
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-4 px-5 mt-6">
              {restaurant.categories.map((category) => (
                <CategoryItem key={category.id} category={category} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 px-5">
          <h2 className="font-semibold">Mais Pedidos</h2>

          <Suspense fallback={<ProductListSkeleton />}>
            <ProductList
              products={restaurant.products}
              containerClasses="px-0"
            />
          </Suspense>
        </div>

        {restaurant.categories.map((category) => (
          <div className="mt-6 px-5" key={category.id}>
            <h2 className="font-semibold">{category.name}</h2>

            <Suspense fallback={<ProductListSkeleton />}>
              <ProductList
                products={category.products}
                containerClasses="px-0"
              />
            </Suspense>
          </div>
        ))}

        <CartBanner restaurant={restaurant} />
      </Container>
    </div>
  )
}

export default RestaurantIdPage

import { Container } from '@/components/container'
import { Header } from '@/components/header'
import { RestaurantItem } from '@/components/restaurant-item'
import { prisma } from '@/lib/prisma'

async function getRecommendedRestaurants() {
  const restaurants = await prisma.restaurant.findMany({
    orderBy: {
      name: 'asc',
    },
    take: 10,
  })

  return restaurants
}

const RecommendedRestaurants = async () => {
  const restaurants = await getRecommendedRestaurants()

  return (
    <Container>
      <Header />
      <div className="p-5">
        <h2 className="text-lg font-bold pt-6">Restaurantes Recomendados</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              restaurant={restaurant}
              key={restaurant.id}
              containerClasses="min-h-[240px]"
              imageContainerClasses="h-52"
            />
          ))}
        </div>
      </div>
    </Container>
  )
}
export default RecommendedRestaurants

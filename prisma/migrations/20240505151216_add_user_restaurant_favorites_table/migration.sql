-- CreateTable
CREATE TABLE "user_favorites_restaurants" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "restaurant_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_favorites_restaurants_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_favorites_restaurants" ADD CONSTRAINT "user_favorites_restaurants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorites_restaurants" ADD CONSTRAINT "user_favorites_restaurants_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

import { prisma } from '@/lib/prisma'
import React from 'react'
import { Skeleton } from './ui/skeleton'
import { CategoryItem } from './category-item'

async function getCategories() {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const categories = await prisma.category.findMany({})

  return categories
}

export const CategoryListSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-3 px-5 pt-6">
      <Skeleton className="w-full h-14 rounded-md" />
      <Skeleton className="w-full h-14 rounded-md" />
      <Skeleton className="w-full h-14 rounded-md" />
      <Skeleton className="w-full h-14 rounded-md" />
      <Skeleton className="w-full h-14 rounded-md" />
      <Skeleton className="w-full h-14 rounded-md" />
    </div>
  )
}

export const CategoryList = async () => {
  const categories = await getCategories()

  return (
    <div className="grid grid-cols-2 gap-3">
      {categories.map((category) => (
        <CategoryItem category={category} key={category.id} />
      ))}
    </div>
  )
}

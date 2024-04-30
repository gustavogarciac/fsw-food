import { Category } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

interface CategoryItemProps {
  category: Category
}

export const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div className="flex items-center gap-3 py-3 px-4 max-h-14 bg-white shadow-sm rounded-md">
      <Image
        src={category.imageUrl}
        alt={category.name}
        width={30}
        height={30}
        quality={100}
      />
      <span className="font-semibold text-sm">{category.name}</span>
    </div>
  )
}

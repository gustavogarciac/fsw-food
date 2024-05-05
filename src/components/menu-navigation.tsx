'use client'

import { cn } from '@/lib/utils'
import { HeartIcon, HomeIcon, Receipt } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Separator } from './ui/separator'
import { Category } from '@prisma/client'

const navigationList = [
  {
    label: 'Início',
    href: '/',
    icon: <HomeIcon className="h-6 w-6" />,
  },
  {
    label: 'Meus Pedidos',
    href: '/orders',
    icon: <Receipt className="h-6 w-6" />,
  },
  {
    label: 'Restaurantes Favoritos',
    href: '/restaurants/favorites',
    icon: <HeartIcon className="h-6 w-6" />,
  },
]

interface MenuNavigationProps {
  categories: Category[]
}

export const MenuNavigation = ({ categories }: MenuNavigationProps) => {
  const pathname = usePathname()

  return (
    <nav>
      <ul className="space-y-2 mt-4">
        {navigationList.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className={cn(
                'flex flex-row p-3 rounded-md gap-3',
                pathname === item.href && 'bg-primary text-white',
              )}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <Separator />

      <h2 className="text-sm font-semibold mt-4">Categorias</h2>
      <ul className="space-y-2 mt-4">
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={`/restaurants/category/${category.id}`}
              className={cn(
                'flex flex-row p-3 rounded-md gap-3',
                pathname === `/restaurants/category/${category.id}` &&
                  'bg-primary text-white',
              )}
            >
              <span>{category.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

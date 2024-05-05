import { MenuIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { Separator } from './ui/separator'
import { MenuNavigation } from './menu-navigation'
import { prisma } from '@/lib/prisma'
import { SignInHeader } from './sign-in-header'

async function getCategories() {
  const categories = await prisma.category.findMany()

  return categories
}

export const Header = async () => {
  const categories = await getCategories()

  return (
    <div className="flex justify-between items-center pt-6 px-5">
      <Link href="/">
        <Image
          src="/logo.png"
          height={30}
          width={100}
          alt="FSW Food Logo vermelha com as letras FSW em branco"
          quality={100}
        />
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="border-none bg-transparent"
          >
            <MenuIcon className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent className="py-3 px-4">
          <SheetHeader className="p-0">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>

          <div className="mt-4">
            <SignInHeader />

            <Separator />

            <MenuNavigation categories={categories} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

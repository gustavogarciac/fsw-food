import { MenuIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

export const Header = () => {
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
      <Button
        variant="outline"
        size="icon"
        className="border-none bg-transparent"
      >
        <MenuIcon className="h-6 w-6" />
      </Button>
    </div>
  )
}

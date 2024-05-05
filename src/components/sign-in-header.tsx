'use client'

import { LogInIcon, LogOutIcon } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

export const SignInHeader = () => {
  const { data } = useSession()

  return (
    <div className="flex flex-row justify-between items-center mb-4">
      {data ? (
        <>
          <div className="flex flex-row gap-3 items-center">
            <Image
              src={data.user?.image ?? ''}
              alt={data.user?.name ?? ''}
              width={50}
              height={50}
              className="rounded-full border border-primary"
            />

            <div className="flex flex-col">
              <span className="text-base font-bold">{data.user?.name}</span>
              <span className="text-muted-foreground text-xs">
                {data.user?.email}
              </span>
            </div>
          </div>

          <Button size={'icon'} variant={'ghost'} onClick={() => signOut()}>
            <span className="sr-only">Fazer logout</span>
            <LogOutIcon className="h-6 w-6" />
          </Button>
        </>
      ) : (
        <>
          <span className="font-bold">Olá! Faça seu login.</span>
          <Button size={'icon'} onClick={() => signIn()}>
            <span className="sr-only">Fazer login</span>
            <LogInIcon className="h-6 w-6" />
          </Button>
        </>
      )}
    </div>
  )
}

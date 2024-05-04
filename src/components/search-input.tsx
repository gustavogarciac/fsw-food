'use client'

import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface SearchInputProps {
  containerClasses?: string
  inputClasses?: string
}

export const SearchInput = ({
  containerClasses,
  inputClasses,
}: SearchInputProps) => {
  const [search, setSearch] = useState('')
  const router = useRouter()

  function handleSearchSubmit() {
    if (!search) {
      return
    }

    router.push(`/restaurants?name=${search}`)
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleSearchSubmit()
    }

    if (e.key === 'Escape') {
      setSearch('')
    }
  }

  return (
    <div className={cn('flex gap-2', containerClasses)}>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleInputKeyDown}
        placeholder="Buscar restaurantes"
        className={cn('border-none bg-white', inputClasses)}
      />

      <Button size="icon" className="size-10" onClick={handleSearchSubmit}>
        <SearchIcon className="size-4" />
      </Button>
    </div>
  )
}

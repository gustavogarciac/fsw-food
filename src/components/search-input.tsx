'use client'

import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const SearchInput = () => {
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
    <div className="flex gap-2">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleInputKeyDown}
        placeholder="Buscar restaurantes"
        className="border-none bg-white"
      />

      <Button size="icon" className="size-10" onClick={handleSearchSubmit}>
        <SearchIcon className="size-4" />
      </Button>
    </div>
  )
}

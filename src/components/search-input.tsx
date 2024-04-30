import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { SearchIcon } from 'lucide-react'

export const SearchInput = () => {
  return (
    <div className="flex gap-2">
      <Input placeholder="Buscar restaurantes" className="border-none" />
      <Button size="icon" className="size-10">
        <SearchIcon className="size-4" />
      </Button>
    </div>
  )
}

import { Product } from '@prisma/client'
import { create } from 'zustand'

interface CartStore {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (product: Product) => void
  removeAll: () => void
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (product: Product) => {
    const currentItems = get().items
    const existingItem = currentItems.find((item) => item.id === product.id)

    if (existingItem) {
      return
    }

    set({ items: [...currentItems, { ...product }] })
  },
  removeItem: (product: Product) => {
    set({ items: get().items.filter((item) => item.id !== product.id) })
  },
  removeAll: () => {
    set({ items: [] })
  },
}))

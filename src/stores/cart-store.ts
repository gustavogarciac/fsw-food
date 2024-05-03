import { Product } from '@prisma/client'
import { create } from 'zustand'

interface CartProduct extends Product {
  quantity: number
}

interface CartStore {
  items: CartProduct[]
  addItem: (product: CartProduct) => void
  removeItem: (product: CartProduct) => void
  removeAll: () => void
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (product: CartProduct) => {
    const currentItems = get().items
    const existingItem = currentItems.find((item) => item.id === product.id)

    if (existingItem) return

    set({ items: [...currentItems, { ...product }] })
  },
  removeItem: (product: CartProduct) => {
    set({ items: get().items.filter((item) => item.id !== product.id) })
  },
  removeAll: () => {
    set({ items: [] })
  },
}))

import { calculateProductTotalPrice } from '@/utils/get-product-total-price'
import { Prisma } from '@prisma/client'
import { create } from 'zustand'

export interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: true
    }
  }> {
  quantity: number
}

interface CartStore {
  items: CartProduct[]
  calculateSubTotalPrice: () => number
  calculateTotalPrice: () => number
  calculateTotalDiscount: () => number
  addItem: (product: CartProduct) => void
  removeItem: (product: CartProduct) => void
  removeAll: () => void
  sumItem: (product: CartProduct) => void
  decreaseItem: (product: CartProduct) => void
  open: boolean
  onOpen: () => void
  onClose: () => void
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  open: false,
  calculateSubTotalPrice: () => {
    const items = get().items

    if (items.length === 0) {
      return 0
    }

    const subTotal = items.reduce((acc, item) => {
      const itemPrice = Number(item.price) * item.quantity
      return acc + itemPrice
    }, 0)

    return subTotal
  },
  calculateTotalPrice: () => {
    const items = get().items

    if (items.length === 0) {
      return 0
    }

    const subTotal = items.reduce((acc, item) => {
      const itemPrice = calculateProductTotalPrice(item) * item.quantity
      return acc + itemPrice
    }, 0)

    return subTotal
  },
  calculateTotalDiscount: () => {
    const calculateTotalPrice = get().calculateTotalPrice()
    const calculateSubTotalPrice = get().calculateSubTotalPrice()

    return calculateSubTotalPrice - calculateTotalPrice
  },
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
  addItem: (product: CartProduct) => {
    const currentItems = get().items
    const existingItem = currentItems.find((item) => item.id === product.id)

    if (existingItem) return

    const hasDifferentRestaurantProduct = currentItems.some((item) => {
      return item.restaurantId !== product.restaurantId
    })

    if (hasDifferentRestaurantProduct) {
      set({ items: [product] })
      return
    }

    set({ items: [...currentItems, { ...product }] })
  },
  removeItem: (product: CartProduct) => {
    set({ items: get().items.filter((item) => item.id !== product.id) })
  },
  sumItem: (product: CartProduct) => {
    const currentItems = get().items

    currentItems.filter((item) => {
      if (item.id === product.id) {
        item.quantity += 1
        return item
      }

      return item
    })

    set({ items: [...currentItems] })
  },
  decreaseItem: (product: CartProduct) => {
    const currentItems = get().items

    if (product.quantity === 1) {
      return
    }

    currentItems.filter((item) => {
      if (item.id === product.id) {
        item.quantity -= 1
        return item
      }

      return item
    })

    set({ items: [...currentItems] })
  },
  removeAll: () => {
    set({ items: [] })
  },
}))

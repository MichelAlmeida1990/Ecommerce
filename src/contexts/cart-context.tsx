'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { logProductAdded, logCartUpdate } from '@/lib/console-utils'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  variant?: {
    name: string
    value: string
  }
}

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string, variant?: string) => void
  updateQuantity: (id: string, quantity: number, variant?: string) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (existingItem) => 
              existingItem.id === item.id && 
              existingItem.variant?.value === item.variant?.value
          )

          let updatedItems;
          if (existingItemIndex > -1) {
            // Update existing item quantity
            updatedItems = [...state.items]
            updatedItems[existingItemIndex].quantity += 1
          } else {
            // Add new item
            updatedItems = [...state.items, { ...item, quantity: 1 }]
          }

          // Log estilizado
          logProductAdded(item.name, item.price)
          
          // Log de atualização do carrinho
          const newTotal = updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0)
          const newItemCount = updatedItems.reduce((total, item) => total + item.quantity, 0)
          logCartUpdate('produto adicionado', newItemCount, newTotal)

          return { items: updatedItems }
        })
      },

      removeItem: (id, variant) => {
        set((state) => ({
          items: state.items.filter(
            (item) => 
              !(item.id === id && item.variant?.value === variant)
          )
        }))
      },

      updateQuantity: (id, quantity, variant) => {
        if (quantity <= 0) {
          get().removeItem(id, variant)
          return
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.variant?.value === variant
              ? { ...item, quantity }
              : item
          )
        }))
      },

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        const { items } = get()
        return items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },

      getItemCount: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
)

export const useCart = useCartStore

// CartProvider wrapper para compatibilidade
export function CartProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

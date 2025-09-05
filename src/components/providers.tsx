'use client'

import { CartProvider } from '@/contexts/cart-context'
import { ThemeProvider } from '@/contexts/theme-context'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </ThemeProvider>
  )
}



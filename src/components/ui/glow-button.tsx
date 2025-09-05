'use client'

import { forwardRef, ReactNode } from 'react'
import { useGlowEffect } from '@/hooks/use-glow-effect'
import { cn } from '@/lib/utils'

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
}

export const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ children, className, ...props }, ref) => {
    const glowRef = useGlowEffect<HTMLButtonElement>()

    return (
      <button
        ref={(node) => {
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
          if (glowRef.current !== node) {
            (glowRef as any).current = node
          }
        }}
        className={cn('button-glow', className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

GlowButton.displayName = 'GlowButton'

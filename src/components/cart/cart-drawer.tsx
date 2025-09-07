'use client'

import { useState, useEffect } from 'react'
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/hooks/use-cart'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCart()
  const [isClosing, setIsClosing] = useState(false)

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, 200)
  }

  const handleQuantityChange = (id: string, quantity: number, variant?: string) => {
    updateQuantity(id, quantity, variant)
  }

  const handleRemoveItem = (id: string, variant?: string) => {
    removeItem(id, variant)
  }

  const total = getTotal()
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-gradient-to-br from-blue-400/20 via-blue-500/25 to-blue-600/30 backdrop-blur-3xl border-l border-white/40 z-50 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Carrinho
                  </h2>
                  <p className="text-xs text-blue-100">
                    {itemCount} {itemCount === 1 ? 'item' : 'itens'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Fechar carrinho"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Seu carrinho está vazio
                  </h3>
                  <p className="text-blue-100 mb-6">
                    Adicione alguns produtos para começar
                  </p>
                  <button
                    onClick={handleClose}
                    className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-all duration-200 font-medium"
                  >
                    Continuar Comprando
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${item.variant?.value || 'default'}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex space-x-3 p-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/30"
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-white truncate text-sm">
                          {item.name}
                        </h3>
                        {item.variant && (
                          <p className="text-xs text-blue-200">
                            {item.variant.name}: {item.variant.value}
                          </p>
                        )}
                        <p className="text-sm font-semibold text-white">
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col items-end space-y-1">
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.variant?.value)}
                            className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                            aria-label="Diminuir quantidade"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.variant?.value)}
                            className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                            aria-label="Aumentar quantidade"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemoveItem(item.id, item.variant?.value)}
                          className="p-1 text-white/70 hover:text-red-300 transition-colors"
                          aria-label="Remover item"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/20 p-4 space-y-3">
                {/* Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-100">Subtotal:</span>
                    <span className="font-medium text-white">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-100">Frete:</span>
                    <span className="font-medium text-green-300">
                      {total >= 99 ? 'Grátis' : formatPrice(9.99)}
                    </span>
                  </div>
                  <div className="border-t border-white/20 pt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-white">Total:</span>
                      <span className="text-yellow-300">
                        {formatPrice(total >= 99 ? total : total + 9.99)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <Link
                    href="/checkout"
                    onClick={handleClose}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 group"
                  >
                    Finalizar Compra
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  <button
                    onClick={clearCart}
                    className="w-full bg-white/5 backdrop-blur-md text-white py-2 px-4 rounded-lg hover:bg-white/10 transition-all duration-200 font-medium"
                  >
                    Limpar Carrinho
                  </button>
                </div>

                {/* Continue Shopping */}
                <button
                  onClick={handleClose}
                  className="w-full text-center text-sm text-blue-100 hover:text-white transition-colors"
                >
                  Continuar Comprando
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}






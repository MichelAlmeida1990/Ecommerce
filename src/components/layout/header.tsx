'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Search, Menu, X, User, Heart, Package } from 'lucide-react'
import { SearchBar } from '@/components/ui/search-bar'
import { CartDrawer } from '@/components/cart/cart-drawer'
import { UserMenu } from '@/components/auth/user-menu'
import { AnimatedLogo } from '@/components/ui/animated-logo'
import { useCart } from '@/hooks/use-cart'
import { cn } from '@/lib/utils'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const session = null // Autenticação desabilitada
  const { items } = useCart()

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen)
  const toggleCart = () => setIsCartOpen(!isCartOpen)

  const navigation = [
    { name: 'Início', href: '/' },
    { name: 'Produtos', href: '/produtos' },
    { name: 'Categorias', href: '/categorias' },
    { name: 'Ofertas', href: '/ofertas' },
    { name: 'Sobre', href: '/sobre' },
    { name: 'Contato', href: '/contato' },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-md border-b border-white/20 shadow-lg shadow-black/10">
        <div className="container-responsive">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/25">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <AnimatedLogo text="Michel Store" className="text-2xl md:text-3xl" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-white/80 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Search */}
              <button
                onClick={toggleSearch}
                className="p-2 text-white/70 hover:text-white transition-colors"
                aria-label="Buscar"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Wishlist */}
              <Link
                href="/favoritos"
                className="p-2 text-white/70 hover:text-white transition-colors relative"
                aria-label="Lista de desejos"
              >
                <Heart className="h-5 w-5" />
              </Link>

              {/* Orders */}
              {session && (
                <Link
                  href="/pedidos"
                  className="p-2 text-white/70 hover:text-white transition-colors"
                  aria-label="Meus pedidos"
                >
                  <Package className="h-5 w-5" />
                </Link>
              )}

              {/* Cart */}
              <button
                onClick={toggleCart}
                className="p-2 text-white/70 hover:text-white transition-colors relative"
                aria-label="Carrinho"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </span>
                )}
              </button>

              {/* User Menu */}
              {session ? (
                <UserMenu user={session.user} />
              ) : (
                <Link
                  href="/login"
                  className="btn btn-primary btn-sm"
                >
                  <User className="h-4 w-4 mr-2" />
                  Entrar
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={toggleSearch}
                className="p-2 text-white/70 hover:text-white transition-colors"
                aria-label="Buscar"
              >
                <Search className="h-5 w-5" />
              </button>

              <button
                onClick={toggleCart}
                className="p-2 text-white/70 hover:text-white transition-colors relative"
                aria-label="Carrinho"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </span>
                )}
              </button>

              <button
                onClick={toggleMenu}
                className="p-2 text-white/70 hover:text-white transition-colors"
                aria-label="Menu"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="py-4 border-t border-border">
              <SearchBar onClose={() => setIsSearchOpen(false)} />
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <nav className="container-responsive py-4">
              <div className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-base font-medium text-white/70 hover:text-white transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Mobile User Actions */}
                <div className="pt-4 border-t border-border">
                  {session ? (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>Olá, {session.user.name}</span>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Link
                          href="/perfil"
                          className="text-sm text-white/70 hover:text-white transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Meu Perfil
                        </Link>
                        <Link
                          href="/pedidos"
                          className="text-sm text-white/70 hover:text-white transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Meus Pedidos
                        </Link>
                        <Link
                          href="/favoritos"
                          className="text-sm text-white/70 hover:text-white transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Favoritos
                        </Link>
                        <button
                          onClick={() => {
                            console.log('Sign out clicked')
                            setIsMenuOpen(false)
                          }}
                          className="text-sm text-white/70 hover:text-white transition-colors text-left"
                        >
                          Sair
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        href="/login"
                        className="btn btn-primary w-full"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Entrar
                      </Link>
                      <Link
                        href="/cadastro"
                        className="btn btn-outline w-full"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Criar Conta
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}



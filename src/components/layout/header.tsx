'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  User,
  Heart,
  Package,
} from 'lucide-react';
import { SearchBar } from '@/components/ui/search-bar';
import { CartDrawer } from '@/components/cart/cart-drawer';
import { UserMenu } from '@/components/auth/user-menu';
import { AnimatedLogo } from '@/components/ui/animated-logo';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/contexts/auth-context';
import { useGlowEffect } from '@/hooks/use-glow-effect';
import { GlowButton } from '@/components/ui/glow-button';
import { AdvancedHeart } from '@/components/ui/advanced-heart';
import { cn } from '@/lib/utils';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { items } = useCart();

  const cartItemsCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const navigation = [
    { name: 'Início', href: '/' },
    { name: 'Produtos', href: '/produtos' },
    { name: 'Categorias', href: '/categorias' },
    { name: 'Ofertas', href: '/ofertas' },
    { name: 'Sobre', href: '/sobre' },
    { name: 'Contato', href: '/contato' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-lg shadow-gray-200/20 dark:shadow-gray-900/20 transition-colors duration-300">
        <div className="container-responsive">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <AnimatedLogo
                  text="Michel Store"
                  className="text-2xl md:text-3xl"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="nav-glow relative text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group px-3 py-2 rounded-lg"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Search */}
              <GlowButton
                onClick={toggleSearch}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-300 group"
                aria-label="Buscar"
              >
                <Search className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              </GlowButton>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Wishlist */}
              <div className="button-glow rounded-lg">
                <AdvancedHeart />
              </div>

              {/* Orders */}
              {isAuthenticated && (
                <Link
                  href="/pedidos"
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-300 group"
                  aria-label="Meus pedidos"
                >
                  <Package className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                </Link>
              )}

              {/* Cart */}
              <GlowButton
                onClick={toggleCart}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all duration-300 group relative"
                aria-label="Carrinho"
              >
                <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold flex items-center justify-center shadow-lg">
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </span>
                )}
              </GlowButton>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Olá, {user?.name}
                  </span>
                  <button
                    onClick={logout}
                    className="inline-flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    Sair
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-105"
                >
                  <User className="h-4 w-4 mr-2" />
                  Entrar
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <GlowButton
                onClick={toggleSearch}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-300 group"
                aria-label="Buscar"
              >
                <Search className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              </GlowButton>

              <GlowButton
                onClick={toggleCart}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all duration-300 group relative"
                aria-label="Carrinho"
              >
                <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold flex items-center justify-center shadow-lg">
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </span>
                )}
              </GlowButton>

              <GlowButton
                onClick={toggleMenu}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all duration-300 group"
                aria-label="Menu"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                ) : (
                  <Menu className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                )}
              </GlowButton>
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
                {navigation.map(item => (
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
                  {isAuthenticated ? (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>Olá, {user?.name}</span>
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
                            logout();
                            setIsMenuOpen(false);
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
  );
}

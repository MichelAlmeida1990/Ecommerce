'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  User,
  Heart,
  Package,
  LogIn,
  LogOut,
  UserPlus,
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

  // Prevenir scroll do body quando menu mobile está aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Fechar menu com tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

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
      <header className="sticky top-0 z-[9998] w-full bg-gradient-to-r from-blue-100/90 via-blue-50/90 to-blue-100/90 dark:from-blue-900/90 dark:via-blue-800/90 dark:to-blue-900/90 backdrop-blur-xl border-b border-blue-200/50 dark:border-blue-700/50 shadow-lg shadow-blue-200/30 dark:shadow-blue-900/30 transition-all duration-500 overflow-hidden">
        {/* Efeito de brilho sutil */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-200/20 via-transparent to-blue-300/20"></div>
        <div className="container-responsive relative z-10">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <AnimatedLogo
                  text="Versiory Store"
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="nav-glow relative text-sm font-semibold text-blue-800 dark:text-blue-200 hover:text-blue-600 dark:hover:text-blue-300 transition-all duration-300 group px-3 py-2 rounded-lg hover:bg-blue-100/50 dark:hover:bg-blue-800/30"
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
                className="p-2 text-blue-700 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-200 hover:bg-blue-100/50 dark:hover:bg-blue-800/30 rounded-lg transition-all duration-300 group"
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
                  className="p-2 text-blue-700 dark:text-blue-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-100/50 dark:hover:bg-green-800/30 rounded-lg transition-all duration-300 group"
                  aria-label="Meus pedidos"
                >
                  <Package className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                </Link>
              )}

              {/* Cart */}
              <GlowButton
                onClick={toggleCart}
                className="p-2 text-blue-700 dark:text-blue-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-100/50 dark:hover:bg-orange-800/30 rounded-lg transition-all duration-300 group relative"
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
                  <span className="text-sm text-blue-800 dark:text-blue-200">
                    Olá, {user?.name}
                  </span>
                  <button
                    onClick={logout}
                    className="inline-flex items-center px-3 py-2 text-sm text-blue-700 dark:text-blue-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
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
            <div className="md:hidden flex items-center space-x-1 sm:space-x-2">
              <GlowButton
                onClick={toggleSearch}
                className="p-2 sm:p-3 text-blue-700 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-200 hover:bg-blue-100/50 dark:hover:bg-blue-800/30 rounded-lg transition-all duration-300 group min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Buscar"
              >
                <Search className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform duration-300" />
              </GlowButton>

              <GlowButton
                onClick={toggleCart}
                className="p-2 sm:p-3 text-blue-700 dark:text-blue-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-100/50 dark:hover:bg-orange-800/30 rounded-lg transition-all duration-300 group relative min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Carrinho"
              >
                <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform duration-300" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold flex items-center justify-center shadow-lg">
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </span>
                )}
              </GlowButton>

              <GlowButton
                onClick={toggleMenu}
                className="p-2 sm:p-3 text-blue-700 dark:text-blue-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-100/50 dark:hover:bg-purple-800/30 rounded-lg transition-all duration-300 group min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Menu"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform duration-300" />
                ) : (
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform duration-300" />
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

      </header>

      {/* Mobile Menu - New Simple Design */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[999999] bg-black/30 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="absolute top-0 right-0 w-80 h-full bg-black/20 backdrop-blur-md shadow-2xl border-l border-white/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/30 bg-black/10 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-white">Menu</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-6">
              <div className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-3 text-white hover:bg-white/20 rounded-lg transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>

            {/* User Section */}
            <div className="p-6 border-t border-white/30 bg-black/10 backdrop-blur-sm">
              {isAuthenticated ? (
                <div className="space-y-4">
                  {/* User Info */}
                  <div className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{user?.name}</p>
                      <p className="text-sm text-gray-200">Bem-vindo de volta!</p>
                    </div>
                  </div>

                  {/* User Actions */}
                  <div className="space-y-2">
                    <Link
                      href="/perfil"
                      className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/20 rounded-lg transition-colors font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-5 w-5" />
                      <span>Meu Perfil</span>
                    </Link>
                    <Link
                      href="/pedidos"
                      className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/20 rounded-lg transition-colors font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Package className="h-5 w-5" />
                      <span>Meus Pedidos</span>
                    </Link>
                    <Link
                      href="/favoritos"
                      className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/20 rounded-lg transition-colors font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Heart className="h-5 w-5" />
                      <span>Favoritos</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 text-red-300 hover:bg-red-500/20 rounded-lg transition-colors font-medium"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Sair</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    href="/login"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-blue-600/80 backdrop-blur-sm text-white rounded-lg hover:bg-blue-700/80 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn className="h-5 w-5" />
                    <span>Entrar</span>
                  </Link>
                  <Link
                    href="/cadastro"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-white/50 text-white rounded-lg hover:bg-white/20 transition-colors font-medium backdrop-blur-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserPlus className="h-5 w-5" />
                    <span>Criar Conta</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

    </>
  );
}

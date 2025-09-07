'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, Star, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useCart } from '@/hooks/use-cart';

// Produtos favoritos mockados
const favoriteProducts = [
  {
    id: 1,
    name: 'Smartphone Galaxy S24',
    price: 2999.90,
    originalPrice: 3499.90,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 124,
    category: 'Eletrônicos',
    inStock: true,
    badge: 'Novo'
  },
  {
    id: 2,
    name: 'Notebook Gamer RTX 4060',
    price: 4599.90,
    originalPrice: 5299.90,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 89,
    category: 'Eletrônicos',
    inStock: true,
    badge: 'Oferta'
  },
  {
    id: 3,
    name: 'Camiseta Premium',
    price: 89.90,
    originalPrice: 129.90,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 203,
    category: 'Moda',
    inStock: true,
    badge: 'Promoção'
  }
];

export default function FavoritosPage() {
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();
  const router = useRouter();
  const [favorites, setFavorites] = useState(favoriteProducts);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/favoritos');
    }
  }, [isAuthenticated, router]);

  const removeFromFavorites = (productId: number) => {
    setFavorites(favorites.filter(product => product.id !== productId));
  };

  const addToCart = (product: any) => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao início
          </Link>

          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Meus Favoritos
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Produtos que você salvou para comprar depois
              </p>
            </div>
          </div>
        </motion.div>

        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center"
          >
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Nenhum favorito ainda
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Adicione produtos aos seus favoritos clicando no coração em qualquer produto.
            </p>
            <Link
              href="/produtos"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Explorar Produtos
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {favorites.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 left-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      product.badge === 'Novo' ? 'bg-green-100 text-green-800' :
                      product.badge === 'Oferta' ? 'bg-red-100 text-red-800' :
                      product.badge === 'Promoção' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {product.badge}
                    </span>
                  </div>
                  <button
                    onClick={() => removeFromFavorites(product.id)}
                    className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
                  >
                    <Heart className="w-4 h-4 text-red-500 fill-current" />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      ({product.reviews})
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        R$ {product.price.toFixed(2).replace('.', ',')}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Adicionar
                    </button>
                    <button
                      onClick={() => removeFromFavorites(product.id)}
                      className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {favorites.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <Link
              href="/produtos"
              className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Continuar Comprando
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}

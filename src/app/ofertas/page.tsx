'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Star, ShoppingCart, Heart } from 'lucide-react'
import Link from 'next/link'

const ofertas = [
  {
    id: 1,
    name: 'Smartphone Galaxy Pro',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    price: 1299.99,
    originalPrice: 1599.99,
    discount: 19,
    rating: 4.8,
    reviews: 1247,
    badge: 'DESTAQUE',
    badgeColor: 'bg-red-500',
    tags: ['Tecnologia', 'Smartphone'],
    isOnSale: true,
  },
  {
    id: 2,
    name: 'Notebook Ultra Book',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
    price: 2499.99,
    originalPrice: 2999.99,
    discount: 17,
    rating: 4.9,
    reviews: 892,
    badge: 'OFERTA',
    badgeColor: 'bg-orange-500',
    tags: ['Tecnologia', 'Notebook'],
    isOnSale: true,
  },
  {
    id: 3,
    name: 'Fone Bluetooth Premium',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    price: 199.99,
    originalPrice: 299.99,
    discount: 33,
    rating: 4.7,
    reviews: 2156,
    badge: 'PROMOÇÃO',
    badgeColor: 'bg-green-500',
    tags: ['Áudio', 'Bluetooth'],
    isOnSale: true,
  },
  {
    id: 4,
    name: 'Tênis Esportivo Runner',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    price: 299.99,
    originalPrice: 399.99,
    discount: 25,
    rating: 4.6,
    reviews: 1834,
    badge: 'LIQUIDAÇÃO',
    badgeColor: 'bg-purple-500',
    tags: ['Esporte', 'Tênis'],
    isOnSale: true,
  },
  {
    id: 5,
    name: 'Smartwatch Fitness',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    price: 399.99,
    originalPrice: 499.99,
    discount: 20,
    rating: 4.8,
    reviews: 967,
    badge: 'DESTAQUE',
    badgeColor: 'bg-blue-500',
    tags: ['Tecnologia', 'Smartwatch'],
    isOnSale: true,
  },
  {
    id: 6,
    name: 'Câmera Digital Pro',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop',
    price: 899.99,
    originalPrice: 1199.99,
    discount: 25,
    rating: 4.9,
    reviews: 743,
    badge: 'OFERTA',
    badgeColor: 'bg-red-500',
    tags: ['Fotografia', 'Câmera'],
    isOnSale: true,
  },
]

export default function OfertasPage() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-black dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar
              </motion.button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Ofertas Especiais
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Aproveite nossas melhores promoções
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 rounded-2xl p-6 text-center"
          >
            <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">
              {ofertas.length}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">Ofertas Ativas</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 text-center"
          >
            <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
              Até 33%
            </h3>
            <p className="text-gray-700 dark:text-gray-300">Desconto Máximo</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 text-center"
          >
            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              4.8
            </h3>
            <p className="text-gray-700 dark:text-gray-300">Avaliação Média</p>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ofertas.map((oferta, index) => (
            <motion.div
              key={oferta.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 backdrop-blur-sm border border-orange-200 dark:border-orange-800 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={oferta.image}
                  alt={oferta.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`${oferta.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                    {oferta.badge}
                  </span>
                </div>
                
                {/* Discount */}
                <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full">
                  -{oferta.discount}%
                </div>
                
                {/* Actions */}
                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-black hover:bg-accent/80 transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {oferta.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-accent/20 text-accent text-xs font-semibold rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Product Name */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-accent transition-colors">
                  {oferta.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(oferta.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    {oferta.rating} ({oferta.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatPrice(oferta.price)}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(oferta.originalPrice)}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Adicionar ao Carrinho
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

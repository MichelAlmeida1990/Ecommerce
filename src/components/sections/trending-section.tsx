'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { TrendingUp, Star, Eye, ShoppingCart, Heart } from 'lucide-react'

const trendingProducts = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    category: 'Smartphones',
    price: 8999,
    originalPrice: 10999,
    rating: 4.9,
    reviews: 1247,
    image: '📱',
    badge: 'Mais Vendido',
    badgeColor: 'bg-red-500'
  },
  {
    id: 2,
    name: 'MacBook Air M2',
    category: 'Notebooks',
    price: 6999,
    originalPrice: 7999,
    rating: 4.8,
    reviews: 892,
    image: '💻',
    badge: 'Em Alta',
    badgeColor: 'bg-blue-500'
  },
  {
    id: 3,
    name: 'AirPods Pro 2',
    category: 'Acessórios',
    price: 1999,
    originalPrice: 2499,
    rating: 4.7,
    reviews: 2156,
    image: '🎧',
    badge: 'Oferta',
    badgeColor: 'bg-green-500'
  },
  {
    id: 4,
    name: 'Samsung Galaxy S24',
    category: 'Smartphones',
    price: 4999,
    originalPrice: 5999,
    rating: 4.6,
    reviews: 743,
    image: '📱',
    badge: 'Novidade',
    badgeColor: 'bg-purple-500'
  }
]

export function TrendingSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <div className="container-responsive">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full px-4 py-2 mb-4">
            <TrendingUp className="h-4 w-4 text-orange-400" />
            <span className="text-orange-400 font-semibold text-sm">PRODUTOS EM ALTA</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Os Mais Procurados
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Produtos que estão fazendo sucesso entre nossos clientes
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/10">
                {/* Badge */}
                <div className={`inline-block ${product.badgeColor} text-white text-xs font-semibold px-3 py-1 rounded-full mb-4`}>
                  {product.badge}
                </div>

                {/* Product Image */}
                <div className="text-6xl text-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {product.image}
                </div>

                {/* Category */}
                <p className="text-blue-400 text-sm font-medium mb-2">
                  {product.category}
                </p>

                {/* Product Name */}
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-white">
                    R$ {product.price.toLocaleString('pt-BR')}
                  </span>
                  <span className="text-gray-500 line-through text-sm">
                    R$ {product.originalPrice.toLocaleString('pt-BR')}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Comprar
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-all duration-300"
                  >
                    <Heart className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-all duration-300"
                  >
                    <Eye className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-orange-500/25"
          >
            Ver Todos os Produtos em Alta
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

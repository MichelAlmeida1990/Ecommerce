'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Percent, Truck, Gift, Clock, Tag, Zap } from 'lucide-react'
import Link from 'next/link'

const promos = [
  {
    icon: Percent,
    title: 'Até 70% OFF',
    description: 'Em produtos selecionados',
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20'
  },
  {
    icon: Truck,
    title: 'Frete Grátis',
    description: 'Para compras acima de R$ 199',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20'
  },
  {
    icon: Gift,
    title: 'Cashback 5%',
    description: 'Em todas as compras',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20'
  },
  {
    icon: Clock,
    title: 'Entrega Expressa',
    description: 'Em até 2 horas na sua cidade',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20'
  }
]

export function PromoSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="py-16 bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800">
      <div className="container-responsive">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full px-4 py-2 mb-4">
            <Zap className="h-4 w-4 text-yellow-400" />
            <span className="text-yellow-400 font-semibold text-sm">OFERTAS ESPECIAIS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
            Aproveite Nossas Promoções
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Ofertas imperdíveis que você não pode perder. Economize mais e aproveite melhor!
          </p>
        </motion.div>

        {/* Promos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {promos.map((promo, index) => (
            <motion.div
              key={promo.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className={`relative ${promo.bgColor} backdrop-blur-sm border ${promo.borderColor} rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 dark:from-pink-900/20 dark:via-purple-900/20 dark:to-blue-900/20`}>
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${promo.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <promo.icon className="h-8 w-8 text-blue-600 dark:text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                  {promo.title}
                </h3>

                {/* Description */}
                <p className="text-gray-800 dark:text-gray-300 text-sm">
                  {promo.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
          <Link href="/ofertas">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-yellow-500/25"
            >
              Ver Todas as Ofertas
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

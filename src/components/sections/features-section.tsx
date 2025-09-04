'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  CreditCard, 
  Truck, 
  Shield, 
  Headphones, 
  RotateCcw, 
  Gift,
  Zap,
  Heart
} from 'lucide-react'

const features = [
  {
    icon: CreditCard,
    title: 'Pagamento Seguro',
    description: 'Aceitamos todas as formas de pagamento com total segurança',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: Truck,
    title: 'Entrega Rápida',
    description: 'Entrega expressa em até 24h para todo o Brasil',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Shield,
    title: 'Garantia Estendida',
    description: 'Garantia de 1 ano em todos os produtos eletrônicos',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Headphones,
    title: 'Suporte 24/7',
    description: 'Atendimento especializado disponível 24 horas',
    color: 'from-orange-500 to-orange-600'
  },
  {
    icon: RotateCcw,
    title: 'Troca Fácil',
    description: 'Política de troca e devolução sem complicações',
    color: 'from-pink-500 to-pink-600'
  },
  {
    icon: Gift,
    title: 'Programa de Fidelidade',
    description: 'Acumule pontos e ganhe descontos exclusivos',
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    icon: Zap,
    title: 'Ofertas Relâmpago',
    description: 'Promoções exclusivas com preços imperdíveis',
    color: 'from-red-500 to-red-600'
  },
  {
    icon: Heart,
    title: 'Lista de Desejos',
    description: 'Salve seus produtos favoritos para comprar depois',
    color: 'from-rose-500 to-rose-600'
  }
]

export function FeaturesSection() {
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
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Nossos Diferenciais
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Recursos exclusivos que fazem a diferença na sua experiência de compra
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full hover:bg-white/10 transition-all duration-300 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/10">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed">
                  {feature.description}
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
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Pronto para uma experiência única?
            </h3>
            <p className="text-gray-300 mb-6">
              Descubra todos esses benefícios e muito mais
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
            >
              Explorar Agora
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

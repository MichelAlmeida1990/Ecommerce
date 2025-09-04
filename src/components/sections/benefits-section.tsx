'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Shield, 
  RotateCcw, 
  CreditCard, 
  Truck, 
  Headphones, 
  Award,
  Lock,
  CheckCircle
} from 'lucide-react'

const benefits = [
  {
    icon: Shield,
    title: 'Compra 100% Segura',
    description: 'Seus dados protegidos com criptografia SSL',
    highlight: 'SSL'
  },
  {
    icon: RotateCcw,
    title: 'Devolução em 30 Dias',
    description: 'Não gostou? Devolvemos seu dinheiro',
    highlight: '30 dias'
  },
  {
    icon: CreditCard,
    title: 'Parcelamento sem Juros',
    description: 'Até 12x no cartão de crédito',
    highlight: '12x'
  },
  {
    icon: Truck,
    title: 'Entrega em Todo Brasil',
    description: 'Enviamos para qualquer lugar do país',
    highlight: 'Brasil'
  },
  {
    icon: Headphones,
    title: 'Suporte Especializado',
    description: 'Atendimento via chat, telefone e email',
    highlight: '24/7'
  },
  {
    icon: Award,
    title: 'Produtos Originais',
    description: 'Garantia de autenticidade em todos os itens',
    highlight: 'Original'
  }
]

export function BenefitsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="py-20 bg-gray-800/50 backdrop-blur-sm">
      <div className="container-responsive">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Por que Comprar Conosco?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Garantias e benefícios que fazem a diferença na sua experiência de compra
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 h-full hover:bg-white/15 transition-all duration-300 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/10">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="h-7 w-7 text-white" />
                </div>

                {/* Highlight Badge */}
                <div className="inline-block bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full px-3 py-1 mb-4">
                  <span className="text-blue-300 font-semibold text-sm">
                    {benefit.highlight}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed">
                  {benefit.description}
                </p>

                {/* Check Icon */}
                <div className="mt-4 flex items-center text-green-400">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Garantido</span>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Lock className="h-6 w-6 text-green-400" />
              <span className="text-green-400 font-semibold text-lg">Site Seguro</span>
            </div>
            <p className="text-gray-300 mb-4">
              Certificado SSL e proteção de dados garantem sua segurança
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
              <span>🔒 SSL 256-bit</span>
              <span>🛡️ Proteção PCI</span>
              <span>✅ Certificado</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

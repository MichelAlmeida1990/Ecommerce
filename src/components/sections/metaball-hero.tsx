'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ShoppingBag, Star, Truck, Shield, Sparkles, Zap, Crown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const heroSlides = [
  {
    id: 1,
    title: 'Tecnologia de Última Geração',
    subtitle: 'Descubra os produtos mais inovadores do mercado',
    description: 'Smartphones, notebooks, fones de ouvido e muito mais com preços imperdíveis.',
    cta: 'Ver Produtos',
    href: '/categorias/eletronicos',
    badge: 'Novo',
    badgeColor: 'bg-[#ca00ca] text-white',
  },
  {
    id: 2,
    title: 'Moda que Faz Sentido',
    subtitle: 'Estilo e conforto em uma só coleção',
    description: 'Roupas e acessórios que combinam com seu estilo de vida.',
    cta: 'Explorar Moda',
    href: '/categorias/moda',
    badge: 'Promoção',
    badgeColor: 'bg-[#ccff00] text-black',
  },
  {
    id: 3,
    title: 'Casa dos Seus Sonhos',
    subtitle: 'Transforme seu lar com nossos produtos',
    description: 'Móveis, decoração e itens para casa que fazem a diferença.',
    cta: 'Decorar Casa',
    href: '/categorias/casa-jardim',
    badge: 'Mais Vendido',
    badgeColor: 'bg-[#031f5f] text-white',
  },
]

const features = [
  {
    icon: ShoppingBag,
    title: 'Produtos Exclusivos',
    description: 'Milhares de produtos únicos',
  },
  {
    icon: Star,
    title: 'Qualidade Garantida',
    description: 'Produtos testados e aprovados',
  },
  {
    icon: Truck,
    title: 'Entrega Rápida',
    description: 'Frete grátis em compras acima de R$ 99',
  },
  {
    icon: Shield,
    title: 'Compra Segura',
    description: 'Pagamento 100% seguro',
  },
]

export function MetaballHero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Auto-rotate slides
    const interval = setInterval(() => {
      if (!isAnimating) {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isAnimating])

  const handleSlideChange = (index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[hsl(var(--primary))] via-[hsl(var(--azure))] to-[hsl(var(--neon))] overflow-hidden">
      {/* Simple Wave Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Hero Content */}
          <div className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${heroSlides[currentSlide].badgeColor}`}
                >
                  {heroSlides[currentSlide].badge}
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl lg:text-7xl font-bold text-white leading-tight"
                >
                  {heroSlides[currentSlide].title}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl lg:text-2xl text-white/90 font-medium"
                >
                  {heroSlides[currentSlide].subtitle}
                </motion.p>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-lg text-white/80 leading-relaxed max-w-lg"
                >
                  {heroSlides[currentSlide].description}
                </motion.p>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link
                    href={heroSlides[currentSlide].href}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[hsl(var(--accent))] to-[hsl(var(--azure))] text-black font-semibold rounded-full text-lg hover:from-[hsl(var(--accent))] hover:to-[hsl(var(--pink))] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {heroSlides[currentSlide].cta}
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Slide Indicators */}
            <div className="flex space-x-3">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSlideChange(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-white scale-125'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Features Grid */}
          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[hsl(var(--accent))] to-[hsl(var(--pink))] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/80 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Simple Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </section>
  )
}


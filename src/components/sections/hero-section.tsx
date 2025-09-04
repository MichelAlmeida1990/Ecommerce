'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ShoppingBag, Star, Truck, Shield } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const heroSlides = [
  {
    id: 1,
    title: 'Tecnologia de Última Geração',
    subtitle: 'Descubra os produtos mais inovadores do mercado',
    description: 'Smartphones, notebooks, fones de ouvido e muito mais com preços imperdíveis.',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=600&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=600&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop',
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

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play slides
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] overflow-hidden">
      {/* Hero Slides */}
      <div className="relative h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="container-responsive">
                <div className="max-w-2xl">
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-4"
                  >
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${heroSlides[currentSlide].badgeColor}`}>
                      {heroSlides[currentSlide].badge}
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 leading-tight"
                  >
                    {heroSlides[currentSlide].title}
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl md:text-2xl font-medium text-azure mb-4"
                  >
                    {heroSlides[currentSlide].subtitle}
                  </motion.h2>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-lg text-muted-foreground mb-8 max-w-lg"
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
                      className="btn btn-accent btn-lg group hover-glow"
                    >
                      {heroSlides[currentSlide].cta}
                      <ShoppingBag className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm text-white hover:bg-background/40 transition-colors flex items-center justify-center z-10"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm text-white hover:bg-background/40 transition-colors flex items-center justify-center z-10"
          aria-label="Próximo slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-[#ccff00] scale-125'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Features Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-sm border-t border-border">
        <div className="container-responsive py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#031f5f]/10 text-[#031f5f] mb-3 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-white mb-1 text-sm md:text-base">
                  {feature.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

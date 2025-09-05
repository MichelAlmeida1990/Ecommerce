'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Maria Silva',
    role: 'Cliente Fiel',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face&auto=format&q=80',
    content: 'Excelente experiência de compra! Produtos de qualidade e entrega super rápida. Já é minha loja preferida para tecnologia.',
    rating: 5,
    product: 'Smartphone Galaxy Pro',
  },
  {
    id: 2,
    name: 'João Santos',
    role: 'Cliente Premium',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format&q=80',
    content: 'Atendimento excepcional e preços competitivos. O suporte ao cliente é realmente incrível. Recomendo para todos!',
    rating: 5,
    product: 'Notebook Ultra Book',
  },
  {
    id: 3,
    name: 'Ana Costa',
    role: 'Cliente Satisfeita',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face&auto=format&q=80',
    content: 'Comprei várias vezes e sempre fico impressionada com a qualidade. O processo de checkout é simples e seguro.',
    rating: 5,
    product: 'Fone Bluetooth Premium',
  },
  {
    id: 4,
    name: 'Carlos Oliveira',
    role: 'Cliente Recorrente',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face&auto=format&q=80',
    content: 'Melhor e-commerce que já usei! Interface intuitiva, produtos autênticos e frete grátis. Perfeito!',
    rating: 5,
    product: 'Tênis Esportivo Runner',
  },
  {
    id: 5,
    name: 'Fernanda Lima',
    role: 'Cliente Nova',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face&auto=format&q=80',
    content: 'Primeira compra e adorei! Produto chegou antes do prazo e em perfeitas condições. Voltarei a comprar!',
    rating: 5,
    product: 'Camiseta Básica Premium',
  },
  {
    id: 6,
    name: 'Roberto Alves',
    role: 'Cliente VIP',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face&auto=format&q=80',
    content: 'Serviço de primeira qualidade! Produtos originais, preços justos e entrega expressa. Super recomendo!',
    rating: 5,
    product: 'Smartwatch Pro Max',
  },
  {
    id: 7,
    name: 'Juliana Mendes',
    role: 'Cliente Satisfeita',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face&auto=format&q=80',
    content: 'Atendimento humanizado e produtos de excelente qualidade. A melhor experiência de compra online que já tive!',
    rating: 5,
    product: 'Tablet Ultra HD',
  },
  {
    id: 8,
    name: 'Pedro Henrique',
    role: 'Cliente Fiel',
    avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=200&h=200&fit=crop&crop=face&auto=format&q=80',
    content: 'Loja confiável e produtos autênticos. O suporte é excepcional e sempre resolvem qualquer dúvida rapidamente.',
    rating: 5,
    product: 'Câmera Digital 4K',
  },
]

export function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [imageLoading, setImageLoading] = useState<{ [key: number]: boolean }>({})
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const testimonialRef = useRef<HTMLDivElement>(null)
  const controlsRef = useRef<HTMLDivElement>(null)

  // Auto-play testimonials
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  useEffect(() => {
    // GSAP Animations
    const loadGSAP = async () => {
      try {
        const { gsap } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        
        gsap.registerPlugin(ScrollTrigger)

        const section = sectionRef.current
        const header = headerRef.current
        const testimonial = testimonialRef.current
        const controls = controlsRef.current
        
        if (section && header && testimonial && controls) {
          // Animação de entrada da seção
          gsap.fromTo(section, 
            { 
              opacity: 0, 
              y: 100,
              scale: 0.95
            },
            { 
              opacity: 1, 
              y: 0,
              scale: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              }
            }
          )

          // Animação do header
          gsap.fromTo(header, 
            { 
              opacity: 0, 
              y: 50,
              scale: 0.9
            },
            { 
              opacity: 1, 
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: header,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
              }
            }
          )

          // Animação do depoimento principal
          gsap.fromTo(testimonial, 
            { 
              opacity: 0, 
              y: 60,
              rotationY: -15
            },
            { 
              opacity: 1, 
              y: 0,
              rotationY: 0,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: testimonial,
                start: "top 70%",
                end: "bottom 30%",
                toggleActions: "play none none reverse"
              }
            }
          )

          // Animação dos controles
          gsap.fromTo(controls, 
            { 
              opacity: 0,
              scale: 0.8,
              y: 30
            },
            { 
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.7,
              ease: "elastic.out(1, 0.5)",
              scrollTrigger: {
                trigger: controls,
                start: "top 60%",
                end: "bottom 40%",
                toggleActions: "play none none reverse"
              }
            }
          )

          // Animação das estrelas
          gsap.fromTo(".testimonial-star", 
            { 
              scale: 0,
              rotation: -180
            },
            { 
              scale: 1,
              rotation: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: testimonial,
                start: "top 50%",
                end: "bottom 50%",
                toggleActions: "play none none reverse"
              }
            }
          )

          // Animação do avatar
          gsap.fromTo(".testimonial-avatar", 
            { 
              scale: 0,
              rotation: 360
            },
            { 
              scale: 1,
              rotation: 0,
              duration: 0.8,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: testimonial,
                start: "top 50%",
                end: "bottom 50%",
                toggleActions: "play none none reverse"
              }
            }
          )

          // Animação do texto do depoimento
          gsap.fromTo(".testimonial-content", 
            { 
              opacity: 0,
              x: -50
            },
            { 
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: testimonial,
                start: "top 50%",
                end: "bottom 50%",
                toggleActions: "play none none reverse"
              }
            }
          )
        }
      } catch (error) {
        console.log('GSAP not available, using Framer Motion instead')
      }
    }

    loadGSAP()
  }, [])

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-gray-900 dark:to-black">
      <div className="container-responsive">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Depoimentos reais de clientes satisfeitos que confiam em nossos produtos e serviços.
          </p>
        </motion.div>

        {/* Testimonial Display */}
        <div ref={testimonialRef} className="max-w-4xl mx-auto mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-500/30 dark:to-purple-500/30 backdrop-blur-sm border border-blue-300/50 dark:border-purple-300/50 rounded-2xl p-8 text-center relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 left-4 text-blue-400/30 dark:text-purple-400/30">
                <Quote className="w-8 h-8" />
              </div>

              {/* Rating */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="testimonial-star w-6 h-6 text-blue-400 dark:text-purple-400 fill-current mx-1"
                  />
                ))}
              </div>

              {/* Content */}
              <blockquote className="testimonial-content text-lg text-gray-900 dark:text-white mb-6 leading-relaxed">
                "{testimonials[currentTestimonial].content}"
              </blockquote>

              {/* Product */}
              <p className="testimonial-content text-sm text-blue-600 dark:text-purple-400 mb-6">
                Produto: {testimonials[currentTestimonial].product}
              </p>

              {/* Author */}
              <div className="flex items-center justify-center">
                <div className="relative mr-4">
                  {imageLoading[currentTestimonial] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full">
                      <Loader2 className="w-6 h-6 animate-spin text-accent" />
                    </div>
                  )}
                  <img
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    className="testimonial-avatar w-20 h-20 rounded-full border-4 border-accent/20 object-cover shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    loading="lazy"
                    onLoad={() => setImageLoading(prev => ({ ...prev, [currentTestimonial]: false }))}
                    onLoadStart={() => setImageLoading(prev => ({ ...prev, [currentTestimonial]: true }))}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonials[currentTestimonial].name)}&size=200&background=random&color=fff&bold=true`
                      setImageLoading(prev => ({ ...prev, [currentTestimonial]: false }))
                    }}
                  />
                  {/* Online Status Indicator */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-1">
                    {testimonials[currentTestimonial].role}
                  </p>
                  <div className="flex items-center text-xs text-blue-600 dark:text-purple-400">
                    <span className="w-2 h-2 bg-blue-500 dark:bg-purple-500 rounded-full mr-2"></span>
                    Cliente Verificado
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div ref={controlsRef} className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={prevTestimonial}
            className="w-12 h-12 bg-gradient-to-br from-gray-200 to-blue-200 dark:from-white/15 dark:to-white/5 backdrop-blur-sm border border-gray-400 dark:border-white/20 rounded-full flex items-center justify-center text-gray-900 dark:text-white hover:bg-accent hover:text-black transition-all duration-300 hover:scale-110"
            aria-label="Depoimento anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Avatar Navigation */}
          <div className="flex gap-3 mx-4">
            {testimonials.map((testimonial, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`relative transition-all duration-300 ${
                  index === currentTestimonial
                    ? 'scale-110'
                    : 'hover:scale-105'
                }`}
                aria-label={`Ir para depoimento de ${testimonial.name}`}
              >
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className={`w-12 h-12 rounded-full border-2 object-cover transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'border-accent shadow-lg'
                      : 'border-gray-300 dark:border-gray-600 hover:border-accent/50'
                  }`}
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&size=200&background=random&color=fff&bold=true`
                  }}
                />
                {/* Active indicator */}
                {index === currentTestimonial && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="w-12 h-12 bg-gradient-to-br from-gray-200 to-blue-200 dark:from-white/15 dark:to-white/5 backdrop-blur-sm border border-gray-400 dark:border-white/20 rounded-full flex items-center justify-center text-gray-900 dark:text-white hover:bg-accent hover:text-black transition-all duration-300 hover:scale-110"
            aria-label="Próximo depoimento"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Auto-play Status */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {isAutoPlaying ? 'Reproduzindo automaticamente' : 'Pausado'}
          </p>
        </div>
      </div>
    </section>
  )
}


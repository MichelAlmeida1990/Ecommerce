'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const categories = [
  {
    id: 1,
    name: 'Eletrônicos',
    slug: 'eletronicos',
    description: 'Tecnologia de última geração',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
    color: 'from-primary to-azure',
    icon: '📱',
  },
  {
    id: 2,
    name: 'Moda',
    slug: 'moda',
    description: 'Estilo e conforto',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
    color: 'from-neon to-pink-500',
    icon: '👗',
  },
  {
    id: 3,
    name: 'Casa e Jardim',
    slug: 'casa-jardim',
    description: 'Transforme seu lar',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    color: 'from-brown to-yellow-500',
    icon: '🏠',
  },
  {
    id: 4,
    name: 'Esportes',
    slug: 'esportes',
    description: 'Performance e qualidade',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    color: 'from-accent to-green-500',
    icon: '⚽',
  },
]

export function CategoriesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const categoriesRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP Animations - Otimizado para performance
    const loadGSAP = async () => {
      try {
        const { gsap } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        
        gsap.registerPlugin(ScrollTrigger)

        const section = sectionRef.current
        const categories = categoriesRef.current
        const header = headerRef.current
        
        if (section && categories && header) {
          // Animação de entrada da seção (simplificada)
          gsap.fromTo(section, 
            { 
              opacity: 0, 
              y: 50
            },
            { 
              opacity: 1, 
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              }
            }
          )

          // Animação do header (simplificada)
          gsap.fromTo(header, 
            { 
              opacity: 0, 
              y: 30
            },
            { 
              opacity: 1, 
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: header,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
              }
            }
          )

          // Animação das categorias (simplificada)
          gsap.fromTo(".category-card", 
            { 
              opacity: 0, 
              y: 40
            },
            { 
              opacity: 1, 
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: categories,
                start: "top 70%",
                end: "bottom 30%",
                toggleActions: "play none none reverse"
              }
            }
          )

          // Animação dos ícones (simplificada)
          gsap.fromTo(".category-icon", 
            { 
              scale: 0.8
            },
            { 
              scale: 1,
              duration: 0.4,
              stagger: 0.05,
              ease: "power2.out",
              scrollTrigger: {
                trigger: categories,
                start: "top 60%",
                end: "bottom 40%",
                toggleActions: "play none none reverse"
              }
            }
          )

          // Animação do botão "Ver Todas" (simplificada)
          gsap.fromTo(".view-all-btn", 
            { 
              opacity: 0,
              y: 20
            },
            { 
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 40%",
                end: "bottom 60%",
                toggleActions: "play none none reverse"
              }
            }
          )
        }
      } catch (error) {
        console.log('GSAP not available, using Framer Motion instead')
      }
    }

    // Carregar GSAP com delay para não bloquear o carregamento
    const timer = setTimeout(loadGSAP, 200)
    
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
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
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Explore Nossas Categorias
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Descubra produtos incríveis organizados por categoria. 
            Encontre exatamente o que você procura com facilidade.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div ref={categoriesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className="category-card group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/categorias/${category.slug}`}>
                <div className="relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-blue-400 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25">
                  {/* Background Image */}
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/5" />
                    
                    {/* Icon */}
                    <div className="category-icon absolute top-4 left-4 text-4xl drop-shadow-lg">
                      {category.icon}
                    </div>
                    
                    {/* Gradient Border */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                  </div>

                  {/* Content */}
                  <div className="p-6 bg-black/30 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors drop-shadow-sm">
                      {category.name}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      {category.description}
                    </p>
                    
                    {/* CTA */}
                    <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                      <span className="text-sm font-semibold">Explorar</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-blue-400/10 to-blue-500/10 rounded-xl blur-sm opacity-30 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Categories */}
        <motion.div
          className="view-all-btn text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href="/categorias"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-accent to-azure text-black font-semibold rounded-full text-lg hover:from-accent/90 hover:to-azure/90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Ver Todas as Categorias
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}


'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FeaturedProducts } from '@/components/sections/featured-products'
import { Dumbbell, Shirt, Shoe, Trophy, Target, Zap } from 'lucide-react'

const categoryFeatures = [
  {
    icon: Dumbbell,
    title: 'Musculação',
    description: 'Força e resistência'
  },
  {
    icon: Shirt,
    title: 'Roupas Esportivas',
    description: 'Conforto e performance'
  },
  {
    icon: Shoe,
    title: 'Tênis Esportivos',
    description: 'Estabilidade total'
  },
  {
    icon: Trophy,
    title: 'Competição',
    description: 'Alcance seus objetivos'
  },
  {
    icon: Target,
    title: 'Precisão',
    description: 'Foco e determinação'
  },
  {
    icon: Zap,
    title: 'Energia',
    description: 'Potencial máximo'
  }
]

export default function EsportesPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const productsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP Animations
    const loadGSAP = async () => {
      try {
        const { gsap } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        
        gsap.registerPlugin(ScrollTrigger)

        const page = pageRef.current
        const hero = heroRef.current
        const features = featuresRef.current
        const products = productsRef.current
        
        if (page && hero && features && products) {
          // Animação de entrada da página
          gsap.fromTo(page, 
            { 
              opacity: 0, 
              y: 50
            },
            { 
              opacity: 1, 
              y: 0,
              duration: 1,
              ease: "power3.out"
            }
          )

          // Animação do hero
          gsap.fromTo(hero, 
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
                trigger: hero,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              }
            }
          )

          // Animação dos ícones do hero
          gsap.fromTo(".hero-icon", 
            { 
              scale: 0,
              rotation: -180
            },
            { 
              scale: 1,
              rotation: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: hero,
                start: "top 70%",
                end: "bottom 30%",
                toggleActions: "play none none reverse"
              }
            }
          )

          // Animação dos textos do hero
          gsap.fromTo(".hero-text", 
            { 
              opacity: 0,
              y: 30
            },
            { 
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: hero,
                start: "top 60%",
                end: "bottom 40%",
                toggleActions: "play none none reverse"
              }
            }
          )

          // Animação das features
          gsap.fromTo(".category-feature", 
            { 
              opacity: 0, 
              y: 60,
              scale: 0.8
            },
            { 
              opacity: 1, 
              y: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: features,
                start: "top 70%",
                end: "bottom 30%",
                toggleActions: "play none none reverse"
              }
            }
          )

          // Animação da seção de produtos
          gsap.fromTo(products, 
            { 
              opacity: 0, 
              y: 80,
              scale: 0.95
            },
            { 
              opacity: 1, 
              y: 0,
              scale: 1,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: products,
                start: "top 70%",
                end: "bottom 30%",
                toggleActions: "play none none reverse"
              }
            }
          )

          // Hover animations para as features
          const featureCards = document.querySelectorAll('.category-feature')
          featureCards.forEach((card) => {
            card.addEventListener('mouseenter', () => {
              gsap.to(card, {
                y: -10,
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
              })
            })
            
            card.addEventListener('mouseleave', () => {
              gsap.to(card, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
              })
            })
          })
        }
      } catch (error) {
        console.log('GSAP not available, using Framer Motion instead')
      }
    }

    loadGSAP()
  }, [])

  return (
    <div ref={pageRef} className="min-h-screen bg-surface">
      <div className="pt-20">
        {/* Hero da Categoria */}
        <div ref={heroRef} className="bg-gradient-to-r from-[hsl(var(--brown))] via-[hsl(var(--accent))] to-[hsl(var(--pink))] py-20 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
          </div>

          <div className="container-responsive text-center relative z-10">
            <motion.div
              className="hero-icon text-6xl mb-6 inline-block"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              ⚽
            </motion.div>
            
            <motion.h1
              className="hero-text text-5xl lg:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Esportes
            </motion.h1>
            
            <motion.p
              className="hero-text text-xl text-white/90 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Performance e qualidade para todos os esportes. Equipamentos, 
              roupas esportivas e acessórios para maximizar seu potencial.
            </motion.p>

            {/* Features Grid */}
            <div ref={featuresRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
              {categoryFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="category-feature bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-accent to-azure rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-white/70">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Produtos da Categoria */}
        <div ref={productsRef} className="py-20">
          <div className="container-responsive">
            <motion.h2
              className="text-3xl font-bold text-white mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Produtos em Destaque
            </motion.h2>
            <FeaturedProducts />
          </div>
        </div>
      </div>
    </div>
  )
}

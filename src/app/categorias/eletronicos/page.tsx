'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FeaturedProducts, categoryProducts } from '@/components/sections/featured-products'
import { Smartphone, Laptop, Headphones, Tablet, Watch, Camera } from 'lucide-react'

const categoryFeatures = [
  {
    icon: Smartphone,
    title: 'Smartphones',
    description: 'Os melhores modelos do mercado'
  },
  {
    icon: Laptop,
    title: 'Notebooks',
    description: 'Performance e portabilidade'
  },
  {
    icon: Headphones,
    title: 'Fones de Ouvido',
    description: 'Qualidade de áudio premium'
  },
  {
    icon: Tablet,
    title: 'Tablets',
    description: 'Versatilidade e produtividade'
  },
  {
    icon: Watch,
    title: 'Smartwatches',
    description: 'Tecnologia no seu pulso'
  },
  {
    icon: Camera,
    title: 'Câmeras',
    description: 'Capture momentos especiais'
  }
]

export default function EletronicosPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const productsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP Animations - Otimizado para performance
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
              duration: 0.8,
              ease: "power2.out"
            }
          )

          // Animação do hero
          gsap.fromTo(hero, 
            { 
              opacity: 0, 
              y: 60,
              scale: 0.95
            },
            { 
              opacity: 1, 
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: hero,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              }
            }
          )

          // Animação das features
          gsap.fromTo(".category-feature", 
            { 
              opacity: 0, 
              y: 40,
              scale: 0.9
            },
            { 
              opacity: 1, 
              y: 0,
              scale: 1,
              duration: 0.6,
              stagger: 0.08,
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
              y: 50,
              scale: 0.95
            },
            { 
              opacity: 1, 
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: products,
                start: "top 70%",
                end: "bottom 30%",
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
    <div ref={pageRef} className="min-h-screen bg-surface">
      <div className="pt-20">
        {/* Hero da Categoria */}
        <div ref={heroRef} className="bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--azure))] to-[hsl(var(--neon))] py-20 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div 
              className="absolute inset-0" 
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat'
              }}
            />
          </div>

          <div className="container-responsive text-center relative z-10">
            <motion.div
              className="hero-icon text-6xl mb-6 inline-block"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              📱
            </motion.div>
            
            <motion.h1
              className="hero-text text-5xl lg:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Eletrônicos
            </motion.h1>
            
            <motion.p
              className="hero-text text-xl text-white/90 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Tecnologia de última geração com os melhores preços do mercado. 
              Smartphones, notebooks, fones de ouvido e muito mais!
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
            <FeaturedProducts 
              products={categoryProducts.eletronicos}
              title="Eletrônicos em Destaque"
              description="Tecnologia de última geração com os melhores preços do mercado. Smartphones, notebooks, fones de ouvido e muito mais!"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

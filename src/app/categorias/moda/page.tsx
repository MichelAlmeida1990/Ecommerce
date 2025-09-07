'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FeaturedProducts, categoryProducts } from '@/components/sections/featured-products'
import { Shirt, Watch, ShoppingBag, Glasses, Heart } from 'lucide-react'

const categoryFeatures = [
  {
    icon: Shirt,
    title: 'Camisetas',
    description: 'Estilo casual e confortável'
  },
  {
    icon: ShoppingBag,
    title: 'Bolsas',
    description: 'Acessórios indispensáveis'
  },
  {
    icon: Watch,
    title: 'Relógios',
    description: 'Ponto final no look'
  },
  {
    icon: Glasses,
    title: 'Óculos',
    description: 'Proteção e estilo'
  },
  {
    icon: Heart,
    title: 'Lenços',
    description: 'Toque de personalidade'
  }
]

export default function ModaPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const productsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animação simplificada - apenas Framer Motion
    // Removido GSAP para melhorar performance
  }, [])

  return (
    <div ref={pageRef} className="min-h-screen bg-surface">
      <div className="pt-20">
        {/* Hero da Categoria */}
        <div ref={heroRef} className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 py-20 relative overflow-hidden">
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
              👗
            </motion.div>
            
            <motion.h1
              className="hero-text text-5xl lg:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Moda
            </motion.h1>
            
            <motion.p
              className="hero-text text-xl text-white/90 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Estilo e conforto em uma só coleção. Roupas e acessórios que 
              combinam com seu estilo de vida e personalidade.
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
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-white" />
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
              products={categoryProducts.moda}
              title="Produtos de Moda em Destaque"
              description="Descubra as últimas tendências em moda com roupas, acessórios e calçados de alta qualidade. Estilo e conforto em uma só coleção."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

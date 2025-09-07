'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FeaturedProducts, categoryProducts } from '@/components/sections/featured-products'
import { Home, Sofa, Lamp, Utensils, Paintbrush, TreePine } from 'lucide-react'

const categoryFeatures = [
  {
    icon: Home,
    title: 'Móveis',
    description: 'Conforto e estilo'
  },
  {
    icon: Sofa,
    title: 'Sofás',
    description: 'Relaxamento garantido'
  },
  {
    icon: Lamp,
    title: 'Iluminação',
    description: 'Ambiente acolhedor'
  },
  {
    icon: TreePine,
    title: 'Plantas',
    description: 'Vida e frescor'
  },
  {
    icon: Utensils,
    title: 'Cozinha',
    description: 'Funcionalidade total'
  },
  {
    icon: Paintbrush,
    title: 'Decoração',
    description: 'Toque pessoal'
  }
]

export default function CasaJardimPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const productsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animação simplificada - apenas Framer Motion
    // Removido GSAP para melhorar performance
  }, [])

  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="pt-20">
        {/* Hero da Categoria */}
        <div ref={heroRef} className="bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 py-20 relative overflow-hidden">
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
              🏠
            </motion.div>

            <motion.h1
              className="hero-text text-5xl lg:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Casa e Jardim
            </motion.h1>

            <motion.p
              className="hero-text text-xl text-white/90 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Transforme seu lar com nossos produtos. Móveis, decoração e itens
              para casa que fazem a diferença no seu dia a dia.
            </motion.p>

            {/* Features Grid */}
            <div ref={featuresRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 mt-8 sm:mt-12">
              {categoryFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="category-feature bg-white/20 backdrop-blur-md rounded-xl p-3 sm:p-4 text-center border border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300 group cursor-pointer shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-white/70 leading-tight">
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
              className="text-3xl font-bold text-slate-800 mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Produtos em Destaque
            </motion.h2>
            <FeaturedProducts
              products={categoryProducts['casa-jardim']}
              title="Produtos para Casa e Jardim"
              description="Transforme seu lar com nossos produtos. Móveis, decoração e itens para casa que fazem a diferença no seu dia a dia."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

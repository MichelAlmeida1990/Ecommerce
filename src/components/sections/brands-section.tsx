'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { brandInteractions } from '@/components/ui/brand-interactions'

const brands = [
  { 
    name: 'Samsung', 
    logo: '📱',
    category: 'Tecnologia',
    description: 'Smartphones e eletrônicos',
    color: 'from-blue-500 to-purple-600'
  },
  { 
    name: 'Apple', 
    logo: '🍎',
    category: 'Tecnologia',
    description: 'Dispositivos premium',
    color: 'from-gray-600 to-gray-800'
  },
  { 
    name: 'Nike', 
    logo: '👟',
    category: 'Esportes',
    description: 'Calçados esportivos',
    color: 'from-orange-500 to-red-600'
  },
  { 
    name: 'Adidas', 
    logo: '🏃',
    category: 'Esportes',
    description: 'Equipamentos esportivos',
    color: 'from-blue-600 to-black'
  },
  { 
    name: 'Sony', 
    logo: '🎮',
    category: 'Entretenimento',
    description: 'Gaming e áudio',
    color: 'from-purple-500 to-pink-600'
  },
  { 
    name: 'LG', 
    logo: '📺',
    category: 'Eletrodomésticos',
    description: 'TVs e eletrônicos',
    color: 'from-red-500 to-pink-500'
  },
  { 
    name: 'Canon', 
    logo: '📷',
    category: 'Fotografia',
    description: 'Câmeras profissionais',
    color: 'from-gray-700 to-gray-900'
  },
  { 
    name: 'Dell', 
    logo: '💻',
    category: 'Tecnologia',
    description: 'Computadores e laptops',
    color: 'from-blue-600 to-blue-800'
  }
]

export function BrandsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="py-16 bg-white/50 backdrop-blur-sm dark:bg-black/50">
      <div className="container-responsive">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
            Marcas Parceiras
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Trabalhamos com as melhores marcas do mercado
          </p>
        </motion.div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {brands.map((brand, index) => {
            const InteractionComponent = brandInteractions[brand.name as keyof typeof brandInteractions]
            
            return (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="group cursor-pointer"
              >
                <div className={`bg-gradient-to-br ${brand.color} backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 relative overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Logo Container */}
                  <div className="relative mb-3 flex justify-center">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                      <InteractionComponent />
                    </div>
                  </div>
                  
                  {/* Brand Name */}
                  <h3 className="text-sm font-bold text-white group-hover:text-yellow-200 transition-colors relative z-10">
                    {brand.name}
                  </h3>
                  
                  {/* Category Badge */}
                  <div className="mt-2 px-2 py-1 bg-white/20 rounded-full">
                    <span className="text-xs text-white/90 font-medium">
                      {brand.category}
                    </span>
                  </div>
                  
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            E muitas outras marcas de qualidade garantida
          </p>
        </motion.div>
      </div>
    </section>
  )
}

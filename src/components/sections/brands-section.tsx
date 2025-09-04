'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const brands = [
  { name: 'Samsung', logo: '📱' },
  { name: 'Apple', logo: '🍎' },
  { name: 'Nike', logo: '👟' },
  { name: 'Adidas', logo: '🏃' },
  { name: 'Sony', logo: '🎮' },
  { name: 'LG', logo: '📺' },
  { name: 'Canon', logo: '📷' },
  { name: 'Dell', logo: '💻' }
]

export function BrandsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="py-16 bg-black/50 backdrop-blur-sm">
      <div className="container-responsive">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
            Marcas Parceiras
          </h2>
          <p className="text-gray-300">
            Trabalhamos com as melhores marcas do mercado
          </p>
        </motion.div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/10">
                {/* Logo */}
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {brand.logo}
                </div>
                
                {/* Brand Name */}
                <h3 className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors">
                  {brand.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 text-sm">
            E muitas outras marcas de qualidade garantida
          </p>
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingCart, Star, ArrowRight } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { formatPrice, calculateDiscount } from '@/lib/utils'

const featuredProducts = [
  {
    id: '1',
    name: 'Smartphone Galaxy Pro',
    slug: 'smartphone-galaxy-pro',
    price: 2999.99,
    comparePrice: 3499.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 127,
    isNew: true,
    isOnSale: true,
    tags: ['Novo', 'Promoção', 'Mais Vendido'],
  },
  {
    id: '2',
    name: 'Notebook Ultra Book',
    slug: 'notebook-ultra-book',
    price: 4599.99,
    comparePrice: 5299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 89,
    isNew: false,
    isOnSale: true,
    tags: ['Promoção', 'Mais Vendido'],
  },
  {
    id: '3',
    name: 'Camiseta Básica Premium',
    slug: 'camiseta-basica-premium',
    price: 89.99,
    comparePrice: 119.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 203,
    isNew: false,
    isOnSale: true,
    tags: ['Promoção', 'Frete Grátis'],
  },
  {
    id: '4',
    name: 'Tênis Esportivo Runner',
    slug: 'tenis-esportivo-runner',
    price: 299.99,
    comparePrice: 399.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    rating: 4.5,
    reviewCount: 156,
    isNew: false,
    isOnSale: true,
    tags: ['Promoção', 'Mais Vendido'],
  },
  {
    id: '5',
    name: 'Fone Bluetooth Premium',
    slug: 'fone-bluetooth-premium',
    price: 599.99,
    comparePrice: 799.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    rating: 4.9,
    reviewCount: 312,
    isNew: true,
    isOnSale: true,
    tags: ['Novo', 'Promoção'],
  },
  {
    id: '6',
    name: 'Smart Watch Pro',
    slug: 'smart-watch-pro',
    price: 899.99,
    comparePrice: 1099.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 98,
    isNew: true,
    isOnSale: false,
    tags: ['Novo'],
  },
  {
    id: '7',
    name: 'Câmera DSLR Profissional',
    slug: 'camera-dslr-profissional',
    price: 3499.99,
    comparePrice: 4299.99,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 67,
    isNew: false,
    isOnSale: true,
    tags: ['Promoção', 'Mais Vendido'],
  },
  {
    id: '8',
    name: 'Tablet Ultra HD',
    slug: 'tablet-ultra-hd',
    price: 1299.99,
    comparePrice: 1599.99,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 143,
    isNew: false,
    isOnSale: true,
    tags: ['Promoção'],
  },
]

export function FeaturedProducts() {
  const { addItem } = useCart()
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const productsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP Animations - Otimizado para performance
    const loadGSAP = async () => {
      try {
        const { gsap } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        
        gsap.registerPlugin(ScrollTrigger)

        const section = sectionRef.current
        const products = productsRef.current
        
        if (section && products) {
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

          // Animação dos produtos (simplificada)
          gsap.fromTo(".product-card", 
            { 
              opacity: 0, 
              y: 30
            },
            { 
              opacity: 1, 
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: products,
                start: "top 70%",
                end: "bottom 30%",
                toggleActions: "play none none reverse"
              }
            }
          )

          // Animação dos preços (simplificada)
          gsap.fromTo(".product-price", 
            { 
              opacity: 0,
              scale: 0.9
            },
            { 
              opacity: 1,
              scale: 1,
              duration: 0.4,
              stagger: 0.03,
              ease: "power2.out",
              scrollTrigger: {
                trigger: products,
                start: "top 60%",
                end: "bottom 40%",
                toggleActions: "play none none reverse"
              }
            }
          )

          // Animação das tags (simplificada)
          gsap.fromTo(".product-tag", 
            { 
              opacity: 0,
              x: -15
            },
            { 
              opacity: 1,
              x: 0,
              duration: 0.4,
              stagger: 0.02,
              ease: "power2.out",
              scrollTrigger: {
                trigger: products,
                start: "top 50%",
                end: "bottom 50%",
                toggleActions: "play none none reverse"
              }
            }
          )
        }
      } catch (error) {
        console.log('GSAP not available, using Framer Motion instead')
        setIsVisible(true)
      }
    }

    // Carregar GSAP com delay para não bloquear o carregamento
    const timer = setTimeout(loadGSAP, 300)
    
    return () => {
      clearTimeout(timer)
    }
  }, [])

  const handleAddToCart = (product: typeof featuredProducts[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  const handleAddToWishlist = (productId: string) => {
    // Implementar lógica de wishlist
    console.log('Added to wishlist:', productId)
  }

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800">
      <div className="container-responsive">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Produtos em Destaque
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubra nossos produtos mais populares com preços imperdíveis. 
            Qualidade garantida e entrega rápida em todo o Brasil.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div ref={productsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="product-card group bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              onHoverStart={() => setHoveredProduct(product.id)}
              onHoverEnd={() => setHoveredProduct(null)}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Tags */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  {product.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="product-tag px-2 py-1 bg-accent text-black text-xs font-semibold rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                  <button
                    onClick={() => handleAddToWishlist(product.id)}
                    className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-black hover:bg-accent/80 transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>

                {/* Discount Badge */}
                {product.isOnSale && (
                  <div className="absolute bottom-3 left-3 bg-destructive text-white px-2 py-1 rounded-full text-xs font-semibold">
                    -{calculateDiscount(product.comparePrice, product.price)}%
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                {/* Product Name */}
                <h3 className="font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviewCount})
                  </span>
                </div>

                {/* Price */}
                <div className="product-price flex items-center gap-2 mb-4">
                  <span className="text-xl font-bold text-white">
                    {formatPrice(product.price)}
                  </span>
                  {product.isOnSale && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(product.comparePrice)}
                    </span>
                  )}
                </div>

                {/* View Details Button */}
                <Link
                  href={`/produtos/${product.slug}`}
                  className="w-full bg-primary hover:bg-primary/80 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors group/btn"
                >
                  Ver Detalhes
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Products Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/produtos"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-accent to-azure text-black font-semibold rounded-full text-lg hover:from-accent/90 hover:to-azure/90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Ver Todos os Produtos
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}


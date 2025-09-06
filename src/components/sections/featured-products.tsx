'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingCart, Star, ArrowRight } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { useAuth } from '@/contexts/auth-context'
import { formatPrice, calculateDiscount } from '@/lib/utils'

// Produtos padrão (para a página inicial)
const defaultProducts = [
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

// Produtos específicos por categoria
export const categoryProducts = {
  moda: [
    {
      id: 'm1',
      name: 'Vestido Elegante Floral',
      slug: 'vestido-elegante-floral',
      price: 189.99,
      comparePrice: 249.99,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop',
      rating: 4.8,
      reviewCount: 156,
      isNew: true,
      isOnSale: true,
      tags: ['Novo', 'Promoção', 'Mais Vendido'],
    },
    {
      id: 'm2',
      name: 'Blusa de Seda Premium',
      slug: 'blusa-seda-premium',
      price: 129.99,
      comparePrice: 179.99,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
      rating: 4.7,
      reviewCount: 89,
      isNew: false,
      isOnSale: true,
      tags: ['Promoção', 'Frete Grátis'],
    },
    {
      id: 'm3',
      name: 'Calça Jeans Skinny',
      slug: 'calca-jeans-skinny',
      price: 99.99,
      comparePrice: 139.99,
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop',
      rating: 4.6,
      reviewCount: 203,
      isNew: false,
      isOnSale: true,
      tags: ['Promoção', 'Mais Vendido'],
    },
    {
      id: 'm4',
      name: 'Bolsa de Couro Legítimo',
      slug: 'bolsa-couro-legitimo',
      price: 299.99,
      comparePrice: 399.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
      rating: 4.9,
      reviewCount: 67,
      isNew: true,
      isOnSale: true,
      tags: ['Novo', 'Promoção'],
    },
    {
      id: 'm5',
      name: 'Sapato Social Masculino',
      slug: 'sapato-social-masculino',
      price: 199.99,
      comparePrice: 279.99,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
      rating: 4.5,
      reviewCount: 134,
      isNew: false,
      isOnSale: true,
      tags: ['Promoção', 'Mais Vendido'],
    },
    {
      id: 'm6',
      name: 'Óculos de Sol Designer',
      slug: 'oculos-sol-designer',
      price: 159.99,
      comparePrice: 219.99,
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop',
      rating: 4.7,
      reviewCount: 98,
      isNew: true,
      isOnSale: false,
      tags: ['Novo'],
    },
    {
      id: 'm7',
      name: 'Relógio de Pulso Elegante',
      slug: 'relogio-pulso-elegante',
      price: 249.99,
      comparePrice: 329.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      rating: 4.8,
      reviewCount: 76,
      isNew: false,
      isOnSale: true,
      tags: ['Promoção', 'Mais Vendido'],
    },
    {
      id: 'm8',
      name: 'Jaqueta de Couro Vintage',
      slug: 'jaqueta-couro-vintage',
      price: 399.99,
      comparePrice: 499.99,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
      rating: 4.6,
      reviewCount: 112,
      isNew: false,
      isOnSale: true,
      tags: ['Promoção'],
    },
  ],
  eletronicos: [
    {
      id: 'e1',
      name: 'iPhone 15 Pro Max',
      slug: 'iphone-15-pro-max',
      price: 6999.99,
      comparePrice: 7999.99,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
      rating: 4.9,
      reviewCount: 234,
      isNew: true,
      isOnSale: true,
      tags: ['Novo', 'Promoção', 'Mais Vendido'],
    },
    {
      id: 'e2',
      name: 'MacBook Pro M3',
      slug: 'macbook-pro-m3',
      price: 12999.99,
      comparePrice: 14999.99,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
      rating: 4.8,
      reviewCount: 89,
      isNew: true,
      isOnSale: true,
      tags: ['Novo', 'Promoção'],
    },
    {
      id: 'e3',
      name: 'AirPods Pro 2ª Geração',
      slug: 'airpods-pro-2gen',
      price: 1899.99,
      comparePrice: 2199.99,
      image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop',
      rating: 4.7,
      reviewCount: 156,
      isNew: false,
      isOnSale: true,
      tags: ['Promoção', 'Mais Vendido'],
    },
    {
      id: 'e4',
      name: 'iPad Air 5ª Geração',
      slug: 'ipad-air-5gen',
      price: 3999.99,
      comparePrice: 4599.99,
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
      rating: 4.6,
      reviewCount: 98,
      isNew: false,
      isOnSale: true,
      tags: ['Promoção', 'Frete Grátis'],
    },
    {
      id: 'e5',
      name: 'Apple Watch Series 9',
      slug: 'apple-watch-series-9',
      price: 2999.99,
      comparePrice: 3499.99,
      image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop',
      rating: 4.8,
      reviewCount: 167,
      isNew: true,
      isOnSale: true,
      tags: ['Novo', 'Promoção'],
    },
    {
      id: 'e6',
      name: 'Samsung Galaxy S24 Ultra',
      slug: 'samsung-galaxy-s24-ultra',
      price: 5999.99,
      comparePrice: 6999.99,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
      rating: 4.7,
      reviewCount: 189,
      isNew: true,
      isOnSale: false,
      tags: ['Novo'],
    },
    {
      id: 'e7',
      name: 'Sony WH-1000XM5',
      slug: 'sony-wh1000xm5',
      price: 1999.99,
      comparePrice: 2399.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      rating: 4.9,
      reviewCount: 145,
      isNew: false,
      isOnSale: true,
      tags: ['Promoção', 'Mais Vendido'],
    },
    {
      id: 'e8',
      name: 'Dell XPS 13 Plus',
      slug: 'dell-xps-13-plus',
      price: 8999.99,
      comparePrice: 10999.99,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
      rating: 4.5,
      reviewCount: 76,
      isNew: false,
      isOnSale: true,
      tags: ['Promoção'],
    },
  ],
  esportes: [
    {
      id: 's1',
      name: 'Tênis Nike Air Max 270',
      slug: 'tenis-nike-air-max-270',
      price: 599.99,
      comparePrice: 799.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
      rating: 4.8,
      reviewCount: 234,
      isNew: true,
      isOnSale: true,
      tags: ['Novo', 'Promoção', 'Mais Vendido'],
    },
    {
      id: 's2',
      name: 'Bicicleta Mountain Bike',
      slug: 'bicicleta-mountain-bike',
      price: 1999.99,
      comparePrice: 2499.99,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop',
      rating: 4.7,
      reviewCount: 89,
      isNew: false,
      isOnSale: true,
      tags: ['Promoção', 'Frete Grátis'],
    },
    {
      id: 's3',
      name: 'Kit Academia Completo',
      slug: 'kit-academia-completo',
      price: 1299.99,
      comparePrice: 1599.99,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      rating: 4.6,
      reviewCount: 156,
      isNew: false,
      isOnSale: true,
      tags: ['Promoção', 'Mais Vendido'],
    },
    {
      id: 's4',
      name: 'Raquete de Tênis Profissional',
      slug: 'raquete-tenis-profissional',
      price: 899.99,
      comparePrice: 1199.99,
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop',
      rating: 4.9,
      reviewCount: 67,
      isNew: true,
      isOnSale: true,
      tags: ['Novo', 'Promoção'],
    },
    {
      id: 's5',
      name: 'Bola de Futebol Oficial',
      slug: 'bola-futebol-oficial',
      price: 199.99,
      comparePrice: 279.99,
      image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=400&fit=crop',
      rating: 4.5,
      reviewCount: 134,
      isNew: false,
      isOnSale: true,
      tags: ['Promoção', 'Mais Vendido'],
    },
    {
      id: 's6',
      name: 'Roupa de Natação Speedo',
      slug: 'roupa-natacao-speedo',
      price: 159.99,
      comparePrice: 219.99,
      image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=400&fit=crop',
      rating: 4.7,
      reviewCount: 98,
      isNew: true,
      isOnSale: false,
      tags: ['Novo'],
    },
    {
      id: 's7',
      name: 'Esteira Elétrica Premium',
      slug: 'esteira-eletrica-premium',
      price: 2499.99,
      comparePrice: 3299.99,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      rating: 4.8,
      reviewCount: 76,
      isNew: false,
      isOnSale: true,
      tags: ['Promoção', 'Mais Vendido'],
    },
    {
      id: 's8',
      name: 'Mochila de Trekking',
      slug: 'mochila-trekking',
      price: 399.99,
      comparePrice: 499.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
      rating: 4.6,
      reviewCount: 112,
      isNew: false,
      isOnSale: true,
      tags: ['Promoção'],
    },
  ],
  'casa-jardim': [
    {
      id: 'c1',
      name: 'Aspirador de Pó Robô',
      slug: 'aspirador-po-robo',
      price: 1299.99,
      comparePrice: 1599.99,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop',
      rating: 4.8,
      reviewCount: 234,
      isNew: true,
      isOnSale: true,
      tags: ['Novo', 'Promoção', 'Mais Vendido'],
    },
    {
      id: 'c2',
      name: 'Panela de Pressão Elétrica',
      slug: 'panela-pressao-eletrica',
      price: 399.99,
      comparePrice: 499.99,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
      rating: 4.7,
      reviewCount: 89,
      isNew: false,
      isOnSale: true,
      tags: ['Promoção', 'Frete Grátis'],
    },
    {
      id: 'c3',
      name: 'Jogo de Panelas Antiaderente',
      slug: 'jogo-panelas-antiaderente',
      price: 299.99,
      comparePrice: 399.99,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
      rating: 4.6,
      reviewCount: 156,
      isNew: false,
      isOnSale: true,
      tags: ['Promoção', 'Mais Vendido'],
    },
    {
      id: 'c4',
      name: 'Vaso Decorativo Cerâmica',
      slug: 'vaso-decorativo-ceramica',
      price: 89.99,
      comparePrice: 129.99,
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop',
      rating: 4.9,
      reviewCount: 67,
      isNew: true,
      isOnSale: true,
      tags: ['Novo', 'Promoção'],
    },
    {
      id: 'c5',
      name: 'Cafeteira Expresso Automática',
      slug: 'cafeteira-expresso-automatica',
      price: 899.99,
      comparePrice: 1199.99,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop',
      rating: 4.5,
      reviewCount: 134,
      isNew: false,
      isOnSale: true,
      tags: ['Promoção', 'Mais Vendido'],
    },
    {
      id: 'c6',
      name: 'Kit Ferramentas Básico',
      slug: 'kit-ferramentas-basico',
      price: 159.99,
      comparePrice: 219.99,
      image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=400&fit=crop',
      rating: 4.7,
      reviewCount: 98,
      isNew: true,
      isOnSale: false,
      tags: ['Novo'],
    },
    {
      id: 'c7',
      name: 'Luminária de Mesa LED',
      slug: 'luminaria-mesa-led',
      price: 199.99,
      comparePrice: 279.99,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      rating: 4.8,
      reviewCount: 76,
      isNew: false,
      isOnSale: true,
      tags: ['Promoção', 'Mais Vendido'],
    },
    {
      id: 'c8',
      name: 'Sementes de Hortaliças',
      slug: 'sementes-hortalicas',
      price: 29.99,
      comparePrice: 39.99,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop',
      rating: 4.6,
      reviewCount: 112,
      isNew: false,
      isOnSale: true,
      tags: ['Promoção'],
    },
  ],
}

interface FeaturedProductsProps {
  products?: typeof defaultProducts
  title?: string
  description?: string
}

export function FeaturedProducts({ 
  products = defaultProducts, 
  title = "Produtos em Destaque",
  description = "Descubra nossos produtos mais populares com preços imperdíveis. Qualidade garantida e entrega rápida em todo o Brasil."
}: FeaturedProductsProps) {
  const router = useRouter()
  const { addItem } = useCart()
  const { isAuthenticated } = useAuth()
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

  const handleAddToCart = (product: typeof products[0]) => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/')
      return
    }

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
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-gray-900 dark:to-black">
      <div className="container-responsive">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Products Grid */}
        <div ref={productsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="product-card group bg-gradient-to-br from-blue-200 to-purple-200 dark:from-white/15 dark:to-white/5 backdrop-blur-sm border border-blue-300 dark:border-white/20 rounded-xl overflow-hidden hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              onHoverStart={() => setHoveredProduct(product.id)}
              onHoverEnd={() => setHoveredProduct(null)}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              {/* Product Image */}
              <Link href={`/produto/${product.slug}`} className="block">
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
                      className="product-tag px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-semibold rounded-full"
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
                    className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
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
              </Link>

              {/* Product Info */}
              <div className="p-4">
                {/* Product Name */}
                <Link href={`/produto/${product.slug}`}>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors hover:underline">
                    {product.name}
                  </h3>
                </Link>

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
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
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
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-full text-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Ver Todos os Produtos
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}


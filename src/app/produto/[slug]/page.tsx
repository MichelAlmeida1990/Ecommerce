'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Heart, Share2, Star, Truck, Shield, RotateCcw, Plus, Minus, ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCart } from '@/hooks/use-cart'
import { useAuth } from '@/contexts/auth-context'
import { formatPrice } from '@/lib/utils'
import { categoryProducts } from '@/components/sections/featured-products'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  comparePrice: number
  image: string
  rating: number
  reviewCount: number
  isNew: boolean
  isOnSale: boolean
  tags: string[]
}

export default function ProductDetails({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const { addItem } = useCart()
  const { isAuthenticated } = useAuth()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    // Buscar produto por slug em todas as categorias
    const allProducts = [
      ...categoryProducts.moda,
      ...categoryProducts.eletronicos,
      ...categoryProducts.esportes,
      ...categoryProducts['casa-jardim']
    ]
    
    const foundProduct = allProducts.find(p => p.slug === params.slug)
    setProduct(foundProduct || null)
  }, [params.slug])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Produto não encontrado
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            O produto que você está procurando não existe ou foi removido.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao início
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    
    // Simular delay de adição
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Adicionar ao carrinho
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: product.image,
      })
    }
    
    setIsAddingToCart(false)
  }

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      // Redirecionar para login com redirect para checkout
      router.push('/login?redirect=/checkout')
      return
    }

    // Primeiro adicionar ao carrinho
    await handleAddToCart()
    
    // Depois redirecionar para checkout
    router.push('/checkout')
  }

  // Gerar imagens adicionais baseadas na imagem principal
  const productImages = [
    product.image,
    product.image.replace('w=400&h=400', 'w=800&h=800'),
    product.image.replace('w=400&h=400', 'w=800&h=800&fit=crop&crop=top'),
    product.image.replace('w=400&h=400', 'w=800&h=800&fit=crop&crop=bottom')
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Voltar</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-2 rounded-lg transition-colors ${
                  isWishlisted 
                    ? 'text-red-500 bg-red-50 dark:bg-red-900/20' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                }`}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
              
              <button className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={productImages[selectedImage]}
                alt={product.name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                priority
              />
              
              {/* Tags */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {product.tags.slice(0, 2).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-semibold rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Discount Badge */}
              {product.isOnSale && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  -{Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}%
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - Imagem ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Product Title */}
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
                  {product.rating} ({product.reviewCount} avaliações)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {formatPrice(product.price)}
                </span>
                {product.isOnSale && (
                  <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                    {formatPrice(product.comparePrice)}
                  </span>
                )}
              </div>
              
              {product.isOnSale && (
                <p className="text-green-600 dark:text-green-400 font-medium">
                  Economize {formatPrice(product.comparePrice - product.price)}
                </p>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                Em estoque
              </span>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Descrição</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {showFullDescription 
                  ? `Produto de alta qualidade com excelente custo-benefício. ${product.name} oferece o melhor em termos de performance e durabilidade. Ideal para quem busca qualidade e praticidade.`
                  : `Produto de alta qualidade com excelente custo-benefício. ${product.name} oferece o melhor em termos de performance e durabilidade...`
                }
              </p>
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                {showFullDescription ? 'Ver menos' : 'Ver mais'}
              </button>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quantidade</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-16 text-center font-medium text-gray-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
              >
                {isAddingToCart ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Adicionando...</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    <span>Adicionar ao Carrinho</span>
                  </>
                )}
              </button>
              
              <button
                onClick={handleBuyNow}
                disabled={isAddingToCart}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center space-x-2"
              >
                <span>Comprar Agora</span>
              </button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Truck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Frete Grátis</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Para todo o Brasil</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Garantia</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">12 meses</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <RotateCcw className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Troca</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">30 dias</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

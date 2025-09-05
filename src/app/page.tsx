import { Suspense } from 'react'
import { Hero3DBanner } from '@/components/sections/3d-hero-banner'
import { CategoriesSection } from '@/components/sections/categories-section'
import { FeaturedProducts } from '@/components/sections/featured-products'
import { NewsletterSection } from '@/components/sections/newsletter-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { BrandsSection } from '@/components/sections/brands-section'
import { FeaturesSection } from '@/components/sections/features-section'
import { PromoSection } from '@/components/sections/promo-section'
import { TrendingSection } from '@/components/sections/trending-section'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Banner 3D Interativo */}
      <Hero3DBanner />

      {/* Ofertas e Promoções */}
      <Suspense fallback={<LoadingSpinner />}>
        <PromoSection />
      </Suspense>

      {/* Produtos em Alta */}
      <Suspense fallback={<LoadingSpinner />}>
        <TrendingSection />
      </Suspense>

      {/* Categorias */}
      <Suspense fallback={<LoadingSpinner />}>
        <CategoriesSection />
      </Suspense>

      {/* Produtos em Destaque */}
      <Suspense fallback={<LoadingSpinner />}>
        <FeaturedProducts />
      </Suspense>

      {/* Recursos e Diferenciais */}
      <Suspense fallback={<LoadingSpinner />}>
        <FeaturesSection />
      </Suspense>

      {/* Marcas Parceiras */}
      <Suspense fallback={<LoadingSpinner />}>
        <BrandsSection />
      </Suspense>

      {/* Depoimentos */}
      <Suspense fallback={<LoadingSpinner />}>
        <TestimonialsSection />
      </Suspense>

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  )
}

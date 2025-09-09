import { Suspense } from 'react'
import { SimpleHeroBanner } from '@/components/sections/simple-hero-banner'
import { CategoriesSection } from '@/components/sections/categories-section'
import { FeaturedProducts } from '@/components/sections/featured-products'
import { NewsletterSection } from '@/components/sections/newsletter-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { BrandsSection } from '@/components/sections/brands-section'
import { FeaturesSection } from '@/components/sections/features-section'
import { PromoSection } from '@/components/sections/promo-section'
import { TrendingSection } from '@/components/sections/trending-section'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { StructuredData } from '@/components/seo/structured-data'
import { generateOrganizationSchema, generateWebsiteSchema, generateLocalBusinessSchema } from '@/lib/structured-data'

export default function HomePage() {
  const structuredData = [
    generateOrganizationSchema(),
    generateWebsiteSchema(),
    generateLocalBusinessSchema()
  ]

  return (
    <div className="min-h-screen">
      <StructuredData data={structuredData} />

      {/* Hero Section - Banner Simples */}
      <SimpleHeroBanner />

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

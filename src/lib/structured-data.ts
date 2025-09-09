// Structured Data para SEO
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Versiory Store",
    "description": "E-commerce completo com produtos de qualidade, pagamentos seguros e entrega rápida",
    "url": "https://ecommerce-top.vercel.app",
    "logo": "https://ecommerce-top.vercel.app/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+55-11-99999-9999",
      "contactType": "customer service",
      "availableLanguage": "Portuguese"
    },
    "sameAs": [
      "https://facebook.com/ecommerce-top",
      "https://instagram.com/ecommerce-top",
      "https://twitter.com/ecommerce-top"
    ]
  }
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Versiory Store",
    "url": "https://ecommerce-top.vercel.app",
    "description": "E-commerce completo com produtos de qualidade, pagamentos seguros e entrega rápida",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://ecommerce-top.vercel.app/busca?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
}

export function generateProductSchema(product: {
  id: string
  name: string
  price: number
  comparePrice?: number
  image: string
  rating: number
  reviewCount: number
  description?: string
  category: string
  brand?: string
  inStock: boolean
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description || `Produto ${product.name} de alta qualidade`,
    "image": product.image,
    "brand": {
      "@type": "Brand",
      "name": product.brand || "Versiory Store"
    },
    "category": product.category,
    "sku": product.id,
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "BRL",
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Versiory Store"
      },
      "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviewCount,
      "bestRating": 5,
      "worstRating": 1
    }
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Versiory Store",
    "description": "E-commerce completo com produtos de qualidade, pagamentos seguros e entrega rápida",
    "url": "https://ecommerce-top.vercel.app",
    "telephone": "+55-11-99999-9999",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua das Flores, 123",
      "addressLocality": "São Paulo",
      "addressRegion": "SP",
      "postalCode": "01234-567",
      "addressCountry": "BR"
    },
    "openingHours": "Mo-Fr 09:00-18:00",
    "priceRange": "$$"
  }
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}

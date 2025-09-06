import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/_next/',
        '/checkout/',
        '/pedido-confirmado/',
        '/perfil/',
        '/pedidos/',
        '/favoritos/',
      ],
    },
    sitemap: 'https://ecommerce-top.vercel.app/sitemap.xml', // Substitua pela sua URL de produção
  }
}

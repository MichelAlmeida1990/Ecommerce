import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Versiory Store - Sua Loja Online Completa',
  description: 'Versiory Store - E-commerce completo com produtos de qualidade, pagamentos seguros e entrega rápida. Encontre o que você procura com os melhores preços.',
  keywords: 'e-commerce, loja online, produtos, tecnologia, moda, esportes, casa, jardim, Versiory Store',
  authors: [{ name: 'Versiory Store' }],
  creator: 'Versiory Store',
  publisher: 'Versiory Store',
  other: {
    'charset': 'utf-8',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/icon.svg',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('http://localhost:3002'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Versiory Store - Sua Loja Online Completa',
    description: 'Versiory Store - E-commerce completo com produtos de qualidade, pagamentos seguros e entrega rápida.',
    url: 'http://localhost:3002',
    siteName: 'Versiory Store',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Versiory Store',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Versiory Store - Sua Loja Online Completa',
    description: 'Versiory Store - E-commerce completo com produtos de qualidade, pagamentos seguros e entrega rápida.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased" suppressHydrationWarning={true}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1a1a1a',
                color: '#ffffff',
                border: '1px solid #333',
              },
              success: {
                iconTheme: {
                  primary: '#ccff00',
                  secondary: '#000000',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ca00ca',
                  secondary: '#000000',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Truck, Shield, Star, ArrowRight, Sparkles } from 'lucide-react';
import { AnimatedText, ParticleText, NeonText } from '@/components/ui/animated-text';

export function SimpleHeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Bem-vindo à Versiory Store",
      subtitle: "Sua loja online de confiança",
      description: "Descubra produtos incríveis com os melhores preços e entrega rápida",
      cta: "Explorar Produtos",
      ctaLink: "/produtos",
      bgColor: "from-blue-600 to-purple-600"
    },
    {
      id: 2,
      title: "Ofertas Especiais",
      subtitle: "Até 50% de desconto",
      description: "Aproveite nossas promoções exclusivas por tempo limitado",
      cta: "Ver Ofertas",
      ctaLink: "/ofertas",
      bgColor: "from-orange-500 to-red-500"
    },
    {
      id: 3,
      title: "Entrega Rápida",
      subtitle: "Receba em até 24h",
      description: "Compre hoje e receba amanhã com nossa entrega expressa",
      cta: "Comprar Agora",
      ctaLink: "/produtos",
      bgColor: "from-green-500 to-teal-500"
    }
  ];

  // Imagens de produtos para o fundo que troca automaticamente
  const productImages = [
    "/images/academia.jpg",
    "/images/bike.png",
    "/images/cadeira gamer.jpg",
    "/images/esteira.jpg",
    "/images/natacao.jpg",
    "/images/raquete.jpg",
    "/images/seda.jpg",
    "/images/trekling.jpg"
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => {
      clearInterval(slideInterval);
      clearInterval(imageInterval);
    };
  }, [slides.length, productImages.length]);

  const features = [
    {
      icon: Truck,
      title: "Entrega Rápida",
      description: "Receba em até 24h"
    },
    {
      icon: Shield,
      title: "Compra Segura",
      description: "Pagamento 100% protegido"
    },
    {
      icon: Star,
      title: "Qualidade Garantida",
      description: "Produtos originais"
    }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background com imagens de produtos que trocam automaticamente */}
      <div className="absolute inset-0">
        <div
          className={`absolute inset-0 bg-center bg-no-repeat transition-opacity duration-2000 ${
            productImages[currentImageIndex].includes('cadeira gamer') ? 'bg-cover' : 'bg-contain'
          }`}
          style={{ backgroundImage: `url(${productImages[currentImageIndex]})` }}
        />

        {/* Overlay removido para mostrar cores originais das fotos */}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center text-white">
            {/* Main Content */}
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-yellow-400/30">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-4 w-4 !text-yellow-400" />
                </motion.div>
                <NeonText
                  text="Nova Coleção 2024"
                  color="blue"
                  className="text-sm font-medium !text-yellow-400"
                />
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight whitespace-nowrap">
                <ParticleText
                  text={slides[currentSlide].title}
                  cursive={true}
                  className="!text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
                />
              </h1>

              <h2 className="text-2xl md:text-3xl font-semibold mb-4 !text-yellow-300 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
                <AnimatedText
                  text={slides[currentSlide].subtitle}
                  type="typewriter"
                  cursive={true}
                  delay={0.5}
                />
              </h2>

              <p className="text-xl md:text-2xl mb-8 !text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] max-w-2xl mx-auto">
                <AnimatedText
                  text={slides[currentSlide].description}
                  type="fade"
                  delay={1}
                />
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={slides[currentSlide].ctaLink}
                  className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  <ShoppingBag className="h-5 w-5" />
                  {slides[currentSlide].cta}
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <Link
                  href="/categorias"
                  className="inline-flex items-center gap-2 border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-400 hover:text-black transition-colors"
                >
                  Ver Categorias
                </Link>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-yellow-400/50"
                >
                  <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 !text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 !text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">{feature.title}</h3>
                  <p className="!text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-yellow-400 scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 animate-bounce">
        <div className="w-6 h-10 border-2 border-yellow-400/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-yellow-400/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}

'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, Star, Sparkles, Zap, Crown, Heart, Gift, Award, Percent, Tag, Truck, Shield } from 'lucide-react'
import { motion } from 'framer-motion'

// Textos adaptados para e-commerce
const ecommerceTexts = {
  ofertas: {
    BE: "ENCONTRE",
    PRESENT: "OFERTAS",
    LISTEN: "OUÇA",
    DEEPLY: "ATENTAMENTE",
    OBSERVE: "OBSERVE",
    "&": "+",
    FEEL: "SINTA",
    MAKE: "FAÇA",
    BETTER: "MELHORES",
    DECISIONS: "COMPRAS",
    THE: "AS",
    CREATIVE: "MELHORES",
    PROCESS: "OFERTAS",
    IS: "SÃO",
    MYSTERIOUS: "IMPERDÍVEIS",
    S: "SUPER",
    I: "INCRÍVEIS",
    M: "MEGA",
    P: "PROMOÇÕES",
    L: "LIMITADAS",
    C: "COM",
    T: "TOTAL",
    Y: "DESCONTO",
    "IS THE KEY": "SÃO A CHAVE",
    "FIND YOUR VOICE": "ENCONTRE SEU ESTILO",
    "TRUST INTUITION": "CONFIE NA QUALIDADE",
    "EMBRACE SILENCE": "APROVEITE A CALMA",
    "QUESTION EVERYTHING": "COMPARE PREÇOS",
    TRUTH: "VERDADE",
    WISDOM: "SABEDORIA",
    FOCUS: "FOCO",
    ATTENTION: "ATENÇÃO",
    AWARENESS: "CONSCIÊNCIA",
    PRESENCE: "PRESENÇA",
    SIMPLIFY: "SIMPLIFIQUE",
    REFINE: "REFINE"
  },
  produtos: {
    BE: "SEJA",
    PRESENT: "PRESENTE",
    LISTEN: "ESCUTE",
    DEEPLY: "PROFUNDAMENTE",
    OBSERVE: "OBSERVE",
    "&": "&",
    FEEL: "SINTA",
    MAKE: "FAÇA",
    BETTER: "MELHORES",
    DECISIONS: "ESCOLHAS",
    THE: "OS",
    CREATIVE: "MELHORES",
    PROCESS: "PRODUTOS",
    IS: "SÃO",
    MYSTERIOUS: "ÚNICOS",
    S: "SUPER",
    I: "INCRÍVEIS",
    M: "MEGA",
    P: "PRODUTOS",
    L: "LIMITADOS",
    C: "COM",
    T: "TOTAL",
    Y: "QUALIDADE",
    "IS THE KEY": "SÃO A CHAVE",
    "FIND YOUR VOICE": "ENCONTRE SEU ESTILO",
    "TRUST INTUITION": "CONFIE NA MARCA",
    "EMBRACE SILENCE": "APROVEITE A PAZ",
    "QUESTION EVERYTHING": "COMPARE PRODUTOS",
    TRUTH: "VERDADE",
    WISDOM: "SABEDORIA",
    FOCUS: "FOCO",
    ATTENTION: "ATENÇÃO",
    AWARENESS: "CONSCIÊNCIA",
    PRESENCE: "PRESENÇA",
    SIMPLIFY: "SIMPLIFIQUE",
    REFINE: "REFINE"
  },
  qualidade: {
    BE: "SEJA",
    PRESENT: "PRESENTE",
    LISTEN: "ESCUTE",
    DEEPLY: "PROFUNDAMENTE",
    OBSERVE: "OBSERVE",
    "&": "&",
    FEEL: "SINTA",
    MAKE: "FAÇA",
    BETTER: "MELHORES",
    DECISIONS: "ESCOLHAS",
    THE: "A",
    CREATIVE: "MELHOR",
    PROCESS: "QUALIDADE",
    IS: "É",
    MYSTERIOUS: "GARANTIDA",
    S: "SUPER",
    I: "INCRÍVEL",
    M: "MEGA",
    P: "PREMIUM",
    L: "LUXO",
    C: "COM",
    T: "TOTAL",
    Y: "GARANTIA",
    "IS THE KEY": "É A CHAVE",
    "FIND YOUR VOICE": "ENCONTRE SEU ESTILO",
    "TRUST INTUITION": "CONFIE NA QUALIDADE",
    "EMBRACE SILENCE": "APROVEITE A TRANQUILIDADE",
    "QUESTION EVERYTHING": "COMPARE A QUALIDADE",
    TRUTH: "VERDADE",
    WISDOM: "SABEDORIA",
    FOCUS: "FOCO",
    ATTENTION: "ATENÇÃO",
    AWARENESS: "CONSCIÊNCIA",
    PRESENCE: "PRESENÇA",
    SIMPLIFY: "SIMPLIFIQUE",
    REFINE: "REFINE"
  }
}


export function Hero3DBanner() {
  const [activeRow, setActiveRow] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const textRowsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const loadGSAP = async () => {
      try {
        const { gsap } = await import('gsap')

        // Animação de entrada
        if (containerRef.current) {
          gsap.fromTo(containerRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
          )
        }

        // Animação dos textos de fundo
        const textItems = document.querySelectorAll('.text-item')
        if (textItems.length > 0) {
          textItems.forEach((item, index) => {
            const isOfertas = item.getAttribute('data-text') === 'OFERTAS'
            gsap.fromTo(item,
              { opacity: 0, y: 20 },
              {
                opacity: isOfertas ? 0.9 : 0.8,
                y: 0,
                duration: 0.8,
                delay: index * 0.05,
                ease: "power2.out"
              }
            )
          })
        }

        // Animação contínua dos textos de fundo
        if (textItems.length > 0) {
          textItems.forEach((item, index) => {
            const isOfertas = item.getAttribute('data-text') === 'OFERTAS'
            if (isOfertas) {
              // Animação especial para OFERTAS com brilho branco
              gsap.to(item, {
                opacity: 0.9,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: index * 0.1
              })
              // Animação de brilho adicional
              gsap.to(item, {
                textShadow: "0 0 30px rgba(255, 255, 255, 1), 0 0 60px rgba(255, 255, 255, 0.6)",
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut"
              })
            } else {
              gsap.to(item, {
                opacity: 0.6 + (index % 3) * 0.2,
                duration: 2 + (index % 3),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: index * 0.1
              })
            }
          })
        }

        // Inicializar kinetic type
        const kineticType = document.getElementById('kinetic-type')
        if (kineticType) {
          gsap.set(kineticType, { display: 'grid', opacity: 0.15 })
        }

      } catch (error) {
        console.log('GSAP not available')
      }
    }

    loadGSAP()
  }, [])

  const handleRowHover = async (rowId: string) => {
    setActiveRow(rowId)

    try {
      const { gsap } = await import('gsap')

      // Mudar background
      const backgrounds = document.querySelectorAll('.background-image')
      backgrounds.forEach(bg => {
        gsap.to(bg, { opacity: 0, duration: 0.5 })
      })

      const activeBg = document.getElementById(`${rowId}-bg`)
      if (activeBg) {
        gsap.to(activeBg, { opacity: 0.4, duration: 0.8, delay: 0.2 })
      }

      // Animar textos de fundo
      const textItems = document.querySelectorAll('.text-item')
      const alternativeTexts = ecommerceTexts[rowId as keyof typeof ecommerceTexts]

      textItems.forEach((item, index) => {
        const originalText = item.getAttribute('data-text')
        if (originalText && alternativeTexts[originalText as keyof typeof alternativeTexts]) {
          // Adicionar highlight
          item.classList.add('highlight')

          setTimeout(() => {
            item.textContent = alternativeTexts[originalText as keyof typeof alternativeTexts]
            item.classList.remove('highlight')
            item.classList.add('highlight-reverse')

            setTimeout(() => {
              item.classList.remove('highlight-reverse')
            }, 500)
          }, 500)
        }
      })

      // Ativar kinetic type
      const kineticType = document.getElementById('kinetic-type')
      const typeLines = document.querySelectorAll('.type-line')

      if (kineticType && typeLines.length > 0) {
        // Atualizar texto das linhas
        typeLines.forEach(line => {
          line.textContent = `${rowId} ${rowId} ${rowId}`
        })

        // Animar kinetic type
        gsap.to(kineticType, {
          scale: 2.5,
          rotation: -45,
          duration: 1.5,
          ease: "power2.out"
        })

        gsap.to(typeLines, {
          opacity: 0.8,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out"
        })
      }

    } catch (error) {
      console.log('GSAP not available for hover effects')
    }
  }

  const handleRowLeave = async () => {
    setActiveRow(null)

    try {
      const { gsap } = await import('gsap')

      // Voltar background padrão
      const backgrounds = document.querySelectorAll('.background-image')
      backgrounds.forEach(bg => {
        gsap.to(bg, { opacity: 0, duration: 0.5 })
      })

      const defaultBg = document.getElementById('default-bg')
      if (defaultBg) {
        gsap.to(defaultBg, { opacity: 0.3, duration: 0.8, delay: 0.2 })
      }

      // Restaurar textos originais
      const textItems = document.querySelectorAll('.text-item')
      textItems.forEach((item, index) => {
        const originalText = item.getAttribute('data-text')
        if (originalText) {
          item.classList.add('highlight')

          setTimeout(() => {
            item.textContent = originalText
            item.classList.remove('highlight')
            item.classList.add('highlight-reverse')

            setTimeout(() => {
              item.classList.remove('highlight-reverse')
            }, 500)
          }, 500)
        }
      })

      // Resetar kinetic type
      const kineticType = document.getElementById('kinetic-type')
      const typeLines = document.querySelectorAll('.type-line')

      if (kineticType && typeLines.length > 0) {
        gsap.to(kineticType, {
          scale: 1,
          rotation: 0,
          opacity: 0.05,
          duration: 1,
          ease: "power2.out"
        })

        gsap.to(typeLines, {
          opacity: 0.05,
          duration: 0.8,
          ease: "power2.out"
        })
      }

    } catch (error) {
      console.log('GSAP not available for leave effects')
    }
  }

  return (
    <section className="relative min-h-screen bg-black overflow-hidden" style={{ position: 'relative' }}>
      {/* Background Frame */}
      <div className="background-frame"></div>

      {/* Background Images */}
      <div className="background-image default" id="default-bg"></div>
      <div className="background-image ofertas" id="ofertas-bg"></div>
      <div className="background-image produtos" id="produtos-bg"></div>
      <div className="background-image qualidade" id="qualidade-bg"></div>

      {/* Bottom Gradient */}
      <div className="bottom-gradient"></div>

      {/* Text Background */}
      <div className="text-background">
        {/* Palavras em português relacionadas ao e-commerce */}
        <div className="text-item" style={{top: '5%', left: '8%'}} data-text="OFERTAS">OFERTAS</div>
        <div className="text-item" style={{top: '5%', left: '25%'}} data-text="PRODUTOS">PRODUTOS</div>
        <div className="text-item" style={{top: '5%', left: '45%'}} data-text="QUALIDADE">QUALIDADE</div>
        <div className="text-item" style={{top: '5%', left: '70%'}} data-text="PREÇOS">PREÇOS</div>
        <div className="text-item" style={{top: '5%', right: '10%'}} data-text="DESCONTO">DESCONTO</div>

        <div className="text-item" style={{top: '12%', left: '15%'}} data-text="COMPRAR">COMPRAR</div>
        <div className="text-item" style={{top: '12%', left: '40%'}} data-text="VENDER">VENDER</div>
        <div className="text-item" style={{top: '12%', left: '65%'}} data-text="ECONOMIA">ECONOMIA</div>
        <div className="text-item" style={{top: '12%', right: '20%'}} data-text="PROMOÇÃO">PROMOÇÃO</div>

        <div className="text-item" style={{top: '20%', left: '10%'}} data-text="LOJA">LOJA</div>
        <div className="text-item" style={{top: '20%', left: '30%'}} data-text="ONLINE">ONLINE</div>
        <div className="text-item" style={{top: '20%', left: '55%'}} data-text="SEGURANÇA">SEGURANÇA</div>
        <div className="text-item" style={{top: '20%', right: '15%'}} data-text="CONFIANÇA">CONFIANÇA</div>

        <div className="text-item" style={{top: '28%', left: '20%'}} data-text="ENTREGA">ENTREGA</div>
        <div className="text-item" style={{top: '28%', left: '50%'}} data-text="RÁPIDA">RÁPIDA</div>
        <div className="text-item" style={{top: '28%', right: '25%'}} data-text="GRÁTIS">GRÁTIS</div>

        <div className="text-item" style={{top: '35%', left: '15%'}} data-text="PAGAMENTO">PAGAMENTO</div>
        <div className="text-item" style={{top: '35%', left: '45%'}} data-text="SEGURO">SEGURO</div>
        <div className="text-item" style={{top: '35%', right: '20%'}} data-text="CARTÃO">CARTÃO</div>

        <div className="text-item" style={{top: '42%', left: '25%'}} data-text="PARCELADO">PARCELADO</div>
        <div className="text-item" style={{top: '42%', left: '60%'}} data-text="SEM JUROS">SEM JUROS</div>
        <div className="text-item" style={{top: '42%', right: '10%'}} data-text="CRÉDITO">CRÉDITO</div>

        <div className="text-item" style={{top: '50%', left: '10%'}} data-text="GARANTIA">GARANTIA</div>
        <div className="text-item" style={{top: '50%', left: '40%'}} data-text="TROCA">TROCA</div>
        <div className="text-item" style={{top: '50%', left: '70%'}} data-text="DEVOLUÇÃO">DEVOLUÇÃO</div>
        <div className="text-item" style={{top: '50%', right: '5%'}} data-text="FÁCIL">FÁCIL</div>

        <div className="text-item" style={{top: '58%', left: '20%'}} data-text="ATENDIMENTO">ATENDIMENTO</div>
        <div className="text-item" style={{top: '58%', left: '55%'}} data-text="SUPORTE">SUPORTE</div>
        <div className="text-item" style={{top: '58%', right: '15%'}} data-text="24H">24H</div>

        <div className="text-item" style={{top: '65%', left: '15%'}} data-text="ORIGINAL">ORIGINAL</div>
        <div className="text-item" style={{top: '65%', left: '45%'}} data-text="AUTÊNTICO">AUTÊNTICO</div>
        <div className="text-item" style={{top: '65%', right: '20%'}} data-text="PREMIUM">PREMIUM</div>

        <div className="text-item" style={{top: '72%', left: '25%'}} data-text="EXCLUSIVO">EXCLUSIVO</div>
        <div className="text-item" style={{top: '72%', left: '60%'}} data-text="LIMITADO">LIMITADO</div>
        <div className="text-item" style={{top: '72%', right: '10%'}} data-text="ESPECIAL">ESPECIAL</div>

        <div className="text-item" style={{top: '80%', left: '10%'}} data-text="NOVO">NOVO</div>
        <div className="text-item" style={{top: '80%', left: '35%'}} data-text="LANÇAMENTO">LANÇAMENTO</div>
        <div className="text-item" style={{top: '80%', left: '65%'}} data-text="TENDÊNCIA">TENDÊNCIA</div>
        <div className="text-item" style={{top: '80%', right: '5%'}} data-text="MODA">MODA</div>

        <div className="text-item" style={{top: '88%', left: '20%'}} data-text="MELHOR">MELHOR</div>
        <div className="text-item" style={{top: '88%', left: '50%'}} data-text="TOP">TOP</div>
        <div className="text-item" style={{top: '88%', right: '20%'}} data-text="SUCESSO">SUCESSO</div>
      </div>

      {/* Main Content */}
      <div ref={containerRef} className="main-content">
        <div className="sliced-container">
          <div
            className="text-row"
            data-row-id="ofertas"
            onMouseEnter={() => handleRowHover('ofertas')}
            onMouseLeave={handleRowLeave}
          >
            <div className="text-content" data-text="OFERTAS">OFERTAS</div>
            <div className="interactive-area"></div>
          </div>

          <div
            className="text-row"
            data-row-id="produtos"
            onMouseEnter={() => handleRowHover('produtos')}
            onMouseLeave={handleRowLeave}
          >
            <div className="text-content" data-text="PRODUTOS">PRODUTOS</div>
            <div className="interactive-area"></div>
          </div>

          <div
            className="text-row"
            data-row-id="qualidade"
            onMouseEnter={() => handleRowHover('qualidade')}
            onMouseLeave={handleRowLeave}
          >
            <div className="text-content" data-text="QUALIDADE">QUALIDADE</div>
            <div className="interactive-area"></div>
          </div>
        </div>
      </div>

      {/* Kinetic Type */}
      <div className="type" id="kinetic-type" aria-hidden="true">
        <div className="type-line odd">ofertas ofertas ofertas</div>
        <div className="type-line even">produtos produtos produtos</div>
        <div className="type-line odd">qualidade qualidade qualidade</div>
        <div className="type-line even">ofertas ofertas ofertas</div>
        <div className="type-line odd">produtos produtos produtos</div>
        <div className="type-line even">ofertas ofertas ofertas</div>
        <div className="type-line odd">ofertas ofertas ofertas</div>
        <div className="type-line even">produtos produtos produtos</div>
        <div className="type-line odd">qualidade qualidade qualidade</div>
        <div className="type-line even">ofertas ofertas ofertas</div>
        <div className="type-line odd">produtos produtos produtos</div>
        <div className="type-line even">ofertas ofertas ofertas</div>
      </div>

      {/* Botões de ação */}
      <div className="absolute bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2 z-30 w-full max-w-sm sm:max-w-none px-4 sm:px-0">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <Link href="/categorias" className="group w-full sm:w-auto">
            <motion.button
              className="w-full sm:w-auto px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-800/60 to-blue-700/60 text-white font-bold rounded-full text-xs sm:text-base hover:from-blue-700/80 hover:to-blue-600/80 transform hover:scale-105 transition-all duration-300 shadow-2xl border border-white/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag className="w-3 h-3 sm:w-5 sm:h-5 inline mr-1 sm:mr-2" />
              Explorar Produtos
            </motion.button>
          </Link>

          <Link href="/ofertas" className="group w-full sm:w-auto">
            <motion.button
              className="w-full sm:w-auto px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-orange-800/60 to-red-800/60 text-white font-bold rounded-full text-xs sm:text-base hover:from-orange-700/80 hover:to-red-700/80 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-orange-500/25 relative overflow-hidden border border-white/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <Sparkles className="w-3 h-3 sm:w-5 sm:h-5 inline mr-1 sm:mr-2 relative z-10" />
              <span className="relative z-10">Ver Ofertas</span>
            </motion.button>
          </Link>
        </div>
      </div>

                    <style jsx>{`
                @import url("https://fonts.cdnfonts.com/css/longsile");
                @import url("https://fonts.cdnfonts.com/css/thegoodmonolith");
                @import url("https://fonts.cdnfonts.com/css/pp-neue-montreal");

                :root {
                  --text: #ffffff;
                  --bg: #000000;
                  --highlight-bg: #3b82f6;
                  --type-line-opacity: 0.03;
                }
        
                        .background-frame {
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100vh;
                  background: linear-gradient(135deg, #1a1a1a 0%, #1e3a8a 30%, #2d2d2d 50%, #1e3a8a 70%, #1a1a1a 100%);
                  z-index: 0;
                  pointer-events: none;
                }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .bottom-gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 40vh;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0) 100%
          );
          z-index: 1;
          pointer-events: none;
        }
        
        .background-image {
          position: absolute;
          width: calc(100%);
          height: calc(100vh);
          background-size: cover;
          background-position: center;
          opacity: 0;
          z-index: 1;
          mix-blend-mode: multiply;
          transition: opacity 0.8s ease-in-out;
        }
        
                        .background-image.default {
                  background: linear-gradient(135deg, #1a1a1a 0%, #1e3a8a 30%, #2d2d2d 50%, #1e3a8a 70%, #1a1a1a 100%);
                  opacity: 1;
                }

                .background-image.ofertas {
                  background: linear-gradient(135deg, #2a2a2a 0%, #3b82f6 30%, #3a3a3a 50%, #3b82f6 70%, #2a2a2a 100%);
                }

                .background-image.produtos {
                  background: linear-gradient(135deg, #1f1f1f 0%, #2563eb 30%, #2f2f2f 50%, #2563eb 70%, #1f1f1f 100%);
                }

                .background-image.qualidade {
                  background: linear-gradient(135deg, #252525 0%, #1d4ed8 30%, #353535 50%, #1d4ed8 70%, #252525 100%);
                }
        
        .text-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          pointer-events: none;
        }
        
                        .text-item {
                  position: absolute;
                  color: #ffffff;
                  font-size: 1.2rem;
                  text-transform: uppercase;
                  opacity: 0.8;
                  white-space: nowrap;
                  font-family: "TheGoodMonolith", monospace;
                  z-index: 0;
                  font-weight: 600;
                }

                .text-item[data-text="OFERTAS"] {
                  opacity: 0.9;
                  font-size: 1.8rem;
                  font-weight: 700;
                  color: #ffffff;
                  text-shadow: 0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.4);
                  z-index: 2;
                }
        
        .text-item::after {
          content: "";
          position: absolute;
          top: -2px;
          left: -4px;
          width: 0;
          height: calc(100% + 4px);
          background-color: var(--highlight-bg);
          z-index: 1;
          transition: width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .text-item.highlight::after {
          width: calc(100% + 8px);
        }
        
        .main-content {
          position: relative;
          z-index: 10;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        
        .sliced-container {
          position: relative;
          width: auto;
          max-width: 100%;
          margin: 0 auto;
          transform: translateZ(0);
        }
        
        .text-row {
          position: relative;
          width: 100%;
          height: 140px;
          margin: 10px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
          z-index: 100;
          cursor: pointer;
        }
        
                        .text-content {
                  position: relative;
                  font-size: 10rem;
                  font-weight: normal;
                  text-transform: uppercase;
                  height: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  z-index: 1;
                  color: #ffffff;
                  letter-spacing: 0px;
                  transition: letter-spacing 0.5s ease;
                  visibility: hidden;
                  transform: translate3d(0, 0, 0);
                }
        
                        .text-row:hover .text-content {
                  letter-spacing: 5px;
                }

                .text-content,
                .char,
                .char-inner {
                  -webkit-font-smoothing: antialiased;
                  -moz-osx-font-smoothing: grayscale;
                  text-rendering: optimizeLegibility;
                  transform: translateZ(0);
                  will-change: transform;
                  backface-visibility: hidden;
                }

                .char {
                  display: inline-block;
                  position: relative;
                  overflow: hidden;
                  max-width: 80px;
                  transition: max-width 0.64s cubic-bezier(0.86, 0, 0.07, 1);
                  margin-right: 0px;
                }

                .text-row.active .char::after {
                  content: "";
                  position: absolute;
                  top: 0;
                  right: 0;
                  width: 1px;
                  height: 80%;
                  background-color: rgba(59, 130, 246, 0.3);
                  transform: none;
                  opacity: 0;
                  animation: fadeIn 0.3s forwards;
                  animation-delay: calc(var(--char-index, 0) * 0.05s);
                }

                @keyframes fadeIn {
                  to {
                    opacity: 1;
                  }
                }

                .char.narrow-char {
                  max-width: 40px;
                }

                .char:last-child::after {
                  display: none;
                }

                .char-inner {
                  position: relative;
                  display: inline-block;
                  width: 100%;
                  height: 100%;
                  will-change: transform;
                  transform: translate3d(-20px, 0, 0);
                }
        
        .interactive-area {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 10;
          cursor: pointer;
        }
        
        .type {
          position: absolute;
          height: 100vmax;
          width: 100vmax;
          text-transform: uppercase;
          display: none;
          justify-content: center;
          align-content: center;
          text-align: center;
          top: 50%;
          left: 50%;
          margin-top: -50vmax;
          margin-left: -50vmax;
          will-change: transform;
          z-index: 5;
          transform-style: preserve-3d;
          pointer-events: none;
        }
        
        .type-line {
          white-space: nowrap;
          font-size: clamp(7rem, 18.75vh, 15rem);
          line-height: 0.75;
          font-weight: bold;
          font-family: "PP Neue Montreal", sans-serif;
          color: #ffffff;
          opacity: var(--type-line-opacity);
          user-select: none;
          will-change: transform, opacity;
          position: relative;
        }
        
        .type-line.odd {
          z-index: 50;
        }
        
        .type-line.even {
          z-index: 150;
        }
        
        /* Mobile Optimization */
        @media screen and (max-width: 992px) {
          .text-content {
            font-size: 6rem;
          }
          
          .text-row {
            height: 110px;
          }
          
          .type-line {
            font-size: clamp(5rem, 12vh, 10rem);
          }
        }
        
        @media screen and (max-width: 768px) {
          .text-content {
            font-size: 4rem;
          }
          
          .text-row {
            height: 80px;
            margin: 8px 0;
          }
          
          .type-line {
            font-size: clamp(3.5rem, 8vh, 7rem);
          }
          
          .text-item {
            font-size: 1rem;
          }
        }
        
        @media screen and (max-width: 480px) {
          .text-content {
            font-size: 3rem;
          }
          
          .text-row {
            height: 60px;
            margin: 6px 0;
          }
          
          .type-line {
            font-size: clamp(2.5rem, 6vh, 5rem);
          }
          
          .text-item {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  )
}

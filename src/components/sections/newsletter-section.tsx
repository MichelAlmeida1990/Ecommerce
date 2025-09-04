'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // GSAP Animations
    const loadGSAP = async () => {
      try {
        const { gsap } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        
        gsap.registerPlugin(ScrollTrigger)

        const section = sectionRef.current
        const header = headerRef.current
        const form = formRef.current
        const input = inputRef.current
        const button = buttonRef.current
        
        if (section && header && form && input && button) {
          // Animação de entrada da seção
          gsap.fromTo(section, 
            { 
              opacity: 0, 
              y: 100,
              scale: 0.95
            },
            { 
              opacity: 1, 
              y: 0,
              scale: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              }
            }
          )

          // Animação do header
          gsap.fromTo(header, 
            { 
              opacity: 0, 
              y: 50,
              scale: 0.9
            },
            { 
              opacity: 1, 
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: header,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
              }
            }
          )

          // Animação do formulário
          gsap.fromTo(form, 
            { 
              opacity: 0, 
              y: 60,
              scale: 0.9
            },
            { 
              opacity: 1, 
              y: 0,
              scale: 1,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: form,
                start: "top 70%",
                end: "bottom 30%",
                toggleActions: "play none none reverse"
              }
            }
          )

          // Animação do input
          gsap.fromTo(input, 
            { 
              opacity: 0,
              x: -50,
              scale: 0.8
            },
            { 
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.6,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: input,
                start: "top 60%",
                end: "bottom 40%",
                toggleActions: "play none none reverse"
              }
            }
          )

          // Animação do botão
          gsap.fromTo(button, 
            { 
              opacity: 0,
              x: 50,
              scale: 0.8
            },
            { 
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.6,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: button,
                start: "top 60%",
                end: "bottom 40%",
                toggleActions: "play none none reverse"
              }
            }
          )

          // Animação do ícone de email
          gsap.fromTo(".newsletter-icon", 
            { 
              scale: 0,
              rotation: -180
            },
            { 
              scale: 1,
              rotation: 0,
              duration: 0.8,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: header,
                start: "top 70%",
                end: "bottom 30%",
                toggleActions: "play none none reverse"
              }
            }
          )

          // Animação dos textos
          gsap.fromTo(".newsletter-text", 
            { 
              opacity: 0,
              y: 30
            },
            { 
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: header,
                start: "top 60%",
                end: "bottom 40%",
                toggleActions: "play none none reverse"
              }
            }
          )

          // Hover animations
          const newsletterForm = document.querySelector('.newsletter-form')
          if (newsletterForm) {
            newsletterForm.addEventListener('mouseenter', () => {
              gsap.to(form, {
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out"
              })
            })
            
            newsletterForm.addEventListener('mouseleave', () => {
              gsap.to(form, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
              })
            })
          }
        }
      } catch (error) {
        console.log('GSAP not available, using Framer Motion instead')
      }
    }

    loadGSAP()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setStatus('error')
      setMessage('Por favor, insira um email válido.')
      return
    }

    setStatus('loading')
    
    // Simular envio
    setTimeout(() => {
      setStatus('success')
      setMessage('Inscrição realizada com sucesso! Você receberá nossas novidades em breve.')
      setEmail('')
      
      // Reset status após 5 segundos
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)
    }, 2000)
  }

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-r from-primary/20 via-azure/20 to-neon/20">
      <div className="container-responsive">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="newsletter-icon w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-accent to-azure rounded-full flex items-center justify-center">
              <Mail className="w-10 h-10 text-black" />
            </div>
            
            <h2 className="newsletter-text text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Fique por Dentro das Novidades
            </h2>
            
            <p className="newsletter-text text-lg text-muted-foreground max-w-2xl mx-auto">
              Inscreva-se em nossa newsletter e receba ofertas exclusivas, 
              lançamentos e dicas de produtos diretamente no seu email.
            </p>
          </motion.div>

          {/* Newsletter Form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="newsletter-form max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  ref={inputRef}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu melhor email"
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
                  disabled={status === 'loading'}
                />
              </div>
              
              <button
                ref={buttonRef}
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 bg-gradient-to-r from-accent to-azure text-black font-semibold rounded-lg hover:from-accent/90 hover:to-azure/90 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Inscrever
                  </>
                )}
              </button>
            </div>

            {/* Status Message */}
            {message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${
                  status === 'success' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}
              >
                {status === 'success' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                {message}
              </motion.div>
            )}
          </motion.form>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: '🎁',
                title: 'Ofertas Exclusivas',
                description: 'Descontos especiais para assinantes'
              },
              {
                icon: '🚀',
                title: 'Lançamentos Primeiro',
                description: 'Seja o primeiro a conhecer novos produtos'
              },
              {
                icon: '💡',
                title: 'Dicas e Reviews',
                description: 'Conteúdo exclusivo sobre produtos'
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="text-center p-4"
              >
                <div className="text-3xl mb-3">{benefit.icon}</div>
                <h3 className="font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}


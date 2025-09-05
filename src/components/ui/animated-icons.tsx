'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// Componente do Presente Pulsando
export function AnimatedGift() {
  return (
    <motion.div
      className="text-4xl"
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      🎁
    </motion.div>
  )
}

// Componente do Foguete Decolando
export function AnimatedRocket() {
  const rocketRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const rocket = rocketRef.current
    if (!rocket) return

    const animateRocket = () => {
      rocket.style.transform = 'translateY(0px)'
      setTimeout(() => {
        rocket.style.transform = 'translateY(-10px)'
      }, 100)
      setTimeout(() => {
        rocket.style.transform = 'translateY(0px)'
      }, 200)
    }

    const interval = setInterval(animateRocket, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      ref={rocketRef}
      className="text-4xl"
      animate={{
        y: [0, -8, 0],
        rotate: [0, 2, -2, 0],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      🚀
    </motion.div>
  )
}

// Componente da Lâmpada Acendendo
export function AnimatedLightbulb() {
  const [isLit, setIsLit] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLit(prev => !prev)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="text-4xl relative"
      animate={{
        scale: isLit ? [1, 1.1, 1] : [1, 0.95, 1],
        filter: isLit ? 'brightness(1.5) drop-shadow(0 0 10px #ffd700)' : 'brightness(1)',
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut"
      }}
    >
      💡
      {isLit && (
        <motion.div
          className="absolute inset-0 text-yellow-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.5 }}
        >
          ✨
        </motion.div>
      )}
    </motion.div>
  )
}

// Componente do Presente com Efeito de Abertura
export function AnimatedGiftBox() {
  return (
    <motion.div
      className="text-4xl relative"
      animate={{
        scale: [1, 1.15, 1],
        rotate: [0, 3, -3, 0],
      }}
      transition={{
        duration: 2.2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.div
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        🎁
      </motion.div>
      <motion.div
        className="absolute -top-2 -right-2 text-lg"
        animate={{
          scale: [0, 1, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        ✨
      </motion.div>
    </motion.div>
  )
}

// Componente do Foguete com Rastro
export function AnimatedRocketTrail() {
  return (
    <motion.div
      className="text-4xl relative"
      animate={{
        x: [0, 5, 0],
        y: [0, -8, 0],
        rotate: [0, 5, 0],
      }}
      transition={{
        duration: 2.8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      🚀
      <motion.div
        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-lg"
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3
        }}
      >
        🔥
      </motion.div>
    </motion.div>
  )
}

// Componente da Lâmpada com Brilho
export function AnimatedLightbulbGlow() {
  const [isOn, setIsOn] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOn(prev => !prev)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="text-4xl relative"
      animate={{
        scale: isOn ? [1, 1.2, 1] : [1, 0.9, 1],
        filter: isOn ? 'brightness(1.8) saturate(1.5)' : 'brightness(1) saturate(1)',
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut"
      }}
    >
      💡
      {isOn && (
        <>
          <motion.div
            className="absolute inset-0 text-yellow-200"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{ duration: 0.8 }}
          >
            ✨
          </motion.div>
          <motion.div
            className="absolute -top-1 -right-1 text-sm"
            animate={{
              rotate: [0, 360],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ⭐
          </motion.div>
        </>
      )}
    </motion.div>
  )
}

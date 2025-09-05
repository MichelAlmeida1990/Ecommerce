'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Samsung - Smartphone com apps animados
export function SamsungInteraction() {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive(prev => !prev)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="relative"
      animate={{
        scale: isActive ? [1, 1.1, 1] : 1,
        rotate: isActive ? [0, 2, -2, 0] : 0,
      }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-4xl">📱</div>
      {isActive && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-lg">✨</div>
        </motion.div>
      )}
    </motion.div>
  )
}

// Apple - Maçã com brilho
export function AppleInteraction() {
  const [isShining, setIsShining] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsShining(prev => !prev)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="relative"
      animate={{
        scale: isShining ? [1, 1.15, 1] : 1,
      }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-4xl">🍎</div>
      {isShining && (
        <motion.div
          className="absolute -top-1 -right-1"
          animate={{
            rotate: [0, 360],
            scale: [0, 1, 0],
          }}
          transition={{ duration: 1 }}
        >
          <div className="text-lg">✨</div>
        </motion.div>
      )}
    </motion.div>
  )
}

// Nike - Tênis correndo
export function NikeInteraction() {
  return (
    <motion.div
      className="text-4xl"
      animate={{
        x: [0, 5, 0],
        y: [0, -3, 0],
        rotate: [0, 5, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      👟
    </motion.div>
  )
}

// Adidas - Corredor em movimento
export function AdidasInteraction() {
  return (
    <motion.div
      className="text-4xl"
      animate={{
        x: [0, 8, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      🏃
    </motion.div>
  )
}

// Sony - Controle com vibração
export function SonyInteraction() {
  const [isVibrating, setIsVibrating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVibrating(prev => !prev)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="text-4xl"
      animate={isVibrating ? {
        x: [0, 2, -2, 2, -2, 0],
        y: [0, 1, -1, 1, -1, 0],
      } : {}}
      transition={{ duration: 0.3 }}
    >
      🎮
    </motion.div>
  )
}

// LG - TV com mudança de canal
export function LGInteraction() {
  const [channel, setChannel] = useState(0)
  const channels = ['📺', '📺', '📺', '📺']

  useEffect(() => {
    const interval = setInterval(() => {
      setChannel(prev => (prev + 1) % channels.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="text-4xl"
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {channels[channel]}
    </motion.div>
  )
}

// Canon - Câmera com flash
export function CanonInteraction() {
  const [isFlashing, setIsFlashing] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlashing(prev => !prev)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="relative"
      animate={{
        scale: isFlashing ? [1, 1.1, 1] : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-4xl">📷</div>
      {isFlashing && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5]
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-2xl">⚡</div>
        </motion.div>
      )}
    </motion.div>
  )
}

// Dell - Laptop com tela piscando
export function DellInteraction() {
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(prev => !prev)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="relative"
      animate={{
        scale: isTyping ? [1, 1.05, 1] : 1,
      }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-4xl">💻</div>
      {isTyping && (
        <motion.div
          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2"
          animate={{
            opacity: [0, 1, 0],
            y: [0, -5, 0],
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-sm">⌨️</div>
        </motion.div>
      )}
    </motion.div>
  )
}

// Mapeamento das interações
export const brandInteractions = {
  Samsung: SamsungInteraction,
  Apple: AppleInteraction,
  Nike: NikeInteraction,
  Adidas: AdidasInteraction,
  Sony: SonyInteraction,
  LG: LGInteraction,
  Canon: CanonInteraction,
  Dell: DellInteraction,
}

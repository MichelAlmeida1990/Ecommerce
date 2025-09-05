'use client'

import { useEffect, useState } from 'react'

interface AnimatedLogoProps {
  text: string
  className?: string
}

export function AnimatedLogo({ text, className = '' }: AnimatedLogoProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Simular carregamento da fonte
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap');
        
        .animated-logo {
          font-family: 'Dancing Script', cursive;
          font-weight: 700;
          font-size: 1.8rem;
          letter-spacing: 0.05em;
          display: flex;
          flex-flow: row;
          align-items: center;
          opacity: ${isLoaded ? 1 : 0};
          transition: opacity 0.5s ease-in-out;
        }

        .animated-logo.large {
          font-size: 4rem;
          letter-spacing: 0.1em;
        }

        .word-container {
          display: flex;
          align-items: center;
        }

        .letter {
          color: #1e40af;
          text-shadow: 0 0 0.5rem #3b82f6, 0 0 1rem #3b82f6;
          display: inline-block;
          transition: all 0.3s ease;
        }

        .dark .letter {
          color: #93c5fd;
          text-shadow: 0 0 0.5rem #60a5fa, 0 0 1rem #60a5fa;
        }

        .space {
          display: inline-block;
        }

        .letter-2 {
          animation: flicker 3s ease-in-out infinite alternate;
        }

        .letter-3 {
          animation: flicker 3.5s ease-in-out infinite alternate;
          animation-delay: 0.5s;
        }

        .letter-4 {
          animation: flicker 2.8s ease-in-out infinite alternate;
          animation-delay: 1s;
        }

        .letter-5 {
          animation: flicker 3.2s ease-in-out infinite alternate;
          animation-delay: 1.5s;
        }

        .letter-6 {
          animation: flicker 3.1s ease-in-out infinite alternate;
          animation-delay: 0.8s;
        }

        .letter-7 {
          animation: flicker 2.9s ease-in-out infinite alternate;
          animation-delay: 1.2s;
        }

        .letter-8 {
          animation: flicker 3.3s ease-in-out infinite alternate;
          animation-delay: 0.3s;
        }

        .letter-9 {
          animation: flicker 3.4s ease-in-out infinite alternate;
          animation-delay: 1.7s;
        }

        .letter-10 {
          animation: flicker 3.0s ease-in-out infinite alternate;
          animation-delay: 0.6s;
        }

        .letter-11 {
          animation: flicker 2.7s ease-in-out infinite alternate;
          animation-delay: 1.4s;
        }

        @keyframes flicker {
          0% {
            opacity: 1;
            text-shadow: 0 0 0.5rem #3b82f6, 0 0 1rem #3b82f6;
          }
          5% {
            opacity: 1;
            text-shadow: 0 0 0.5rem #3b82f6, 0 0 1rem #3b82f6;
          }
          5.5% {
            opacity: 0.7;
            text-shadow: 0 0 0.3rem #3b82f6, 0 0 0.5rem #3b82f6;
          }
          6% {
            opacity: 1;
            text-shadow: 0 0 0.5rem #3b82f6, 0 0 1rem #3b82f6;
          }
          6.5% {
            opacity: 1;
            text-shadow: 0 0 0.5rem #3b82f6, 0 0 1rem #3b82f6;
          }
          7% {
            opacity: 0.8;
            text-shadow: 0 0 0.4rem #3b82f6, 0 0 0.8rem #3b82f6;
          }
          8% {
            opacity: 1;
            text-shadow: 0 0 0.5rem #3b82f6, 0 0 1rem #3b82f6;
          }
          50% {
            opacity: 1;
            text-shadow: 0 0 0.8rem #3b82f6, 0 0 1.5rem #3b82f6;
          }
          100% {
            opacity: 1;
            text-shadow: 0 0 0.5rem #3b82f6, 0 0 1rem #3b82f6;
          }
        }

        .dark .letter-2 {
          animation: flickerDark 2s ease-in-out infinite alternate;
        }

        @keyframes flickerDark {
          0% {
            opacity: 1;
            text-shadow: 0 0 0.5rem #60a5fa, 0 0 1rem #60a5fa;
          }
          5% {
            opacity: 1;
            text-shadow: 0 0 0.5rem #60a5fa, 0 0 1rem #60a5fa;
          }
          5.5% {
            opacity: 0.7;
            text-shadow: 0 0 0.3rem #60a5fa, 0 0 0.5rem #60a5fa;
          }
          6% {
            opacity: 1;
            text-shadow: 0 0 0.5rem #60a5fa, 0 0 1rem #60a5fa;
          }
          6.5% {
            opacity: 1;
            text-shadow: 0 0 0.5rem #60a5fa, 0 0 1rem #60a5fa;
          }
          7% {
            opacity: 0.8;
            text-shadow: 0 0 0.4rem #60a5fa, 0 0 0.8rem #60a5fa;
          }
          8% {
            opacity: 1;
            text-shadow: 0 0 0.5rem #60a5fa, 0 0 1rem #60a5fa;
          }
          50% {
            opacity: 1;
            text-shadow: 0 0 0.8rem #60a5fa, 0 0 1.5rem #60a5fa;
          }
          100% {
            opacity: 1;
            text-shadow: 0 0 0.5rem #60a5fa, 0 0 1rem #60a5fa;
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .animated-logo {
            font-size: 1.4rem;
          }
          .animated-logo.large {
            font-size: 3rem;
          }
        }

        @media (max-width: 480px) {
          .animated-logo {
            font-size: 1.2rem;
          }
          .animated-logo.large {
            font-size: 2.5rem;
          }
        }
      `}</style>
      
      <div className={`animated-logo ${className}`}>
        {text.split(' ').map((word, wordIndex) => (
          <div key={wordIndex} className="word-container">
            {word.split('').map((letter, letterIndex) => {
              const globalIndex = wordIndex * 10 + letterIndex; // Para manter os delays únicos
              return (
                <span
                  key={letterIndex}
                  className={`letter ${letterIndex === 1 ? 'letter-2' : ''} ${letterIndex === 2 ? 'letter-3' : ''} ${letterIndex === 3 ? 'letter-4' : ''} ${letterIndex === 4 ? 'letter-5' : ''} ${letterIndex === 5 ? 'letter-6' : ''} ${letterIndex === 6 ? 'letter-7' : ''} ${letterIndex === 7 ? 'letter-8' : ''} ${letterIndex === 8 ? 'letter-9' : ''} ${letterIndex === 9 ? 'letter-10' : ''} ${letterIndex === 10 ? 'letter-11' : ''}`}
                  style={{
                    animationDelay: `${globalIndex * 0.1}s`
                  }}
                >
                  {letter}
                </span>
              );
            })}
            {wordIndex < text.split(' ').length - 1 && (
              <span className="space" style={{ width: '0.5em' }}></span>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

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
        
        .animated-logo {
          font-family: 'Orbitron', monospace;
          font-weight: 900;
          font-size: 1.5rem;
          letter-spacing: 0.1em;
          display: flex;
          flex-flow: row;
          align-items: center;
          opacity: ${isLoaded ? 1 : 0};
          transition: opacity 0.5s ease-in-out;
        }

        .animated-logo.large {
          font-size: 3.5rem;
          letter-spacing: 0.15em;
        }

        .word-container {
          display: flex;
          align-items: center;
        }

        .letter {
          color: #d9fdff;
          text-shadow: 0 0 2rem #00f0ff, 0 0 4rem #00f0ff;
          display: inline-block;
          transition: all 0.3s ease;
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
            text-shadow: 0 0 1rem #00f0ff, 0 0 2rem #00f0ff;
          }
          5% {
            opacity: 1;
            text-shadow: 0 0 1rem #00f0ff, 0 0 2rem #00f0ff;
          }
          5.5% {
            opacity: 0.7;
            text-shadow: 0 0 0.5rem #00f0ff, 0 0 1rem #00f0ff;
          }
          6% {
            opacity: 1;
            text-shadow: 0 0 1rem #00f0ff, 0 0 2rem #00f0ff;
          }
          6.5% {
            opacity: 1;
            text-shadow: 0 0 1rem #00f0ff, 0 0 2rem #00f0ff;
          }
          7% {
            opacity: 0.8;
            text-shadow: 0 0 0.8rem #00f0ff, 0 0 1.5rem #00f0ff;
          }
          8% {
            opacity: 1;
            text-shadow: 0 0 1rem #00f0ff, 0 0 2rem #00f0ff;
          }
          50% {
            opacity: 1;
            text-shadow: 0 0 1.5rem #00f0ff, 0 0 3rem #00f0ff;
          }
          100% {
            opacity: 1;
            text-shadow: 0 0 1rem #00f0ff, 0 0 2rem #00f0ff;
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .animated-logo {
            font-size: 1.2rem;
          }
          .animated-logo.large {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 480px) {
          .animated-logo {
            font-size: 1rem;
          }
          .animated-logo.large {
            font-size: 2rem;
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

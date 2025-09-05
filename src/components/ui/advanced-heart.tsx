'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export function AdvancedHeart() {
  const [isLiked, setIsLiked] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    if (!buttonRef.current) return

    const button = buttonRef.current
    const heart = button.querySelector('.heart') as SVGElement
    const starters = button.querySelectorAll('.heart__segment--start')
    const mids = Array.from(button.querySelectorAll('.heart__segment--middle')).reverse()
    const enders = Array.from(button.querySelectorAll('.heart__segment--end')).reverse()
    const segments = Array.from(starters).concat(mids, enders)
    const fragments = button.querySelectorAll('.heart__fragment')
    const stroke = button.querySelector('.heart__stroke') as SVGElement
    const fill = button.querySelector('.heart__fill') as SVGElement
    const beat = button.querySelector('.heart__beat') as SVGElement

    // Configuração inicial
    gsap.set(segments, {
      '--lightness': (index: number) => gsap.utils.mapRange(0, segments.length, 94, 60, index),
    })

    gsap.set(segments, { opacity: 0 })
    gsap.set(beat, { transformOrigin: '50% 50%', yPercent: 5 })
    gsap.set(fragments, { opacity: 0 })

    const likeAnimation = () => {
      return gsap
        .timeline({
          onStart: () => {
            gsap.set([segments, fragments], { display: 'block' })
            gsap.set(stroke, { display: 'none' })
            gsap.set(fragments, {
              opacity: 0,
              '--hue': () => gsap.utils.random(0, 359),
            })
          },
          onComplete: () => {
            gsap.set([segments, fragments], { display: 'none' })
          },
        })
        .set(beat, { '--hue': 180 })
        .set(starters, { opacity: 1 })
        .to([mids, enders], {
          stagger: 0.005,
          opacity: 1,
          duration: 0.05,
        })
        .to(
          beat,
          {
            duration: 0.5,
            '--hue': 360,
            ease: 'power1.in',
          },
          0
        )
        .to(
          starters,
          {
            stagger: 0.025,
            opacity: 0,
            duration: 0.05,
          },
          0.2
        )
        .to(
          beat,
          {
            scale: 1.5,
            duration: 0.25,
          },
          '>-0.15'
        )
        .to(beat, {
          scale: 1,
          duration: 0.35,
          ease: 'back.out(5)',
        })
        .to(
          fill,
          {
            display: 'block',
          },
          '>-0.25'
        )
        .to(segments, { opacity: 0 }, '>-0.25')
        .fromTo(
          fragments,
          {
            opacity: 1,
          },
          {
            ease: 'power4.in',
            opacity: 0,
            x: () => gsap.utils.random(-100, 100),
            y: () => gsap.utils.random(-100, 100),
            scale: () => gsap.utils.random(0.5, 1.5),
            duration: () => gsap.utils.random(0.15, 0.65),
          },
          '>-0.725'
        )
        .timeScale(1.15)
    }

    const handleClick = () => {
      if (isLiked) {
        gsap.set(stroke, { display: 'block' })
        gsap.set([segments, fragments], { display: 'none' })
        if (timelineRef.current) {
          timelineRef.current.pause()
          timelineRef.current.time(0)
        }
      } else {
        timelineRef.current = likeAnimation()
      }
      setIsLiked(!isLiked)
    }

    button.addEventListener('click', handleClick)

    return () => {
      button.removeEventListener('click', handleClick)
    }
  }, [isLiked])

  return (
    <button
      ref={buttonRef}
      className={`relative h-12 w-12 rounded-full transition-all duration-300 border-0 flex items-center justify-center cursor-pointer bg-transparent outline-transparent ${
        isLiked 
          ? '' 
          : 'hover:bg-red-500/15'
      }`}
      aria-label={isLiked ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <svg className="heart h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
        <g className="heart__fragments">
          {Array.from({ length: 40 }, (_, i) => (
            <circle key={i} cx="20" cy="20" r="2" className="heart__fragment" />
          ))}
        </g>
        <g className="heart__beat">
          {/* Heart segments - simplified for brevity */}
          <path d="M10.682 36.832a2.453 2.453 0 001.595-3.128 2.453 2.453 0 00-3.067-1.656 2.453 2.453 0 00-1.656 3.066 2.453 2.453 0 003.067 1.718z" className="heart__segment heart__segment--start"/>
          <path d="M11.202 36.895a2.446 2.446 0 002.14-2.751 2.446 2.446 0 00-2.752-2.201 2.446 2.446 0 00-2.2 2.812 2.446 2.446 0 002.812 2.14z" className="heart__segment heart__segment--start"/>
          <path d="M12.46 36.9a2.516 2.516 0 002.2-2.893 2.516 2.516 0 00-2.83-2.2 2.516 2.516 0 00-2.2 2.83 2.516 2.516 0 002.83 2.263z" className="heart__segment heart__segment--start"/>
          <path d="M13.993 36.706a2.584 2.584 0 002.261-2.907 2.584 2.584 0 00-2.907-2.262 2.584 2.584 0 00-2.326 2.908 2.584 2.584 0 002.972 2.26z" className="heart__segment heart__segment--start"/>
          <path d="M15.376 36.44a2.515 2.515 0 002.2-2.83 2.515 2.515 0 00-2.83-2.264 2.515 2.515 0 00-2.2 2.893 2.515 2.515 0 002.83 2.2z" className="heart__segment heart__segment--start"/>
          <path d="M16.556 36.184a2.521 2.521 0 002.143-2.9 2.521 2.521 0 00-2.899-2.142 2.521 2.521 0 00-2.143 2.899 2.521 2.521 0 002.9 2.143z" className="heart__segment heart__segment--start"/>
          <path d="M17.772 35.933a2.522 2.522 0 002.017-3.026 2.522 2.522 0 00-3.026-2.018 2.522 2.522 0 00-1.955 3.027 2.522 2.522 0 002.964 2.017z" className="heart__segment heart__segment--start"/>
          <path d="M18.976 35.641a2.443 2.443 0 001.833-3.054 2.443 2.443 0 00-3.054-1.771 2.443 2.443 0 00-1.772 3.054 2.443 2.443 0 003.054 1.771z" className="heart__segment heart__segment--start"/>
          <path d="M20.07 35.305a2.588 2.588 0 001.553-3.365 2.588 2.588 0 00-3.365-1.553 2.588 2.588 0 00-1.552 3.365 2.588 2.588 0 003.364 1.553z" className="heart__segment heart__segment--start"/>
          <path d="M21.368 34.712a2.599 2.599 0 001.3-3.509 2.599 2.599 0 00-3.38-1.3 2.599 2.599 0 00-1.364 3.444c.585 1.3 2.08 1.95 3.444 1.3z" className="heart__segment heart__segment--start"/>
          
          {/* Middle segments */}
          <path d="M12.297 30.225c1.073.975 2.682.975 3.706-.146.976-1.025.976-2.683-.097-3.658-1.073-.976-2.683-.976-3.707.097-.975 1.073-.975 2.683.098 3.707z" className="heart__segment heart__segment--middle"/>
          <path d="M11.224 29.103c.975 1.024 2.585 1.122 3.658.098 1.072-.976 1.121-2.585.146-3.658a2.585 2.585 0 00-3.707-.146 2.585 2.585 0 00-.146 3.706z" className="heart__segment heart__segment--middle"/>
          <path d="M10.151 27.884c.975 1.122 2.536 1.268 3.658.293 1.121-.976 1.268-2.536.341-3.658a2.585 2.585 0 00-3.706-.293 2.585 2.585 0 00-.293 3.658z" className="heart__segment heart__segment--middle"/>
          <path d="M9.127 26.665a2.585 2.585 0 003.706.439 2.585 2.585 0 00.39-3.707 2.585 2.585 0 00-3.657-.39 2.585 2.585 0 00-.44 3.658z" className="heart__segment heart__segment--middle"/>
          <path d="M8.2 25.445c.83 1.17 2.439 1.415 3.658.488 1.17-.829 1.414-2.438.536-3.609a2.585 2.585 0 00-3.657-.536c-1.17.878-1.463 2.438-.537 3.657z" className="heart__segment heart__segment--middle"/>
          
          {/* End segments */}
          <path d="M17.076 33.785a2.438 2.438 0 003.414-.927c.731-1.219.341-2.73-.878-3.413a2.487 2.487 0 00-3.414.926 2.438 2.438 0 00.927 3.414z" className="heart__segment heart__segment--end"/>
          <path d="M16.003 33.15c1.22.781 2.829.489 3.61-.78a2.55 2.55 0 00-.732-3.608 2.585 2.585 0 00-3.61.78 2.585 2.585 0 00.732 3.609z" className="heart__segment heart__segment--end"/>
          <path d="M14.735 32.224a2.585 2.585 0 003.61-.536 2.585 2.585 0 00-.489-3.658 2.585 2.585 0 00-3.657.537 2.585 2.585 0 00.487 3.657z" className="heart__segment heart__segment--end"/>
          <path d="M13.467 31.249c1.122.975 2.731.829 3.707-.341.926-1.073.78-2.731-.342-3.658a2.585 2.585 0 00-3.657.341c-.976 1.122-.83 2.731.292 3.658z" className="heart__segment heart__segment--end"/>
          
          {/* Heart outline and fill */}
          <path className="heart__stroke" d="M20 35.04c-4.16 0-16-10.752-16-20.928C4 9.248 8.032 4.96 12.576 4.96c3.648 0 6.144 2.56 7.424 4.352 1.28-1.856 3.776-4.352 7.424-4.352C31.968 4.96 36 9.248 36 14.112c0 10.176-11.84 20.864-16 20.928zM12.576 7.328c-3.264 0-6.208 3.2-6.208 6.784 0 9.152 11.2 18.496 13.632 18.56 2.432-.064 13.632-9.408 13.632-18.56 0-3.584-2.944-6.784-6.208-6.784-4.032 0-6.272 4.672-6.336 4.736-.32.896-1.792.896-2.176 0 0 0-2.304-4.736-6.336-4.736z"/>
          <path className="heart__fill" d="M20 35.052c-4.148-.119-16-10.785-16-20.919 0-4.918 4.03-9.185 8.593-9.185 3.674 0 6.103 2.548 7.407 4.385 1.304-1.837 3.733-4.385 7.407-4.385C31.97 4.948 36 9.215 36 14.133c0 10.074-11.852 20.8-16 20.919z"/>
        </g>
      </svg>
    </button>
  )
}

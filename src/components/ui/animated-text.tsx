'use client';

// Componentes de texto simplificados para evitar erros de removeChild

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  type?: 'typewriter' | 'fade' | 'slide' | 'glitch' | 'wave';
  cursive?: boolean;
}

export function AnimatedText({
  text,
  className = '',
  delay = 0,
  type = 'typewriter',
  cursive = false
}: AnimatedTextProps) {
  return (
    <span className={`${cursive ? 'font-serif italic' : ''} ${className}`}>
      {text}
    </span>
  );
}

// Componente para texto com efeito de partículas (versão simplificada)
export function ParticleText({
  text,
  className = '',
  cursive = false
}: {
  text: string;
  className?: string;
  cursive?: boolean;
}) {
  if (!text) {return null;}

  // Debug: verificar o texto que está sendo renderizado
  console.log('ParticleText rendering:', text);

  return (
    <span className={`${cursive ? 'font-serif italic' : ''} ${className}`}>
      {text}
    </span>
  );
}

// Componente para texto com efeito de neon (versão simplificada)
export function NeonText({
  text,
  className = '',
  cursive = false,
  color = 'blue'
}: {
  text: string;
  className?: string;
  cursive?: boolean;
  color?: 'blue' | 'pink' | 'green' | 'purple';
}) {
  const glows = {
    blue: 'drop-shadow-[0_0_20px_rgba(251,191,36,0.8)]',
    pink: 'drop-shadow-[0_0_20px_rgba(236,72,153,0.8)]',
    green: 'drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]',
    purple: 'drop-shadow-[0_0_20px_rgba(147,51,234,0.8)]'
  };

  return (
    <span className={`${cursive ? 'font-serif italic' : ''} ${className} ${glows[color]} relative`}>
      {text}
    </span>
  );
}

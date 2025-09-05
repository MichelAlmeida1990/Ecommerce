/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Habilita o modo escuro baseado em classe
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de cores personalizada
        primary: {
          DEFAULT: '#031f5f', // Azul principal
          light: '#0a2b7a',
          dark: '#021540',
        },
        azure: {
          DEFAULT: '#00afee', // Azure vívido
          light: '#33bff1',
          dark: '#0088b8',
        },
        neon: {
          DEFAULT: '#ca00ca', // Rosa neon vívido
          light: '#d433d4',
          dark: '#a000a0',
        },
        brown: {
          DEFAULT: '#c2af00', // Marrom
          light: '#d4c233',
          dark: '#9a8c00',
        },
        accent: {
          DEFAULT: '#ccff00', // Verde amarelado vívido
          light: '#d6ff33',
          dark: '#a3cc00',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(204, 255, 0, 0.3)',
        'glow-primary': '0 0 20px rgba(3, 31, 95, 0.3)',
        'glow-azure': '0 0 20px rgba(0, 175, 238, 0.3)',
        'glow-neon': '0 0 20px rgba(202, 0, 202, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #031f5f 0%, #00afee 100%)',
        'gradient-accent': 'linear-gradient(135deg, #ccff00 0%, #c2af00 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}


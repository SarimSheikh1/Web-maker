import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-left': {
          '0%': {
            opacity: '0',
            transform: 'translateX(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'fade-right': {
          '0%': {
            opacity: '0',
            transform: 'translateX(-30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'scale-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.8)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        'rotate-in': {
          '0%': {
            opacity: '0',
            transform: 'rotate(-10deg) scale(0.9)',
          },
          '100%': {
            opacity: '1',
            transform: 'rotate(0deg) scale(1)',
          },
        },
        'rainbow-shimmer': {
          '0%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
          '100%': {
            'background-position': '0% 50%',
          },
        },
        'bounce-gentle': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.8',
            transform: 'scale(1.05)',
          },
        },
        'slide-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(100%)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'slide-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-100%)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'flip-in': {
          '0%': {
            opacity: '0',
            transform: 'rotateY(-90deg)',
          },
          '100%': {
            opacity: '1',
            transform: 'rotateY(0deg)',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        'wiggle': {
          '0%, 100%': {
            transform: 'rotate(-3deg)',
          },
          '50%': {
            transform: 'rotate(3deg)',
          },
        },
        'blur-in': {
          '0%': {
            opacity: '0',
            filter: 'blur(8px)',
          },
          '100%': {
            opacity: '1',
            filter: 'blur(0)',
          },
        },
        'typewriter': {
          '0%': {
            width: '0',
          },
          '100%': {
            width: '100%',
          },
        },
        'gradient-shimmer': {
          '0%': {
            'background-position': '-200% center',
          },
          '100%': {
            'background-position': '200% center',
          },
        },
        'skeleton': {
          '0%': {
            'background-position': '200% 0',
          },
          '100%': {
            'background-position': '-200% 0',
          },
        },
        'glow': {
          '0%, 100%': {
            'box-shadow': '0 0 20px rgba(59, 130, 246, 0.3)',
          },
          '50%': {
            'box-shadow': '0 0 40px rgba(59, 130, 246, 0.6), 0 0 60px rgba(147, 51, 234, 0.3)',
          },
        },
        'particle-float': {
          '0%': {
            transform: 'translateY(0px) rotate(0deg)',
            opacity: '1',
          },
          '33%': {
            transform: 'translateY(-30px) rotate(120deg)',
            opacity: '0.8',
          },
          '66%': {
            transform: 'translateY(-10px) rotate(240deg)',
            opacity: '0.6',
          },
          '100%': {
            transform: 'translateY(0px) rotate(360deg)',
            opacity: '1',
          },
        },
        'text-glow': {
          '0%, 100%': {
            'text-shadow': '0 0 10px rgba(59, 130, 246, 0.5)',
          },
          '50%': {
            'text-shadow': '0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(147, 51, 234, 0.5)',
          },
        },
        'morph': {
          '0%, 100%': {
            'border-radius': '60% 40% 30% 70% / 60% 30% 70% 40%',
          },
          '50%': {
            'border-radius': '30% 60% 70% 40% / 50% 60% 30% 60%',
          },
        },
        'slide-in-left': {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        'slide-in-right': {
          '0%': {
            transform: 'translateX(100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        'zoom-in': {
          '0%': {
            transform: 'scale(0)',
            opacity: '0',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
        'bounce-in': {
          '0%': {
            transform: 'scale(0.3)',
            opacity: '0',
          },
          '50%': {
            transform: 'scale(1.05)',
            opacity: '0.8',
          },
          '70%': {
            transform: 'scale(0.9)',
            opacity: '0.9',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
        'shake': {
          '0%, 100%': {
            transform: 'translateX(0)',
          },
          '10%, 30%, 50%, 70%, 90%': {
            transform: 'translateX(-10px)',
          },
          '20%, 40%, 60%, 80%': {
            transform: 'translateX(10px)',
          },
        },
        'heartbeat': {
          '0%': {
            transform: 'scale(1)',
          },
          '14%': {
            transform: 'scale(1.3)',
          },
          '28%': {
            transform: 'scale(1)',
          },
          '42%': {
            transform: 'scale(1.3)',
          },
          '70%': {
            transform: 'scale(1)',
          },
        },
        'swing': {
          '20%': {
            transform: 'rotate3d(0, 0, 1, 15deg)',
          },
          '40%': {
            transform: 'rotate3d(0, 0, 1, -10deg)',
          },
          '60%': {
            transform: 'rotate3d(0, 0, 1, 5deg)',
          },
          '80%': {
            transform: 'rotate3d(0, 0, 1, -5deg)',
          },
          '100%': {
            transform: 'rotate3d(0, 0, 1, 0deg)',
          },
        },
        'rubber-band': {
          '0%': {
            transform: 'scale3d(1, 1, 1)',
          },
          '30%': {
            transform: 'scale3d(1.25, 0.75, 1)',
          },
          '40%': {
            transform: 'scale3d(0.75, 1.25, 1)',
          },
          '50%': {
            transform: 'scale3d(1.15, 0.85, 1)',
          },
          '65%': {
            transform: 'scale3d(0.95, 1.05, 1)',
          },
          '75%': {
            transform: 'scale3d(1.05, 0.95, 1)',
          },
          '100%': {
            transform: 'scale3d(1, 1, 1)',
          },
        },
        'jello': {
          '11.1%': {
            transform: 'skewX(-12.5deg) skewY(-12.5deg)',
          },
          '22.2%': {
            transform: 'skewX(6.25deg) skewY(6.25deg)',
          },
          '33.3%': {
            transform: 'skewX(-3.125deg) skewY(-3.125deg)',
          },
          '44.4%': {
            transform: 'skewX(1.5625deg) skewY(1.5625deg)',
          },
          '55.5%': {
            transform: 'skewX(-0.78125deg) skewY(-0.78125deg)',
          },
          '66.6%': {
            transform: 'skewX(0.390625deg) skewY(0.390625deg)',
          },
          '77.7%': {
            transform: 'skewX(-0.1953125deg) skewY(-0.1953125deg)',
          },
          '88.8%': {
            transform: 'skewX(0.09765625deg) skewY(0.09765625deg)',
          },
          '100%': {
            transform: 'skewX(0deg) skewY(0deg)',
          },
        },
        'flash': {
          '0%, 50%, 100%': {
            opacity: '1',
          },
          '25%, 75%': {
            opacity: '0',
          },
        },
        'tada': {
          '0%': {
            transform: 'scale3d(1, 1, 1)',
          },
          '10%, 20%': {
            transform: 'scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)',
          },
          '30%, 50%, 70%, 90%': {
            transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)',
          },
          '40%, 60%, 80%': {
            transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)',
          },
          '100%': {
            transform: 'scale3d(1, 1, 1)',
          },
        },
        'wobble': {
          '0%': {
            transform: 'translateX(0%)',
          },
          '15%': {
            transform: 'translateX(-25%) rotate(-5deg)',
          },
          '30%': {
            transform: 'translateX(20%) rotate(3deg)',
          },
          '45%': {
            transform: 'translateX(-15%) rotate(-3deg)',
          },
          '60%': {
            transform: 'translateX(10%) rotate(2deg)',
          },
          '75%': {
            transform: 'translateX(-5%) rotate(-1deg)',
          },
          '100%': {
            transform: 'translateX(0%)',
          },
        },
        'roll-in': {
          '0%': {
            opacity: '0',
            transform: 'translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-up': 'fade-up 0.6s ease-out',
        'fade-down': 'fade-down 0.6s ease-out',
        'fade-left': 'fade-left 0.6s ease-out',
        'fade-right': 'fade-right 0.6s ease-out',
        'blur-in': 'blur-in 0.8s ease-out',
        'scale-in': 'scale-in 0.5s ease-out',
        'rotate-in': 'rotate-in 0.7s ease-out',
        'typewriter': 'typewriter 2s steps(40) 1s both',
        'gradient-shimmer': 'gradient-shimmer 2s linear infinite',
        'rainbow-shimmer': 'rainbow-shimmer 3s ease infinite',
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'slide-down': 'slide-down 0.6s ease-out',
        'flip-in': 'flip-in 0.8s ease-out',
        'skeleton': 'skeleton 1.5s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'particle-float': 'particle-float 4s ease-in-out infinite',
        'text-glow': 'text-glow 2s ease-in-out infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'slide-in-left': 'slide-in-left 0.8s ease-out',
        'slide-in-right': 'slide-in-right 0.8s ease-out',
        'zoom-in': 'zoom-in 0.6s ease-out',
        'bounce-in': 'bounce-in 0.8s ease-out',
        'shake': 'shake 0.8s ease-in-out',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'swing': 'swing 1s ease-in-out',
        'rubber-band': 'rubber-band 1s ease-out',
        'jello': 'jello 1s ease-out',
        'flash': 'flash 2s ease-in-out infinite',
        'tada': 'tada 1s ease-in-out',
        'wobble': 'wobble 1s ease-in-out',
        'roll-in': 'roll-in 1s ease-out',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
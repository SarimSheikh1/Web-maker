'use client'

import { Block, HeroProps, ThemeTokens } from '@/lib/types'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'

interface PublishedHeroBlockProps {
  block: Block & { type: 'hero' }
  theme: ThemeTokens
}

export function PublishedHeroBlock({ block, theme }: PublishedHeroBlockProps) {
  const props = block.props as HeroProps
  const { headline, subheadline, primaryCTA, secondaryCTA, backgroundImage, textAnimation } = props
  const [isAnimated, setIsAnimated] = useState(false)
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: textAnimation?.once !== false,
  })

  useEffect(() => {
    if (inView && textAnimation?.type !== 'none') {
      const timer = setTimeout(() => {
        setIsAnimated(true)
      }, textAnimation?.delayMs || 0)
      
      return () => clearTimeout(timer)
    }
  }, [inView, textAnimation])

  const getVariantClasses = () => {
    switch (block.variant) {
      case 'centered':
        return 'text-center'
      case 'split':
        return 'grid md:grid-cols-2 gap-12 items-center'
      case 'minimal':
        return 'text-center py-16'
      default:
        return 'text-center'
    }
  }

  const getAnimationClasses = () => {
    if (!textAnimation || textAnimation.type === 'none' || !isAnimated) return ''
    
    const prefersReducedMotion = typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) return ''
    
    switch (textAnimation.type) {
      case 'fadeUp':
        return 'animate-fade-up'
      case 'fadeDown':
        return 'animate-fade-down'
      case 'fadeLeft':
        return 'animate-fade-left'
      case 'fadeRight':
        return 'animate-fade-right'
      case 'blurIn':
        return 'animate-blur-in'
      case 'scaleIn':
        return 'animate-scale-in'
      case 'rotateIn':
        return 'animate-rotate-in'
      case 'slideUp':
        return 'animate-slide-up'
      case 'slideDown':
        return 'animate-slide-down'
      case 'flipIn':
        return 'animate-flip-in'
      case 'typewriter':
        return 'animate-typewriter'
      case 'gradientShimmer':
        return 'animate-gradient-shimmer'
      case 'rainbowShimmer':
        return 'animate-rainbow-shimmer'
      case 'bounceGentle':
        return 'animate-bounce-gentle'
      case 'pulseGlow':
        return 'animate-pulse-glow'
      case 'float':
        return 'animate-float'
      case 'wiggle':
        return 'animate-wiggle'
      default:
        return ''
    }
  }

  const buttonStyle = {
    backgroundColor: theme.colors.primary,
    color: theme.colors.background,
    borderRadius: `${theme.radius.md}px`,
    padding: '12px 32px',
    fontSize: '18px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'all 0.2s ease',
  }

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'transparent',
    color: theme.colors.text,
    border: `2px solid ${theme.colors.border}`,
  }

  return (
    <section 
      ref={ref}
      className="relative py-20 px-4 overflow-hidden"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {backgroundImage && (
        <div 
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
        />
      )}
      
      <div className="container mx-auto relative z-10 max-w-6xl">
        <div className={getVariantClasses()}>
          <div className={block.variant === 'split' ? 'space-y-6' : 'max-w-4xl mx-auto space-y-6'}>
            <h1 
              className={`text-4xl md:text-6xl font-bold leading-tight ${getAnimationClasses()}`}
              style={{
                color: backgroundImage ? '#ffffff' : theme.colors.text,
                fontFamily: theme.typography.fontFamily,
                animationDuration: `${textAnimation?.durationMs || 1000}ms`,
              }}
            >
              {headline || 'Your Amazing Headline'}
            </h1>
            
            <p 
              className={`text-xl leading-relaxed max-w-2xl ${block.variant === 'split' ? '' : 'mx-auto'}`}
              style={{
                color: backgroundImage ? 'rgba(255, 255, 255, 0.9)' : theme.colors.muted,
                fontFamily: theme.typography.fontFamily,
              }}
            >
              {subheadline || 'A compelling subheadline that explains your value proposition and encourages visitors to take action.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {primaryCTA && (
                <a
                  href={primaryCTA.href || '#'}
                  style={buttonStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.9'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  {primaryCTA.text || 'Get Started'}
                </a>
              )}
              {secondaryCTA && (
                <a
                  href={secondaryCTA.href || '#'}
                  style={secondaryButtonStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = theme.colors.surface
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  {secondaryCTA.text || 'Learn More'}
                </a>
              )}
            </div>
          </div>
          
          {block.variant === 'split' && (
            <div className="flex items-center justify-center">
              <div 
                className="w-full h-64 rounded-lg flex items-center justify-center text-white"
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`,
                  borderRadius: `${theme.radius.lg}px`,
                }}
              >
                <span className="text-lg font-medium">Hero Image</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
'use client'

import { Block, FeaturesProps, ThemeTokens } from '@/lib/types'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'

interface PublishedFeaturesBlockProps {
  block: Block & { type: 'features' }
  theme: ThemeTokens
}

export function PublishedFeaturesBlock({ block, theme }: PublishedFeaturesBlockProps) {
  const props = block.props as FeaturesProps
  const { title, subtitle, features, layout, columns, textAnimation } = props
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

  const getLayoutClasses = () => {
    if (layout === 'list') {
      return 'space-y-8'
    }
    
    const colClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    }
    
    return `grid gap-8 ${colClasses[columns as keyof typeof colClasses] || colClasses[3]}`
  }

  const sectionStyle = {
    padding: '80px 16px',
    backgroundColor: block.variant === 'alternating' ? theme.colors.surface : theme.colors.background,
    fontFamily: theme.typography.fontFamily,
  }

  const defaultFeatures = [
    {
      id: '1',
      title: 'Easy to Use',
      description: 'Intuitive interface that anyone can master in minutes.',
      icon: 'zap'
    },
    {
      id: '2',
      title: 'Responsive Design',
      description: 'Looks great on all devices, from mobile to desktop.',
      icon: 'smartphone'
    },
    {
      id: '3',
      title: 'Fast Performance',
      description: 'Optimized for speed and performance.',
      icon: 'trending-up'
    }
  ]

  const displayFeatures = features?.length > 0 ? features : defaultFeatures

  const renderFeature = (feature: any, index: number) => {
    if (layout === 'list') {
      return (
        <div 
          key={feature.id} 
          className={`flex items-start space-x-6 ${
            index % 2 === 1 && block.variant === 'alternating' ? 'flex-row-reverse space-x-reverse' : ''
          }`}
        >
          <div className="flex-shrink-0">
            <div 
              className="w-16 h-16 rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: `${theme.colors.primary}20`,
                borderRadius: `${theme.radius.lg}px`,
              }}
            >
              <div 
                className="w-8 h-8"
                style={{ color: theme.colors.primary }}
              >
                ⚡
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h3 
              className="text-xl font-semibold mb-3"
              style={{ 
                color: theme.colors.text,
                fontFamily: theme.typography.fontFamily,
              }}
            >
              {feature.title || 'Feature Title'}
            </h3>
            <p 
              className="leading-relaxed"
              style={{ color: theme.colors.muted }}
            >
              {feature.description || 'Feature description goes here.'}
            </p>
          </div>
        </div>
      )
    }

    if (block.variant === 'cards') {
      return (
        <div 
          key={feature.id} 
          className="p-6 rounded-lg transition-all hover:shadow-lg"
          style={{
            backgroundColor: theme.colors.background,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: `${theme.radius.lg}px`,
            boxShadow: theme.shadow.sm,
          }}
        >
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
            style={{
              backgroundColor: `${theme.colors.primary}20`,
              borderRadius: `${theme.radius.md}px`,
            }}
          >
            <div style={{ color: theme.colors.primary }}>⚡</div>
          </div>
          <h3 
            className="text-lg font-semibold mb-2"
            style={{ 
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily,
            }}
          >
            {feature.title || 'Feature Title'}
          </h3>
          <p style={{ color: theme.colors.muted }}>
            {feature.description || 'Feature description goes here.'}
          </p>
        </div>
      )
    }

    return (
      <div key={feature.id} className="text-center">
        <div 
          className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4"
          style={{
            backgroundColor: `${theme.colors.primary}20`,
            borderRadius: `${theme.radius.lg}px`,
          }}
        >
          <div style={{ color: theme.colors.primary }}>⚡</div>
        </div>
        <h3 
          className="text-xl font-semibold mb-3"
          style={{ 
            color: theme.colors.text,
            fontFamily: theme.typography.fontFamily,
          }}
        >
          {feature.title || 'Feature Title'}
        </h3>
        <p style={{ color: theme.colors.muted }}>
          {feature.description || 'Feature description goes here.'}
        </p>
      </div>
    )
  }

  return (
    <section ref={ref} style={sectionStyle}>
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-16 ${getAnimationClasses()}`}>
          <h2 
            className="text-4xl font-bold mb-4"
            style={{ 
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily,
              animationDuration: `${textAnimation?.durationMs || 1000}ms`,
            }}
          >
            {title || 'Amazing Features'}
          </h2>
          {subtitle && (
            <p 
              className="text-xl max-w-2xl mx-auto"
              style={{ color: theme.colors.muted }}
            >
              {subtitle}
            </p>
          )}
        </div>

        <div className={getLayoutClasses()}>
          {displayFeatures.map((feature, index) => renderFeature(feature, index))}
        </div>
      </div>
    </section>
  )
}
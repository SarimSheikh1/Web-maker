'use client'

import { Block, PricingProps, ThemeTokens } from '@/lib/types'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'

interface PublishedPricingBlockProps {
  block: Block & { type: 'pricing' }
  theme: ThemeTokens
}

export function PublishedPricingBlock({ block, theme }: PublishedPricingBlockProps) {
  const props = block.props as PricingProps
  const { title, subtitle, plans, textAnimation } = props
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

  const defaultPlans = [
    {
      id: '1',
      name: 'Starter',
      price: '$9',
      period: 'month',
      description: 'Perfect for individuals getting started',
      features: [
        '5 websites',
        'Basic templates',
        'Email support',
        '1GB storage'
      ],
      highlighted: false,
      ctaText: 'Get Started',
      ctaHref: '#contact'
    },
    {
      id: '2',
      name: 'Professional',
      price: '$29',
      period: 'month',
      description: 'Best for growing businesses',
      features: [
        'Unlimited websites',
        'Premium templates',
        'Priority support',
        '10GB storage',
        'Custom domain',
        'Analytics'
      ],
      highlighted: true,
      ctaText: 'Get Started',
      ctaHref: '#contact'
    },
    {
      id: '3',
      name: 'Enterprise',
      price: '$99',
      period: 'month',
      description: 'For large organizations',
      features: [
        'Everything in Professional',
        'White-label solution',
        'Dedicated support',
        'Unlimited storage',
        'API access',
        'Team collaboration'
      ],
      highlighted: false,
      ctaText: 'Contact Sales',
      ctaHref: '#contact'
    }
  ]

  const displayPlans = plans?.length > 0 ? plans : defaultPlans

  const renderPlan = (plan: any) => {
    const isHighlighted = plan.highlighted
    
    return (
      <div
        key={plan.id}
        className={`relative p-8 rounded-lg ${isHighlighted ? 'transform scale-105' : ''}`}
        style={{
          backgroundColor: theme.colors.background,
          border: `2px solid ${isHighlighted ? theme.colors.primary : theme.colors.border}`,
          borderRadius: `${theme.radius.lg}px`,
          boxShadow: isHighlighted ? theme.shadow.lg : theme.shadow.sm,
        }}
      >
        {isHighlighted && (
          <div
            className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-medium"
            style={{
              backgroundColor: theme.colors.primary,
              color: theme.colors.background,
            }}
          >
            Most Popular
          </div>
        )}
        
        <div className="text-center">
          <h3
            className="text-2xl font-bold mb-2"
            style={{ color: theme.colors.text }}
          >
            {plan.name}
          </h3>
          <p
            className="mb-6"
            style={{ color: theme.colors.muted }}
          >
            {plan.description}
          </p>
          
          <div className="mb-8">
            <span
              className="text-4xl font-bold"
              style={{ color: theme.colors.text }}
            >
              {plan.price}
            </span>
            <span
              className="text-lg"
              style={{ color: theme.colors.muted }}
            >
              /{plan.period}
            </span>
          </div>
          
          <ul className="space-y-3 mb-8 text-left">
            {plan.features.map((feature: string, index: number) => (
              <li key={index} className="flex items-center">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center mr-3 text-sm"
                  style={{ backgroundColor: theme.colors.primary }}
                >
                  ✓
                </span>
                <span style={{ color: theme.colors.text }}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>
          
          <a
            href={plan.ctaHref || '#'}
            className="block w-full py-3 px-6 rounded-lg text-center font-medium transition-all hover:opacity-90"
            style={{
              backgroundColor: isHighlighted ? theme.colors.primary : 'transparent',
              color: isHighlighted ? theme.colors.background : theme.colors.primary,
              border: `2px solid ${theme.colors.primary}`,
              borderRadius: `${theme.radius.md}px`,
              textDecoration: 'none',
            }}
          >
            {plan.ctaText || 'Get Started'}
          </a>
        </div>
      </div>
    )
  }

  return (
    <section 
      ref={ref}
      className="py-20 px-4"
      style={{ 
        backgroundColor: theme.colors.background,
        fontFamily: theme.typography.fontFamily,
      }}
    >
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-16 ${getAnimationClasses()}`}>
          <h2 
            className="text-4xl font-bold mb-4"
            style={{ 
              color: theme.colors.text,
              animationDuration: `${textAnimation?.durationMs || 1000}ms`,
            }}
          >
            {title || 'Choose your plan'}
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {displayPlans.map((plan) => renderPlan(plan))}
        </div>
      </div>
    </section>
  )
}
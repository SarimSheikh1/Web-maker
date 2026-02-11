'use client'

import { Block, FAQProps, ThemeTokens } from '@/lib/types'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'

interface PublishedFAQBlockProps {
  block: Block & { type: 'faq' }
  theme: ThemeTokens
}

export function PublishedFAQBlock({ block, theme }: PublishedFAQBlockProps) {
  const props = block.props as FAQProps
  const { title, subtitle, faqs, layout, textAnimation } = props
  const [isAnimated, setIsAnimated] = useState(false)
  const [openFAQ, setOpenFAQ] = useState<string | null>(null)
  
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

  const defaultFAQs = [
    {
      id: '1',
      question: 'How easy is it to use?',
      answer: 'Our platform is designed to be intuitive and user-friendly. You can start building your website immediately with our drag-and-drop interface.'
    },
    {
      id: '2',
      question: 'Do I need coding skills?',
      answer: 'No coding skills required! Our visual editor allows you to create professional websites without writing a single line of code.'
    },
    {
      id: '3',
      question: 'Can I use my own domain?',
      answer: 'Yes, you can connect your own custom domain to any website you create with our platform.'
    },
    {
      id: '4',
      question: 'Is there customer support?',
      answer: 'We offer comprehensive customer support including documentation, tutorials, and direct support channels.'
    }
  ]

  const displayFAQs = faqs?.length > 0 ? faqs : defaultFAQs

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  const renderFAQ = (faq: any, index: number) => {
    const isOpen = openFAQ === faq.id
    
    if (layout === 'grid') {
      return (
        <div
          key={faq.id}
          className="p-6 rounded-lg"
          style={{
            backgroundColor: theme.colors.background,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: `${theme.radius.lg}px`,
            boxShadow: theme.shadow.sm,
          }}
        >
          <h3
            className="text-lg font-semibold mb-3"
            style={{ color: theme.colors.text }}
          >
            {faq.question}
          </h3>
          <p style={{ color: theme.colors.muted }}>
            {faq.answer}
          </p>
        </div>
      )
    }

    return (
      <div
        key={faq.id}
        className="border-b"
        style={{ borderColor: theme.colors.border }}
      >
        <button
          className="w-full py-6 text-left flex items-center justify-between"
          onClick={() => toggleFAQ(faq.id)}
          style={{ color: theme.colors.text }}
        >
          <span className="text-lg font-semibold pr-4">
            {faq.question}
          </span>
          <span
            className="text-2xl transition-transform"
            style={{
              transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
              color: theme.colors.primary,
            }}
          >
            +
          </span>
        </button>
        {isOpen && (
          <div className="pb-6">
            <p
              className="leading-relaxed"
              style={{ color: theme.colors.muted }}
            >
              {faq.answer}
            </p>
          </div>
        )}
      </div>
    )
  }

  const getLayoutClasses = () => {
    return layout === 'grid' 
      ? 'grid md:grid-cols-2 gap-6' 
      : 'max-w-3xl mx-auto'
  }

  return (
    <section 
      ref={ref}
      className="py-20 px-4"
      style={{ 
        backgroundColor: theme.colors.surface,
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
            {title || 'Frequently Asked Questions'}
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
          {displayFAQs.map((faq, index) => renderFAQ(faq, index))}
        </div>
      </div>
    </section>
  )
}
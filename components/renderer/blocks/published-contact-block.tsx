'use client'

import { Block, ContactProps, ThemeTokens } from '@/lib/types'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'

interface PublishedContactBlockProps {
  block: Block & { type: 'contact' }
  theme: ThemeTokens
}

export function PublishedContactBlock({ block, theme }: PublishedContactBlockProps) {
  const props = block.props as ContactProps
  const { title, subtitle, showForm, formFields, contactInfo, textAnimation } = props
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

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: `1px solid ${theme.colors.border}`,
    borderRadius: `${theme.radius.md}px`,
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    fontSize: '16px',
    fontFamily: theme.typography.fontFamily,
  }

  const buttonStyle = {
    backgroundColor: theme.colors.primary,
    color: theme.colors.background,
    border: 'none',
    padding: '12px 32px',
    borderRadius: `${theme.radius.md}px`,
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
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
      <div className="container mx-auto max-w-4xl">
        <div className={`text-center mb-12 ${getAnimationClasses()}`}>
          <h2 
            className="text-4xl font-bold mb-4"
            style={{ 
              color: theme.colors.text,
              animationDuration: `${textAnimation?.durationMs || 1000}ms`,
            }}
          >
            {title || 'Get in touch'}
          </h2>
          {subtitle && (
            <p 
              className="text-xl"
              style={{ color: theme.colors.muted }}
            >
              {subtitle}
            </p>
          )}
        </div>

        <div className={block.variant === 'split' ? 'grid md:grid-cols-2 gap-12' : ''}>
          {showForm !== false && (
            <div 
              className="p-8 rounded-lg"
              style={{ 
                backgroundColor: theme.colors.background,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: `${theme.radius.lg}px`,
                boxShadow: theme.shadow.sm,
              }}
            >
              <form className="space-y-6">
                {formFields?.name !== false && (
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2"
                      style={{ color: theme.colors.text }}
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      style={inputStyle}
                      placeholder="Your name"
                    />
                  </div>
                )}
                
                {formFields?.email !== false && (
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2"
                      style={{ color: theme.colors.text }}
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      style={inputStyle}
                      placeholder="your@email.com"
                    />
                  </div>
                )}
                
                {formFields?.subject && (
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2"
                      style={{ color: theme.colors.text }}
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      style={inputStyle}
                      placeholder="Subject"
                    />
                  </div>
                )}
                
                {formFields?.message !== false && (
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2"
                      style={{ color: theme.colors.text }}
                    >
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      style={{
                        ...inputStyle,
                        resize: 'vertical',
                      }}
                      placeholder="Your message..."
                    />
                  </div>
                )}
                
                <button
                  type="submit"
                  style={buttonStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.9'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1'
                  }}
                >
                  Send Message
                </button>
              </form>
            </div>
          )}

          {contactInfo && (block.variant === 'split' || !showForm) && (
            <div className="space-y-6">
              <h3 
                className="text-2xl font-semibold mb-6"
                style={{ color: theme.colors.text }}
              >
                Contact Information
              </h3>
              
              {contactInfo.email && (
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${theme.colors.primary}20` }}
                  >
                    <span style={{ color: theme.colors.primary }}>✉</span>
                  </div>
                  <div>
                    <p 
                      className="font-medium"
                      style={{ color: theme.colors.text }}
                    >
                      Email
                    </p>
                    <a 
                      href={`mailto:${contactInfo.email}`}
                      style={{ color: theme.colors.primary }}
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
              )}
              
              {contactInfo.phone && (
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${theme.colors.primary}20` }}
                  >
                    <span style={{ color: theme.colors.primary }}>📞</span>
                  </div>
                  <div>
                    <p 
                      className="font-medium"
                      style={{ color: theme.colors.text }}
                    >
                      Phone
                    </p>
                    <a 
                      href={`tel:${contactInfo.phone}`}
                      style={{ color: theme.colors.primary }}
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
              )}
              
              {contactInfo.address && (
                <div className="flex items-start space-x-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${theme.colors.primary}20` }}
                  >
                    <span style={{ color: theme.colors.primary }}>📍</span>
                  </div>
                  <div>
                    <p 
                      className="font-medium"
                      style={{ color: theme.colors.text }}
                    >
                      Address
                    </p>
                    <p style={{ color: theme.colors.muted }}>
                      {contactInfo.address}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
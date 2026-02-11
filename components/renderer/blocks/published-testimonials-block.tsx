'use client'

import { Block, TestimonialsProps, ThemeTokens } from '@/lib/types'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'

interface PublishedTestimonialsBlockProps {
  block: Block & { type: 'testimonials' }
  theme: ThemeTokens
}

export function PublishedTestimonialsBlock({ block, theme }: PublishedTestimonialsBlockProps) {
  const props = block.props as TestimonialsProps
  const { title, subtitle, testimonials, layout, showRatings, textAnimation } = props
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

  const defaultTestimonials = [
    {
      id: '1',
      content: 'This platform has completely transformed how we build websites. The ease of use is incredible!',
      author: 'Sarah Johnson',
      role: 'Marketing Director',
      company: 'TechCorp',
      rating: 5,
      avatar: ''
    },
    {
      id: '2',
      content: 'I was able to create a professional website in just a few hours. Highly recommended!',
      author: 'Mike Chen',
      role: 'Small Business Owner',
      company: 'Local Cafe',
      rating: 5,
      avatar: ''
    },
    {
      id: '3',
      content: 'The templates are beautiful and the customization options are endless.',
      author: 'Emily Davis',
      role: 'Freelance Designer',
      company: '',
      rating: 5,
      avatar: ''
    }
  ]

  const displayTestimonials = testimonials?.length > 0 ? testimonials : defaultTestimonials

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        style={{ 
          color: i < rating ? theme.colors.accent : theme.colors.border 
        }}
      >
        ★
      </span>
    ))
  }

  const renderTestimonial = (testimonial: any, index: number) => {
    return (
      <div
        key={testimonial.id}
        className="p-6 rounded-lg"
        style={{
          backgroundColor: theme.colors.background,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: `${theme.radius.lg}px`,
          boxShadow: theme.shadow.sm,
        }}
      >
        {showRatings && (
          <div className="flex mb-4 text-lg">
            {renderStars(testimonial.rating || 5)}
          </div>
        )}
        <blockquote 
          className="text-lg mb-6 leading-relaxed"
          style={{ color: theme.colors.text }}
        >
          "{testimonial.content}"
        </blockquote>
        <div className="flex items-center">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
            style={{ backgroundColor: theme.colors.primary }}
          >
            <span className="text-white font-semibold">
              {testimonial.author?.charAt(0) || 'A'}
            </span>
          </div>
          <div>
            <div 
              className="font-semibold"
              style={{ color: theme.colors.text }}
            >
              {testimonial.author}
            </div>
            <div style={{ color: theme.colors.muted }}>
              {testimonial.role}
              {testimonial.company && `, ${testimonial.company}`}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const getLayoutClasses = () => {
    switch (layout) {
      case 'carousel':
        return 'flex space-x-6 overflow-x-auto pb-4'
      case 'single':
        return 'max-w-2xl mx-auto'
      default:
        return 'grid md:grid-cols-2 lg:grid-cols-3 gap-8'
    }
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
            {title || 'What our customers say'}
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
          {displayTestimonials.map((testimonial, index) => renderTestimonial(testimonial, index))}
        </div>
      </div>
    </section>
  )
}
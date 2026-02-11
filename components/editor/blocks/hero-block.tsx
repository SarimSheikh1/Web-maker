'use client'

import { Block, HeroProps } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface HeroBlockProps {
  block: Block & { type: 'hero' }
}

export function HeroBlock({ block }: HeroBlockProps) {
  const props = block.props as HeroProps
  const { headline, subheadline, primaryCTA, secondaryCTA, backgroundImage, textAnimation } = props

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
    if (!textAnimation || textAnimation.type === 'none') return ''
    
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

  return (
    <section 
      className={cn(
        'relative py-20 px-4 overflow-hidden',
        backgroundImage && 'bg-cover bg-center bg-no-repeat'
      )}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/40" />
      )}
      
      <div className="container mx-auto relative z-10">
        <div className={getVariantClasses()}>
          <div className={block.variant === 'split' ? 'space-y-6' : 'max-w-4xl mx-auto space-y-6'}>
            <h1 className={cn(
              'text-4xl md:text-6xl font-bold leading-tight',
              backgroundImage ? 'text-white' : 'text-gray-900',
              getAnimationClasses()
            )}>
              {headline || 'Your Amazing Headline'}
            </h1>
            
            <p className={cn(
              'text-xl leading-relaxed max-w-2xl',
              block.variant === 'split' ? '' : 'mx-auto',
              backgroundImage ? 'text-gray-100' : 'text-gray-600'
            )}>
              {subheadline || 'A compelling subheadline that explains your value proposition and encourages visitors to take action.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {primaryCTA && (
                <Button size="lg" className="text-lg px-8 py-4">
                  {primaryCTA.text || 'Get Started'}
                </Button>
              )}
              {secondaryCTA && (
                <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                  {secondaryCTA.text || 'Learn More'}
                </Button>
              )}
            </div>
          </div>
          
          {block.variant === 'split' && (
            <div className="flex items-center justify-center">
              <div className="w-full h-64 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white">
                <span className="text-lg font-medium">Hero Image</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
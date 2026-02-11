'use client'

import { Block, FeaturesProps } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { 
  Palette, 
  Monitor, 
  Zap, 
  Code, 
  Users, 
  Star,
  Heart,
  Shield,
  Smartphone,
  Globe,
  Settings,
  TrendingUp
} from 'lucide-react'

interface FeaturesBlockProps {
  block: Block & { type: 'features' }
}

const iconMap = {
  palette: Palette,
  monitor: Monitor,
  zap: Zap,
  code: Code,
  users: Users,
  star: Star,
  heart: Heart,
  shield: Shield,
  smartphone: Smartphone,
  globe: Globe,
  settings: Settings,
  'trending-up': TrendingUp,
}

export function FeaturesBlock({ block }: FeaturesBlockProps) {
  const props = block.props as FeaturesProps
  const { title, subtitle, features, layout, columns, textAnimation } = props

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

  const getVariantClasses = () => {
    switch (block.variant) {
      case 'cards':
        return 'bg-white'
      case 'alternating':
        return 'bg-gray-50'
      case 'minimal':
        return 'bg-white'
      default:
        return 'bg-white'
    }
  }

  const getAnimationClasses = () => {
    if (!textAnimation || textAnimation.type === 'none') return ''
    
    switch (textAnimation.type) {
      case 'fadeUp':
        return 'animate-fade-up'
      case 'blurIn':
        return 'animate-blur-in'
      default:
        return ''
    }
  }

  const renderFeature = (feature: any, index: number) => {
    const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Star

    if (layout === 'list') {
      return (
        <div key={feature.id} className={cn(
          'flex items-start space-x-6',
          index % 2 === 1 && block.variant === 'alternating' && 'flex-row-reverse space-x-reverse'
        )}>
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
              <IconComponent className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {feature.title || 'Feature Title'}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {feature.description || 'Feature description goes here. Explain the benefits and value this feature provides to your users.'}
            </p>
          </div>
        </div>
      )
    }

    if (block.variant === 'cards') {
      return (
        <Card key={feature.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <IconComponent className="w-6 h-6 text-blue-600" />
            </div>
            <CardTitle className="text-lg">
              {feature.title || 'Feature Title'}
            </CardTitle>
            <CardDescription className="text-base">
              {feature.description || 'Feature description goes here.'}
            </CardDescription>
          </CardHeader>
        </Card>
      )
    }

    return (
      <div key={feature.id} className="text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
          <IconComponent className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {feature.title || 'Feature Title'}
        </h3>
        <p className="text-gray-600">
          {feature.description || 'Feature description goes here.'}
        </p>
      </div>
    )
  }

  return (
    <section className={cn('py-20 px-4', getVariantClasses())}>
      <div className="container mx-auto">
        <div className={cn('text-center mb-16', getAnimationClasses())}>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {title || 'Amazing Features'}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className={getLayoutClasses()}>
          {features?.length > 0 ? (
            features.map((feature, index) => renderFeature(feature, index))
          ) : (
            // Default features when none are provided
            [
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
            ].map((feature, index) => renderFeature(feature, index))
          )}
        </div>
      </div>
    </section>
  )
}
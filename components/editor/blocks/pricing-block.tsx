'use client'

import { Block, PricingProps } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface PricingBlockProps {
  block: Block & { type: 'pricing' }
}

export function PricingBlock({ block }: PricingBlockProps) {
  const props = block.props as PricingProps
  const { title, subtitle, plans, showAnnualToggle } = props

  const defaultPlans = [
    {
      id: '1',
      name: 'Starter',
      price: '$9',
      period: 'month',
      description: 'Perfect for individuals getting started',
      features: [
        'Up to 3 projects',
        'Basic templates',
        'Email support',
        '1GB storage'
      ],
      highlighted: false,
      ctaText: 'Get Started',
      ctaHref: '#',
    },
    {
      id: '2',
      name: 'Professional',
      price: '$29',
      period: 'month',
      description: 'Best for growing businesses',
      features: [
        'Unlimited projects',
        'Premium templates',
        'Priority support',
        '10GB storage',
        'Custom domain',
        'Analytics'
      ],
      highlighted: true,
      ctaText: 'Start Free Trial',
      ctaHref: '#',
    },
    {
      id: '3',
      name: 'Enterprise',
      price: '$99',
      period: 'month',
      description: 'For large organizations',
      features: [
        'Everything in Professional',
        'Advanced integrations',
        'Dedicated support',
        'Unlimited storage',
        'White-label options',
        'API access'
      ],
      highlighted: false,
      ctaText: 'Contact Sales',
      ctaHref: '#',
    },
  ]

  const displayPlans = plans?.length > 0 ? plans : defaultPlans

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {title || 'Choose Your Plan'}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              {subtitle}
            </p>
          )}
          
          {showAnnualToggle && (
            <div className="inline-flex items-center bg-gray-100 rounded-lg p-1">
              <button className="px-4 py-2 text-sm font-medium text-gray-600 rounded-md">
                Monthly
              </button>
              <button className="px-4 py-2 text-sm font-medium bg-white text-gray-900 rounded-md shadow-sm">
                Annual (Save 20%)
              </button>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {displayPlans.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                'relative border-2 transition-all hover:shadow-lg',
                plan.highlighted
                  ? 'border-blue-500 shadow-lg scale-105'
                  : 'border-gray-200'
              )}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500 text-white">Most Popular</Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-bold">
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
                <p className="text-gray-600 mt-2">
                  {plan.description}
                </p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  className={cn(
                    'w-full',
                    plan.highlighted
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-gray-900 hover:bg-gray-800'
                  )}
                >
                  {plan.ctaText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
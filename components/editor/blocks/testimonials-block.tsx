'use client'

import { Block, TestimonialsProps } from '@/lib/types'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Star, Quote } from 'lucide-react'

interface TestimonialsBlockProps {
  block: Block & { type: 'testimonials' }
}

export function TestimonialsBlock({ block }: TestimonialsBlockProps) {
  const props = block.props as TestimonialsProps
  const { title, subtitle, testimonials, layout, showRatings } = props

  const defaultTestimonials = [
    {
      id: '1',
      content: 'This product has completely transformed how we work. The interface is intuitive and the results are amazing.',
      author: 'Sarah Johnson',
      role: 'CEO',
      company: 'TechCorp',
      rating: 5,
    },
    {
      id: '2',
      content: 'Outstanding service and support. The team went above and beyond to ensure our success.',
      author: 'Michael Chen',
      role: 'Marketing Director',
      company: 'Growth Inc',
      rating: 5,
    },
    {
      id: '3',
      content: 'I highly recommend this to anyone looking for a reliable and powerful solution.',
      author: 'Emily Davis',
      role: 'Product Manager',
      company: 'Innovation Labs',
      rating: 5,
    },
  ]

  const displayTestimonials = testimonials?.length > 0 ? testimonials : defaultTestimonials

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              'w-4 h-4',
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            )}
          />
        ))}
      </div>
    )
  }

  const renderTestimonial = (testimonial: any) => (
    <Card key={testimonial.id} className="border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="mb-4">
          <Quote className="w-8 h-8 text-blue-600 mb-4" />
          <p className="text-gray-700 leading-relaxed">
            "{testimonial.content}"
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-gray-900">
              {testimonial.author}
            </div>
            <div className="text-sm text-gray-600">
              {testimonial.role}
              {testimonial.company && ` at ${testimonial.company}`}
            </div>
          </div>
          
          {showRatings && (
            <div className="flex-shrink-0">
              {renderStars(testimonial.rating)}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )

  const getLayoutClasses = () => {
    switch (layout) {
      case 'carousel':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
      case 'single':
        return 'max-w-2xl mx-auto'
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
    }
  }

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {title || 'What Our Customers Say'}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className={getLayoutClasses()}>
          {layout === 'single' ? (
            renderTestimonial(displayTestimonials[0])
          ) : (
            displayTestimonials.map(renderTestimonial)
          )}
        </div>
      </div>
    </section>
  )
}
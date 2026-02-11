'use client'

import { Block, LogosProps } from '@/lib/types'
import { cn } from '@/lib/utils'

interface LogosBlockProps {
  block: Block & { type: 'logos' }
}

export function LogosBlock({ block }: LogosBlockProps) {
  const props = block.props as LogosProps
  const { title, logos, showTitle, grayscale } = props

  const defaultLogos = [
    { id: '1', name: 'Company 1', image: '/api/placeholder/120/60', url: '#' },
    { id: '2', name: 'Company 2', image: '/api/placeholder/120/60', url: '#' },
    { id: '3', name: 'Company 3', image: '/api/placeholder/120/60', url: '#' },
    { id: '4', name: 'Company 4', image: '/api/placeholder/120/60', url: '#' },
    { id: '5', name: 'Company 5', image: '/api/placeholder/120/60', url: '#' },
    { id: '6', name: 'Company 6', image: '/api/placeholder/120/60', url: '#' },
  ]

  const displayLogos = logos?.length > 0 ? logos : defaultLogos

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        {showTitle && (
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-gray-900">
              {title || 'Trusted by leading companies'}
            </h2>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {displayLogos.map((logo) => (
            <div
              key={logo.id}
              className="flex items-center justify-center p-4"
            >
              {logo.url ? (
                <a
                  href={logo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div
                    className={cn(
                      'w-24 h-12 bg-gray-300 rounded flex items-center justify-center transition-opacity hover:opacity-80',
                      grayscale && 'grayscale hover:grayscale-0'
                    )}
                  >
                    <span className="text-xs font-medium text-gray-600">
                      {logo.name}
                    </span>
                  </div>
                </a>
              ) : (
                <div
                  className={cn(
                    'w-24 h-12 bg-gray-300 rounded flex items-center justify-center',
                    grayscale && 'grayscale'
                  )}
                >
                  <span className="text-xs font-medium text-gray-600">
                    {logo.name}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
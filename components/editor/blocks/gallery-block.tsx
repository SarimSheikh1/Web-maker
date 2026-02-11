'use client'

import { Block, GalleryProps } from '@/lib/types'
import { cn } from '@/lib/utils'

interface GalleryBlockProps {
  block: Block & { type: 'gallery' }
}

export function GalleryBlock({ block }: GalleryBlockProps) {
  const props = block.props as GalleryProps
  const { title, subtitle, images, layout, columns, showCaptions } = props

  const getGridClasses = () => {
    const colClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      5: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5',
      6: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-6',
    }
    
    return `grid gap-6 ${colClasses[columns as keyof typeof colClasses] || colClasses[3]}`
  }

  const defaultImages = [
    { id: '1', src: '/api/placeholder/400/300', alt: 'Gallery Image 1', caption: 'Beautiful landscape' },
    { id: '2', src: '/api/placeholder/400/400', alt: 'Gallery Image 2', caption: 'Architecture detail' },
    { id: '3', src: '/api/placeholder/400/500', alt: 'Gallery Image 3', caption: 'Urban photography' },
    { id: '4', src: '/api/placeholder/400/350', alt: 'Gallery Image 4', caption: 'Nature scene' },
    { id: '5', src: '/api/placeholder/400/450', alt: 'Gallery Image 5', caption: 'Street art' },
    { id: '6', src: '/api/placeholder/400/300', alt: 'Gallery Image 6', caption: 'Portrait' },
  ]

  const displayImages = images?.length > 0 ? images : defaultImages

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {title || 'Gallery'}
            </h2>
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className={getGridClasses()}>
          {displayImages.map((image) => (
            <div key={image.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg bg-gray-200 aspect-square">
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  <span className="text-gray-600 font-medium">Image</span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
              {showCaptions && image.caption && (
                <p className="mt-2 text-sm text-gray-600 text-center">
                  {image.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
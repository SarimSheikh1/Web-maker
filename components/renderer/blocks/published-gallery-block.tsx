'use client'

import { Block, GalleryProps, ThemeTokens } from '@/lib/types'

interface PublishedGalleryBlockProps {
  block: Block & { type: 'gallery' }
  theme: ThemeTokens
}

export function PublishedGalleryBlock({ block, theme }: PublishedGalleryBlockProps) {
  const props = block.props as GalleryProps
  const { title } = props

  return (
    <section 
      className="py-20 px-4"
      style={{ 
        backgroundColor: theme.colors.background,
        fontFamily: theme.typography.fontFamily,
      }}
    >
      <div className="container mx-auto max-w-6xl text-center">
        <h2 
          className="text-4xl font-bold mb-16"
          style={{ color: theme.colors.text }}
        >
          {title || 'Gallery'}
        </h2>
        <p style={{ color: theme.colors.muted }}>Gallery will be rendered here</p>
      </div>
    </section>
  )
}
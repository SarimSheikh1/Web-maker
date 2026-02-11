'use client'

import { Block, LogosProps, ThemeTokens } from '@/lib/types'

interface PublishedLogosBlockProps {
  block: Block & { type: 'logos' }
  theme: ThemeTokens
}

export function PublishedLogosBlock({ block, theme }: PublishedLogosBlockProps) {
  const props = block.props as LogosProps
  const { title } = props

  return (
    <section 
      className="py-16 px-4"
      style={{ 
        backgroundColor: theme.colors.surface,
        fontFamily: theme.typography.fontFamily,
      }}
    >
      <div className="container mx-auto max-w-6xl text-center">
        <h2 
          className="text-2xl font-semibold mb-12"
          style={{ color: theme.colors.text }}
        >
          {title || 'Trusted by leading companies'}
        </h2>
        <p style={{ color: theme.colors.muted }}>Logos will be rendered here</p>
      </div>
    </section>
  )
}
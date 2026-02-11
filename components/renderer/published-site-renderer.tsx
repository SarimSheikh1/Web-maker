'use client'

import { Block, ThemeTokens } from '@/lib/types'
import { themePresets } from '@/lib/types/theme'
import { PublishedBlockRenderer } from './published-block-renderer'

interface PublishedSiteRendererProps {
  project: {
    id: string
    name: string
    slug: string
  }
  page: {
    id: string
    name: string
    path: string
    metaTitle?: string
    metaDescription?: string
    blocks: Block[]
  }
  theme?: ThemeTokens
}

export function PublishedSiteRenderer({ project, page, theme }: PublishedSiteRendererProps) {
  const currentTheme = theme || themePresets.default

  // Apply theme CSS variables
  const themeStyles = {
    '--color-primary': currentTheme.colors.primary,
    '--color-secondary': currentTheme.colors.secondary,
    '--color-background': currentTheme.colors.background,
    '--color-surface': currentTheme.colors.surface,
    '--color-text': currentTheme.colors.text,
    '--color-muted': currentTheme.colors.muted,
    '--color-border': currentTheme.colors.border,
    '--color-accent': currentTheme.colors.accent,
    '--font-family': currentTheme.typography.fontFamily,
    '--font-size-base': `${currentTheme.typography.baseSize}px`,
    '--heading-scale': currentTheme.typography.headingScale,
    '--radius-sm': `${currentTheme.radius.sm}px`,
    '--radius-md': `${currentTheme.radius.md}px`,
    '--radius-lg': `${currentTheme.radius.lg}px`,
    '--shadow-sm': currentTheme.shadow.sm,
    '--shadow-md': currentTheme.shadow.md,
    '--shadow-lg': currentTheme.shadow.lg,
  } as React.CSSProperties

  return (
    <div 
      className="min-h-screen"
      style={{
        ...themeStyles,
        fontFamily: currentTheme.typography.fontFamily,
        fontSize: `${currentTheme.typography.baseSize}px`,
        backgroundColor: currentTheme.colors.background,
        color: currentTheme.colors.text,
      }}
    >
      {page.blocks.map((block) => (
        <PublishedBlockRenderer
          key={block.id}
          block={block}
          theme={currentTheme}
        />
      ))}
    </div>
  )
}
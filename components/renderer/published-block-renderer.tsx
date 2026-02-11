'use client'

import { Block, ThemeTokens } from '@/lib/types'
import { PublishedNavbarBlock } from './blocks/published-navbar-block'
import { PublishedHeroBlock } from './blocks/published-hero-block'
import { PublishedFeaturesBlock } from './blocks/published-features-block'
import { PublishedContactBlock } from './blocks/published-contact-block'
import { PublishedFooterBlock } from './blocks/published-footer-block'
import { PublishedGalleryBlock } from './blocks/published-gallery-block'
import { PublishedTestimonialsBlock } from './blocks/published-testimonials-block'
import { PublishedPricingBlock } from './blocks/published-pricing-block'
import { PublishedFAQBlock } from './blocks/published-faq-block'
import { PublishedLogosBlock } from './blocks/published-logos-block'

interface PublishedBlockRendererProps {
  block: Block
  theme: ThemeTokens
}

export function PublishedBlockRenderer({ block, theme }: PublishedBlockRendererProps) {
  const blockStyle = {
    backgroundColor: block.style?.backgroundColor,
    color: block.style?.textColor,
    ...block.style,
  }

  const renderBlock = () => {
    switch (block.type) {
      case 'navbar':
        return <PublishedNavbarBlock block={block} theme={theme} />
      case 'hero':
        return <PublishedHeroBlock block={block} theme={theme} />
      case 'features':
        return <PublishedFeaturesBlock block={block} theme={theme} />
      case 'gallery':
        return <PublishedGalleryBlock block={block} theme={theme} />
      case 'testimonials':
        return <PublishedTestimonialsBlock block={block} theme={theme} />
      case 'pricing':
        return <PublishedPricingBlock block={block} theme={theme} />
      case 'faq':
        return <PublishedFAQBlock block={block} theme={theme} />
      case 'contact':
        return <PublishedContactBlock block={block} theme={theme} />
      case 'logos':
        return <PublishedLogosBlock block={block} theme={theme} />
      case 'footer':
        return <PublishedFooterBlock block={block} theme={theme} />
      default:
        return null
    }
  }

  return (
    <div style={blockStyle}>
      {renderBlock()}
    </div>
  )
}
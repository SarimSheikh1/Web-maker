'use client'

import { Block } from '@/lib/types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/lib/utils'
import { GripVertical, Trash2, Copy, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEditor } from './editor-provider'

// Block components
import { NavbarBlock } from './blocks/navbar-block'
import { HeroBlock } from './blocks/hero-block'
import { FeaturesBlock } from './blocks/features-block'
import { GalleryBlock } from './blocks/gallery-block'
import { TestimonialsBlock } from './blocks/testimonials-block'
import { PricingBlock } from './blocks/pricing-block'
import { FAQBlock } from './blocks/faq-block'
import { ContactBlock } from './blocks/contact-block'
import { LogosBlock } from './blocks/logos-block'
import { FooterBlock } from './blocks/footer-block'

interface BlockRendererProps {
  block: Block
  isSelected: boolean
  isDragging: boolean
  onClick: () => void
}

export function BlockRenderer({ block, isSelected, isDragging, onClick }: BlockRendererProps) {
  const { deleteBlock } = useEditor()
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: block.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    deleteBlock(block.id)
  }

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation()
    // TODO: Implement block duplication
  }

  const renderBlock = () => {
    switch (block.type) {
      case 'navbar':
        return <NavbarBlock block={block} />
      case 'hero':
        return <HeroBlock block={block} />
      case 'features':
        return <FeaturesBlock block={block} />
      case 'gallery':
        return <GalleryBlock block={block} />
      case 'testimonials':
        return <TestimonialsBlock block={block} />
      case 'pricing':
        return <PricingBlock block={block} />
      case 'faq':
        return <FAQBlock block={block} />
      case 'contact':
        return <ContactBlock block={block} />
      case 'logos':
        return <LogosBlock block={block} />
      case 'footer':
        return <FooterBlock block={block} />
      default:
        return (
          <div className="p-8 text-center bg-gray-50 border-2 border-dashed border-gray-300">
            <p className="text-gray-600">Unknown block type: {block.type}</p>
          </div>
        )
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'group relative',
        isSelected && 'ring-2 ring-blue-500 ring-offset-2',
        isSortableDragging && 'opacity-50'
      )}
      onClick={onClick}
    >
      {/* Block Controls */}
      {isSelected && (
        <div className="absolute -top-10 left-0 z-10 flex items-center space-x-1 bg-blue-500 text-white px-2 py-1 rounded text-xs">
          <span className="font-medium capitalize">{block.type}</span>
          <div className="flex items-center space-x-1 ml-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-white hover:bg-blue-600"
              {...attributes}
              {...listeners}
            >
              <GripVertical className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-white hover:bg-blue-600"
              onClick={handleDuplicate}
            >
              <Copy className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-white hover:bg-red-600"
              onClick={handleDelete}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      )}

      {/* Hover Outline */}
      <div
        className={cn(
          'absolute inset-0 pointer-events-none transition-all',
          !isSelected && 'group-hover:ring-1 group-hover:ring-blue-300'
        )}
      />

      {/* Block Content */}
      <div className="relative">
        {renderBlock()}
      </div>
    </div>
  )
}
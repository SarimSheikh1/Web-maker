'use client'

import { Block, NavbarProps } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react'

interface NavbarBlockProps {
  block: Block & { type: 'navbar' }
}

export function NavbarBlock({ block }: NavbarBlockProps) {
  const props = block.props as NavbarProps
  const { logo, links, showCTA, ctaText, ctaHref, sticky } = props

  const getVariantClasses = () => {
    switch (block.variant) {
      case 'transparent':
        return 'bg-transparent'
      case 'centered':
        return 'bg-white border-b'
      default:
        return 'bg-white border-b'
    }
  }

  return (
    <nav className={cn('px-4 py-4', getVariantClasses())}>
      <div className="container mx-auto">
        <div className={cn(
          'flex items-center justify-between',
          block.variant === 'centered' && 'flex-col space-y-4 md:flex-row md:space-y-0'
        )}>
          {/* Logo */}
          <div className="flex items-center space-x-2">
            {logo?.image ? (
              <img src={logo.image} alt={logo.text} className="h-8 w-auto" />
            ) : (
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {logo?.text?.charAt(0) || 'L'}
                </span>
              </div>
            )}
            <span className="text-xl font-bold text-gray-900">
              {logo?.text || 'Logo'}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links?.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
                target={link.isExternal ? '_blank' : undefined}
                rel={link.isExternal ? 'noopener noreferrer' : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            {showCTA && (
              <Button>
                {ctaText || 'Get Started'}
              </Button>
            )}
            
            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 pt-4 border-t">
          <div className="flex flex-col space-y-2">
            {links?.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium py-2"
                target={link.isExternal ? '_blank' : undefined}
                rel={link.isExternal ? 'noopener noreferrer' : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
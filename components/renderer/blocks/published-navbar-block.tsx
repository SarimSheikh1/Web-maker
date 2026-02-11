'use client'

import { Block, NavbarProps, ThemeTokens } from '@/lib/types'
import { useState } from 'react'

interface PublishedNavbarBlockProps {
  block: Block & { type: 'navbar' }
  theme: ThemeTokens
}

export function PublishedNavbarBlock({ block, theme }: PublishedNavbarBlockProps) {
  const props = block.props as NavbarProps
  const { logo, links, showCTA, ctaText, ctaHref, sticky } = props
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const getVariantStyles = () => {
    switch (block.variant) {
      case 'transparent':
        return {
          backgroundColor: 'transparent',
          borderBottom: 'none',
        }
      case 'centered':
        return {
          backgroundColor: theme.colors.background,
          borderBottom: `1px solid ${theme.colors.border}`,
        }
      default:
        return {
          backgroundColor: theme.colors.background,
          borderBottom: `1px solid ${theme.colors.border}`,
        }
    }
  }

  const navStyle = {
    ...getVariantStyles(),
    padding: '16px',
    position: sticky ? 'sticky' as const : 'relative' as const,
    top: sticky ? 0 : 'auto',
    zIndex: 50,
    fontFamily: theme.typography.fontFamily,
  }

  const linkStyle = {
    color: theme.colors.text,
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.2s ease',
  }

  const ctaButtonStyle = {
    backgroundColor: theme.colors.primary,
    color: theme.colors.background,
    padding: '8px 16px',
    borderRadius: `${theme.radius.md}px`,
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    border: 'none',
    cursor: 'pointer',
  }

  return (
    <nav style={navStyle}>
      <div className="container mx-auto max-w-6xl">
        <div 
          className={`flex items-center justify-between ${
            block.variant === 'centered' ? 'flex-col space-y-4 md:flex-row md:space-y-0' : ''
          }`}
        >
          {/* Logo */}
          <div className="flex items-center space-x-2">
            {logo?.image ? (
              <img src={logo.image} alt={logo.text} className="h-8 w-auto" />
            ) : (
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`,
                }}
              >
                <span className="text-white font-bold text-sm">
                  {logo?.text?.charAt(0) || 'L'}
                </span>
              </div>
            )}
            <span 
              className="text-xl font-bold"
              style={{ 
                color: theme.colors.text,
                fontFamily: theme.typography.fontFamily,
              }}
            >
              {logo?.text || 'Logo'}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links?.map((link) => (
              <a
                key={link.id}
                href={link.href}
                style={linkStyle}
                target={link.isExternal ? '_blank' : undefined}
                rel={link.isExternal ? 'noopener noreferrer' : undefined}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme.colors.primary
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = theme.colors.text
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {showCTA && (
              <a
                href={ctaHref || '#'}
                style={ctaButtonStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.9'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {ctaText || 'Get Started'}
              </a>
            )}
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ color: theme.colors.text }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div 
            className="md:hidden mt-4 pt-4"
            style={{ borderTop: `1px solid ${theme.colors.border}` }}
          >
            <div className="flex flex-col space-y-2">
              {links?.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="py-2"
                  style={linkStyle}
                  target={link.isExternal ? '_blank' : undefined}
                  rel={link.isExternal ? 'noopener noreferrer' : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
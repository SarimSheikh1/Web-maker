'use client'

import { Block, FooterProps, ThemeTokens } from '@/lib/types'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'

interface PublishedFooterBlockProps {
  block: Block & { type: 'footer' }
  theme: ThemeTokens
}

export function PublishedFooterBlock({ block, theme }: PublishedFooterBlockProps) {
  const props = block.props as FooterProps
  const { logo, description, links, socialLinks, showNewsletter, copyright, textAnimation } = props
  const [isAnimated, setIsAnimated] = useState(false)
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: textAnimation?.once !== false,
  })

  useEffect(() => {
    if (inView && textAnimation?.type !== 'none') {
      const timer = setTimeout(() => {
        setIsAnimated(true)
      }, textAnimation?.delayMs || 0)
      
      return () => clearTimeout(timer)
    }
  }, [inView, textAnimation])

  const getAnimationClasses = () => {
    if (!textAnimation || textAnimation.type === 'none' || !isAnimated) return ''
    
    const prefersReducedMotion = typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) return ''
    
    switch (textAnimation.type) {
      case 'fadeUp':
        return 'animate-fade-up'
      case 'fadeDown':
        return 'animate-fade-down'
      case 'fadeLeft':
        return 'animate-fade-left'
      case 'fadeRight':
        return 'animate-fade-right'
      case 'blurIn':
        return 'animate-blur-in'
      case 'scaleIn':
        return 'animate-scale-in'
      case 'rotateIn':
        return 'animate-rotate-in'
      case 'slideUp':
        return 'animate-slide-up'
      case 'slideDown':
        return 'animate-slide-down'
      case 'flipIn':
        return 'animate-flip-in'
      case 'typewriter':
        return 'animate-typewriter'
      case 'gradientShimmer':
        return 'animate-gradient-shimmer'
      case 'rainbowShimmer':
        return 'animate-rainbow-shimmer'
      case 'bounceGentle':
        return 'animate-bounce-gentle'
      case 'pulseGlow':
        return 'animate-pulse-glow'
      case 'float':
        return 'animate-float'
      case 'wiggle':
        return 'animate-wiggle'
      default:
        return ''
    }
  }

  const defaultLinks = [
    {
      id: '1',
      title: 'Product',
      links: [
        { id: '1', label: 'Features', href: '#features', isExternal: false },
        { id: '2', label: 'Pricing', href: '#pricing', isExternal: false },
        { id: '3', label: 'Templates', href: '#templates', isExternal: false },
      ]
    },
    {
      id: '2',
      title: 'Company',
      links: [
        { id: '1', label: 'About', href: '/about', isExternal: false },
        { id: '2', label: 'Contact', href: '/contact', isExternal: false },
        { id: '3', label: 'Blog', href: '/blog', isExternal: false },
      ]
    },
    {
      id: '3',
      title: 'Support',
      links: [
        { id: '1', label: 'Help Center', href: '/help', isExternal: false },
        { id: '2', label: 'Documentation', href: '/docs', isExternal: false },
        { id: '3', label: 'Community', href: '/community', isExternal: false },
      ]
    }
  ]

  const defaultSocialLinks = [
    { id: '1', platform: 'Twitter', url: '#', icon: '🐦' },
    { id: '2', platform: 'Facebook', url: '#', icon: '📘' },
    { id: '3', platform: 'LinkedIn', url: '#', icon: '💼' },
    { id: '4', platform: 'Instagram', url: '#', icon: '📷' },
  ]

  const displayLinks = links?.length > 0 ? links : defaultLinks
  const displaySocialLinks = socialLinks?.length > 0 ? socialLinks : defaultSocialLinks

  return (
    <footer 
      ref={ref}
      className="py-16 px-4"
      style={{ 
        backgroundColor: theme.colors.text,
        color: theme.colors.background,
        fontFamily: theme.typography.fontFamily,
      }}
    >
      <div className="container mx-auto max-w-6xl">
        <div className={`${getAnimationClasses()}`} style={{ animationDuration: `${textAnimation?.durationMs || 1000}ms` }}>
          {block.variant === 'minimal' ? (
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`,
                  }}
                >
                  <span className="text-white font-bold text-sm">
                    {logo?.text?.charAt(0) || 'S'}
                  </span>
                </div>
                <span className="text-xl font-bold">
                  {logo?.text || 'SiteCraft'}
                </span>
              </div>
              <p className="mb-8 opacity-80">
                {description || 'Build beautiful websites with ease'}
              </p>
              <div 
                className="pt-8 opacity-60"
                style={{ borderTop: `1px solid ${theme.colors.muted}` }}
              >
                <p>{copyright || '© 2024 SiteCraft. All rights reserved.'}</p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                <div className="lg:col-span-2">
                  <div className="flex items-center space-x-2 mb-4">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`,
                      }}
                    >
                      <span className="text-white font-bold text-sm">
                        {logo?.text?.charAt(0) || 'S'}
                      </span>
                    </div>
                    <span className="text-xl font-bold">
                      {logo?.text || 'SiteCraft'}
                    </span>
                  </div>
                  <p className="opacity-80 mb-6 max-w-md">
                    {description || 'Build beautiful websites with ease. No coding required.'}
                  </p>
                  
                  {showNewsletter && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Stay updated</h4>
                      <div className="flex">
                        <input
                          type="email"
                          placeholder="Enter your email"
                          className="flex-1 px-4 py-2 rounded-l-lg text-black"
                          style={{ borderRadius: `${theme.radius.md}px 0 0 ${theme.radius.md}px` }}
                        />
                        <button
                          className="px-6 py-2 rounded-r-lg font-medium"
                          style={{
                            backgroundColor: theme.colors.primary,
                            borderRadius: `0 ${theme.radius.md}px ${theme.radius.md}px 0`,
                          }}
                        >
                          Subscribe
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {displayLinks.map((linkGroup) => (
                  <div key={linkGroup.id}>
                    <h4 className="font-semibold mb-4">{linkGroup.title}</h4>
                    <ul className="space-y-2">
                      {linkGroup.links.map((link) => (
                        <li key={link.id}>
                          <a
                            href={link.href}
                            target={link.isExternal ? '_blank' : undefined}
                            rel={link.isExternal ? 'noopener noreferrer' : undefined}
                            className="opacity-80 hover:opacity-100 transition-opacity"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div 
                className="flex flex-col md:flex-row justify-between items-center pt-8"
                style={{ borderTop: `1px solid ${theme.colors.muted}` }}
              >
                <p className="opacity-60 mb-4 md:mb-0">
                  {copyright || '© 2024 SiteCraft. All rights reserved.'}
                </p>
                
                <div className="flex space-x-4">
                  {displaySocialLinks.map((social) => (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg flex items-center justify-center opacity-80 hover:opacity-100 transition-all hover:scale-110"
                      style={{
                        backgroundColor: `${theme.colors.primary}20`,
                      }}
                      title={social.platform}
                    >
                      <span>{social.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </footer>
  )
}
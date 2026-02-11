'use client'

import { Block, FooterProps } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail } from 'lucide-react'

interface FooterBlockProps {
  block: Block & { type: 'footer' }
}

const socialIconMap = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  github: Github,
  email: Mail,
}

export function FooterBlock({ block }: FooterBlockProps) {
  const props = block.props as FooterProps
  const { logo, description, links, socialLinks, showNewsletter, copyright } = props

  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              {logo?.image ? (
                <img src={logo.image} alt={logo.text} className="h-8 w-auto" />
              ) : (
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {logo?.text?.charAt(0) || 'L'}
                  </span>
                </div>
              )}
              <span className="text-xl font-bold">
                {logo?.text || 'Logo'}
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              {description || 'Building amazing websites with ease.'}
            </p>
            
            {/* Social Links */}
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const IconComponent = socialIconMap[social.icon as keyof typeof socialIconMap] || Mail
                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          {/* Links */}
          {links?.map((linkGroup) => (
            <div key={linkGroup.id}>
              <h3 className="font-semibold mb-4">{linkGroup.title}</h3>
              <ul className="space-y-2">
                {linkGroup.links.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                      target={link.isExternal ? '_blank' : undefined}
                      rel={link.isExternal ? 'noopener noreferrer' : undefined}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          {showNewsletter && (
            <div>
              <h3 className="font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">
                Subscribe to get updates and news.
              </p>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>{copyright || '© 2024 Your Company. All rights reserved.'}</p>
        </div>
      </div>
    </footer>
  )
}
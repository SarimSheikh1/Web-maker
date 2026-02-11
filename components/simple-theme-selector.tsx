'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Palette, Check } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'

export function SimpleThemeSelector() {
  const [currentTheme, setCurrentTheme] = useState('default')
  const [isOpen, setIsOpen] = useState(false)

  const themes = [
    { name: 'Default', key: 'default', colors: { bg: '#ffffff', text: '#1e293b', primary: '#3b82f6' } },
    { name: 'Dark', key: 'dark', colors: { bg: '#0f172a', text: '#f1f5f9', primary: '#60a5fa' } },
    { name: 'Neon', key: 'neon', colors: { bg: '#0a0a0a', text: '#00ffff', primary: '#ff00ff' } },
    { name: 'Ocean', key: 'ocean', colors: { bg: '#f0f9ff', text: '#0c4a6e', primary: '#0ea5e9' } },
    { name: 'Forest', key: 'forest', colors: { bg: '#f7fdf7', text: '#14532d', primary: '#16a34a' } },
    { name: 'Sunset', key: 'sunset', colors: { bg: '#fffbeb', text: '#9a3412', primary: '#f97316' } },
    { name: 'Royal', key: 'royal', colors: { bg: '#faf5ff', text: '#581c87', primary: '#7c3aed' } },
    { name: 'Cosmic', key: 'cosmic', colors: { bg: '#0f0f23', text: '#e2e8f0', primary: '#8b5cf6' } },
    { name: 'Retro', key: 'retro', colors: { bg: '#ffe66d', text: '#2d3436', primary: '#ff6b6b' } },
    { name: 'Arctic', key: 'arctic', colors: { bg: '#f8fafc', text: '#0f172a', primary: '#3b82f6' } },
    { name: 'Pastel', key: 'pastel', colors: { bg: '#fef7ff', text: '#374151', primary: '#f472b6' } },
    { name: 'Cyberpunk', key: 'cyberpunk', colors: { bg: '#000000', text: '#00ff41', primary: '#ff0080' } }
  ]

  const applyTheme = (theme: typeof themes[0]) => {
    const { colors } = theme
    
    // Apply CSS custom properties
    document.documentElement.style.setProperty('--theme-background', colors.bg)
    document.documentElement.style.setProperty('--theme-text', colors.text)
    document.documentElement.style.setProperty('--theme-primary', colors.primary)
    document.documentElement.style.setProperty('--theme-accent', colors.primary)
    document.documentElement.style.setProperty('--theme-surface', colors.bg)
    document.documentElement.style.setProperty('--theme-muted', colors.text + '80')
    document.documentElement.style.setProperty('--theme-border', colors.text + '20')
    document.documentElement.style.setProperty('--theme-secondary', colors.primary)
    document.documentElement.style.setProperty('--theme-success', '#10b981')
    document.documentElement.style.setProperty('--theme-warning', '#f59e0b')
    document.documentElement.style.setProperty('--theme-error', '#ef4444')
    
    // Add theme class to body
    document.body.className = document.body.className.replace(/theme-\w+/g, '')
    document.body.classList.add(`theme-${theme.key}`)
    
    // Save to localStorage
    localStorage.setItem('sitecraft-theme', theme.key)
    
    setCurrentTheme(theme.key)
    setIsOpen(false)
  }

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('sitecraft-theme')
    if (savedTheme) {
      const theme = themes.find(t => t.key === savedTheme)
      if (theme) {
        applyTheme(theme)
      }
    }
  }, [])

  const currentThemeData = themes.find(t => t.key === currentTheme) || themes[0]

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2">
          <Palette className="w-4 h-4" />
          <span>{currentThemeData.name}</span>
          <Badge variant="secondary">{themes.length}</Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Choose Theme</h4>
          <div className="grid grid-cols-3 gap-2">
            {themes.map((theme) => {
              const isActive = currentTheme === theme.key
              return (
                <button
                  key={theme.key}
                  onClick={() => applyTheme(theme)}
                  className={`
                    border-2 rounded-lg p-3 text-center text-xs font-medium
                    hover:scale-105 transition-all duration-200
                    ${isActive ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
                    relative
                  `}
                  style={{
                    backgroundColor: theme.colors.bg,
                    borderColor: theme.colors.primary,
                    color: theme.colors.text
                  }}
                >
                  {isActive && (
                    <Check className="w-3 h-3 absolute top-1 right-1 text-green-600" />
                  )}
                  {theme.name}
                </button>
              )
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
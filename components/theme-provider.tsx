'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { themePresets, ThemeTokens } from '@/lib/types/theme'

interface ThemeContextType {
  currentTheme: string
  themeTokens: ThemeTokens
  setTheme: (themeName: string) => void
  availableThemes: string[]
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: string
}

export function ThemeProvider({ children, defaultTheme = 'default' }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState(defaultTheme)
  const [themeTokens, setThemeTokens] = useState<ThemeTokens>(themePresets[defaultTheme])
  const [isClient, setIsClient] = useState(false)

  const availableThemes = Object.keys(themePresets)

  const setTheme = (themeName: string) => {
    if (themePresets[themeName]) {
      setCurrentTheme(themeName)
      setThemeTokens(themePresets[themeName])
      
      // Save to localStorage only on client
      if (isClient) {
        try {
          localStorage.setItem('sitecraft-theme', themeName)
        } catch (error) {
          console.warn('Failed to save theme to localStorage:', error)
        }
      }
      
      // Apply CSS custom properties to document root
      applyThemeToDocument(themePresets[themeName])
    }
  }

  const applyThemeToDocument = (tokens: ThemeTokens) => {
    if (typeof document === 'undefined') return
    
    try {
      const root = document.documentElement
      
      // Apply color variables
      root.style.setProperty('--theme-primary', tokens.colors.primary)
      root.style.setProperty('--theme-secondary', tokens.colors.secondary)
      root.style.setProperty('--theme-background', tokens.colors.background)
      root.style.setProperty('--theme-surface', tokens.colors.surface)
      root.style.setProperty('--theme-text', tokens.colors.text)
      root.style.setProperty('--theme-muted', tokens.colors.muted)
      root.style.setProperty('--theme-border', tokens.colors.border)
      root.style.setProperty('--theme-accent', tokens.colors.accent)
      root.style.setProperty('--theme-success', tokens.colors.success)
      root.style.setProperty('--theme-warning', tokens.colors.warning)
      root.style.setProperty('--theme-error', tokens.colors.error)
      
      // Apply typography
      root.style.setProperty('--theme-font-family', tokens.typography.fontFamily)
      root.style.setProperty('--theme-font-size', `${tokens.typography.baseSize}px`)
      root.style.setProperty('--theme-heading-scale', tokens.typography.headingScale.toString())
      
      // Apply radius
      root.style.setProperty('--theme-radius-sm', `${tokens.radius.sm}px`)
      root.style.setProperty('--theme-radius-md', `${tokens.radius.md}px`)
      root.style.setProperty('--theme-radius-lg', `${tokens.radius.lg}px`)
      
      // Apply shadows
      root.style.setProperty('--theme-shadow-sm', tokens.shadow.sm)
      root.style.setProperty('--theme-shadow-md', tokens.shadow.md)
      root.style.setProperty('--theme-shadow-lg', tokens.shadow.lg)
      
      // Apply spacing
      root.style.setProperty('--theme-spacing-xs', `${tokens.spacing.xs}px`)
      root.style.setProperty('--theme-spacing-sm', `${tokens.spacing.sm}px`)
      root.style.setProperty('--theme-spacing-md', `${tokens.spacing.md}px`)
      root.style.setProperty('--theme-spacing-lg', `${tokens.spacing.lg}px`)
      root.style.setProperty('--theme-spacing-xl', `${tokens.spacing.xl}px`)
      root.style.setProperty('--theme-spacing-2xl', `${tokens.spacing['2xl']}px`)
      root.style.setProperty('--theme-spacing-3xl', `${tokens.spacing['3xl']}px`)
      
      // Apply animation durations
      root.style.setProperty('--theme-duration-fast', `${tokens.animation.duration.fast}ms`)
      root.style.setProperty('--theme-duration-normal', `${tokens.animation.duration.normal}ms`)
      root.style.setProperty('--theme-duration-slow', `${tokens.animation.duration.slow}ms`)
      
      // Apply special theme classes to body
      if (document.body) {
        document.body.className = document.body.className.replace(/theme-\w+/g, '')
        document.body.classList.add(`theme-${currentTheme}`)
      }
    } catch (error) {
      console.warn('Failed to apply theme to document:', error)
    }
  }

  // Set client flag and load theme from localStorage on mount
  useEffect(() => {
    setIsClient(true)
    
    try {
      const savedTheme = localStorage.getItem('sitecraft-theme')
      if (savedTheme && themePresets[savedTheme]) {
        setTheme(savedTheme)
      } else {
        applyThemeToDocument(themeTokens)
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error)
      applyThemeToDocument(themeTokens)
    }
  }, [])

  // Apply theme whenever it changes
  useEffect(() => {
    if (isClient) {
      applyThemeToDocument(themeTokens)
    }
  }, [themeTokens, currentTheme, isClient])

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      themeTokens,
      setTheme,
      availableThemes
    }}>
      {children}
    </ThemeContext.Provider>
  )
}
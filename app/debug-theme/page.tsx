'use client'

import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export default function DebugTheme() {
  const [mounted, setMounted] = useState(false)
  const [cssVars, setCssVars] = useState<Record<string, string>>({})
  
  // This will throw an error if ThemeProvider is not working
  let themeContext
  try {
    themeContext = useTheme()
  } catch (error) {
    return (
      <div className="min-h-screen p-8 bg-red-100">
        <h1 className="text-2xl font-bold text-red-800 mb-4">Theme Provider Error</h1>
        <p className="text-red-600">Error: {(error as Error).message}</p>
        <p className="text-red-600 mt-2">The ThemeProvider is not wrapping this component properly.</p>
      </div>
    )
  }

  const { currentTheme, setTheme, availableThemes, themeTokens } = themeContext

  useEffect(() => {
    setMounted(true)
    
    // Read CSS variables from document
    const updateCssVars = () => {
      const root = document.documentElement
      const computedStyle = getComputedStyle(root)
      
      setCssVars({
        '--theme-primary': computedStyle.getPropertyValue('--theme-primary'),
        '--theme-background': computedStyle.getPropertyValue('--theme-background'),
        '--theme-text': computedStyle.getPropertyValue('--theme-text'),
        '--theme-accent': computedStyle.getPropertyValue('--theme-accent'),
      })
    }
    
    updateCssVars()
    
    // Update CSS vars when theme changes
    const interval = setInterval(updateCssVars, 1000)
    return () => clearInterval(interval)
  }, [currentTheme])

  if (!mounted) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen p-8" style={{
      backgroundColor: 'var(--theme-background, #ffffff)',
      color: 'var(--theme-text, #000000)',
      transition: 'all 0.5s ease'
    }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Theme Debug Page</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Theme Controls */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Theme Controls</h2>
            <p>Current Theme: <strong>{currentTheme}</strong></p>
            
            <div className="flex flex-wrap gap-2">
              {availableThemes.slice(0, 8).map((theme) => (
                <Button
                  key={theme}
                  onClick={() => setTheme(theme)}
                  variant={currentTheme === theme ? "default" : "outline"}
                  size="sm"
                >
                  {theme}
                </Button>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {availableThemes.slice(8).map((theme) => (
                <Button
                  key={theme}
                  onClick={() => setTheme(theme)}
                  variant={currentTheme === theme ? "default" : "outline"}
                  size="sm"
                >
                  {theme}
                </Button>
              ))}
            </div>
          </div>

          {/* Theme Information */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Theme Information</h2>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Theme Tokens:</h3>
              <div className="text-sm space-y-1">
                <div>Primary: {themeTokens.colors.primary}</div>
                <div>Background: {themeTokens.colors.background}</div>
                <div>Text: {themeTokens.colors.text}</div>
                <div>Accent: {themeTokens.colors.accent}</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">CSS Variables:</h3>
              <div className="text-sm space-y-1">
                {Object.entries(cssVars).map(([key, value]) => (
                  <div key={key}>
                    {key}: {value || 'not set'}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Visual Test Elements */}
        <div className="mt-8 space-y-4">
          <h2 className="text-2xl font-semibold">Visual Tests</h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div 
              className="p-4 rounded-lg border transition-all duration-500"
              style={{
                backgroundColor: 'var(--theme-surface, #f8fafc)',
                borderColor: 'var(--theme-border, #e2e8f0)'
              }}
            >
              Surface Color Box
            </div>
            
            <div 
              className="p-4 rounded-lg transition-all duration-500"
              style={{
                backgroundColor: 'var(--theme-primary, #3b82f6)',
                color: 'white'
              }}
            >
              Primary Color Box
            </div>
            
            <div 
              className="p-4 rounded-lg transition-all duration-500"
              style={{
                backgroundColor: 'var(--theme-accent, #f59e0b)',
                color: 'white'
              }}
            >
              Accent Color Box
            </div>
          </div>
        </div>

        {/* Test Buttons */}
        <div className="mt-8 space-y-4">
          <h2 className="text-2xl font-semibold">Button Tests</h2>
          <div className="flex gap-4">
            <Button>Default Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
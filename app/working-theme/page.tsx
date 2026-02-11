'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function WorkingTheme() {
  const [currentTheme, setCurrentTheme] = useState('default')

  const themes = {
    default: { bg: '#ffffff', text: '#1e293b', primary: '#3b82f6', name: 'Default' },
    dark: { bg: '#0f172a', text: '#f1f5f9', primary: '#60a5fa', name: 'Dark' },
    neon: { bg: '#0a0a0a', text: '#00ffff', primary: '#ff00ff', name: 'Neon' },
    ocean: { bg: '#f0f9ff', text: '#0c4a6e', primary: '#0ea5e9', name: 'Ocean' },
    forest: { bg: '#f7fdf7', text: '#14532d', primary: '#16a34a', name: 'Forest' },
    sunset: { bg: '#fffbeb', text: '#9a3412', primary: '#f97316', name: 'Sunset' },
    royal: { bg: '#faf5ff', text: '#581c87', primary: '#7c3aed', name: 'Royal' },
    cosmic: { bg: '#0f0f23', text: '#e2e8f0', primary: '#8b5cf6', name: 'Cosmic' },
    retro: { bg: '#ffe66d', text: '#2d3436', primary: '#ff6b6b', name: 'Retro' },
    arctic: { bg: '#f8fafc', text: '#0f172a', primary: '#3b82f6', name: 'Arctic' },
    pastel: { bg: '#fef7ff', text: '#374151', primary: '#f472b6', name: 'Pastel' },
    cyberpunk: { bg: '#000000', text: '#00ff41', primary: '#ff0080', name: 'Cyberpunk' }
  }

  const applyTheme = (themeKey: string) => {
    const theme = themes[themeKey as keyof typeof themes]
    if (theme) {
      // Apply CSS custom properties
      document.documentElement.style.setProperty('--theme-background', theme.bg)
      document.documentElement.style.setProperty('--theme-text', theme.text)
      document.documentElement.style.setProperty('--theme-primary', theme.primary)
      document.documentElement.style.setProperty('--theme-accent', theme.primary)
      document.documentElement.style.setProperty('--theme-surface', theme.bg)
      document.documentElement.style.setProperty('--theme-muted', theme.text + '80')
      document.documentElement.style.setProperty('--theme-border', theme.text + '20')
      
      // Update body class
      document.body.className = document.body.className.replace(/theme-\w+/g, '')
      document.body.classList.add(`theme-${themeKey}`)
      
      // Save to localStorage
      localStorage.setItem('sitecraft-theme', themeKey)
      
      setCurrentTheme(themeKey)
    }
  }

  return (
    <div 
      className="min-h-screen p-8 transition-all duration-500"
      style={{
        backgroundColor: 'var(--theme-background, #ffffff)',
        color: 'var(--theme-text, #1e293b)'
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">🎨 Working Theme System</h1>
          <p className="text-xl mb-8">Click any theme button to see instant changes!</p>
          <p className="text-lg">Current Theme: <strong>{themes[currentTheme as keyof typeof themes].name}</strong></p>
        </div>

        {/* Theme Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
          {Object.entries(themes).map(([key, theme]) => (
            <button
              key={key}
              onClick={() => applyTheme(key)}
              className={`
                p-4 rounded-lg border-2 text-center font-medium transition-all duration-300
                hover:scale-105 hover:shadow-lg
                ${currentTheme === key ? 'ring-4 ring-blue-500 ring-offset-2' : ''}
              `}
              style={{
                backgroundColor: theme.bg,
                color: theme.text,
                borderColor: theme.primary
              }}
            >
              {theme.name}
            </button>
          ))}
        </div>

        {/* Test Elements */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card 
            className="transition-all duration-500"
            style={{
              backgroundColor: 'var(--theme-surface, #f8fafc)',
              borderColor: 'var(--theme-border, #e2e8f0)',
              color: 'var(--theme-text, #1e293b)'
            }}
          >
            <CardHeader>
              <CardTitle>Surface Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p>This card uses theme surface color</p>
              <Button 
                className="mt-4"
                style={{
                  backgroundColor: 'var(--theme-primary, #3b82f6)',
                  color: 'white'
                }}
              >
                Primary Button
              </Button>
            </CardContent>
          </Card>

          <Card 
            className="transition-all duration-500"
            style={{
              backgroundColor: 'var(--theme-primary, #3b82f6)',
              color: 'white'
            }}
          >
            <CardHeader>
              <CardTitle>Primary Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p>This card uses theme primary color</p>
              <Button 
                variant="outline"
                className="mt-4"
                style={{
                  borderColor: 'white',
                  color: 'white'
                }}
              >
                Outline Button
              </Button>
            </CardContent>
          </Card>

          <Card 
            className="transition-all duration-500"
            style={{
              backgroundColor: 'var(--theme-accent, #f59e0b)',
              color: 'white'
            }}
          >
            <CardHeader>
              <CardTitle>Accent Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p>This card uses theme accent color</p>
              <Button 
                variant="ghost"
                className="mt-4 text-white hover:bg-white/20"
              >
                Ghost Button
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <div className="mt-12 text-center">
          <Card 
            className="max-w-2xl mx-auto transition-all duration-500"
            style={{
              backgroundColor: 'var(--theme-surface, #f8fafc)',
              borderColor: 'var(--theme-border, #e2e8f0)',
              color: 'var(--theme-text, #1e293b)'
            }}
          >
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">✅ Theme System Working!</h2>
              <div className="space-y-2 text-left">
                <p>• Click any theme button above to change colors instantly</p>
                <p>• All elements (background, text, cards, buttons) adapt to the theme</p>
                <p>• Theme preference is saved in localStorage</p>
                <p>• Smooth 500ms transitions between theme changes</p>
                <p>• 12 unique themes available: Default, Dark, Neon, Ocean, Forest, Sunset, Royal, Cosmic, Retro, Arctic, Pastel, Cyberpunk</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
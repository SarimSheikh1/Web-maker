'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function TestTheme() {
  const [currentTheme, setCurrentTheme] = useState('default')
  
  const themes = {
    default: {
      background: '#ffffff',
      text: '#1e293b',
      primary: '#3b82f6'
    },
    dark: {
      background: '#0f172a',
      text: '#f1f5f9',
      primary: '#60a5fa'
    },
    neon: {
      background: '#000000',
      text: '#00ffff',
      primary: '#ff00ff'
    }
  }

  const applyTheme = (themeName: string) => {
    const theme = themes[themeName as keyof typeof themes]
    if (theme) {
      setCurrentTheme(themeName)
      document.documentElement.style.setProperty('--test-bg', theme.background)
      document.documentElement.style.setProperty('--test-text', theme.text)
      document.documentElement.style.setProperty('--test-primary', theme.primary)
    }
  }

  return (
    <div 
      className="min-h-screen p-8 transition-all duration-500"
      style={{
        backgroundColor: 'var(--test-bg, #ffffff)',
        color: 'var(--test-text, #1e293b)'
      }}
    >
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Theme Test Page</h1>
        
        <div className="mb-8">
          <p className="mb-4">Current theme: <strong>{currentTheme}</strong></p>
          <div className="flex gap-4">
            <Button onClick={() => applyTheme('default')}>Default</Button>
            <Button onClick={() => applyTheme('dark')}>Dark</Button>
            <Button onClick={() => applyTheme('neon')}>Neon</Button>
          </div>
        </div>

        <div className="space-y-4">
          <div 
            className="p-4 rounded-lg border"
            style={{
              backgroundColor: 'var(--test-primary, #3b82f6)',
              color: 'white'
            }}
          >
            This box uses the primary color
          </div>
          
          <div className="p-4 rounded-lg border">
            This text should change color with the theme
          </div>
        </div>
      </div>
    </div>
  )
}
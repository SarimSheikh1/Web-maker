'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Star, Heart, Zap, Rocket, Palette, Code, Wand2 } from 'lucide-react'
import Link from 'next/link'

export default function AnimationShowcase() {
  const [activeAnimation, setActiveAnimation] = useState<string | null>(null)
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0)

  const themes = [
    { name: 'Default', colors: { primary: '#3b82f6', secondary: '#8b5cf6', accent: '#06b6d4', bg: 'from-blue-50 to-purple-50' } },
    { name: 'Dark', colors: { primary: '#1f2937', secondary: '#374151', accent: '#6b7280', bg: 'from-gray-900 to-gray-800' } },
    { name: 'Neon', colors: { primary: '#ff0080', secondary: '#00ff80', accent: '#8000ff', bg: 'from-pink-900 to-green-900' } },
    { name: 'Ocean', colors: { primary: '#0ea5e9', secondary: '#06b6d4', accent: '#0891b2', bg: 'from-blue-100 to-cyan-100' } },
    { name: 'Forest', colors: { primary: '#059669', secondary: '#10b981', accent: '#34d399', bg: 'from-green-100 to-emerald-100' } },
    { name: 'Sunset', colors: { primary: '#f97316', secondary: '#fb923c', accent: '#fdba74', bg: 'from-orange-100 to-yellow-100' } },
    { name: 'Royal', colors: { primary: '#7c3aed', secondary: '#a855f7', accent: '#c084fc', bg: 'from-purple-100 to-indigo-100' } },
    { name: 'Cosmic', colors: { primary: '#ec4899', secondary: '#f472b6', accent: '#f9a8d4', bg: 'from-pink-100 to-purple-100' } },
    { name: 'Retro', colors: { primary: '#eab308', secondary: '#f59e0b', accent: '#fbbf24', bg: 'from-yellow-100 to-amber-100' } },
    { name: 'Arctic', colors: { primary: '#0284c7', secondary: '#0ea5e9', accent: '#38bdf8', bg: 'from-sky-100 to-blue-100' } },
    { name: 'Pastel', colors: { primary: '#f472b6', secondary: '#a78bfa', accent: '#60a5fa', bg: 'from-pink-50 to-blue-50' } },
    { name: 'Cyberpunk', colors: { primary: '#ff00ff', secondary: '#00ffff', accent: '#ffff00', bg: 'from-fuchsia-900 to-cyan-900' } },
    { name: 'Minimal', colors: { primary: '#6b7280', secondary: '#9ca3af', accent: '#d1d5db', bg: 'from-gray-50 to-slate-50' } },
    { name: 'Vibrant', colors: { primary: '#dc2626', secondary: '#ea580c', accent: '#ca8a04', bg: 'from-red-100 to-orange-100' } },
    { name: 'Elegant', colors: { primary: '#1f2937', secondary: '#4b5563', accent: '#9ca3af', bg: 'from-slate-100 to-gray-100' } },
    { name: 'Modern', colors: { primary: '#0f172a', secondary: '#334155', accent: '#64748b', bg: 'from-slate-50 to-zinc-50' } },
    { name: 'Warm', colors: { primary: '#92400e', secondary: '#b45309', accent: '#d97706', bg: 'from-amber-50 to-orange-50' } }
  ]

  // Auto-change themes every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentThemeIndex((prev) => {
        const newIndex = (prev + 1) % themes.length
        
        // Apply theme to CSS custom properties
        const root = document.documentElement
        root.style.setProperty('--theme-primary', themes[newIndex].colors.primary)
        root.style.setProperty('--theme-secondary', themes[newIndex].colors.secondary)
        root.style.setProperty('--theme-accent', themes[newIndex].colors.accent)
        
        // Apply theme body class
        document.body.className = document.body.className.replace(/theme-\w+/g, '')
        document.body.classList.add(`theme-${themes[newIndex].name.toLowerCase()}`)
        
        return newIndex
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Apply initial theme
  useEffect(() => {
    const currentTheme = themes[currentThemeIndex]
    const root = document.documentElement
    root.style.setProperty('--theme-primary', currentTheme.colors.primary)
    root.style.setProperty('--theme-secondary', currentTheme.colors.secondary)
    root.style.setProperty('--theme-accent', currentTheme.colors.accent)
    
    // Apply initial theme body class
    document.body.className = document.body.className.replace(/theme-\w+/g, '')
    document.body.classList.add(`theme-${currentTheme.name.toLowerCase()}`)
  }, [currentThemeIndex])

  const animations = [
    { name: 'Bounce In', class: 'animate-bounce-in', description: 'Bouncy entrance effect' },
    { name: 'Shake', class: 'animate-shake', description: 'Attention-grabbing shake' },
    { name: 'Heartbeat', class: 'animate-heartbeat', description: 'Pulsing heartbeat rhythm' },
    { name: 'Swing', class: 'animate-swing', description: 'Gentle swinging motion' },
    { name: 'Rubber Band', class: 'animate-rubber-band', description: 'Elastic stretch effect' },
    { name: 'Jello', class: 'animate-jello', description: 'Wobbly jello animation' },
    { name: 'Flash', class: 'animate-flash', description: 'Blinking flash effect' },
    { name: 'Tada', class: 'animate-tada', description: 'Celebration animation' },
    { name: 'Wobble', class: 'animate-wobble', description: 'Side-to-side wobble' },
    { name: 'Roll In', class: 'animate-roll-in', description: 'Rolling entrance' },
    { name: 'Float', class: 'animate-float', description: 'Gentle floating motion' },
    { name: 'Glow', class: 'animate-glow', description: 'Pulsing glow effect' },
    { name: 'Morph', class: 'animate-morph', description: 'Shape morphing animation' },
    { name: 'Particle Float', class: 'animate-particle-float', description: 'Complex particle movement' },
    { name: 'Text Glow', class: 'animate-text-glow', description: 'Glowing text effect' },
    { name: 'Fade Up', class: 'animate-fade-up', description: 'Fade in from bottom' },
    { name: 'Slide In Left', class: 'animate-slide-in-left', description: 'Slide from left' },
    { name: 'Zoom In', class: 'animate-zoom-in', description: 'Scale up entrance' },
  ]

  const triggerAnimation = (animationClass: string) => {
    setActiveAnimation(animationClass)
    setTimeout(() => setActiveAnimation(null), 2000)
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themes[currentThemeIndex].colors.bg} p-8 relative overflow-hidden transition-all duration-1000`}>
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs with Theme Colors */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 60}px`,
              height: `${20 + Math.random() * 60}px`,
              backgroundColor: i % 3 === 0 ? themes[currentThemeIndex].colors.primary : i % 3 === 1 ? themes[currentThemeIndex].colors.secondary : themes[currentThemeIndex].colors.accent,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Sparkles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          >
            <Star className="w-4 h-4 text-yellow-400 opacity-60" />
          </div>
        ))}
        
        {/* Floating Icons with Theme Colors */}
        {[Code, Wand2, Heart, Sparkles, Zap, Palette].map((Icon, i) => (
          <div
            key={`icon-${i}`}
            className="absolute animate-bounce-gentle opacity-30"
            style={{
              left: `${10 + (i * 15)}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            <Icon className="w-8 h-8" style={{ color: themes[currentThemeIndex].colors.accent }} />
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Palette 
              className="w-12 h-12 animate-spin mr-4" 
              style={{ 
                animationDuration: '3s',
                color: themes[currentThemeIndex].colors.primary
              }} 
            />
            <h1 className="text-5xl font-bold animate-bounce-in theme-heading">
              Animation Showcase
            </h1>
            <Zap 
              className="w-12 h-12 animate-flash ml-4" 
              style={{ color: themes[currentThemeIndex].colors.accent }}
            />
          </div>
          
          {/* Theme Indicator */}
          <div className="flex items-center justify-center space-x-2 mb-4 animate-fade-in">
            <div 
              className="w-3 h-3 rounded-full animate-pulse-glow" 
              style={{ backgroundColor: themes[currentThemeIndex].colors.primary }}
            />
            <span className="text-sm font-medium theme-caption">
              Current Theme: {themes[currentThemeIndex].name}
            </span>
            <div 
              className="w-3 h-3 rounded-full animate-pulse-glow" 
              style={{ backgroundColor: themes[currentThemeIndex].colors.accent }}
            />
          </div>
          
          <p className="text-xl animate-fade-up theme-body" style={{ animationDelay: '0.3s' }}>
            Discover all the amazing animations available in WebCraft Studio!
          </p>
          <Badge className="mt-4 animate-tada theme-button" style={{ 
            animationDelay: '0.6s',
            backgroundColor: themes[currentThemeIndex].colors.primary,
            color: 'white'
          }}>
            {animations.length}+ Animations Available
          </Badge>
        </div>

        {/* Navigation */}
        <div className="text-center mb-8">
          <Button 
            asChild 
            variant="outline" 
            className="animate-swing hover:scale-105 transition-transform theme-button"
            style={{ borderColor: themes[currentThemeIndex].colors.primary }}
          >
            <Link href="/">← Back to Homepage</Link>
          </Button>
        </div>

        {/* Animation Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {animations.map((animation, index) => (
            <Card 
              key={animation.name}
              className={`
                border-2 hover:shadow-xl cursor-pointer animate-roll-in theme-card
                hover:scale-105 transition-all duration-300
                ${activeAnimation === animation.class ? animation.class : ''}
              `}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                borderColor: themes[currentThemeIndex].colors.primary + '40',
                backgroundColor: 'var(--theme-surface)'
              }}
              onClick={() => triggerAnimation(animation.class)}
            >
              <CardHeader className="text-center">
                <div 
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center animate-pulse-glow"
                  style={{
                    background: `linear-gradient(45deg, ${themes[currentThemeIndex].colors.primary}, ${themes[currentThemeIndex].colors.accent})`
                  }}
                >
                  <Sparkles className="w-8 h-8 text-white animate-pulse" />
                </div>
                <CardTitle className="text-lg theme-heading">{animation.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-center mb-4 theme-caption">
                  {animation.description}
                </p>
                <div className="text-center">
                  <Badge 
                    variant="outline" 
                    className="text-xs theme-button"
                    style={{ 
                      borderColor: themes[currentThemeIndex].colors.accent,
                      color: themes[currentThemeIndex].colors.accent
                    }}
                  >
                    {animation.class}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Demo Section */}
        <Card 
          className="max-w-4xl mx-auto theme-card animate-bounce-in"
          style={{
            background: `linear-gradient(135deg, ${themes[currentThemeIndex].colors.primary}10, ${themes[currentThemeIndex].colors.accent}10)`,
            borderColor: themes[currentThemeIndex].colors.primary + '30'
          }}
        >
          <CardHeader className="text-center">
            <CardTitle className="text-2xl animate-text-glow theme-heading">
              🎭 Interactive Demo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Demo Elements */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4 theme-heading">Try These Elements:</h3>
                
                <Button 
                  className="w-full animate-glow hover:animate-rubber-band theme-btn-primary hover:scale-105 transition-transform"
                  onClick={() => triggerAnimation('animate-tada')}
                  style={{
                    background: `linear-gradient(135deg, ${themes[currentThemeIndex].colors.primary}, ${themes[currentThemeIndex].colors.accent})`
                  }}
                >
                  Celebration Button 🎉
                </Button>
                
                <div 
                  className="p-4 bg-white/80 backdrop-blur-sm rounded-lg border-2 border-dashed text-center cursor-pointer hover:animate-jello transition-all duration-300"
                  onClick={() => triggerAnimation('animate-shake')}
                  style={{ borderColor: themes[currentThemeIndex].colors.secondary }}
                >
                  <Heart 
                    className="w-8 h-8 mx-auto mb-2 animate-heartbeat" 
                    style={{ color: themes[currentThemeIndex].colors.accent }}
                  />
                  <p className="theme-body">Click me for shake effect!</p>
                </div>
                
                <div 
                  className="p-4 text-white rounded-lg text-center cursor-pointer hover:animate-swing transition-all duration-300"
                  onClick={() => triggerAnimation('animate-wobble')}
                  style={{
                    background: `linear-gradient(135deg, ${themes[currentThemeIndex].colors.secondary}, ${themes[currentThemeIndex].colors.primary})`
                  }}
                >
                  <Star className="w-8 h-8 mx-auto mb-2 animate-spin" style={{ animationDuration: '2s' }} />
                  <p>Wobble Animation</p>
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4 theme-heading">How to Use:</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <Badge 
                      className="mt-1 theme-button"
                      style={{ backgroundColor: themes[currentThemeIndex].colors.primary }}
                    >
                      1
                    </Badge>
                    <p className="theme-body">Click any animation card to see it in action</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Badge 
                      className="mt-1 theme-button"
                      style={{ backgroundColor: themes[currentThemeIndex].colors.secondary }}
                    >
                      2
                    </Badge>
                    <p className="theme-body">Hover over cards for preview effects</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Badge 
                      className="mt-1 theme-button"
                      style={{ backgroundColor: themes[currentThemeIndex].colors.accent }}
                    >
                      3
                    </Badge>
                    <p className="theme-body">Use these CSS classes in your components</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Badge 
                      className="mt-1 theme-button"
                      style={{ backgroundColor: themes[currentThemeIndex].colors.primary }}
                    >
                      4
                    </Badge>
                    <p className="theme-body">Combine with theme colors for amazing effects</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CSS Classes Reference */}
        <Card className="mt-8 max-w-4xl mx-auto theme-card animate-slide-up">
          <CardHeader>
            <CardTitle className="text-center animate-bounce-in theme-heading">
              🎨 CSS Classes Reference
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              {animations.map((animation, index) => (
                <div 
                  key={animation.name} 
                  className="flex justify-between items-center p-2 rounded animate-fade-up hover:scale-105 transition-transform"
                  style={{ 
                    animationDelay: `${index * 0.05}s`,
                    backgroundColor: themes[currentThemeIndex].colors.primary + '10'
                  }}
                >
                  <span className="font-medium theme-body">{animation.name}</span>
                  <code 
                    className="px-2 py-1 rounded text-xs theme-button"
                    style={{
                      backgroundColor: themes[currentThemeIndex].colors.accent + '20',
                      color: themes[currentThemeIndex].colors.accent
                    }}
                  >
                    {animation.class}
                  </code>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Footer */}
        <div className="text-center mt-12">
          <p className="animate-fade-up theme-body mb-4">
            All animations work seamlessly with the dynamic theme system!
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <Button 
              asChild 
              className="animate-glow hover:scale-105 transition-transform"
              style={{
                background: `linear-gradient(135deg, ${themes[currentThemeIndex].colors.primary}, ${themes[currentThemeIndex].colors.accent})`
              }}
            >
              <Link href="/working-theme">Test with Themes</Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              className="animate-swing hover:scale-105 transition-transform"
              style={{ borderColor: themes[currentThemeIndex].colors.secondary }}
            >
              <Link href="/">Back to Homepage</Link>
            </Button>
          </div>
          
          {/* Theme Preview */}
          <div className="mt-8 flex justify-center space-x-2 animate-fade-up">
            <span className="text-sm theme-caption">Themes auto-change every 5 seconds:</span>
            {themes.slice(0, 5).map((theme, index) => (
              <div
                key={theme.name}
                className="w-4 h-4 rounded-full animate-pulse-glow"
                style={{
                  backgroundColor: theme.colors.primary,
                  opacity: index === currentThemeIndex % 5 ? 1 : 0.3
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ArrowRight, Code, Globe, Palette, Zap, Sparkles, Star } from 'lucide-react'
import Link from 'next/link'
import { SimpleThemeSelector } from '@/components/simple-theme-selector'

export default function FreeTrialPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    websiteType: '',
    techPreference: '',
    description: '',
    features: [] as string[]
  })

  const [submitted, setSubmitted] = useState(false)
  const [showPromptStep, setShowPromptStep] = useState(false)
  const [websitePrompt, setWebsitePrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0)

  const themes = [
    { name: 'default', bg: '#ffffff', text: '#1e293b', primary: '#3b82f6' },
    { name: 'neon', bg: '#0a0a0a', text: '#00ffff', primary: '#ff00ff' },
    { name: 'ocean', bg: '#f0f9ff', text: '#0c4a6e', primary: '#0ea5e9' },
    { name: 'forest', bg: '#f7fdf7', text: '#14532d', primary: '#16a34a' },
    { name: 'sunset', bg: '#fffbeb', text: '#9a3412', primary: '#f97316' },
    { name: 'royal', bg: '#faf5ff', text: '#581c87', primary: '#7c3aed' },
    { name: 'cosmic', bg: '#0f0f23', text: '#e2e8f0', primary: '#8b5cf6' },
    { name: 'retro', bg: '#ffe66d', text: '#2d3436', primary: '#ff6b6b' },
    { name: 'pastel', bg: '#fef7ff', text: '#374151', primary: '#f472b6' },
    { name: 'cyberpunk', bg: '#000000', text: '#00ff41', primary: '#ff0080' }
  ]

  // Auto-change theme colors every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentThemeIndex((prev) => (prev + 1) % themes.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Apply current theme
  useEffect(() => {
    const currentTheme = themes[currentThemeIndex]
    document.documentElement.style.setProperty('--theme-background', currentTheme.bg)
    document.documentElement.style.setProperty('--theme-text', currentTheme.text)
    document.documentElement.style.setProperty('--theme-primary', currentTheme.primary)
    document.documentElement.style.setProperty('--theme-accent', currentTheme.primary)
    document.documentElement.style.setProperty('--theme-surface', currentTheme.bg)
    document.documentElement.style.setProperty('--theme-muted', currentTheme.text + '80')
    document.documentElement.style.setProperty('--theme-border', currentTheme.text + '20')
    document.body.className = document.body.className.replace(/theme-\w+/g, '')
    document.body.classList.add(`theme-${currentTheme.name}`)
  }, [currentThemeIndex])

  // Load saved theme on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('sitecraft-theme')
      if (savedTheme) {
        const themeIndex = themes.findIndex(t => t.name === savedTheme)
        if (themeIndex !== -1) {
          setCurrentThemeIndex(themeIndex)
        }
      }
    } catch (e) {
      console.warn('Failed to load saved theme:', e)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Store in localStorage for demo purposes
    localStorage.setItem('free-trial-data', JSON.stringify({
      ...formData,
      submittedAt: new Date().toISOString()
    }))
    
    setSubmitted(true)
    
    // Show prompt step after 2 seconds
    setTimeout(() => {
      setShowPromptStep(true)
    }, 2000)
  }

  const handleGenerateWebsite = async () => {
    if (!websitePrompt.trim()) return
    
    setIsGenerating(true)
    
    // Simulate website generation
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Store the prompt and redirect to editor
    localStorage.setItem('website-prompt', websitePrompt)
    localStorage.setItem('generated-website', JSON.stringify({
      prompt: websitePrompt,
      theme: themes[currentThemeIndex].name,
      generatedAt: new Date().toISOString()
    }))
    
    window.location.href = '/editor/demo'
  }

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }))
  }

  if (showPromptStep) {
    return (
      <div className="min-h-screen flex items-center justify-center transition-all duration-1000" style={{
        backgroundColor: 'var(--theme-background)',
        color: 'var(--theme-text)',
        background: `linear-gradient(135deg, var(--theme-background), var(--theme-primary)20)`
      }}>
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Orbs */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float opacity-30"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `linear-gradient(45deg, var(--theme-primary), var(--theme-accent))`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
          
          {/* Animated Grid */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `linear-gradient(var(--theme-primary) 1px, transparent 1px), linear-gradient(90deg, var(--theme-primary) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }} />
          
          {/* Pulsing Rings */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border-2 animate-ping opacity-20"
              style={{
                width: `${200 + i * 100}px`,
                height: `${200 + i * 100}px`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                borderColor: 'var(--theme-primary)',
                animationDelay: `${i * 0.5}s`,
                animationDuration: '3s'
              }}
            />
          ))}
        </div>

        <Card className="w-full max-w-2xl mx-4 animate-scale-in shadow-2xl relative z-10" style={{
          backgroundColor: 'var(--theme-surface)',
          borderColor: 'var(--theme-border)',
          backdropFilter: 'blur(20px)',
          background: `linear-gradient(135deg, var(--theme-surface)95, var(--theme-primary)10)`
        }}>
          <CardHeader className="text-center pb-6">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow relative" style={{
              background: `linear-gradient(45deg, var(--theme-primary), var(--theme-accent))`
            }}>
              <Sparkles className="w-10 h-10 text-white animate-spin" style={{ animationDuration: '3s' }} />
              {/* Sparkle effects around the icon */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full animate-ping opacity-60"
                  style={{
                    left: `${50 + 40 * Math.cos(i * Math.PI / 4)}%`,
                    top: `${50 + 40 * Math.sin(i * Math.PI / 4)}%`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
            <CardTitle className="text-3xl font-bold mb-4 animate-text-glow" style={{
              background: `linear-gradient(45deg, var(--theme-primary), var(--theme-accent))`,
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradient-shift 3s ease-in-out infinite'
            }}>
              🎨 Describe Your Dream Website
            </CardTitle>
            <CardDescription className="text-lg animate-fade-up" style={{ 
              color: 'var(--theme-muted)',
              animationDelay: '0.3s'
            }}>
              Tell us what you want to create and we'll build it for you with AI magic!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label htmlFor="websitePrompt" className="text-lg font-semibold animate-slide-in-left" style={{ 
                color: 'var(--theme-text)',
                animationDelay: '0.5s'
              }}>
                What kind of website do you want? ✨
              </Label>
              <Textarea
                id="websitePrompt"
                value={websitePrompt}
                onChange={(e) => setWebsitePrompt(e.target.value)}
                placeholder="Example: Create a modern portfolio website for a photographer with a dark theme, image gallery, contact form, and smooth animations. Include sections for about me, services, and testimonials."
                rows={6}
                className="text-lg animate-scale-in transition-all duration-300 hover:scale-105 focus:animate-glow resize-none"
                style={{
                  backgroundColor: 'var(--theme-background)',
                  borderColor: 'var(--theme-border)',
                  color: 'var(--theme-text)',
                  animationDelay: '0.7s'
                }}
              />
              
              {/* Suggestion Pills */}
              <div className="flex flex-wrap gap-2 animate-fade-up" style={{ animationDelay: '0.9s' }}>
                {[
                  "🏢 Business website with contact forms",
                  "🎨 Creative portfolio with image gallery", 
                  "🍕 Restaurant site with menu and booking",
                  "💼 Professional services landing page",
                  "🛍️ E-commerce store with products",
                  "📝 Blog with modern design"
                ].map((suggestion, index) => (
                  <button
                    key={suggestion}
                    onClick={() => setWebsitePrompt(suggestion.split(' ').slice(1).join(' '))}
                    className="px-3 py-1 text-sm rounded-full transition-all duration-300 hover:scale-110 hover:animate-jello"
                    style={{
                      backgroundColor: 'var(--theme-primary)',
                      color: 'white',
                      opacity: 0.8,
                      animationDelay: `${1 + index * 0.1}s`
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            <Button 
              onClick={handleGenerateWebsite}
              disabled={!websitePrompt.trim() || isGenerating}
              className="w-full text-xl py-6 animate-glow hover:animate-bounce-gentle hover:scale-105 transition-all duration-300 relative overflow-hidden"
              size="lg"
              style={{
                backgroundColor: 'var(--theme-primary)',
                color: 'white',
                animationDelay: '1.2s'
              }}
            >
              {/* Button background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shimmer" />
              
              {isGenerating ? (
                <>
                  <div className="animate-spin mr-3">🎨</div>
                  Creating Your Website...
                </>
              ) : (
                <>
                  Generate My Website
                  <ArrowRight className="ml-3 w-6 h-6 animate-heartbeat" />
                </>
              )}
            </Button>

            {/* Progress indicator when generating */}
            {isGenerating && (
              <div className="space-y-3 animate-fade-up">
                <div className="flex justify-between text-sm" style={{ color: 'var(--theme-muted)' }}>
                  <span>🧠 Analyzing your requirements...</span>
                  <span>33%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-2 rounded-full animate-pulse transition-all duration-1000"
                    style={{ 
                      backgroundColor: 'var(--theme-primary)',
                      width: '33%',
                      animation: 'progress-fill 3s ease-in-out forwards'
                    }}
                  />
                </div>
                <div className="text-center text-sm animate-pulse" style={{ color: 'var(--theme-muted)' }}>
                  🎨 Designing layout • 🎯 Selecting components • ✨ Adding animations
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4 transition-all duration-500" style={{
      backgroundColor: 'var(--theme-background)',
      color: 'var(--theme-text)'
    }}>
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dynamic Gradient Background */}
        <div 
          className="absolute inset-0 opacity-20 transition-all duration-1000"
          style={{
            background: `radial-gradient(circle at 20% 50%, var(--theme-primary)30, transparent 50%), 
                        radial-gradient(circle at 80% 20%, var(--theme-accent)25, transparent 50%), 
                        radial-gradient(circle at 40% 80%, var(--theme-primary)20, transparent 50%)`
          }}
        />
        
        {/* Animated Mesh Gradient */}
        <div className="absolute inset-0 opacity-15">
          <div 
            className="absolute inset-0 animate-pulse"
            style={{
              background: `conic-gradient(from 0deg at 50% 50%, var(--theme-primary), var(--theme-accent), var(--theme-primary))`,
              filter: 'blur(40px)',
              transform: 'scale(1.2)'
            }}
          />
        </div>

        {/* Enhanced Floating Orbs */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute rounded-full animate-float opacity-30"
            style={{
              width: `${Math.random() * 100 + 30}px`,
              height: `${Math.random() * 100 + 30}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(45deg, var(--theme-primary), var(--theme-accent))`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              filter: 'blur(0.5px)',
              boxShadow: `0 0 ${15 + Math.random() * 20}px var(--theme-primary)40`
            }}
          />
        ))}
        
        {/* Geometric Shapes */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`shape-${i}`}
            className="absolute animate-spin opacity-15"
            style={{
              width: `${40 + i * 15}px`,
              height: `${40 + i * 15}px`,
              left: `${15 + i * 15}%`,
              top: `${20 + i * 12}%`,
              background: `linear-gradient(45deg, transparent, var(--theme-accent)40, transparent)`,
              borderRadius: i % 3 === 0 ? '50%' : i % 3 === 1 ? '20%' : '0%',
              animationDuration: `${8 + i * 2}s`,
              animationDirection: i % 2 === 0 ? 'normal' : 'reverse'
            }}
          />
        ))}
        
        {/* Sparkle Effects */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full animate-ping opacity-50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 1.5}s`
            }}
          />
        ))}
        
        {/* Animated Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(var(--theme-primary) 1px, transparent 1px), linear-gradient(90deg, var(--theme-primary) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            animation: 'grid-move 20s linear infinite'
          }}
        />
        
        {/* Enhanced Floating Icons */}
        {[
          { icon: Sparkles, delay: 0, x: 10, y: 20, size: 'w-6 h-6' },
          { icon: Star, delay: 1, x: 85, y: 25, size: 'w-8 h-8' },
          { icon: Zap, delay: 2, x: 15, y: 75, size: 'w-7 h-7' },
          { icon: Globe, delay: 3, x: 90, y: 70, size: 'w-6 h-6' },
          { icon: Palette, delay: 4, x: 50, y: 15, size: 'w-7 h-7' },
          { icon: Code, delay: 5, x: 75, y: 85, size: 'w-6 h-6' }
        ].map((item, i) => {
          const IconComponent = item.icon
          return (
            <div
              key={`icon-${i}`}
              className="absolute animate-float opacity-25"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                animationDelay: `${item.delay}s`,
                animationDuration: '4s',
                filter: 'drop-shadow(0 0 8px var(--theme-primary))'
              }}
            >
              <IconComponent className={item.size} style={{ color: 'var(--theme-primary)' }} />
            </div>
          )
        })}
        
        {/* Pulsing Rings */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`ring-${i}`}
            className="absolute rounded-full border animate-ping opacity-10"
            style={{
              width: `${200 + i * 120}px`,
              height: `${200 + i * 120}px`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              borderColor: 'var(--theme-primary)',
              borderWidth: '1px',
              animationDelay: `${i * 0.6}s`,
              animationDuration: '4s'
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Enhanced Header with Theme Indicator */}
        <div className="text-center mb-12 animate-fade-up">
          <div className="flex justify-between items-center mb-6">
            <Link href="/" className="flex items-center space-x-2 animate-slide-in-left">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center animate-heartbeat transition-all duration-500 shadow-lg" style={{
                background: `linear-gradient(45deg, var(--theme-primary), var(--theme-accent))`,
                boxShadow: `0 0 20px var(--theme-primary)40`
              }}>
                <Zap className="w-6 h-6 text-white animate-flash" />
              </div>
              <span className="text-2xl font-bold transition-colors duration-500" style={{ color: 'var(--theme-text)' }}>
                WebCraft Studio
              </span>
            </Link>
            
            {/* Theme Indicator */}
            <div className="flex items-center space-x-4 animate-slide-in-right">
              <div className="flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-500" style={{
                backgroundColor: 'var(--theme-surface)',
                borderColor: 'var(--theme-border)',
                border: '1px solid'
              }}>
                <div 
                  className="w-3 h-3 rounded-full animate-pulse"
                  style={{ backgroundColor: 'var(--theme-primary)' }}
                />
                <span className="text-sm font-medium transition-colors duration-500" style={{ color: 'var(--theme-text)' }}>
                  {themes[currentThemeIndex].name.charAt(0).toUpperCase() + themes[currentThemeIndex].name.slice(1)} Theme
                </span>
              </div>
              <SimpleThemeSelector />
            </div>
          </div>
          
          <div className="relative">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-bounce-in transition-colors duration-500" style={{
              color: 'var(--theme-text)'
            }}>
              Start Your 
              <span className="block mt-2 animate-rainbow-shimmer relative" style={{
                background: `linear-gradient(45deg, var(--theme-primary), var(--theme-accent), var(--theme-primary))`,
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Free Trial ✨
                {/* Floating sparkles around text */}
                {[...Array(6)].map((_, i) => (
                  <span
                    key={i}
                    className="absolute text-2xl animate-ping opacity-60"
                    style={{
                      left: `${10 + i * 15}%`,
                      top: `${-10 + (i % 2) * 20}%`,
                      animationDelay: `${i * 0.3}s`,
                      color: 'var(--theme-accent)'
                    }}
                  >
                    ✨
                  </span>
                ))}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl max-w-3xl mx-auto animate-roll-in transition-colors duration-500 leading-relaxed" style={{ 
              animationDelay: '0.3s',
              color: 'var(--theme-muted)'
            }}>
              Experience the magic of AI-powered website creation. Tell us your vision, and watch as we bring it to life with stunning themes and animations.
            </p>
            
            {/* Feature highlights */}
            <div className="flex flex-wrap justify-center gap-4 mt-8 animate-fade-up" style={{ animationDelay: '0.6s' }}>
              {[
                { icon: '🎨', text: 'AI-Powered Design' },
                { icon: '⚡', text: 'Instant Creation' },
                { icon: '🎭', text: '17 Themes' },
                { icon: '✨', text: '18+ Animations' }
              ].map((feature, index) => (
                <div
                  key={feature.text}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-110 hover:animate-jello"
                  style={{
                    backgroundColor: 'var(--theme-primary)',
                    color: 'white',
                    opacity: 0.9,
                    animationDelay: `${0.8 + index * 0.1}s`
                  }}
                >
                  <span className="text-lg">{feature.icon}</span>
                  <span className="font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
            
            {/* Quick Start Button */}
            <div className="mt-10 animate-scale-in" style={{ animationDelay: '1s' }}>
              <Button
                asChild
                className="text-2xl px-12 py-6 animate-glow hover:animate-bounce-gentle hover:scale-110 transition-all duration-300 relative overflow-hidden shadow-2xl"
                size="lg"
                style={{
                  backgroundColor: 'var(--theme-primary)',
                  color: 'white',
                  borderRadius: '50px'
                }}
              >
                <Link href="/create-website">
                  {/* Button background animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shimmer" />
                  
                  <Sparkles className="mr-3 w-8 h-8 animate-spin" style={{ animationDuration: '2s' }} />
                  Get Started - Create Website Now!
                  <ArrowRight className="ml-3 w-8 h-8 animate-heartbeat" />
                </Link>
              </Button>
              
              <p className="mt-4 text-sm opacity-75 animate-fade-up" style={{ 
                color: 'var(--theme-muted)',
                animationDelay: '1.2s'
              }}>
                Skip the form - just describe your dream website and we'll build it! 🚀
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <Card className="shadow-xl animate-slide-in-left transition-all duration-500" style={{
            backgroundColor: 'var(--theme-surface)',
            borderColor: 'var(--theme-border)'
          }}>
            <CardHeader>
              <CardTitle className="text-2xl animate-text-glow transition-colors duration-500" style={{
                color: 'var(--theme-text)'
              }}>
                Get Started
              </CardTitle>
              <CardDescription className="transition-colors duration-500" style={{
                color: 'var(--theme-muted)'
              }}>
                Fill out this form to activate your free trial and create your first website.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="transition-colors duration-500" style={{ color: 'var(--theme-text)' }}>
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your full name"
                      className="transition-all duration-300 hover:scale-105 focus:animate-glow"
                      style={{
                        backgroundColor: 'var(--theme-background)',
                        borderColor: 'var(--theme-border)',
                        color: 'var(--theme-text)'
                      }}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="transition-colors duration-500" style={{ color: 'var(--theme-text)' }}>
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your@email.com"
                      className="transition-all duration-300 hover:scale-105 focus:animate-glow"
                      style={{
                        backgroundColor: 'var(--theme-background)',
                        borderColor: 'var(--theme-border)',
                        color: 'var(--theme-text)'
                      }}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="company" className="transition-colors duration-500" style={{ color: 'var(--theme-text)' }}>
                      Company/Organization
                    </Label>
                    <Input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      placeholder="Your company name (optional)"
                      className="transition-all duration-300 hover:scale-105 focus:animate-glow"
                      style={{
                        backgroundColor: 'var(--theme-background)',
                        borderColor: 'var(--theme-border)',
                        color: 'var(--theme-text)'
                      }}
                    />
                  </div>
                </div>

                {/* Website Type */}
                <div>
                  <Label htmlFor="websiteType" className="transition-colors duration-500" style={{ color: 'var(--theme-text)' }}>
                    What type of website do you want to create? *
                  </Label>
                  <Select value={formData.websiteType} onValueChange={(value) => setFormData(prev => ({ ...prev, websiteType: value }))}>
                    <SelectTrigger className="transition-all duration-300 hover:scale-105" style={{
                      backgroundColor: 'var(--theme-background)',
                      borderColor: 'var(--theme-border)',
                      color: 'var(--theme-text)'
                    }}>
                      <SelectValue placeholder="Select website type" />
                    </SelectTrigger>
                    <SelectContent style={{
                      backgroundColor: 'var(--theme-surface)',
                      borderColor: 'var(--theme-border)'
                    }}>
                      <SelectItem value="business">Business Website</SelectItem>
                      <SelectItem value="portfolio">Portfolio</SelectItem>
                      <SelectItem value="ecommerce">E-commerce Store</SelectItem>
                      <SelectItem value="blog">Blog/News Site</SelectItem>
                      <SelectItem value="restaurant">Restaurant/Food</SelectItem>
                      <SelectItem value="agency">Agency/Services</SelectItem>
                      <SelectItem value="nonprofit">Non-profit</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tech Preference */}
                <div>
                  <Label htmlFor="techPreference" className="transition-colors duration-500" style={{ color: 'var(--theme-text)' }}>
                    Preferred Technology Stack *
                  </Label>
                  <Select value={formData.techPreference} onValueChange={(value) => setFormData(prev => ({ ...prev, techPreference: value }))}>
                    <SelectTrigger className="transition-all duration-300 hover:scale-105" style={{
                      backgroundColor: 'var(--theme-background)',
                      borderColor: 'var(--theme-border)',
                      color: 'var(--theme-text)'
                    }}>
                      <SelectValue placeholder="Choose your preferred stack" />
                    </SelectTrigger>
                    <SelectContent style={{
                      backgroundColor: 'var(--theme-surface)',
                      borderColor: 'var(--theme-border)'
                    }}>
                      <SelectItem value="visual">Visual Builder (No Code)</SelectItem>
                      <SelectItem value="html-css">HTML + CSS Only</SelectItem>
                      <SelectItem value="javascript">HTML + CSS + JavaScript</SelectItem>
                      <SelectItem value="react">React/Next.js</SelectItem>
                      <SelectItem value="python">Python (Django/Flask)</SelectItem>
                      <SelectItem value="php">PHP</SelectItem>
                      <SelectItem value="wordpress">WordPress</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Features */}
                <div>
                  <Label className="transition-colors duration-500" style={{ color: 'var(--theme-text)' }}>
                    What features do you need? (Select all that apply)
                  </Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {[
                      'Contact Forms',
                      'Image Gallery',
                      'Blog/News',
                      'E-commerce',
                      'User Authentication',
                      'Payment Processing',
                      'Social Media Integration',
                      'SEO Optimization',
                      'Analytics',
                      'Multi-language',
                      'Mobile App',
                      'Custom Domain'
                    ].map((feature) => (
                      <label key={feature} className="flex items-center space-x-2 cursor-pointer hover:animate-bounce-gentle transition-all duration-300">
                        <input
                          type="checkbox"
                          checked={formData.features.includes(feature)}
                          onChange={() => handleFeatureToggle(feature)}
                          className="rounded border-gray-300"
                          style={{ accentColor: 'var(--theme-primary)' }}
                        />
                        <span className="text-sm transition-colors duration-500" style={{ color: 'var(--theme-text)' }}>
                          {feature}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description" className="transition-colors duration-500" style={{ color: 'var(--theme-text)' }}>
                    Tell us about your project
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your website goals, target audience, or any specific requirements..."
                    rows={4}
                    className="transition-all duration-300 hover:scale-105 focus:animate-glow"
                    style={{
                      backgroundColor: 'var(--theme-background)',
                      borderColor: 'var(--theme-border)',
                      color: 'var(--theme-text)'
                    }}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full text-lg py-6 animate-glow hover:animate-bounce-gentle hover:scale-105 transition-all duration-300" 
                  size="lg"
                  style={{
                    backgroundColor: 'var(--theme-primary)',
                    color: 'white'
                  }}
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5 animate-heartbeat" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Benefits */}
          <div className="space-y-6 animate-slide-in-right">
            <Card className="transition-all duration-500 hover:scale-105 hover:shadow-xl" style={{
              backgroundColor: 'var(--theme-surface)',
              borderColor: 'var(--theme-border)'
            }}>
              <CardHeader>
                <CardTitle className="flex items-center animate-bounce-in transition-colors duration-500" style={{
                  color: 'var(--theme-text)'
                }}>
                  <Globe className="w-6 h-6 mr-2 animate-spin" style={{ 
                    color: 'var(--theme-primary)',
                    animationDuration: '3s'
                  }} />
                  What You Get
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    'Create 1 website for free',
                    'Access to all templates and themes',
                    'Drag-and-drop visual editor',
                    'Mobile-responsive design',
                    'Export clean HTML/CSS code',
                    'No credit card required'
                  ].map((benefit, index) => (
                    <li key={benefit} className="flex items-start animate-fade-up hover:animate-bounce-gentle transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="w-2 h-2 rounded-full mt-2 mr-3 animate-pulse" style={{
                        backgroundColor: 'var(--theme-primary)'
                      }}></div>
                      <span className="transition-colors duration-500" style={{ color: 'var(--theme-text)' }}>
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="transition-all duration-500 hover:scale-105 hover:shadow-xl" style={{
              backgroundColor: 'var(--theme-surface)',
              borderColor: 'var(--theme-border)'
            }}>
              <CardHeader>
                <CardTitle className="flex items-center animate-bounce-in transition-colors duration-500" style={{
                  animationDelay: '0.2s',
                  color: 'var(--theme-text)'
                }}>
                  <Code className="w-6 h-6 mr-2 animate-pulse" style={{ color: 'var(--theme-accent)' }} />
                  Technology Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: 'Visual Builder', desc: 'No coding required. Perfect for beginners.', color: 'var(--theme-primary)' },
                    { title: 'HTML + CSS', desc: 'Clean, semantic markup without JavaScript.', color: 'var(--theme-success)' },
                    { title: 'JavaScript Enhanced', desc: 'Interactive features and animations.', color: 'var(--theme-warning)' },
                    { title: 'Python/React', desc: 'Advanced frameworks for complex sites.', color: 'var(--theme-accent)' }
                  ].map((tech, index) => (
                    <div 
                      key={tech.title}
                      className="p-3 rounded-lg animate-fade-up hover:animate-jello hover:scale-105 transition-all duration-300 cursor-pointer"
                      style={{ 
                        animationDelay: `${0.3 + index * 0.1}s`,
                        backgroundColor: tech.color,
                        opacity: 0.1
                      }}
                    >
                      <h4 className="font-semibold transition-colors duration-500" style={{ color: 'var(--theme-text)' }}>
                        {tech.title}
                      </h4>
                      <p className="text-sm transition-colors duration-500" style={{ color: 'var(--theme-muted)' }}>
                        {tech.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="transition-all duration-500 hover:scale-105 hover:shadow-xl" style={{
              backgroundColor: 'var(--theme-surface)',
              borderColor: 'var(--theme-border)'
            }}>
              <CardHeader>
                <CardTitle className="flex items-center animate-bounce-in transition-colors duration-500" style={{
                  animationDelay: '0.4s',
                  color: 'var(--theme-text)'
                }}>
                  <Palette className="w-6 h-6 mr-2 animate-wiggle" style={{ color: 'var(--theme-accent)' }} />
                  17 Beautiful Themes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { name: 'Default', color: 'bg-blue-500', theme: 'default' },
                    { name: 'Dark', color: 'bg-gray-800', theme: 'dark' },
                    { name: 'Neon', color: 'bg-cyan-400', theme: 'neon' },
                    { name: 'Ocean', color: 'bg-blue-400', theme: 'ocean' },
                    { name: 'Forest', color: 'bg-green-500', theme: 'forest' },
                    { name: 'Sunset', color: 'bg-orange-400', theme: 'sunset' },
                    { name: 'Royal', color: 'bg-purple-500', theme: 'royal' },
                    { name: 'Cosmic', color: 'bg-indigo-600', theme: 'cosmic' },
                    { name: 'Retro', color: 'bg-yellow-400', theme: 'retro' },
                    { name: 'Arctic', color: 'bg-slate-300', theme: 'arctic' },
                    { name: 'Pastel', color: 'bg-pink-300', theme: 'pastel' },
                    { name: 'Cyber', color: 'bg-green-400', theme: 'cyberpunk' }
                  ].map((theme, index) => (
                    <button
                      key={theme.name}
                      onClick={() => {
                        // Apply theme immediately with JavaScript
                        const themeColors = {
                          default: { bg: '#ffffff', text: '#1e293b', primary: '#3b82f6' },
                          dark: { bg: '#0f172a', text: '#f1f5f9', primary: '#60a5fa' },
                          neon: { bg: '#0a0a0a', text: '#00ffff', primary: '#ff00ff' },
                          ocean: { bg: '#f0f9ff', text: '#0c4a6e', primary: '#0ea5e9' },
                          forest: { bg: '#f7fdf7', text: '#14532d', primary: '#16a34a' },
                          sunset: { bg: '#fffbeb', text: '#9a3412', primary: '#f97316' },
                          royal: { bg: '#faf5ff', text: '#581c87', primary: '#7c3aed' },
                          cosmic: { bg: '#0f0f23', text: '#e2e8f0', primary: '#8b5cf6' },
                          retro: { bg: '#ffe66d', text: '#2d3436', primary: '#ff6b6b' },
                          arctic: { bg: '#f8fafc', text: '#0f172a', primary: '#3b82f6' },
                          pastel: { bg: '#fef7ff', text: '#374151', primary: '#f472b6' },
                          cyberpunk: { bg: '#000000', text: '#00ff41', primary: '#ff0080' }
                        }
                        
                        const colors = themeColors[theme.theme as keyof typeof themeColors]
                        if (colors) {
                          document.documentElement.style.setProperty('--theme-background', colors.bg)
                          document.documentElement.style.setProperty('--theme-text', colors.text)
                          document.documentElement.style.setProperty('--theme-primary', colors.primary)
                          document.documentElement.style.setProperty('--theme-accent', colors.primary)
                          document.documentElement.style.setProperty('--theme-surface', colors.bg)
                          document.documentElement.style.setProperty('--theme-muted', colors.text)
                          document.documentElement.style.setProperty('--theme-border', colors.text + '20')
                          
                          // Add theme class to body
                          document.body.className = document.body.className.replace(/theme-\w+/g, '')
                          document.body.classList.add(`theme-${theme.theme}`)
                          
                          // Save to localStorage
                          localStorage.setItem('sitecraft-theme', theme.theme)
                          
                          // Add celebration animation
                          const button = event?.target as HTMLElement
                          if (button) {
                            const target = button
                            if (target) {
                              target.classList.add('animate-tada')
                              setTimeout(() => {
                                if (target) {
                                  target.classList.remove('animate-tada')
                                }
                              }, 1000)
                            }
                          }
                        }
                      }}
                      className={`text-center animate-bounce-in hover:animate-jello hover:scale-110 transition-all duration-300 cursor-pointer p-2 rounded`}
                      style={{ animationDelay: `${0.5 + index * 0.05}s` }}
                    >
                      <div className={`w-8 h-8 ${theme.color} rounded mx-auto mb-1 animate-pulse`}></div>
                      <span className="text-xs transition-colors duration-500" style={{ color: 'var(--theme-text)' }}>
                        {theme.name}
                      </span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Alternative Access */}
        <div className="mt-12 text-center animate-fade-up" style={{ animationDelay: '0.8s' }}>
          <p className="mb-4 transition-colors duration-500" style={{ color: 'var(--theme-muted)' }}>
            Already have an account? <Link href="/auth/signin" className="hover:underline transition-all duration-300 hover:animate-bounce-gentle" style={{ color: 'var(--theme-primary)' }}>Sign in here</Link>
          </p>
          <p className="text-sm transition-colors duration-500" style={{ color: 'var(--theme-muted)' }}>
            Or try our <Link href="/dashboard/demo" className="hover:underline transition-all duration-300 hover:animate-bounce-gentle" style={{ color: 'var(--theme-primary)' }}>instant demo</Link> without signing up
          </p>
        </div>
      </div>
    </div>
  )
}
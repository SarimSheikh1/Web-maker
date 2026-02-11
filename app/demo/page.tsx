'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Zap, Palette, Globe, Code, Users, Star, Sparkles, Rocket, Heart, Gift, Crown, Play } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { SimpleThemeSelector } from '@/components/simple-theme-selector'

export default function DemoLandingPage() {
  const router = useRouter()
  const { toast } = useToast()
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

  const startDemo = () => {
    // Create demo user automatically
    const demoUser = {
      id: 'demo-' + Date.now(),
      name: 'Demo User',
      email: 'demo@webcraftstudio.com',
      createdAt: new Date().toISOString()
    }
    
    // Store demo user data
    localStorage.setItem('isSignedIn', 'true')
    localStorage.setItem('demoUser', JSON.stringify(demoUser))
    
    toast({
      title: 'Demo Started! 🎉',
      description: 'Welcome to WebCraft Studio! Creating your demo account...',
    })
    
    // Redirect to demo dashboard
    setTimeout(() => {
      router.push('/dashboard/demo')
    }, 1500)
  }

  return (
    <div className="min-h-screen transition-all duration-1000 relative overflow-hidden" style={{
      backgroundColor: 'var(--theme-background)',
      color: 'var(--theme-text)',
      background: `linear-gradient(135deg, var(--theme-background), var(--theme-primary)10)`
    }}>
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dynamic Gradient Background */}
        <div 
          className="absolute inset-0 opacity-20 transition-all duration-1000"
          style={{
            background: `
              radial-gradient(circle at 25% 40%, var(--theme-primary)30, transparent 50%), 
              radial-gradient(circle at 75% 60%, var(--theme-accent)25, transparent 50%), 
              radial-gradient(circle at 50% 20%, var(--theme-primary)20, transparent 40%)
            `
          }}
        />
        
        {/* Animated Mesh Gradient */}
        <div className="absolute inset-0 opacity-15">
          <div 
            className="absolute inset-0 animate-pulse"
            style={{
              background: `conic-gradient(from 0deg at 50% 50%, var(--theme-primary), var(--theme-accent), var(--theme-primary))`,
              filter: 'blur(60px)',
              transform: 'scale(1.3)',
              animation: 'gradient-shift 6s ease-in-out infinite'
            }}
          />
        </div>

        {/* Floating Orbs */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute rounded-full animate-float opacity-30"
            style={{
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(45deg, var(--theme-primary), var(--theme-accent))`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
              filter: 'blur(1px)',
              boxShadow: `0 0 ${20 + Math.random() * 25}px var(--theme-primary)50`
            }}
          />
        ))}
        
        {/* Sparkle Effects */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full animate-ping opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 1.5}s`
            }}
          />
        ))}
        
        {/* Floating Icons */}
        {[
          { icon: Sparkles, delay: 0, x: 10, y: 20 },
          { icon: Star, delay: 1, x: 85, y: 25 },
          { icon: Rocket, delay: 2, x: 15, y: 75 },
          { icon: Heart, delay: 3, x: 90, y: 70 },
          { icon: Globe, delay: 4, x: 50, y: 15 },
          { icon: Palette, delay: 5, x: 75, y: 85 }
        ].map((item, i) => {
          const IconComponent = item.icon
          return (
            <div
              key={`icon-${i}`}
              className="absolute animate-float opacity-20"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                animationDelay: `${item.delay}s`,
                animationDuration: '5s',
                filter: 'drop-shadow(0 0 10px var(--theme-primary))'
              }}
            >
              <IconComponent className="w-6 h-6" style={{ color: 'var(--theme-primary)' }} />
            </div>
          )
        })}
      </div>

      {/* Header */}
      <header className="backdrop-blur-sm border-b sticky top-0 z-50 transition-all duration-500" style={{
        backgroundColor: 'var(--theme-surface)90',
        borderColor: 'var(--theme-border)'
      }}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 animate-slide-in-left">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center animate-heartbeat transition-all duration-500" style={{
              background: `linear-gradient(45deg, var(--theme-primary), var(--theme-accent))`
            }}>
              <Zap className="w-5 h-5 text-white animate-flash" />
            </div>
            <span className="text-xl font-bold transition-colors duration-500" style={{
              background: `linear-gradient(45deg, var(--theme-primary), var(--theme-accent))`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              WebCraft Studio
            </span>
          </Link>
          
          <div className="flex items-center space-x-4 animate-slide-in-right">
            {/* Theme Indicator */}
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
                {themes[currentThemeIndex].name.charAt(0).toUpperCase() + themes[currentThemeIndex].name.slice(1)}
              </span>
            </div>
            <SimpleThemeSelector />
            <Link href="/auth/signin">
              <Button variant="outline" className="transition-all duration-300 hover:scale-105" style={{
                borderColor: 'var(--theme-border)',
                color: 'var(--theme-text)'
              }}>
                Sign In
              </Button>
            </Link>
            <Link href="/free-trial">
              <Button className="transition-all duration-300 hover:scale-105" style={{
                backgroundColor: 'var(--theme-primary)',
                color: 'white'
              }}>
                Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6 animate-bounce-in transition-all duration-500" style={{
            backgroundColor: 'var(--theme-primary)20',
            borderColor: 'var(--theme-primary)',
            border: '1px solid'
          }}>
            <Gift className="w-5 h-5 animate-spin" style={{ 
              color: 'var(--theme-primary)',
              animationDuration: '3s'
            }} />
            <span className="text-sm font-medium transition-colors duration-500" style={{ color: 'var(--theme-primary)' }}>
              Try Demo - Create 1 Website Free
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight animate-bounce-in transition-colors duration-500">
            <span className="animate-rainbow-shimmer" style={{
              background: `linear-gradient(45deg, var(--theme-primary), var(--theme-accent))`,
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Build Your Website
            </span>
            <br />
            <span style={{ color: 'var(--theme-text)' }}>In Minutes, Not Hours</span>
          </h1>
          
          <p className="text-xl mb-8 max-w-2xl mx-auto animate-roll-in transition-colors duration-500" style={{ 
            animationDelay: '0.3s',
            color: 'var(--theme-muted)'
          }}>
            Try our website builder completely free! No signup required. 
            Create one beautiful website with 17 themes and 18+ animations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-tada" style={{ animationDelay: '0.6s' }}>
            <Button 
              size="lg" 
              onClick={startDemo}
              className="text-lg px-8 py-4 animate-glow hover:animate-bounce-gentle hover:scale-105 transition-all duration-300 relative overflow-hidden"
              style={{
                backgroundColor: 'var(--theme-primary)',
                color: 'white'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shimmer" />
              <Play className="w-5 h-5 mr-2 animate-bounce" />
              Start Demo Now - It's Free!
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-4 hover:animate-swing hover:scale-105 transition-all duration-300"
              asChild
              style={{
                borderColor: 'var(--theme-border)',
                color: 'var(--theme-text)'
              }}
            >
              <Link href="/animation-showcase">
                <Sparkles className="w-5 h-5 mr-2 animate-spin" style={{ animationDuration: '2s' }} />
                View Live Demo
              </Link>
            </Button>
          </div>
          
          <div className="text-sm animate-fade-up" style={{ 
            color: 'var(--theme-muted)',
            animationDelay: '0.8s'
          }}>
            ✅ No credit card required • ✅ No signup needed • ✅ Instant access
          </div>
        </div>

        {/* Demo Flow Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              step: '1',
              title: 'Click "Start Demo"',
              description: 'Instantly access the demo - no forms to fill, no waiting. Just click and start building!',
              color: 'var(--theme-primary)'
            },
            {
              step: '2', 
              title: 'Build Your Website',
              description: 'Use our drag-and-drop editor with 17 themes and 18+ animations. See your changes in real-time!',
              color: 'var(--theme-accent)'
            },
            {
              step: '3',
              title: 'Love It? Upgrade!',
              description: 'Create up to 10 websites with our paid plans. Export code, custom domains, and more!',
              color: 'var(--theme-primary)'
            }
          ].map((item, index) => (
            <Card key={item.step} className="border-0 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in group" style={{
              backgroundColor: 'var(--theme-surface)80',
              animationDelay: `${1 + index * 0.2}s`
            }}>
              <CardHeader className="text-center">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow group-hover:animate-heartbeat transition-all duration-500"
                  style={{
                    background: `linear-gradient(45deg, ${item.color}, var(--theme-accent))`,
                    boxShadow: `0 0 20px ${item.color}40`
                  }}
                >
                  <span className="text-2xl font-bold text-white">{item.step}</span>
                </div>
                <CardTitle className="group-hover:animate-jello transition-colors duration-500" style={{ color: 'var(--theme-text)' }}>
                  {item.title}
                </CardTitle>
                <CardDescription className="transition-colors duration-500" style={{ color: 'var(--theme-muted)' }}>
                  {item.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 animate-text-glow transition-colors duration-500" style={{
            color: 'var(--theme-text)'
          }}>
            What You'll Experience in the Demo
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Palette, title: '17 Beautiful Themes', desc: 'From Neon to Elegant, Cosmic to Minimal. Switch themes instantly and see your site transform.' },
              { icon: Sparkles, title: '18+ Animations', desc: 'Bring your website to life with fadeUp, bounce, slide, wiggle, and many more stunning effects.' },
              { icon: Code, title: 'Drag & Drop Editor', desc: 'No coding required! Build professional websites with our intuitive visual editor.' },
              { icon: Globe, title: 'Mobile Responsive', desc: 'Your websites automatically look perfect on all devices - desktop, tablet, and mobile.' },
              { icon: Zap, title: 'Lightning Fast', desc: 'Optimized for speed and performance. Your sites load instantly and rank better in search.' },
              { icon: Users, title: 'Multiple Tech Stacks', desc: 'Choose from Visual Builder, HTML/CSS, JavaScript, React, Python, PHP, or WordPress.' }
            ].map((feature, index) => (
              <Card key={feature.title} className="border-0 backdrop-blur-sm hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-up group" style={{
                backgroundColor: 'var(--theme-surface)80',
                animationDelay: `${1.5 + index * 0.1}s`
              }}>
                <CardHeader>
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 animate-float group-hover:animate-bounce transition-all duration-500"
                    style={{
                      background: `linear-gradient(45deg, var(--theme-primary), var(--theme-accent))`,
                      boxShadow: `0 0 15px var(--theme-primary)30`
                    }}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="group-hover:animate-swing transition-colors duration-500" style={{ color: 'var(--theme-text)' }}>
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="transition-colors duration-500" style={{ color: 'var(--theme-muted)' }}>
                    {feature.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="border-0 overflow-hidden relative animate-scale-in" style={{
          background: `linear-gradient(135deg, var(--theme-primary), var(--theme-accent))`,
          animationDelay: '2s'
        }}>
          <div className="absolute inset-0 bg-black/10"></div>
          <CardContent className="relative z-10 text-center py-16">
            <h2 className="text-4xl font-bold mb-6 text-white animate-text-glow">
              Ready to Create Your Free Website?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
              Join thousands of creators who've built amazing websites with WebCraft Studio. 
              Start your demo now - it takes less than 30 seconds!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={startDemo}
                className="text-lg px-8 py-4 bg-white hover:bg-gray-100 font-semibold animate-glow hover:animate-bounce-gentle hover:scale-105 transition-all duration-300"
                style={{ color: 'var(--theme-primary)' }}
              >
                <Rocket className="w-5 h-5 mr-2 animate-bounce" />
                Start Building Your Website Now!
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-4 border-white text-white hover:bg-white/10 hover:animate-swing hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link href="/free-trial">
                  <Crown className="w-5 h-5 mr-2 animate-flash" />
                  View Pricing Plans
                </Link>
              </Button>
            </div>
            
            <div className="mt-6 text-sm text-white/80 animate-fade-up" style={{ animationDelay: '2.5s' }}>
              🎉 Special: Create 1 website completely free • No time limits on demo
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
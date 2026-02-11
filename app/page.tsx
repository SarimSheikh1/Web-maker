'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Zap, Palette, Globe, Code, Users, Star, Sparkles, Rocket, Heart } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { SimpleThemeSelector } from '@/components/simple-theme-selector'
import { useEffect } from 'react'

export default function HomePage() {
  const { data: session } = useSession()

  // Load saved theme on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('sitecraft-theme')
      const themes = {
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
      
      if (savedTheme && themes[savedTheme as keyof typeof themes]) {
        const colors = themes[savedTheme as keyof typeof themes]
        document.documentElement.style.setProperty('--theme-background', colors.bg)
        document.documentElement.style.setProperty('--theme-text', colors.text)
        document.documentElement.style.setProperty('--theme-primary', colors.primary)
        document.documentElement.style.setProperty('--theme-accent', colors.primary)
        document.documentElement.style.setProperty('--theme-surface', colors.bg)
        document.documentElement.style.setProperty('--theme-muted', colors.text + '80')
        document.documentElement.style.setProperty('--theme-border', colors.text + '20')
        document.body.classList.add(`theme-${savedTheme}`)
      }
    } catch (e) {
      console.warn('Failed to load saved theme:', e)
    }
  }, [])

  return (
    <div className="min-h-screen transition-all duration-500" style={{
      backgroundColor: 'var(--theme-background)',
      color: 'var(--theme-text)',
      fontFamily: 'var(--theme-font-family)'
    }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full opacity-20 animate-float transition-all duration-500" style={{
          background: `linear-gradient(45deg, var(--theme-primary), var(--theme-accent))`
        }}></div>
        <div className="absolute top-40 right-20 w-16 h-16 rounded-full opacity-20 animate-bounce-gentle transition-all duration-500" style={{ 
          animationDelay: '1s',
          background: `linear-gradient(45deg, var(--theme-accent), var(--theme-secondary))`
        }}></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 rounded-full opacity-20 animate-pulse-glow transition-all duration-500" style={{ 
          animationDelay: '2s',
          background: `linear-gradient(45deg, var(--theme-success), var(--theme-primary))`
        }}></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 rounded-full opacity-20 animate-wiggle transition-all duration-500" style={{ 
          animationDelay: '0.5s',
          background: `linear-gradient(45deg, var(--theme-warning), var(--theme-accent))`
        }}></div>
        
        {/* More Floating Particles */}
        <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full animate-particle-float opacity-60 transition-all duration-500" style={{
          backgroundColor: 'var(--theme-primary)'
        }}></div>
        <div className="absolute top-1/3 right-1/3 w-4 h-4 rounded-full animate-particle-float opacity-40 transition-all duration-500" style={{ 
          animationDelay: '1.5s',
          backgroundColor: 'var(--theme-accent)'
        }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full animate-particle-float opacity-50 transition-all duration-500" style={{ 
          animationDelay: '3s',
          backgroundColor: 'var(--theme-secondary)'
        }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-5 h-5 rounded-full animate-particle-float opacity-30 transition-all duration-500" style={{ 
          animationDelay: '2.5s',
          backgroundColor: 'var(--theme-success)'
        }}></div>
        
        {/* Additional Animated Elements */}
        <div className="absolute top-1/2 left-5 w-8 h-8 rounded-full animate-heartbeat opacity-30" style={{
          backgroundColor: 'var(--theme-primary)'
        }}></div>
        <div className="absolute top-3/4 right-5 w-10 h-10 rounded-full animate-flash opacity-20" style={{
          backgroundColor: 'var(--theme-accent)'
        }}></div>
        <div className="absolute top-10 left-1/2 w-4 h-4 rounded-full animate-bounce-in opacity-40" style={{
          backgroundColor: 'var(--theme-warning)',
          animationDelay: '4s'
        }}></div>
        
        {/* Morphing Shapes */}
        <div className="absolute top-10 right-1/4 w-32 h-32 opacity-10 animate-morph transition-all duration-500" style={{
          background: `linear-gradient(45deg, var(--theme-primary), var(--theme-accent))`
        }}></div>
        <div className="absolute bottom-10 left-1/4 w-40 h-40 opacity-10 animate-morph transition-all duration-500" style={{ 
          animationDelay: '4s',
          background: `linear-gradient(45deg, var(--theme-accent), var(--theme-secondary))`
        }}></div>
        
        {/* Floating Icons */}
        <div className="absolute top-1/3 left-10 animate-swing opacity-20" style={{ animationDelay: '2s' }}>
          <Sparkles className="w-6 h-6" style={{ color: 'var(--theme-primary)' }} />
        </div>
        <div className="absolute bottom-1/3 right-10 animate-wobble opacity-20" style={{ animationDelay: '3s' }}>
          <Star className="w-8 h-8" style={{ color: 'var(--theme-accent)' }} />
        </div>
        <div className="absolute top-2/3 left-1/2 animate-rubber-band opacity-20" style={{ animationDelay: '1s' }}>
          <Heart className="w-5 h-5" style={{ color: 'var(--theme-warning)' }} />
        </div>
        <div className="absolute top-1/4 right-1/3 animate-jello opacity-15" style={{ animationDelay: '2.5s' }}>
          <Rocket className="w-7 h-7" style={{ color: 'var(--theme-success)' }} />
        </div>
      </div>

      {/* Header */}
      <header className="border-b backdrop-blur-sm sticky top-0 z-50 animate-slide-down transition-all duration-500" style={{
        backgroundColor: 'var(--theme-surface)',
        borderColor: 'var(--theme-border)'
      }}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 animate-roll-in">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center animate-heartbeat transition-all duration-500" style={{
              background: `linear-gradient(45deg, var(--theme-primary), var(--theme-accent))`
            }}>
              <Zap className="w-5 h-5 text-white animate-flash" />
            </div>
            <span className="text-xl font-bold animate-text-glow transition-colors duration-500" style={{
              color: 'var(--theme-text)'
            }}>WebCraft Studio</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8 animate-bounce-in" style={{ animationDelay: '0.2s' }}>
            <Link href="#features" className="transition-all duration-300 hover:scale-105 hover:animate-jello" style={{
              color: 'var(--theme-muted)'
            }}>
              Features
            </Link>
            <Link href="/pricing" className="transition-all duration-300 hover:scale-105 hover:animate-swing" style={{
              color: 'var(--theme-muted)'
            }}>
              Pricing
            </Link>
            <Link href="/demo" className="transition-all duration-300 hover:scale-105 hover:animate-bounce-gentle" style={{
              color: 'var(--theme-primary)'
            }}>
              Try Demo
            </Link>
            <Link href="/free-trial" className="transition-all duration-300 hover:scale-105 hover:animate-bounce-gentle" style={{
              color: 'var(--theme-primary)'
            }}>
              Free Trial
            </Link>
            <Link href="/animation-showcase" className="transition-all duration-300 hover:scale-105 hover:animate-tada" style={{
              color: 'var(--theme-accent)'
            }}>
              Animations
            </Link>
          </nav>
          <div className="flex items-center space-x-4 animate-slide-in-right">
            <SimpleThemeSelector />
            {session ? (
              <Button asChild className="animate-glow hover:animate-tada transition-all duration-500" style={{
                backgroundColor: 'var(--theme-primary)',
                color: 'white'
              }}>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild className="hover:animate-wobble transition-all duration-500" style={{
                  color: 'var(--theme-text)'
                }}>
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
                <Button asChild className="animate-glow hover:animate-rubber-band transition-all duration-500" style={{
                  backgroundColor: 'var(--theme-primary)',
                  color: 'white'
                }}>
                  <Link href="/auth/signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight animate-bounce-in transition-colors duration-500" style={{
              color: 'var(--theme-text)'
            }}>
              Create Stunning Websites
              <span className="block mt-2 animate-rainbow-shimmer" style={{
                background: `linear-gradient(45deg, var(--theme-primary), var(--theme-accent), var(--theme-secondary))`,
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                With WebCraft Studio
              </span>
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto animate-roll-in transition-colors duration-500" style={{ 
              animationDelay: '0.3s',
              color: 'var(--theme-muted)'
            }}>
              The ultimate website builder for creators, businesses, and developers. 
              Choose your preferred technology stack and build professional websites in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-tada" style={{ animationDelay: '0.6s' }}>
              <Button size="lg" className="text-lg px-8 py-4 animate-glow hover:animate-jello hover:scale-105 transition-all duration-300" asChild style={{
                backgroundColor: 'var(--theme-primary)',
                color: 'white'
              }}>
                <Link href="/create-website">
                  Get Started - Create Website Now!
                  <ArrowRight className="ml-2 w-5 h-5 animate-heartbeat" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 hover:animate-swing hover:scale-105 transition-all duration-300" asChild style={{
                borderColor: 'var(--theme-border)',
                color: 'var(--theme-text)'
              }}>
                <Link href="/demo">
                  Try Demo
                  <Star className="ml-2 w-5 h-5 animate-flash" />
                </Link>
              </Button>
            </div>
            
            {/* Theme Preview Cards */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-6 text-center animate-text-glow transition-colors duration-500" style={{
                color: 'var(--theme-text)'
              }}>
                17 Beautiful Themes
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3 max-w-4xl mx-auto">
                {[
                  { name: 'Default', bg: 'bg-blue-500', accent: 'border-blue-400', theme: 'default' },
                  { name: 'Dark', bg: 'bg-gray-800', accent: 'border-gray-600', theme: 'dark' },
                  { name: 'Neon', bg: 'bg-black', accent: 'border-cyan-400', theme: 'neon' },
                  { name: 'Ocean', bg: 'bg-blue-100', accent: 'border-blue-500', theme: 'ocean' },
                  { name: 'Forest', bg: 'bg-green-100', accent: 'border-green-500', theme: 'forest' },
                  { name: 'Sunset', bg: 'bg-orange-100', accent: 'border-orange-500', theme: 'sunset' },
                  { name: 'Royal', bg: 'bg-purple-100', accent: 'border-purple-500', theme: 'royal' },
                  { name: 'Cosmic', bg: 'bg-gray-900', accent: 'border-purple-400', theme: 'cosmic' },
                  { name: 'Retro', bg: 'bg-yellow-200', accent: 'border-red-400', theme: 'retro' },
                  { name: 'Arctic', bg: 'bg-slate-100', accent: 'border-blue-400', theme: 'arctic' },
                  { name: 'Pastel', bg: 'bg-pink-50', accent: 'border-pink-400', theme: 'pastel' },
                  { name: 'Cyber', bg: 'bg-black', accent: 'border-green-400', theme: 'cyberpunk' },
                  { name: 'Minimal', bg: 'bg-gray-50', accent: 'border-gray-300', theme: 'minimal' },
                  { name: 'Vibrant', bg: 'bg-red-400', accent: 'border-red-500', theme: 'vibrant' },
                  { name: 'Elegant', bg: 'bg-indigo-100', accent: 'border-indigo-400', theme: 'elegant' },
                  { name: 'Modern', bg: 'bg-teal-100', accent: 'border-teal-400', theme: 'modern' },
                  { name: 'Warm', bg: 'bg-amber-100', accent: 'border-amber-400', theme: 'warm' },
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
                        cyberpunk: { bg: '#000000', text: '#00ff41', primary: '#ff0080' },
                        minimal: { bg: '#f9fafb', text: '#111827', primary: '#6b7280' },
                        vibrant: { bg: '#fef2f2', text: '#7f1d1d', primary: '#dc2626' },
                        elegant: { bg: '#f0f9ff', text: '#1e3a8a', primary: '#3b82f6' },
                        modern: { bg: '#f0fdfa', text: '#134e4a', primary: '#14b8a6' },
                        warm: { bg: '#fffbeb', text: '#92400e', primary: '#d97706' }
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
                    className={`${theme.bg} ${theme.accent} border-2 rounded-lg p-2 text-center animate-bounce-in hover:animate-jello hover:scale-110 transition-all duration-300 cursor-pointer relative overflow-hidden group`}
                    style={{ animationDelay: `${0.8 + index * 0.03}s` }}
                    onMouseEnter={(e) => {
                      const animations = ['animate-wobble', 'animate-rubber-band', 'animate-swing', 'animate-heartbeat', 'animate-flash', 'animate-shake']
                      const randomAnimation = animations[Math.floor(Math.random() * animations.length)]
                      const target = e.currentTarget
                      if (target) {
                        target.classList.add(randomAnimation)
                        setTimeout(() => {
                          if (target) {
                            target.classList.remove(randomAnimation)
                          }
                        }, 1000)
                      }
                    }}
                  >
                    <div className="text-xs font-medium opacity-80 relative z-10 group-hover:opacity-100 transition-opacity duration-300">{theme.name}</div>
                    {/* Sparkle effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300">
                      <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full animate-flash"></div>
                      <div className="absolute bottom-1 left-1 w-1 h-1 bg-white rounded-full animate-flash" style={{ animationDelay: '0.5s' }}></div>
                      <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.25s' }}></div>
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300" style={{
                      background: `linear-gradient(45deg, var(--theme-primary), var(--theme-accent))`,
                      filter: 'blur(8px)'
                    }}></div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Animation Preview Section */}
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold mb-6 animate-text-glow transition-colors duration-500" style={{
                color: 'var(--theme-text)'
              }}>
                18+ Amazing Animations
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
                {[
                  { name: 'Bounce', icon: '⚡', animation: 'animate-bounce' },
                  { name: 'Fade', icon: '✨', animation: 'animate-fade-up' },
                  { name: 'Slide', icon: '🚀', animation: 'animate-slide-in-right' },
                  { name: 'Spin', icon: '🌀', animation: 'animate-spin' },
                  { name: 'Pulse', icon: '💓', animation: 'animate-pulse' },
                  { name: 'Wiggle', icon: '🎭', animation: 'animate-wiggle' },
                  { name: 'Shake', icon: '📳', animation: 'animate-shake' },
                  { name: 'Swing', icon: '🎪', animation: 'animate-swing' },
                  { name: 'Tada', icon: '🎉', animation: 'animate-tada' },
                  { name: 'Jello', icon: '🍮', animation: 'animate-jello' },
                  { name: 'Rubber', icon: '🎈', animation: 'animate-rubber-band' },
                  { name: 'Flash', icon: '⚡', animation: 'animate-flash' },
                ].map((anim, index) => (
                  <div
                    key={anim.name}
                    className={`p-3 rounded-lg border-2 text-center cursor-pointer transition-all duration-300 hover:scale-110 ${anim.animation}`}
                    style={{
                      backgroundColor: 'var(--theme-surface)',
                      borderColor: 'var(--theme-border)',
                      animationDelay: `${index * 0.1}s`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.classList.add(anim.animation)
                    }}
                    onMouseLeave={(e) => {
                      const target = e.currentTarget
                      setTimeout(() => {
                        if (target) {
                          target.classList.remove(anim.animation)
                        }
                      }, 1000)
                    }}
                  >
                    <div className="text-xl mb-1">{anim.icon}</div>
                    <div className="text-xs font-medium" style={{ color: 'var(--theme-text)' }}>
                      {anim.name}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button asChild className="animate-glow hover:animate-bounce-gentle transition-all duration-300" style={{
                  backgroundColor: 'var(--theme-accent)',
                  color: 'white'
                }}>
                  <Link href="/animation-showcase">
                    View All Animations
                    <Sparkles className="ml-2 w-4 h-4 animate-flash" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 relative transition-all duration-500" style={{
        backgroundColor: 'var(--theme-surface)'
      }}>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl font-bold mb-4 animate-text-glow transition-colors duration-500" style={{
              color: 'var(--theme-text)'
            }}>
              Everything you need to build amazing websites
            </h2>
            <p className="text-xl max-w-2xl mx-auto transition-colors duration-500" style={{
              color: 'var(--theme-muted)'
            }}>
              Powerful features that make website building simple and enjoyable
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-roll-in group" style={{
              backgroundColor: 'var(--theme-background)',
              borderColor: 'var(--theme-border)'
            }}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 animate-heartbeat group-hover:animate-jello transition-all duration-500" style={{
                  backgroundColor: 'var(--theme-primary)',
                  opacity: 0.1
                }}>
                  <Palette className="w-6 h-6 animate-swing" style={{ color: 'var(--theme-primary)' }} />
                </div>
                <CardTitle className="group-hover:animate-rubber-band transition-colors duration-500" style={{
                  color: 'var(--theme-text)'
                }}>Visual Editor</CardTitle>
                <CardDescription style={{ color: 'var(--theme-muted)' }}>
                  Drag and drop blocks to build your pages. See changes in real-time with our intuitive visual editor.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in group" style={{ 
              animationDelay: '0.1s',
              backgroundColor: 'var(--theme-background)',
              borderColor: 'var(--theme-border)'
            }}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 animate-flash group-hover:animate-wobble transition-all duration-500" style={{
                  backgroundColor: 'var(--theme-accent)',
                  opacity: 0.1
                }}>
                  <Globe className="w-6 h-6 animate-spin" style={{ color: 'var(--theme-accent)', animationDuration: '3s' }} />
                </div>
                <CardTitle className="group-hover:animate-swing transition-colors duration-500" style={{
                  color: 'var(--theme-text)'
                }}>Responsive Design</CardTitle>
                <CardDescription style={{ color: 'var(--theme-muted)' }}>
                  Your websites automatically look great on all devices. Mobile-first design that scales perfectly.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-tada group" style={{ 
              animationDelay: '0.2s',
              backgroundColor: 'var(--theme-background)',
              borderColor: 'var(--theme-border)'
            }}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 animate-pulse-glow group-hover:animate-shake transition-all duration-500" style={{
                  backgroundColor: 'var(--theme-success)',
                  opacity: 0.1
                }}>
                  <Zap className="w-6 h-6 animate-bounce" style={{ color: 'var(--theme-success)' }} />
                </div>
                <CardTitle className="group-hover:animate-jello transition-colors duration-500" style={{
                  color: 'var(--theme-text)'
                }}>Lightning Fast</CardTitle>
                <CardDescription style={{ color: 'var(--theme-muted)' }}>
                  Optimized for speed and performance. Your sites load instantly and rank better in search engines.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-wobble group" style={{ 
              animationDelay: '0.3s',
              backgroundColor: 'var(--theme-background)',
              borderColor: 'var(--theme-border)'
            }}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 animate-float group-hover:animate-rubber-band transition-all duration-500" style={{
                  backgroundColor: 'var(--theme-warning)',
                  opacity: 0.1
                }}>
                  <Code className="w-6 h-6 animate-pulse" style={{ color: 'var(--theme-warning)' }} />
                </div>
                <CardTitle className="group-hover:animate-tada transition-colors duration-500" style={{
                  color: 'var(--theme-text)'
                }}>Multiple Tech Stacks</CardTitle>
                <CardDescription style={{ color: 'var(--theme-muted)' }}>
                  Choose from Visual Builder, HTML/CSS, JavaScript, React, Python, PHP, or WordPress. Your preferred stack, your way.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-swing group" style={{ 
              animationDelay: '0.4s',
              backgroundColor: 'var(--theme-background)',
              borderColor: 'var(--theme-border)'
            }}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 animate-wiggle group-hover:animate-heartbeat transition-all duration-500" style={{
                  backgroundColor: 'var(--theme-secondary)',
                  opacity: 0.1
                }}>
                  <Users className="w-6 h-6 animate-bounce-gentle" style={{ color: 'var(--theme-secondary)' }} />
                </div>
                <CardTitle className="group-hover:animate-wobble transition-colors duration-500" style={{
                  color: 'var(--theme-text)'
                }}>17 Beautiful Themes</CardTitle>
                <CardDescription style={{ color: 'var(--theme-muted)' }}>
                  From Neon to Elegant, Cosmic to Minimal. Real-time theme switching with instant preview.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-jello group" style={{ 
              animationDelay: '0.5s',
              backgroundColor: 'var(--theme-background)',
              borderColor: 'var(--theme-border)'
            }}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 animate-bounce-gentle group-hover:animate-flash transition-all duration-500" style={{
                  backgroundColor: 'var(--theme-accent)',
                  opacity: 0.1
                }}>
                  <Sparkles className="w-6 h-6 animate-spin" style={{ color: 'var(--theme-accent)', animationDuration: '2s' }} />
                </div>
                <CardTitle className="group-hover:animate-swing transition-colors duration-500" style={{
                  color: 'var(--theme-text)'
                }}>18+ Animations</CardTitle>
                <CardDescription style={{ color: 'var(--theme-muted)' }}>
                  Bring your websites to life with bounce, fade, slide, wiggle, and many more stunning animations.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden transition-all duration-500" style={{
        background: `linear-gradient(135deg, var(--theme-primary), var(--theme-accent))`
      }}>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6 animate-zoom-in">
              Ready to create your first website for free?
            </h2>
            <p className="text-xl text-white/80 mb-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Try our demo and create one beautiful website completely free. No credit card required!
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4 animate-glow hover:animate-bounce-gentle hover:scale-110 transition-all duration-300" asChild style={{
              backgroundColor: 'var(--theme-background)',
              color: 'var(--theme-text)'
            }}>
              <Link href="/demo">
                Create Your Free Website Now
                <ArrowRight className="ml-2 w-5 h-5 animate-pulse" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 relative overflow-hidden transition-all duration-500" style={{
        backgroundColor: 'var(--theme-text)',
        color: 'var(--theme-background)'
      }}>
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="animate-slide-in-left">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center animate-glow transition-all duration-500" style={{
                  background: `linear-gradient(45deg, var(--theme-primary), var(--theme-accent))`
                }}>
                  <Zap className="w-5 h-5 text-white animate-pulse" />
                </div>
                <span className="text-xl font-bold animate-text-glow">WebCraft Studio</span>
              </div>
              <p className="opacity-80">
                Build beautiful websites without code. Fast, easy, and professional.
              </p>
            </div>
            <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 opacity-80">
                <li><Link href="#features" className="hover:opacity-100 transition-all duration-300 hover:animate-bounce-gentle">Features</Link></li>
                <li><Link href="/pricing" className="hover:opacity-100 transition-all duration-300 hover:animate-bounce-gentle">Pricing</Link></li>
                <li><Link href="/free-trial" className="hover:opacity-100 transition-all duration-300 hover:animate-bounce-gentle">Free Trial</Link></li>
              </ul>
            </div>
            <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 opacity-80">
                <li><Link href="/about" className="hover:opacity-100 transition-all duration-300 hover:animate-bounce-gentle">About</Link></li>
                <li><Link href="/contact" className="hover:opacity-100 transition-all duration-300 hover:animate-bounce-gentle">Contact</Link></li>
                <li><Link href="/blog" className="hover:opacity-100 transition-all duration-300 hover:animate-bounce-gentle">Blog</Link></li>
              </ul>
            </div>
            <div className="animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 opacity-80">
                <li><Link href="/help" className="hover:opacity-100 transition-all duration-300 hover:animate-bounce-gentle">Help Center</Link></li>
                <li><Link href="/docs" className="hover:opacity-100 transition-all duration-300 hover:animate-bounce-gentle">Documentation</Link></li>
                <li><Link href="/community" className="hover:opacity-100 transition-all duration-300 hover:animate-bounce-gentle">Community</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center opacity-80 animate-fade-up transition-all duration-500" style={{ 
            animationDelay: '0.4s',
            borderColor: 'var(--theme-border)'
          }}>
            <p>&copy; 2024 WebCraft Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
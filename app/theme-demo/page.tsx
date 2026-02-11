'use client'

import { ThemeSelector } from '@/components/theme-selector'
import { useTheme } from '@/components/theme-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Palette, Zap, Star, Heart, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function ThemeDemo() {
  const { currentTheme, themeTokens } = useTheme()

  return (
    <div className="min-h-screen transition-all duration-500" style={{
      backgroundColor: 'var(--theme-background)',
      color: 'var(--theme-text)',
      fontFamily: 'var(--theme-font-family)'
    }}>
      {/* Header */}
      <header className="border-b backdrop-blur-sm sticky top-0 z-50 transition-all duration-500" style={{
        backgroundColor: 'var(--theme-surface)',
        borderColor: 'var(--theme-border)'
      }}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-500" style={{
              background: `linear-gradient(45deg, var(--theme-primary), var(--theme-accent))`
            }}>
              <Palette className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Theme Demo</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeSelector variant="grid" />
            <Button asChild style={{
              backgroundColor: 'var(--theme-primary)',
              color: 'white'
            }}>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 transition-colors duration-500" style={{
            color: 'var(--theme-text)'
          }}>
            Live Theme Switching Demo
          </h1>
          <p className="text-xl mb-6 transition-colors duration-500" style={{
            color: 'var(--theme-muted)'
          }}>
            Change themes and watch the entire page transform in real-time!
          </p>
          
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Badge variant="outline" className="text-lg px-4 py-2" style={{
              borderColor: 'var(--theme-border)',
              color: 'var(--theme-text)'
            }}>
              Current Theme: {currentTheme}
            </Badge>
            <Badge style={{
              backgroundColor: 'var(--theme-primary)',
              color: 'white'
            }}>
              17 Themes Available
            </Badge>
          </div>
        </div>

        {/* Theme Information */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="transition-all duration-500" style={{
            backgroundColor: 'var(--theme-surface)',
            borderColor: 'var(--theme-border)'
          }}>
            <CardHeader>
              <CardTitle className="flex items-center" style={{ color: 'var(--theme-text)' }}>
                <Palette className="w-5 h-5 mr-2" style={{ color: 'var(--theme-primary)' }} />
                Colors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span style={{ color: 'var(--theme-muted)' }}>Primary:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: themeTokens.colors.primary }}></div>
                    <span className="text-sm font-mono" style={{ color: 'var(--theme-text)' }}>{themeTokens.colors.primary}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: 'var(--theme-muted)' }}>Accent:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: themeTokens.colors.accent }}></div>
                    <span className="text-sm font-mono" style={{ color: 'var(--theme-text)' }}>{themeTokens.colors.accent}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: 'var(--theme-muted)' }}>Background:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded border" style={{ 
                      backgroundColor: themeTokens.colors.background,
                      borderColor: 'var(--theme-border)'
                    }}></div>
                    <span className="text-sm font-mono" style={{ color: 'var(--theme-text)' }}>{themeTokens.colors.background}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="transition-all duration-500" style={{
            backgroundColor: 'var(--theme-surface)',
            borderColor: 'var(--theme-border)'
          }}>
            <CardHeader>
              <CardTitle className="flex items-center" style={{ color: 'var(--theme-text)' }}>
                <Zap className="w-5 h-5 mr-2" style={{ color: 'var(--theme-accent)' }} />
                Typography
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span style={{ color: 'var(--theme-muted)' }}>Font:</span>
                  <span className="font-medium" style={{ color: 'var(--theme-text)' }}>{themeTokens.typography.fontFamily}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: 'var(--theme-muted)' }}>Size:</span>
                  <span className="font-medium" style={{ color: 'var(--theme-text)' }}>{themeTokens.typography.baseSize}px</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: 'var(--theme-muted)' }}>Scale:</span>
                  <span className="font-medium" style={{ color: 'var(--theme-text)' }}>{themeTokens.typography.headingScale}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="transition-all duration-500" style={{
            backgroundColor: 'var(--theme-surface)',
            borderColor: 'var(--theme-border)'
          }}>
            <CardHeader>
              <CardTitle className="flex items-center" style={{ color: 'var(--theme-text)' }}>
                <Star className="w-5 h-5 mr-2" style={{ color: 'var(--theme-success)' }} />
                Spacing & Radius
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span style={{ color: 'var(--theme-muted)' }}>Border Radius:</span>
                  <span className="font-medium" style={{ color: 'var(--theme-text)' }}>{themeTokens.radius.md}px</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: 'var(--theme-muted)' }}>Base Spacing:</span>
                  <span className="font-medium" style={{ color: 'var(--theme-text)' }}>{themeTokens.spacing.md}px</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: 'var(--theme-muted)' }}>Animation:</span>
                  <span className="font-medium" style={{ color: 'var(--theme-text)' }}>{themeTokens.animation.duration.normal}ms</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Elements */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="transition-all duration-500" style={{
            backgroundColor: 'var(--theme-surface)',
            borderColor: 'var(--theme-border)'
          }}>
            <CardHeader>
              <CardTitle style={{ color: 'var(--theme-text)' }}>Interactive Elements</CardTitle>
              <CardDescription style={{ color: 'var(--theme-muted)' }}>
                See how buttons and components adapt to the theme
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" style={{
                backgroundColor: 'var(--theme-primary)',
                color: 'white'
              }}>
                Primary Button
              </Button>
              <Button variant="outline" className="w-full" style={{
                borderColor: 'var(--theme-border)',
                color: 'var(--theme-text)'
              }}>
                Outline Button
              </Button>
              <Button variant="ghost" className="w-full" style={{
                color: 'var(--theme-text)'
              }}>
                Ghost Button
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-all duration-500" style={{
            backgroundColor: 'var(--theme-surface)',
            borderColor: 'var(--theme-border)'
          }}>
            <CardHeader>
              <CardTitle style={{ color: 'var(--theme-text)' }}>Theme Features</CardTitle>
              <CardDescription style={{ color: 'var(--theme-muted)' }}>
                What makes each theme unique
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4" style={{ color: 'var(--theme-primary)' }} />
                  <span style={{ color: 'var(--theme-text)' }}>Dynamic color adaptation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4" style={{ color: 'var(--theme-accent)' }} />
                  <span style={{ color: 'var(--theme-text)' }}>Smooth transitions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4" style={{ color: 'var(--theme-success)' }} />
                  <span style={{ color: 'var(--theme-text)' }}>Real-time updates</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4" style={{ color: 'var(--theme-warning)' }} />
                  <span style={{ color: 'var(--theme-text)' }}>Persistent preferences</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto transition-all duration-500" style={{
            backgroundColor: 'var(--theme-surface)',
            borderColor: 'var(--theme-border)'
          }}>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--theme-text)' }}>
                Try Different Themes!
              </h2>
              <p className="mb-6" style={{ color: 'var(--theme-muted)' }}>
                Click the theme selector in the header to see how the entire page transforms. 
                Each theme has its own personality and color scheme.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Neon', 'Cosmic', 'Retro', 'Cyberpunk', 'Ocean', 'Forest'].map((theme) => (
                  <Badge key={theme} variant="outline" style={{
                    borderColor: 'var(--theme-border)',
                    color: 'var(--theme-text)'
                  }}>
                    {theme}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
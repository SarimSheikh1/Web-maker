'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Eye, Palette, Zap, Play } from 'lucide-react'
import Link from 'next/link'

const animations = [
  'none', 'fadeUp', 'fadeDown', 'fadeLeft', 'fadeRight', 'blurIn', 'scaleIn', 
  'rotateIn', 'slideUp', 'slideDown', 'flipIn', 'typewriter', 'gradientShimmer', 
  'rainbowShimmer', 'bounceGentle', 'pulseGlow', 'float', 'wiggle'
]

const themes = [
  'Default', 'Dark', 'Minimal', 'Vibrant', 'Elegant', 'Modern', 'Warm',
  'Neon', 'Ocean', 'Forest', 'Sunset', 'Royal', 'Cosmic', 'Retro', 
  'Arctic', 'Pastel', 'Cyberpunk'
]

export default function DemoEditor() {
  const [selectedAnimation, setSelectedAnimation] = useState('fadeUp')
  const [selectedTheme, setSelectedTheme] = useState('Modern')
  const [isAnimating, setIsAnimating] = useState(false)

  const triggerAnimation = () => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 2000)
  }

  const getAnimationClass = () => {
    if (!isAnimating || selectedAnimation === 'none') return ''
    return `animate-${selectedAnimation.replace(/([A-Z])/g, '-$1').toLowerCase()}`
  }

  const getThemeColors = (theme: string) => {
    const themeMap: Record<string, { bg: string, text: string, accent: string }> = {
      'Default': { bg: 'bg-white', text: 'text-gray-900', accent: 'text-blue-600' },
      'Dark': { bg: 'bg-gray-900', text: 'text-white', accent: 'text-blue-400' },
      'Minimal': { bg: 'bg-gray-50', text: 'text-black', accent: 'text-gray-800' },
      'Vibrant': { bg: 'bg-purple-50', text: 'text-gray-900', accent: 'text-purple-600' },
      'Elegant': { bg: 'bg-gray-100', text: 'text-gray-800', accent: 'text-amber-600' },
      'Modern': { bg: 'bg-blue-50', text: 'text-gray-900', accent: 'text-blue-600' },
      'Warm': { bg: 'bg-orange-50', text: 'text-gray-900', accent: 'text-orange-600' },
      'Neon': { bg: 'bg-black', text: 'text-cyan-400', accent: 'text-pink-400' },
      'Ocean': { bg: 'bg-blue-100', text: 'text-blue-900', accent: 'text-blue-600' },
      'Forest': { bg: 'bg-green-100', text: 'text-green-900', accent: 'text-green-600' },
      'Sunset': { bg: 'bg-orange-100', text: 'text-orange-900', accent: 'text-orange-600' },
      'Royal': { bg: 'bg-purple-100', text: 'text-purple-900', accent: 'text-purple-600' },
      'Cosmic': { bg: 'bg-gray-900', text: 'text-purple-300', accent: 'text-pink-400' },
      'Retro': { bg: 'bg-yellow-200', text: 'text-gray-800', accent: 'text-red-500' },
      'Arctic': { bg: 'bg-slate-100', text: 'text-slate-900', accent: 'text-blue-600' },
      'Pastel': { bg: 'bg-pink-50', text: 'text-gray-700', accent: 'text-pink-500' },
      'Cyberpunk': { bg: 'bg-black', text: 'text-green-400', accent: 'text-pink-500' },
    }
    return themeMap[theme] || themeMap['Default']
  }

  const themeColors = getThemeColors(selectedTheme)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/demo">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">Demo Editor</h1>
              <p className="text-sm text-gray-600">Test animations and themes</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button size="sm">
              Save Changes
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Controls Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Animations
                </CardTitle>
                <CardDescription>
                  Choose an animation to test
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={selectedAnimation} onValueChange={setSelectedAnimation}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {animations.map((animation) => (
                      <SelectItem key={animation} value={animation}>
                        {animation}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button onClick={triggerAnimation} className="w-full">
                  <Play className="w-4 h-4 mr-2" />
                  Trigger Animation
                </Button>
                
                <div className="text-xs text-gray-500">
                  Selected: <Badge variant="secondary">{selectedAnimation}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  Themes
                </CardTitle>
                <CardDescription>
                  Switch between themes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {themes.map((theme) => (
                      <SelectItem key={theme} value={theme}>
                        {theme}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="text-xs text-gray-500">
                  Active: <Badge variant="secondary">{selectedTheme}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Available Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Animations</span>
                    <Badge>18+</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Themes</span>
                    <Badge>17</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Blocks</span>
                    <Badge>10+</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Area */}
          <div className="lg:col-span-3">
            <Card className={`${themeColors.bg} border-2`}>
              <CardContent className="p-8">
                {/* Demo Website Preview */}
                <div className="space-y-8">
                  {/* Hero Section */}
                  <div className={`text-center space-y-4 ${getAnimationClass()}`}>
                    <h1 className={`text-4xl font-bold ${themeColors.text}`}>
                      Welcome to Your Website!
                    </h1>
                    <p className={`text-xl ${themeColors.text} opacity-80`}>
                      This is a demo of the {selectedTheme} theme with {selectedAnimation} animation
                    </p>
                    <div className="flex justify-center space-x-4">
                      <Button className={`${themeColors.accent}`}>
                        Get Started
                      </Button>
                      <Button variant="outline">
                        Learn More
                      </Button>
                    </div>
                  </div>

                  {/* Features Section */}
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { title: 'Fast Performance', desc: 'Lightning fast loading times' },
                      { title: 'Beautiful Design', desc: 'Stunning visual aesthetics' },
                      { title: 'Easy to Use', desc: 'Intuitive user interface' }
                    ].map((feature, index) => (
                      <Card key={index} className="bg-white/50 backdrop-blur">
                        <CardHeader>
                          <CardTitle className={`text-lg ${themeColors.text}`}>
                            {feature.title}
                          </CardTitle>
                          <CardDescription className={themeColors.text}>
                            {feature.desc}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>

                  {/* Animation Info */}
                  <div className="text-center p-6 bg-white/30 rounded-lg">
                    <h3 className={`text-lg font-semibold ${themeColors.text} mb-2`}>
                      Current Settings
                    </h3>
                    <div className="flex justify-center space-x-4 text-sm">
                      <Badge variant="outline">Theme: {selectedTheme}</Badge>
                      <Badge variant="outline">Animation: {selectedAnimation}</Badge>
                      <Badge variant="outline">Status: {isAnimating ? 'Animating' : 'Static'}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>🎯 How to Use This Demo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">Testing Animations:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Select an animation from the dropdown</li>
                      <li>• Click "Trigger Animation" to see it in action</li>
                      <li>• Try different animations to see the effects</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Switching Themes:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Choose a theme from the theme dropdown</li>
                      <li>• See instant color and style changes</li>
                      <li>• Try Neon, Ocean, or Royal for dramatic effects</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
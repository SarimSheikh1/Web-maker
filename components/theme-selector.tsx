'use client'

import { useTheme } from './theme-provider'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Palette, Check } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'

interface ThemeSelectorProps {
  variant?: 'dropdown' | 'grid' | 'compact'
  showLabel?: boolean
  className?: string
}

export function ThemeSelector({ variant = 'dropdown', showLabel = true, className = '' }: ThemeSelectorProps) {
  const { currentTheme, setTheme, availableThemes } = useTheme()

  const themeDisplayNames: Record<string, string> = {
    default: 'Default',
    dark: 'Dark',
    minimal: 'Minimal',
    vibrant: 'Vibrant',
    elegant: 'Elegant',
    modern: 'Modern',
    warm: 'Warm',
    neon: 'Neon',
    ocean: 'Ocean',
    forest: 'Forest',
    sunset: 'Sunset',
    royal: 'Royal',
    cosmic: 'Cosmic',
    retro: 'Retro',
    arctic: 'Arctic',
    pastel: 'Pastel',
    cyberpunk: 'Cyberpunk'
  }

  const themeColors: Record<string, { bg: string, border: string, text: string }> = {
    default: { bg: 'bg-blue-100', border: 'border-blue-500', text: 'text-blue-900' },
    dark: { bg: 'bg-gray-800', border: 'border-gray-600', text: 'text-white' },
    minimal: { bg: 'bg-gray-100', border: 'border-gray-400', text: 'text-black' },
    vibrant: { bg: 'bg-purple-100', border: 'border-purple-500', text: 'text-purple-900' },
    elegant: { bg: 'bg-amber-100', border: 'border-amber-600', text: 'text-amber-900' },
    modern: { bg: 'bg-blue-100', border: 'border-blue-500', text: 'text-blue-900' },
    warm: { bg: 'bg-orange-100', border: 'border-orange-500', text: 'text-orange-900' },
    neon: { bg: 'bg-black', border: 'border-cyan-400', text: 'text-cyan-400' },
    ocean: { bg: 'bg-blue-200', border: 'border-blue-600', text: 'text-blue-900' },
    forest: { bg: 'bg-green-200', border: 'border-green-600', text: 'text-green-900' },
    sunset: { bg: 'bg-orange-200', border: 'border-orange-600', text: 'text-orange-900' },
    royal: { bg: 'bg-purple-200', border: 'border-purple-600', text: 'text-purple-900' },
    cosmic: { bg: 'bg-gray-900', border: 'border-purple-400', text: 'text-purple-300' },
    retro: { bg: 'bg-yellow-300', border: 'border-red-500', text: 'text-gray-800' },
    arctic: { bg: 'bg-slate-200', border: 'border-blue-400', text: 'text-slate-900' },
    pastel: { bg: 'bg-pink-100', border: 'border-pink-400', text: 'text-gray-700' },
    cyberpunk: { bg: 'bg-black', border: 'border-green-400', text: 'text-green-400' }
  }

  if (variant === 'dropdown') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        {showLabel && (
          <div className="flex items-center space-x-1">
            <Palette className="w-4 h-4" />
            <span className="text-sm font-medium">Theme:</span>
          </div>
        )}
        <Select value={currentTheme} onValueChange={setTheme}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {availableThemes.map((theme) => (
              <SelectItem key={theme} value={theme}>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${themeColors[theme]?.bg || 'bg-gray-200'} ${themeColors[theme]?.border || 'border-gray-400'} border`} />
                  <span>{themeDisplayNames[theme] || theme}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }

  if (variant === 'grid') {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className={`flex items-center space-x-2 ${className}`}>
            <Palette className="w-4 h-4" />
            <span>{themeDisplayNames[currentTheme]}</span>
            <Badge variant="secondary">{availableThemes.length}</Badge>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4">
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Choose Theme</h4>
            <div className="grid grid-cols-3 gap-2">
              {availableThemes.map((theme) => {
                const colors = themeColors[theme]
                const isActive = currentTheme === theme
                return (
                  <button
                    key={theme}
                    onClick={() => setTheme(theme)}
                    className={`
                      ${colors?.bg || 'bg-gray-100'} 
                      ${colors?.border || 'border-gray-400'} 
                      ${colors?.text || 'text-gray-900'}
                      border-2 rounded-lg p-3 text-center text-xs font-medium
                      hover:scale-105 transition-all duration-200
                      ${isActive ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
                      relative
                    `}
                  >
                    {isActive && (
                      <Check className="w-3 h-3 absolute top-1 right-1 text-green-600" />
                    )}
                    {themeDisplayNames[theme]}
                  </button>
                )
              })}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    )
  }

  // Compact variant
  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <Palette className="w-4 h-4" />
      <Select value={currentTheme} onValueChange={setTheme}>
        <SelectTrigger className="w-32 h-8 text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {availableThemes.map((theme) => (
            <SelectItem key={theme} value={theme} className="text-xs">
              {themeDisplayNames[theme]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
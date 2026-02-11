'use client'

import { useEditor } from './editor-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { themePresets, ThemeTokens } from '@/lib/types/theme'

export function ThemePanel() {
  const { state, updateTheme } = useEditor()
  
  const currentTheme = state.project.theme?.tokens || themePresets.default

  const updateThemeTokens = (updates: Partial<ThemeTokens>) => {
    const newTheme = { ...currentTheme, ...updates }
    updateTheme(newTheme)
  }

  const updateColors = (colorUpdates: Partial<ThemeTokens['colors']>) => {
    updateThemeTokens({
      colors: { ...currentTheme.colors, ...colorUpdates }
    })
  }

  const updateTypography = (typographyUpdates: Partial<ThemeTokens['typography']>) => {
    updateThemeTokens({
      typography: { ...currentTheme.typography, ...typographyUpdates }
    })
  }

  const applyPreset = (presetName: string) => {
    const preset = themePresets[presetName]
    if (preset) {
      updateTheme(preset)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Theme Presets</h3>
        <Select onValueChange={applyPreset}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a preset" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="minimal">Minimal</SelectItem>
            <SelectItem value="vibrant">Vibrant</SelectItem>
            <SelectItem value="elegant">Elegant</SelectItem>
            <SelectItem value="modern">Modern</SelectItem>
            <SelectItem value="warm">Warm</SelectItem>
            <SelectItem value="neon">Neon</SelectItem>
            <SelectItem value="ocean">Ocean</SelectItem>
            <SelectItem value="forest">Forest</SelectItem>
            <SelectItem value="sunset">Sunset</SelectItem>
            <SelectItem value="royal">Royal</SelectItem>
            <SelectItem value="cosmic">Cosmic</SelectItem>
            <SelectItem value="retro">Retro</SelectItem>
            <SelectItem value="arctic">Arctic</SelectItem>
            <SelectItem value="pastel">Pastel</SelectItem>
            <SelectItem value="cyberpunk">Cyberpunk</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Colors</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="primary-color">Primary Color</Label>
            <Input
              id="primary-color"
              type="color"
              value={currentTheme.colors.primary}
              onChange={(e) => updateColors({ primary: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="secondary-color">Secondary Color</Label>
            <Input
              id="secondary-color"
              type="color"
              value={currentTheme.colors.secondary}
              onChange={(e) => updateColors({ secondary: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="background-color">Background Color</Label>
            <Input
              id="background-color"
              type="color"
              value={currentTheme.colors.background}
              onChange={(e) => updateColors({ background: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="text-color">Text Color</Label>
            <Input
              id="text-color"
              type="color"
              value={currentTheme.colors.text}
              onChange={(e) => updateColors({ text: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="accent-color">Accent Color</Label>
            <Input
              id="accent-color"
              type="color"
              value={currentTheme.colors.accent}
              onChange={(e) => updateColors({ accent: e.target.value })}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Typography</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="font-family">Font Family</Label>
            <Select
              value={currentTheme.typography.fontFamily}
              onValueChange={(value) => updateTypography({ fontFamily: value as any })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Inter">Inter</SelectItem>
                <SelectItem value="Poppins">Poppins</SelectItem>
                <SelectItem value="Roboto">Roboto</SelectItem>
                <SelectItem value="Open Sans">Open Sans</SelectItem>
                <SelectItem value="Lato">Lato</SelectItem>
                <SelectItem value="Montserrat">Montserrat</SelectItem>
                <SelectItem value="Playfair Display">Playfair Display</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="base-size">Base Font Size</Label>
            <Input
              id="base-size"
              type="number"
              min="12"
              max="24"
              value={currentTheme.typography.baseSize}
              onChange={(e) => updateTypography({ baseSize: parseInt(e.target.value) })}
            />
          </div>

          <div>
            <Label htmlFor="heading-scale">Heading Scale</Label>
            <Input
              id="heading-scale"
              type="number"
              min="1.1"
              max="2"
              step="0.1"
              value={currentTheme.typography.headingScale}
              onChange={(e) => updateTypography({ headingScale: parseFloat(e.target.value) })}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Border Radius</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="radius-sm">Small</Label>
            <Input
              id="radius-sm"
              type="number"
              min="0"
              max="20"
              value={currentTheme.radius.sm}
              onChange={(e) => updateThemeTokens({
                radius: { ...currentTheme.radius, sm: parseInt(e.target.value) }
              })}
            />
          </div>
          <div>
            <Label htmlFor="radius-md">Medium</Label>
            <Input
              id="radius-md"
              type="number"
              min="0"
              max="20"
              value={currentTheme.radius.md}
              onChange={(e) => updateThemeTokens({
                radius: { ...currentTheme.radius, md: parseInt(e.target.value) }
              })}
            />
          </div>
          <div>
            <Label htmlFor="radius-lg">Large</Label>
            <Input
              id="radius-lg"
              type="number"
              min="0"
              max="20"
              value={currentTheme.radius.lg}
              onChange={(e) => updateThemeTokens({
                radius: { ...currentTheme.radius, lg: parseInt(e.target.value) }
              })}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
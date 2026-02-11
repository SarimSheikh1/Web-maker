// Theme utility functions for dynamic font and color management

export interface ThemeConfig {
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    textMuted: string
    border: string
  }
  fonts: {
    family: string
    weights: {
      light: number
      normal: number
      medium: number
      semibold: number
      bold: number
    }
    sizes: {
      xs: string
      sm: string
      base: string
      lg: string
      xl: string
      '2xl': string
      '3xl': string
      '4xl': string
    }
    lineHeights: {
      tight: number
      normal: number
      relaxed: number
    }
    letterSpacing: {
      tight: string
      normal: string
      wide: string
    }
  }
  effects: {
    textShadow?: string
    letterSpacing?: string
    textGlow?: boolean
  }
}

export const themeConfigs: Record<string, ThemeConfig> = {
  default: {
    name: 'Default',
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      accent: '#06b6d4',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1f2937',
      textMuted: '#6b7280',
      border: '#e5e7eb'
    },
    fonts: {
      family: 'Inter, system-ui, -apple-system, sans-serif',
      weights: { light: 300, normal: 400, medium: 500, semibold: 600, bold: 700 },
      sizes: { xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem' },
      lineHeights: { tight: 1.25, normal: 1.5, relaxed: 1.75 },
      letterSpacing: { tight: '-0.025em', normal: '0em', wide: '0.025em' }
    },
    effects: {}
  },
  dark: {
    name: 'Dark',
    colors: {
      primary: '#60a5fa',
      secondary: '#a78bfa',
      accent: '#34d399',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f9fafb',
      textMuted: '#9ca3af',
      border: '#374151'
    },
    fonts: {
      family: 'Roboto, system-ui, -apple-system, sans-serif',
      weights: { light: 300, normal: 400, medium: 500, semibold: 600, bold: 700 },
      sizes: { xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem' },
      lineHeights: { tight: 1.25, normal: 1.5, relaxed: 1.75 },
      letterSpacing: { tight: '-0.025em', normal: '0em', wide: '0.025em' }
    },
    effects: {}
  },
  neon: {
    name: 'Neon',
    colors: {
      primary: '#00ffff',
      secondary: '#ff00ff',
      accent: '#00ff00',
      background: '#000000',
      surface: '#0a0a0a',
      text: '#00ffff',
      textMuted: '#ff00ff',
      border: '#333333'
    },
    fonts: {
      family: 'Orbitron, Roboto Mono, monospace',
      weights: { light: 300, normal: 400, medium: 500, semibold: 600, bold: 700 },
      sizes: { xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem' },
      lineHeights: { tight: 1.25, normal: 1.5, relaxed: 1.75 },
      letterSpacing: { tight: '-0.025em', normal: '0em', wide: '0.1em' }
    },
    effects: {
      textShadow: '0 0 10px currentColor',
      textGlow: true,
      letterSpacing: '0.1em'
    }
  },
  ocean: {
    name: 'Ocean',
    colors: {
      primary: '#0ea5e9',
      secondary: '#06b6d4',
      accent: '#0891b2',
      background: '#f0f9ff',
      surface: '#e0f2fe',
      text: '#0c4a6e',
      textMuted: '#0369a1',
      border: '#bae6fd'
    },
    fonts: {
      family: 'Lato, system-ui, -apple-system, sans-serif',
      weights: { light: 300, normal: 400, medium: 500, semibold: 600, bold: 700 },
      sizes: { xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem' },
      lineHeights: { tight: 1.25, normal: 1.5, relaxed: 1.75 },
      letterSpacing: { tight: '-0.025em', normal: '0em', wide: '0.025em' }
    },
    effects: {}
  },
  forest: {
    name: 'Forest',
    colors: {
      primary: '#16a34a',
      secondary: '#10b981',
      accent: '#34d399',
      background: '#f7fdf7',
      surface: '#ecfdf5',
      text: '#14532d',
      textMuted: '#166534',
      border: '#bbf7d0'
    },
    fonts: {
      family: 'Open Sans, system-ui, -apple-system, sans-serif',
      weights: { light: 300, normal: 400, medium: 500, semibold: 600, bold: 700 },
      sizes: { xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem' },
      lineHeights: { tight: 1.25, normal: 1.5, relaxed: 1.75 },
      letterSpacing: { tight: '-0.025em', normal: '0em', wide: '0.025em' }
    },
    effects: {}
  },
  sunset: {
    name: 'Sunset',
    colors: {
      primary: '#f97316',
      secondary: '#fb923c',
      accent: '#fdba74',
      background: '#fffbeb',
      surface: '#fef3c7',
      text: '#9a3412',
      textMuted: '#c2410c',
      border: '#fed7aa'
    },
    fonts: {
      family: 'Poppins, system-ui, -apple-system, sans-serif',
      weights: { light: 300, normal: 400, medium: 500, semibold: 600, bold: 700 },
      sizes: { xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem' },
      lineHeights: { tight: 1.25, normal: 1.5, relaxed: 1.75 },
      letterSpacing: { tight: '-0.025em', normal: '0em', wide: '0.025em' }
    },
    effects: {}
  },
  royal: {
    name: 'Royal',
    colors: {
      primary: '#7c3aed',
      secondary: '#a855f7',
      accent: '#c084fc',
      background: '#faf5ff',
      surface: '#f3e8ff',
      text: '#581c87',
      textMuted: '#7c3aed',
      border: '#ddd6fe'
    },
    fonts: {
      family: 'Playfair Display, serif',
      weights: { light: 300, normal: 400, medium: 500, semibold: 600, bold: 700 },
      sizes: { xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem' },
      lineHeights: { tight: 1.25, normal: 1.5, relaxed: 1.75 },
      letterSpacing: { tight: '-0.025em', normal: '0.025em', wide: '0.05em' }
    },
    effects: {
      letterSpacing: '0.025em'
    }
  },
  cosmic: {
    name: 'Cosmic',
    colors: {
      primary: '#e879f9',
      secondary: '#c084fc',
      accent: '#a78bfa',
      background: '#1a1a2e',
      surface: '#0f0f23',
      text: '#e879f9',
      textMuted: '#c084fc',
      border: '#4c1d95'
    },
    fonts: {
      family: 'Orbitron, Inter, monospace',
      weights: { light: 300, normal: 400, medium: 500, semibold: 600, bold: 700 },
      sizes: { xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem' },
      lineHeights: { tight: 1.25, normal: 1.5, relaxed: 1.75 },
      letterSpacing: { tight: '-0.025em', normal: '0em', wide: '0.05em' }
    },
    effects: {
      textShadow: '0 0 5px currentColor',
      textGlow: true
    }
  },
  retro: {
    name: 'Retro',
    colors: {
      primary: '#eab308',
      secondary: '#f59e0b',
      accent: '#fbbf24',
      background: '#ffe66d',
      surface: '#fff3cd',
      text: '#92400e',
      textMuted: '#b45309',
      border: '#fcd34d'
    },
    fonts: {
      family: 'Courier New, Roboto Mono, monospace',
      weights: { light: 300, normal: 400, medium: 500, semibold: 600, bold: 700 },
      sizes: { xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem' },
      lineHeights: { tight: 1.25, normal: 1.5, relaxed: 1.75 },
      letterSpacing: { tight: '-0.025em', normal: '0.05em', wide: '0.1em' }
    },
    effects: {
      letterSpacing: '0.05em'
    }
  },
  arctic: {
    name: 'Arctic',
    colors: {
      primary: '#0284c7',
      secondary: '#0ea5e9',
      accent: '#38bdf8',
      background: '#f8fafc',
      surface: '#f1f5f9',
      text: '#0c4a6e',
      textMuted: '#0369a1',
      border: '#cbd5e1'
    },
    fonts: {
      family: 'Inter, system-ui, -apple-system, sans-serif',
      weights: { light: 300, normal: 400, medium: 500, semibold: 600, bold: 700 },
      sizes: { xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem' },
      lineHeights: { tight: 1.25, normal: 1.5, relaxed: 1.75 },
      letterSpacing: { tight: '-0.025em', normal: '0em', wide: '0.025em' }
    },
    effects: {}
  },
  pastel: {
    name: 'Pastel',
    colors: {
      primary: '#f472b6',
      secondary: '#a78bfa',
      accent: '#60a5fa',
      background: '#fef7ff',
      surface: '#fdf4ff',
      text: '#be185d',
      textMuted: '#db2777',
      border: '#f9a8d4'
    },
    fonts: {
      family: 'Poppins, system-ui, -apple-system, sans-serif',
      weights: { light: 300, normal: 400, medium: 500, semibold: 600, bold: 700 },
      sizes: { xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem' },
      lineHeights: { tight: 1.25, normal: 1.5, relaxed: 1.75 },
      letterSpacing: { tight: '-0.025em', normal: '0em', wide: '0.025em' }
    },
    effects: {}
  },
  cyberpunk: {
    name: 'Cyberpunk',
    colors: {
      primary: '#00ffff',
      secondary: '#ff00ff',
      accent: '#ffff00',
      background: '#000000',
      surface: '#0a0a0a',
      text: '#00ffff',
      textMuted: '#ff00ff',
      border: '#333333'
    },
    fonts: {
      family: 'Orbitron, Roboto Mono, monospace',
      weights: { light: 300, normal: 400, medium: 500, semibold: 600, bold: 700 },
      sizes: { xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem' },
      lineHeights: { tight: 1.25, normal: 1.5, relaxed: 1.75 },
      letterSpacing: { tight: '-0.025em', normal: '0.1em', wide: '0.15em' }
    },
    effects: {
      textShadow: '0 0 8px currentColor',
      textGlow: true,
      letterSpacing: '0.1em'
    }
  },
  minimal: {
    name: 'Minimal',
    colors: {
      primary: '#6b7280',
      secondary: '#9ca3af',
      accent: '#d1d5db',
      background: '#ffffff',
      surface: '#fafafa',
      text: '#374151',
      textMuted: '#6b7280',
      border: '#e5e7eb'
    },
    fonts: {
      family: 'Inter, system-ui, -apple-system, sans-serif',
      weights: { light: 300, normal: 400, medium: 500, semibold: 600, bold: 700 },
      sizes: { xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem' },
      lineHeights: { tight: 1.25, normal: 1.5, relaxed: 1.75 },
      letterSpacing: { tight: '-0.025em', normal: '0em', wide: '0.025em' }
    },
    effects: {}
  },
  vibrant: {
    name: 'Vibrant',
    colors: {
      primary: '#dc2626',
      secondary: '#ea580c',
      accent: '#ca8a04',
      background: '#ffffff',
      surface: '#fef7ff',
      text: '#dc2626',
      textMuted: '#ea580c',
      border: '#fecaca'
    },
    fonts: {
      family: 'Montserrat, system-ui, -apple-system, sans-serif',
      weights: { light: 300, normal: 400, medium: 500, semibold: 600, bold: 700 },
      sizes: { xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem' },
      lineHeights: { tight: 1.25, normal: 1.5, relaxed: 1.75 },
      letterSpacing: { tight: '-0.025em', normal: '0em', wide: '0.025em' }
    },
    effects: {}
  },
  elegant: {
    name: 'Elegant',
    colors: {
      primary: '#1f2937',
      secondary: '#4b5563',
      accent: '#9ca3af',
      background: '#ffffff',
      surface: '#f9fafb',
      text: '#1f2937',
      textMuted: '#4b5563',
      border: '#e5e7eb'
    },
    fonts: {
      family: 'Playfair Display, serif',
      weights: { light: 300, normal: 400, medium: 500, semibold: 600, bold: 700 },
      sizes: { xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem' },
      lineHeights: { tight: 1.25, normal: 1.5, relaxed: 1.75 },
      letterSpacing: { tight: '-0.025em', normal: '0.025em', wide: '0.05em' }
    },
    effects: {
      letterSpacing: '0.025em'
    }
  },
  modern: {
    name: 'Modern',
    colors: {
      primary: '#0f172a',
      secondary: '#334155',
      accent: '#64748b',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#0f172a',
      textMuted: '#334155',
      border: '#e2e8f0'
    },
    fonts: {
      family: 'Inter, system-ui, -apple-system, sans-serif',
      weights: { light: 300, normal: 400, medium: 500, semibold: 600, bold: 700 },
      sizes: { xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem' },
      lineHeights: { tight: 1.25, normal: 1.5, relaxed: 1.75 },
      letterSpacing: { tight: '-0.025em', normal: '0em', wide: '0.025em' }
    },
    effects: {}
  },
  warm: {
    name: 'Warm',
    colors: {
      primary: '#92400e',
      secondary: '#b45309',
      accent: '#d97706',
      background: '#fefefe',
      surface: '#fef7ed',
      text: '#92400e',
      textMuted: '#b45309',
      border: '#fed7aa'
    },
    fonts: {
      family: 'Open Sans, system-ui, -apple-system, sans-serif',
      weights: { light: 300, normal: 400, medium: 500, semibold: 600, bold: 700 },
      sizes: { xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem' },
      lineHeights: { tight: 1.25, normal: 1.5, relaxed: 1.75 },
      letterSpacing: { tight: '-0.025em', normal: '0em', wide: '0.025em' }
    },
    effects: {}
  }
}

export function applyTheme(themeName: string) {
  const theme = themeConfigs[themeName.toLowerCase()]
  if (!theme) return

  const root = document.documentElement

  // Apply color variables
  root.style.setProperty('--theme-primary', theme.colors.primary)
  root.style.setProperty('--theme-secondary', theme.colors.secondary)
  root.style.setProperty('--theme-accent', theme.colors.accent)
  root.style.setProperty('--theme-background', theme.colors.background)
  root.style.setProperty('--theme-surface', theme.colors.surface)
  root.style.setProperty('--theme-text', theme.colors.text)
  root.style.setProperty('--theme-text-muted', theme.colors.textMuted)
  root.style.setProperty('--theme-border', theme.colors.border)

  // Apply font variables
  root.style.setProperty('--theme-font-family', theme.fonts.family)
  root.style.setProperty('--theme-font-weight-light', theme.fonts.weights.light.toString())
  root.style.setProperty('--theme-font-weight-normal', theme.fonts.weights.normal.toString())
  root.style.setProperty('--theme-font-weight-medium', theme.fonts.weights.medium.toString())
  root.style.setProperty('--theme-font-weight-semibold', theme.fonts.weights.semibold.toString())
  root.style.setProperty('--theme-font-weight-bold', theme.fonts.weights.bold.toString())

  // Apply font size variables
  Object.entries(theme.fonts.sizes).forEach(([key, value]) => {
    root.style.setProperty(`--theme-font-size-${key}`, value)
  })

  // Apply line height variables
  Object.entries(theme.fonts.lineHeights).forEach(([key, value]) => {
    root.style.setProperty(`--theme-line-height-${key}`, value.toString())
  })

  // Apply letter spacing variables
  Object.entries(theme.fonts.letterSpacing).forEach(([key, value]) => {
    root.style.setProperty(`--theme-letter-spacing-${key}`, value)
  })

  // Apply body class for theme-specific styling
  document.body.className = document.body.className.replace(/theme-\w+/g, '')
  document.body.classList.add(`theme-${themeName.toLowerCase()}`)

  // Apply special effects if any
  if (theme.effects.textShadow) {
    root.style.setProperty('--theme-text-shadow', theme.effects.textShadow)
  }
  if (theme.effects.letterSpacing) {
    root.style.setProperty('--theme-letter-spacing-default', theme.effects.letterSpacing)
  }
}

export function getThemeList() {
  return Object.keys(themeConfigs)
}

export function getThemeConfig(themeName: string) {
  return themeConfigs[themeName.toLowerCase()]
}

export function saveTheme(themeName: string) {
  try {
    localStorage.setItem('sitecraft-theme', themeName.toLowerCase())
  } catch (e) {
    console.warn('Failed to save theme:', e)
  }
}

export function loadSavedTheme() {
  try {
    return localStorage.getItem('sitecraft-theme') || 'default'
  } catch (e) {
    console.warn('Failed to load saved theme:', e)
    return 'default'
  }
}
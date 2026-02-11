'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NextThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <ThemeProvider defaultTheme="default">
          {children}
          <Toaster />
        </ThemeProvider>
      </NextThemeProvider>
    </SessionProvider>
  )
}
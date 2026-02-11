import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SiteCraft - Build Beautiful Websites',
  description: 'Create stunning websites with our drag-and-drop builder. No coding required.',
  keywords: ['website builder', 'drag and drop', 'no code', 'web design'],
  authors: [{ name: 'SiteCraft Team' }],
  creator: 'SiteCraft',
  publisher: 'SiteCraft',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sitecraft.com',
    title: 'SiteCraft - Build Beautiful Websites',
    description: 'Create stunning websites with our drag-and-drop builder. No coding required.',
    siteName: 'SiteCraft',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SiteCraft - Build Beautiful Websites',
    description: 'Create stunning websites with our drag-and-drop builder. No coding required.',
    creator: '@sitecraft',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
'use client'

import { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw, Home, Zap } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold">SiteCraft</span>
          </Link>
        </div>

        <Card className="border-red-200">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl text-red-900">Something went wrong!</CardTitle>
            <CardDescription className="text-lg">
              We encountered an unexpected error. This might be due to the folder path containing spaces.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Error Details */}
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-semibold text-red-900 mb-2">Error Details:</h3>
              <p className="text-sm text-red-800 font-mono break-all">
                {error.message || 'Unknown error occurred'}
              </p>
              {error.digest && (
                <p className="text-xs text-red-600 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>

            {/* Solutions */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-3">💡 Quick Solutions:</h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• <strong>Refresh the page</strong> - This often resolves temporary issues</li>
                <li>• <strong>Clear browser cache</strong> - Press Ctrl+F5 to hard refresh</li>
                <li>• <strong>Try a different page</strong> - The homepage usually works</li>
                <li>• <strong>Folder path issue</strong> - The space in "Web maker" folder might cause problems</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="grid md:grid-cols-3 gap-3">
              <Button onClick={reset} className="bg-red-600 hover:bg-red-700">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Hard Refresh
              </Button>
              <Link href="/">
                <Button variant="outline" className="w-full">
                  <Home className="w-4 h-4 mr-2" />
                  Homepage
                </Button>
              </Link>
            </div>

            {/* Demo Note */}
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <p className="text-sm text-yellow-800">
                <strong>Demo Note:</strong> If you're seeing this error, the SiteCraft demo is still functional! 
                Try visiting the <Link href="/auth/signup" className="underline font-semibold">sign-up page</Link> directly 
                or the <Link href="/pricing" className="underline font-semibold">pricing page</Link> to continue testing.
              </p>
            </div>

            {/* Alternative Access */}
            <div className="grid md:grid-cols-2 gap-3">
              <Link href="/auth/signup">
                <Button variant="outline" className="w-full bg-green-50 hover:bg-green-100">
                  🚀 Try Sign Up Page
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" className="w-full bg-purple-50 hover:bg-purple-100">
                  💳 View Pricing
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
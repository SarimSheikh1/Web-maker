import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Home, Search, Zap } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
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

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-blue-600" />
            </div>
            <CardTitle className="text-3xl text-blue-900">Page Not Found</CardTitle>
            <CardDescription className="text-lg">
              The page you're looking for doesn't exist or has been moved.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Helpful Links */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-4">🚀 Try these popular pages:</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <Link href="/">
                  <Button variant="outline" className="w-full justify-start">
                    <Home className="w-4 h-4 mr-2" />
                    Homepage
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button variant="outline" className="w-full justify-start">
                    ✨ Sign Up (Demo)
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" className="w-full justify-start">
                    💳 Pricing Plans
                  </Button>
                </Link>
                <Link href="/dashboard/demo">
                  <Button variant="outline" className="w-full justify-start">
                    📊 Demo Dashboard
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Demo Access */}
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-4">Want to try SiteCraft?</h3>
              <Link href="/auth/signup">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Zap className="w-5 h-5 mr-2" />
                  Start Free Demo
                </Button>
              </Link>
              <p className="text-sm text-gray-600 mt-2">
                Sign up in seconds with any email - no validation required!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
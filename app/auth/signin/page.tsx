'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Github, Mail, Zap } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // For demo purposes, allow any email/password combination
      if (!email) {
        toast({
          title: 'Error',
          description: 'Please enter an email',
          variant: 'destructive',
        })
        setIsLoading(false)
        return
      }

      // Create/retrieve demo user
      const demoUser = {
        id: `demo-${Date.now()}`,
        name: email.split('@')[0] || 'Demo User',
        email,
        password: password || 'demo123'
      }

      // Store in localStorage for demo purposes
      localStorage.setItem('demoUser', JSON.stringify(demoUser))
      localStorage.setItem('isSignedIn', 'true')

      toast({
        title: 'Welcome back! 🎉',
        description: 'Signed in successfully',
      })

      // Redirect to dashboard
      setTimeout(() => {
        router.push('/dashboard/demo')
      }, 1000)

    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Quick demo sign-in
  const quickSignIn = () => {
    setEmail('demo@example.com')
    setPassword('demo123')
    
    toast({
      title: 'Demo credentials filled!',
      description: 'Click "Sign in" to continue',
    })
  }

  const handleOAuthSignIn = async (provider: string) => {
    setIsLoading(true)
    try {
      const result = await signIn(provider, { 
        callbackUrl: '/dashboard',
        redirect: false 
      })
      
      if (result?.error) {
        toast({
          title: 'Error',
          description: 'Failed to sign in with ' + provider,
          variant: 'destructive',
        })
      } else if (result?.url) {
        window.location.href = result.url
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
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
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>
              Sign in to your account to continue building
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => handleOAuthSignIn('google')}
                disabled={isLoading}
              >
                <Mail className="w-4 h-4 mr-2" />
                Google
              </Button>
              <Button
                variant="outline"
                onClick={() => handleOAuthSignIn('github')}
                disabled={isLoading}
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter any email (demo@example.com)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Any password (optional)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              {/* Quick demo button */}
              <Button 
                type="button" 
                variant="outline" 
                className="w-full mb-2"
                onClick={quickSignIn}
              >
                🚀 Quick Demo Sign In
              </Button>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link href="/auth/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
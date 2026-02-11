'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Github, Mail, Zap } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function SignUpPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // For demo purposes, allow any email format and create account directly
      if (!email || !name) {
        toast({
          title: 'Error',
          description: 'Please fill in all fields',
          variant: 'destructive',
        })
        setIsLoading(false)
        return
      }

      // Create a simple demo account (bypassing backend for now)
      const demoUser = {
        id: `demo-${Date.now()}`,
        name,
        email,
        password: password || 'demo123'
      }

      // Store in localStorage for demo purposes
      localStorage.setItem('demoUser', JSON.stringify(demoUser))
      localStorage.setItem('isSignedIn', 'true')

      toast({
        title: 'Success! 🎉',
        description: 'Welcome to SiteCraft! Your demo account is ready.',
      })

      // Redirect to dashboard after a short delay
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

  // Auto-fill demo data for quick testing
  const fillDemoData = () => {
    setName('Demo User')
    setEmail('demo@example.com')
    setPassword('demo123')
    
    toast({
      title: 'Demo data filled!',
      description: 'Click "Create account" to continue',
    })
  }

  // Generate random demo email
  const generateRandomEmail = () => {
    const domains = ['example.com', 'demo.com', 'test.com', 'sample.com']
    const names = ['user', 'demo', 'test', 'sample', 'john', 'jane', 'alex', 'sarah']
    const randomName = names[Math.floor(Math.random() * names.length)]
    const randomDomain = domains[Math.floor(Math.random() * domains.length)]
    const randomNumber = Math.floor(Math.random() * 999)
    
    const generatedEmail = `${randomName}${randomNumber}@${randomDomain}`
    setEmail(generatedEmail)
    setName(`${randomName.charAt(0).toUpperCase() + randomName.slice(1)} User`)
    
    toast({
      title: 'Random email generated!',
      description: 'You can edit it or use as-is',
    })
  }

  // Handle Enter key for quick submission
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit(e as any)
    }
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
            <CardTitle>Create your account</CardTitle>
            <CardDescription>
              Start building beautiful websites today
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* What you'll get preview */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-sm text-gray-900 mb-2">🎉 What you'll get:</h3>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>✨ Demo website created automatically</li>
                <li>🎨 Access to 12 beautiful themes</li>
                <li>⚡ 18+ animations and effects</li>
                <li>🚀 Drag & drop editor</li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => handleOAuthSignIn('google')}
                disabled={isLoading}
                className="relative overflow-hidden"
              >
                <Mail className="w-4 h-4 mr-2" />
                Google
                {isLoading && <div className="absolute inset-0 bg-white/50 animate-pulse" />}
              </Button>
              <Button
                variant="outline"
                onClick={() => handleOAuthSignIn('github')}
                disabled={isLoading}
                className="relative overflow-hidden"
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub
                {isLoading && <div className="absolute inset-0 bg-white/50 animate-pulse" />}
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

            <form onSubmit={handleSubmit} className="space-y-4" onKeyDown={handleKeyPress}>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email">Email</Label>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    onClick={generateRandomEmail}
                    className="text-xs h-auto p-1"
                  >
                    🎲 Random
                  </Button>
                </div>
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
                  placeholder="Create a password (optional)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              {/* Quick action buttons */}
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={fillDemoData}
                >
                  🚀 Demo Data
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={generateRandomEmail}
                >
                  🎲 Random Email
                </Button>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create account'}
              </Button>
              
              <div className="text-center text-xs text-gray-500">
                💡 Tip: Press Ctrl+Enter to submit quickly
              </div>
            </form>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link href="/auth/signin" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
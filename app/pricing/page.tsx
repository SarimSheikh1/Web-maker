'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Zap, Crown, Rocket, Star, Sparkles, Heart, Code } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

interface PricingPlan {
  id: string
  name: string
  price: string
  period: string
  description: string
  websites: number
  features: string[]
  popular?: boolean
  icon: React.ReactNode
  color: string
}

const plans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free Demo',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out SiteCraft',
    websites: 1,
    features: [
      '1 Demo Website',
      'All 18+ Animations',
      'All 12 Themes',
      'Basic Templates',
      'Community Support',
      'SiteCraft Branding'
    ],
    icon: <Zap className="w-6 h-6" />,
    color: 'text-blue-600'
  },
  {
    id: 'starter',
    name: 'Starter',
    price: '$9',
    period: 'month',
    description: 'Great for personal projects',
    websites: 3,
    features: [
      '3 Websites',
      'All Animations & Themes',
      'Premium Templates',
      'Custom Domain',
      'Email Support',
      'Remove SiteCraft Branding',
      'SSL Certificate',
      'Basic Analytics'
    ],
    icon: <Star className="w-6 h-6" />,
    color: 'text-green-600'
  },
  {
    id: 'pro',
    name: 'Professional',
    price: '$29',
    period: 'month',
    description: 'Perfect for businesses',
    websites: 10,
    features: [
      '10 Websites',
      'Everything in Starter',
      'Advanced Templates',
      'Priority Support',
      'Advanced Analytics',
      'Team Collaboration',
      'Custom Code Injection',
      'A/B Testing',
      'SEO Tools'
    ],
    popular: true,
    icon: <Rocket className="w-6 h-6" />,
    color: 'text-purple-600'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$99',
    period: 'month',
    description: 'For large organizations',
    websites: 999,
    features: [
      'Unlimited Websites',
      'Everything in Pro',
      'White-label Solution',
      'Dedicated Support',
      'Custom Integrations',
      'Advanced Security',
      'API Access',
      'Custom Training',
      'SLA Guarantee'
    ],
    icon: <Crown className="w-6 h-6" />,
    color: 'text-amber-600'
  }
]

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0)
  const router = useRouter()
  const { toast } = useToast()

  const themes = [
    { name: 'Default', colors: { primary: '#3b82f6', secondary: '#8b5cf6', accent: '#06b6d4', bg: 'from-blue-50 to-purple-50' } },
    { name: 'Dark', colors: { primary: '#1f2937', secondary: '#374151', accent: '#6b7280', bg: 'from-gray-900 to-gray-800' } },
    { name: 'Neon', colors: { primary: '#ff0080', secondary: '#00ff80', accent: '#8000ff', bg: 'from-pink-900 to-green-900' } },
    { name: 'Ocean', colors: { primary: '#0ea5e9', secondary: '#06b6d4', accent: '#0891b2', bg: 'from-blue-100 to-cyan-100' } },
    { name: 'Forest', colors: { primary: '#059669', secondary: '#10b981', accent: '#34d399', bg: 'from-green-100 to-emerald-100' } },
    { name: 'Sunset', colors: { primary: '#f97316', secondary: '#fb923c', accent: '#fdba74', bg: 'from-orange-100 to-yellow-100' } },
    { name: 'Royal', colors: { primary: '#7c3aed', secondary: '#a855f7', accent: '#c084fc', bg: 'from-purple-100 to-indigo-100' } },
    { name: 'Cosmic', colors: { primary: '#ec4899', secondary: '#f472b6', accent: '#f9a8d4', bg: 'from-pink-100 to-purple-100' } },
    { name: 'Retro', colors: { primary: '#eab308', secondary: '#f59e0b', accent: '#fbbf24', bg: 'from-yellow-100 to-amber-100' } },
    { name: 'Arctic', colors: { primary: '#0284c7', secondary: '#0ea5e9', accent: '#38bdf8', bg: 'from-sky-100 to-blue-100' } },
    { name: 'Pastel', colors: { primary: '#f472b6', secondary: '#a78bfa', accent: '#60a5fa', bg: 'from-pink-50 to-blue-50' } },
    { name: 'Cyberpunk', colors: { primary: '#ff00ff', secondary: '#00ffff', accent: '#ffff00', bg: 'from-fuchsia-900 to-cyan-900' } },
    { name: 'Minimal', colors: { primary: '#6b7280', secondary: '#9ca3af', accent: '#d1d5db', bg: 'from-gray-50 to-slate-50' } },
    { name: 'Vibrant', colors: { primary: '#dc2626', secondary: '#ea580c', accent: '#ca8a04', bg: 'from-red-100 to-orange-100' } },
    { name: 'Elegant', colors: { primary: '#1f2937', secondary: '#4b5563', accent: '#9ca3af', bg: 'from-slate-100 to-gray-100' } },
    { name: 'Modern', colors: { primary: '#0f172a', secondary: '#334155', accent: '#64748b', bg: 'from-slate-50 to-zinc-50' } },
    { name: 'Warm', colors: { primary: '#92400e', secondary: '#b45309', accent: '#d97706', bg: 'from-amber-50 to-orange-50' } }
  ]

  // Auto-change themes every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentThemeIndex((prev) => {
        const newIndex = (prev + 1) % themes.length
        
        // Apply theme to CSS custom properties
        const root = document.documentElement
        root.style.setProperty('--theme-primary', themes[newIndex].colors.primary)
        root.style.setProperty('--theme-secondary', themes[newIndex].colors.secondary)
        root.style.setProperty('--theme-accent', themes[newIndex].colors.accent)
        
        // Apply theme body class
        document.body.className = document.body.className.replace(/theme-\w+/g, '')
        document.body.classList.add(`theme-${themes[newIndex].name.toLowerCase()}`)
        
        return newIndex
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Apply initial theme
  useEffect(() => {
    const currentTheme = themes[currentThemeIndex]
    const root = document.documentElement
    root.style.setProperty('--theme-primary', currentTheme.colors.primary)
    root.style.setProperty('--theme-secondary', currentTheme.colors.secondary)
    root.style.setProperty('--theme-accent', currentTheme.colors.accent)
    
    // Apply initial theme body class
    document.body.className = document.body.className.replace(/theme-\w+/g, '')
    document.body.classList.add(`theme-${currentTheme.name.toLowerCase()}`)
  }, [currentThemeIndex])

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId)
    
    if (planId === 'free') {
      // For free plan, redirect to sign up
      router.push('/auth/signup')
      return
    }

    // For paid plans, simulate upgrade process
    const plan = plans.find(p => p.id === planId)
    
    // Store selected plan in localStorage for demo
    localStorage.setItem('selectedPlan', JSON.stringify(plan))
    
    toast({
      title: `${plan?.name} Plan Selected! 🎉`,
      description: `Processing your upgrade... You'll be able to create ${plan?.websites === 999 ? 'unlimited' : plan?.websites} websites.`,
    })

    // Redirect to success page after upgrade
    setTimeout(() => {
      router.push('/upgrade/success')
    }, 2000)
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themes[currentThemeIndex].colors.bg} relative overflow-hidden transition-all duration-1000`}>
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 60}px`,
              height: `${20 + Math.random() * 60}px`,
              backgroundColor: i % 3 === 0 ? themes[currentThemeIndex].colors.primary : i % 3 === 1 ? themes[currentThemeIndex].colors.secondary : themes[currentThemeIndex].colors.accent,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Floating Icons */}
        {[Code, Sparkles, Heart, Crown, Rocket, Star].map((Icon, i) => (
          <div
            key={`icon-${i}`}
            className="absolute animate-bounce-gentle opacity-30"
            style={{
              left: `${10 + (i * 15)}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            <Icon className="w-8 h-8" style={{ color: themes[currentThemeIndex].colors.accent }} />
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm relative z-10 animate-slide-down">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 animate-bounce-in">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center animate-pulse-glow"
              style={{ background: `linear-gradient(45deg, ${themes[currentThemeIndex].colors.primary}, ${themes[currentThemeIndex].colors.accent})` }}
            >
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold theme-heading">WebCraft Studio</span>
          </Link>
          
          {/* Theme Indicator */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full border border-white/30 animate-fade-in">
            <div 
              className="w-3 h-3 rounded-full animate-pulse-glow" 
              style={{ backgroundColor: themes[currentThemeIndex].colors.primary }}
            />
            <span className="text-sm font-medium theme-caption">
              {themes[currentThemeIndex].name} Theme
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Choose Your Perfect Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start with our free demo, then upgrade to create more websites with advanced features
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative transition-all hover:shadow-xl ${
                plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''
              } ${selectedPlan === plan.id ? 'ring-2 ring-blue-500' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-purple-500 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className={`mx-auto mb-4 ${plan.color}`}>
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-sm">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-500">/{plan.period}</span>
                </div>
                <div className="mt-2">
                  <Badge variant="outline" className={plan.color}>
                    {plan.websites === 999 ? 'Unlimited' : plan.websites} Website{plan.websites !== 1 ? 's' : ''}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-purple-600 hover:bg-purple-700' 
                      : plan.id === 'free'
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : ''
                  }`}
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={selectedPlan === plan.id}
                >
                  {selectedPlan === plan.id ? 'Selected!' : 
                   plan.id === 'free' ? 'Start Free Demo' : 
                   `Choose ${plan.name}`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Compare All Features
          </h2>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                      Features
                    </th>
                    {plans.map((plan) => (
                      <th key={plan.id} className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      Number of Websites
                    </td>
                    {plans.map((plan) => (
                      <td key={plan.id} className="px-6 py-4 text-center text-sm text-gray-600">
                        {plan.websites === 999 ? 'Unlimited' : plan.websites}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      Animations & Themes
                    </td>
                    {plans.map((plan) => (
                      <td key={plan.id} className="px-6 py-4 text-center">
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      Custom Domain
                    </td>
                    <td className="px-6 py-4 text-center text-gray-400">-</td>
                    {plans.slice(1).map((plan) => (
                      <td key={plan.id} className="px-6 py-4 text-center">
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      Remove Branding
                    </td>
                    <td className="px-6 py-4 text-center text-gray-400">-</td>
                    {plans.slice(1).map((plan) => (
                      <td key={plan.id} className="px-6 py-4 text-center">
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      Priority Support
                    </td>
                    <td className="px-6 py-4 text-center text-gray-400">-</td>
                    <td className="px-6 py-4 text-center text-gray-400">-</td>
                    {plans.slice(2).map((plan) => (
                      <td key={plan.id} className="px-6 py-4 text-center">
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "Can I upgrade or downgrade my plan anytime?",
                a: "Yes! You can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at the end of your current billing cycle."
              },
              {
                q: "What happens if I exceed my website limit?",
                a: "You'll be prompted to upgrade to a higher plan. Your existing websites will continue to work, but you won't be able to create new ones until you upgrade."
              },
              {
                q: "Do you offer refunds?",
                a: "Yes, we offer a 30-day money-back guarantee on all paid plans. No questions asked!"
              },
              {
                q: "Can I use my own domain?",
                a: "Yes! All paid plans include custom domain support. You can connect your existing domain or purchase a new one through our platform."
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
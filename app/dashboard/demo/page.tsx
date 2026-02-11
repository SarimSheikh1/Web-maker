'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, Zap, Palette, Eye, Edit, Plus, Gift, Crown, Rocket, Star, Heart, Code, Wand2 } from 'lucide-react'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'

interface DemoUser {
  id: string
  name: string
  email: string
  plan?: {
    id: string
    name: string
    websites: number
    price: string
  }
}

interface DemoProject {
  id: string
  name: string
  slug: string
  description: string
  theme: string
  isPublished: boolean
  createdAt: string
}

// Theme definitions
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

export default function DemoDashboard() {
  const [user, setUser] = useState<DemoUser | null>(null)
  const [projects, setProjects] = useState<DemoProject[]>([])
  const [showWelcome, setShowWelcome] = useState(true)
  const [currentTheme, setCurrentTheme] = useState(themes[0])
  const [themeIndex, setThemeIndex] = useState(0)
  const router = useRouter()
  const { toast } = useToast()

  // Auto-change themes every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setThemeIndex((prev) => {
        const newIndex = (prev + 1) % themes.length
        setCurrentTheme(themes[newIndex])
        
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
    const root = document.documentElement
    root.style.setProperty('--theme-primary', currentTheme.colors.primary)
    root.style.setProperty('--theme-secondary', currentTheme.colors.secondary)
    root.style.setProperty('--theme-accent', currentTheme.colors.accent)
    
    // Apply initial theme body class
    document.body.className = document.body.className.replace(/theme-\w+/g, '')
    document.body.classList.add(`theme-${currentTheme.name.toLowerCase()}`)
  }, [currentTheme])

  useEffect(() => {
    // Check if user is signed in
    const isSignedIn = localStorage.getItem('isSignedIn')
    const demoUser = localStorage.getItem('demoUser')
    
    if (!isSignedIn || !demoUser) {
      router.push('/auth/signin')
      return
    }

    let userData = JSON.parse(demoUser)
    
    // Check for selected plan
    const selectedPlan = localStorage.getItem('selectedPlan')
    if (selectedPlan) {
      const planData = JSON.parse(selectedPlan)
      userData.plan = planData
    } else {
      // Default free plan
      userData.plan = {
        id: 'free',
        name: 'Free Demo',
        websites: 1,
        price: '$0'
      }
    }
    
    setUser(userData)

    // Create demo projects based on plan
    const maxWebsites = userData.plan.websites
    const demoProjects: DemoProject[] = [
      {
        id: 'demo-1',
        name: 'My First Website',
        slug: 'my-first-website',
        description: 'Your automatically created demo website with animations and modern design',
        theme: 'Modern',
        isPublished: false,
        createdAt: new Date().toISOString()
      }
    ]

    // Add more projects if user has a paid plan
    if (maxWebsites > 1) {
      for (let i = 2; i <= Math.min(maxWebsites, 3); i++) {
        demoProjects.push({
          id: `demo-${i}`,
          name: `Website Project ${i}`,
          slug: `website-project-${i}`,
          description: `Additional website project ${i}`,
          theme: ['Ocean', 'Forest', 'Neon'][i - 2] || 'Default',
          isPublished: false,
          createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString()
        })
      }
    }

    setProjects(demoProjects)
  }, [router])

  const handleSignOut = () => {
    localStorage.removeItem('isSignedIn')
    localStorage.removeItem('demoUser')
    router.push('/')
  }

  const createNewProject = () => {
    if (!user?.plan) return
    
    const maxWebsites = user.plan.websites
    
    if (projects.length >= maxWebsites && maxWebsites !== 999) {
      // Show upgrade prompt
      toast({
        title: 'Website Limit Reached! 🚀',
        description: `Your ${user.plan.name} plan allows ${maxWebsites} website${maxWebsites !== 1 ? 's' : ''}. Upgrade to create more!`,
        variant: 'destructive',
      })
      
      // Redirect to pricing after a delay
      setTimeout(() => {
        router.push('/pricing')
      }, 2000)
      
      return
    }
    
    const newProject: DemoProject = {
      id: `demo-${Date.now()}`,
      name: `Website ${projects.length + 1}`,
      slug: `website-${projects.length + 1}`,
      description: 'A new website project',
      theme: 'Default',
      isPublished: false,
      createdAt: new Date().toISOString()
    }
    
    setProjects([newProject, ...projects])
    
    toast({
      title: 'New Website Created! 🎉',
      description: `You now have ${projects.length + 1} of ${maxWebsites === 999 ? 'unlimited' : maxWebsites} websites.`,
    })
  }

  const startFreeWebsite = () => {
    toast({
      title: 'Starting Your Free Website! 🎉',
      description: 'Redirecting to the editor to create your first website...',
    })
    
    setTimeout(() => {
      router.push('/editor/demo')
    }, 1500)
  }

  if (!user) {
    return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your demo dashboard...</p>
      </div>
    </div>
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.colors.bg} relative overflow-hidden transition-all duration-1000`}>
      {/* Floating Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating Orbs */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full opacity-20 animate-float`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 60}px`,
              height: `${20 + Math.random() * 60}px`,
              backgroundColor: i % 3 === 0 ? currentTheme.colors.primary : i % 3 === 1 ? currentTheme.colors.secondary : currentTheme.colors.accent,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Sparkles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          >
            <Star className="w-4 h-4 text-yellow-400 opacity-60" />
          </div>
        ))}
        
        {/* Floating Icons */}
        {[Code, Wand2, Heart, Sparkles, Zap, Palette].map((Icon, i) => (
          <div
            key={`icon-${i}`}
            className="absolute animate-bounce-gentle opacity-30"
            style={{
              left: `${10 + (i * 15)}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            <Icon className="w-8 h-8" style={{ color: currentTheme.colors.accent }} />
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50 animate-slide-down">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 animate-bounce-in">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center animate-pulse-glow">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">WebCraft Studio</span>
          </Link>
          
          {/* Theme Indicator */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full border border-white/30 animate-fade-in">
            <div 
              className="w-3 h-3 rounded-full animate-pulse-glow" 
              style={{ backgroundColor: currentTheme.colors.primary }}
            />
            <span className="text-sm font-medium text-gray-700">
              {currentTheme.name} Theme
            </span>
          </div>
          
          <div className="flex items-center space-x-4 animate-slide-left">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-700 animate-typewriter">Welcome, {user?.name}! 👋</div>
              <div className="text-xs text-gray-500 flex items-center">
                <Gift className="w-3 h-3 mr-1 animate-wiggle" />
                {user?.plan?.name} Plan - {projects.length}/{user?.plan?.websites === 999 ? '∞' : user?.plan?.websites} websites
              </div>
            </div>
            {user?.plan?.id === 'free' && (
              <Link href="/pricing">
                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 animate-bounce-gentle">
                  <Crown className="w-4 h-4 mr-1 animate-wiggle" />
                  Upgrade
                </Button>
              </Link>
            )}
            <Button variant="outline" onClick={handleSignOut} className="hover:scale-105 transition-transform">
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Welcome Hero Section */}
        {showWelcome && (
          <Card className="mb-8 border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden relative animate-bounce-in">
            <div className="absolute inset-0 bg-black/10"></div>
            {/* Floating particles in hero */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
                  style={{
                    left: `${10 + i * 12}%`,
                    top: `${20 + Math.random() * 60}%`,
                    animationDelay: `${i * 0.3}s`
                  }}
                />
              ))}
            </div>
            <CardHeader className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 animate-slide-right">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse-glow">
                    <Sparkles className="w-6 h-6 text-white animate-wiggle" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-white animate-typewriter">🎉 Welcome to WebCraft Studio Demo!</CardTitle>
                    <CardDescription className="text-blue-100 animate-fade-up">
                      Try our website builder for free - Create your first website in minutes!
                    </CardDescription>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowWelcome(false)}
                  className="text-white hover:bg-white/20 animate-bounce-gentle"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="flex items-center space-x-3 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center animate-bounce-gentle">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">18+ Animations</h4>
                    <p className="text-sm text-blue-100">fadeUp, scaleIn, typewriter & more</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center animate-bounce-gentle">
                    <Palette className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">17 Themes</h4>
                    <p className="text-sm text-blue-100">Neon, Ocean, Forest, Royal & more</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center animate-bounce-gentle">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">No Code</h4>
                    <p className="text-sm text-blue-100">Visual drag & drop editor</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-up">
                <Button 
                  onClick={startFreeWebsite}
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold animate-pulse-glow hover:scale-105 transition-transform"
                >
                  <Rocket className="w-5 h-5 mr-2 animate-bounce-gentle" />
                  Create Your Free Website Now!
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white/10 hover:scale-105 transition-transform"
                  asChild
                >
                  <Link href="/animation-showcase">
                    <Sparkles className="w-5 h-5 mr-2 animate-wiggle" />
                    View Animations Demo
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Start Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 hover:scale-105 animate-bounce-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                <Gift className="w-8 h-8 text-white animate-bounce-gentle" />
              </div>
              <CardTitle className="text-green-700 animate-fade-up">1. Try Demo Free</CardTitle>
              <CardDescription className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
                Explore all features with no signup required. Test themes, animations, and editor.
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 hover:scale-105 animate-bounce-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                <Edit className="w-8 h-8 text-white animate-wiggle" />
              </div>
              <CardTitle className="text-blue-700 animate-fade-up">2. Create Website</CardTitle>
              <CardDescription className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
                Use our drag-and-drop editor to build your first website with professional themes.
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 hover:scale-105 animate-bounce-in" style={{ animationDelay: '0.3s' }}>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                <Crown className="w-8 h-8 text-white animate-bounce-gentle" />
              </div>
              <CardTitle className="text-purple-700 animate-fade-up">3. Upgrade for More</CardTitle>
              <CardDescription className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
                Love it? Upgrade to create up to 10 websites with advanced features and support.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Projects Section */}
        <div className="flex items-center justify-between mb-6 animate-slide-up">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2 animate-typewriter">Your Projects</h1>
            <p className="text-gray-600 animate-fade-up">Create and manage your website projects</p>
          </div>
          <Button 
            onClick={createNewProject} 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 animate-bounce-gentle hover:scale-105 transition-transform"
          >
            <Plus className="w-4 h-4 mr-2 animate-wiggle" />
            New Project
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {projects.map((project, index) => (
            <Card key={project.id} className="border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center animate-fade-up">
                    {index === 0 && <Gift className="w-5 h-5 mr-2 text-green-600 animate-bounce-gentle" />}
                    {project.name}
                  </CardTitle>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium animate-pulse-glow ${
                    project.isPublished 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.isPublished ? '✓ Published' : '📝 Draft'}
                  </div>
                </div>
                <CardDescription className="animate-fade-up" style={{ animationDelay: '0.1s' }}>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4 animate-slide-up">
                  <span className="flex items-center">
                    <Palette className="w-4 h-4 mr-1 animate-wiggle" />
                    Theme: {project.theme}
                  </span>
                  <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
                
                <div className="flex space-x-2 animate-fade-up">
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-transform" asChild>
                    <Link href="/editor/demo">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 hover:bg-gray-50 hover:scale-105 transition-transform">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Add New Website Card */}
          {projects.length < (user?.plan?.websites || 1) && (
            <Card 
              className="border-2 border-dashed border-gray-300 bg-white/40 backdrop-blur-sm hover:bg-white/60 hover:border-blue-400 transition-all duration-300 cursor-pointer hover:scale-105 animate-bounce-in"
              onClick={createNewProject}
              style={{ animationDelay: `${projects.length * 0.1}s` }}
            >
              <CardContent className="flex flex-col items-center justify-center h-full py-12">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 animate-pulse-glow">
                  <Plus className="w-8 h-8 text-white animate-bounce-gentle" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2 animate-typewriter">Create New Website</h3>
                <p className="text-sm text-gray-500 text-center animate-fade-up">
                  Start building your next amazing website
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Demo Features Showcase */}
        <Card className="border-0 bg-white/60 backdrop-blur-sm animate-bounce-in">
          <CardHeader>
            <CardTitle className="flex items-center animate-typewriter">
              <Sparkles className="w-6 h-6 mr-2 text-purple-600 animate-wiggle" />
              🚀 Demo Features Available
            </CardTitle>
            <CardDescription className="animate-fade-up">
              This is a demo version showcasing WebCraft Studio's capabilities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="animate-slide-right">
                <h4 className="font-semibold mb-3 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-blue-600 animate-bounce-gentle" />
                  ✨ Animations & Effects
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="animate-fade-up" style={{ animationDelay: '0.1s' }}>• fadeUp, fadeDown, fadeLeft, fadeRight</li>
                  <li className="animate-fade-up" style={{ animationDelay: '0.2s' }}>• scaleIn, rotateIn, slideUp, slideDown</li>
                  <li className="animate-fade-up" style={{ animationDelay: '0.3s' }}>• typewriter, gradientShimmer, rainbowShimmer</li>
                  <li className="animate-fade-up" style={{ animationDelay: '0.4s' }}>• bounceGentle, pulseGlow, float, wiggle</li>
                </ul>
              </div>
              <div className="animate-slide-left">
                <h4 className="font-semibold mb-3 flex items-center">
                  <Palette className="w-5 h-5 mr-2 text-purple-600 animate-wiggle" />
                  🎨 Themes Available
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="animate-fade-up" style={{ animationDelay: '0.1s' }}>• Default, Dark, Minimal, Vibrant</li>
                  <li className="animate-fade-up" style={{ animationDelay: '0.2s' }}>• Elegant, Modern, Warm</li>
                  <li className="animate-fade-up" style={{ animationDelay: '0.3s' }}>• Neon, Ocean, Forest, Sunset, Royal</li>
                  <li className="animate-fade-up" style={{ animationDelay: '0.4s' }}>• Cosmic, Retro, Arctic, Pastel, Cyberpunk</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 animate-pulse-glow">
              <p className="text-sm text-blue-800 animate-typewriter">
                💡 <strong>Tip:</strong> This demo works entirely in your browser! 
                No database required. Perfect for testing all the animations, themes, and features.
              </p>
            </div>
            
            <div className="mt-4 flex flex-col sm:flex-row gap-4 animate-fade-up">
              <Button asChild className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 hover:scale-105 transition-transform">
                <Link href="/free-trial">
                  <Gift className="w-4 h-4 mr-2 animate-bounce-gentle" />
                  Start Free Trial
                </Link>
              </Button>
              <Button variant="outline" asChild className="hover:scale-105 transition-transform">
                <Link href="/animation-showcase">
                  <Sparkles className="w-4 h-4 mr-2 animate-wiggle" />
                  View All Animations
                </Link>
              </Button>
              <Button variant="outline" asChild className="hover:scale-105 transition-transform">
                <Link href="/theme-demo">
                  <Palette className="w-4 h-4 mr-2 animate-bounce-gentle" />
                  Try All Themes
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
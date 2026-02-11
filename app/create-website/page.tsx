'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { ArrowRight, Sparkles, Star, Zap, Wand2, Rocket, Heart, Globe } from 'lucide-react'
import Link from 'next/link'
import { SimpleThemeSelector } from '@/components/simple-theme-selector'

export default function CreateWebsitePage() {
  const [websitePrompt, setWebsitePrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0)

  const themes = [
    { name: 'default', bg: '#ffffff', text: '#1e293b', primary: '#3b82f6' },
    { name: 'neon', bg: '#0a0a0a', text: '#00ffff', primary: '#ff00ff' },
    { name: 'ocean', bg: '#f0f9ff', text: '#0c4a6e', primary: '#0ea5e9' },
    { name: 'forest', bg: '#f7fdf7', text: '#14532d', primary: '#16a34a' },
    { name: 'sunset', bg: '#fffbeb', text: '#9a3412', primary: '#f97316' },
    { name: 'royal', bg: '#faf5ff', text: '#581c87', primary: '#7c3aed' },
    { name: 'cosmic', bg: '#0f0f23', text: '#e2e8f0', primary: '#8b5cf6' },
    { name: 'retro', bg: '#ffe66d', text: '#2d3436', primary: '#ff6b6b' },
    { name: 'pastel', bg: '#fef7ff', text: '#374151', primary: '#f472b6' },
    { name: 'cyberpunk', bg: '#000000', text: '#00ff41', primary: '#ff0080' }
  ]

  // Auto-change theme colors every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentThemeIndex((prev) => (prev + 1) % themes.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Apply current theme
  useEffect(() => {
    const currentTheme = themes[currentThemeIndex]
    document.documentElement.style.setProperty('--theme-background', currentTheme.bg)
    document.documentElement.style.setProperty('--theme-text', currentTheme.text)
    document.documentElement.style.setProperty('--theme-primary', currentTheme.primary)
    document.documentElement.style.setProperty('--theme-accent', currentTheme.primary)
    document.documentElement.style.setProperty('--theme-surface', currentTheme.bg)
    document.documentElement.style.setProperty('--theme-muted', currentTheme.text + '80')
    document.documentElement.style.setProperty('--theme-border', currentTheme.text + '20')
    document.body.className = document.body.className.replace(/theme-\w+/g, '')
    document.body.classList.add(`theme-${currentTheme.name}`)
  }, [currentThemeIndex])

  const handleGenerateWebsite = async () => {
    if (!websitePrompt.trim()) return
    
    setIsGenerating(true)
    
    // Simulate website generation with progress updates
    await new Promise(resolve => setTimeout(resolve, 4000))
    
    // Store the prompt and redirect to editor
    localStorage.setItem('website-prompt', websitePrompt)
    localStorage.setItem('generated-website', JSON.stringify({
      prompt: websitePrompt,
      theme: themes[currentThemeIndex].name,
      generatedAt: new Date().toISOString()
    }))
    
    window.location.href = '/editor/demo'
  }

  return (
    <div className="min-h-screen transition-all duration-1000 relative overflow-hidden" style={{
      backgroundColor: 'var(--theme-background)',
      color: 'var(--theme-text)',
      background: `linear-gradient(135deg, var(--theme-background), var(--theme-primary)10)`
    }}>
      {/* Ultra Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dynamic Gradient Layers */}
        <div 
          className="absolute inset-0 opacity-30 transition-all duration-1000"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, var(--theme-primary)40, transparent 60%), 
              radial-gradient(circle at 80% 70%, var(--theme-accent)35, transparent 60%), 
              radial-gradient(circle at 40% 80%, var(--theme-primary)25, transparent 50%),
              radial-gradient(circle at 60% 20%, var(--theme-accent)30, transparent 55%)
            `
          }}
        />
        
        {/* Animated Mesh Gradient */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0 animate-pulse"
            style={{
              background: `conic-gradient(from 0deg at 50% 50%, var(--theme-primary), var(--theme-accent), var(--theme-primary), var(--theme-accent))`,
              filter: 'blur(80px)',
              transform: 'scale(1.5)',
              animation: 'gradient-shift 8s ease-in-out infinite'
            }}
          />
        </div>

        {/* Massive Floating Orbs */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute rounded-full animate-float opacity-40"
            style={{
              width: `${Math.random() * 150 + 50}px`,
              height: `${Math.random() * 150 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(45deg, var(--theme-primary), var(--theme-accent))`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${5 + Math.random() * 3}s`,
              filter: 'blur(1px)',
              boxShadow: `0 0 ${30 + Math.random() * 40}px var(--theme-primary)60`
            }}
          />
        ))}
        
        {/* Geometric Shapes */}
        {[...Array(10)].map((_, i) => (
          <div
            key={`shape-${i}`}
            className="absolute animate-spin opacity-20"
            style={{
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              left: `${5 + i * 10}%`,
              top: `${10 + i * 8}%`,
              background: `linear-gradient(45deg, transparent, var(--theme-accent)50, transparent)`,
              borderRadius: i % 4 === 0 ? '50%' : i % 4 === 1 ? '20%' : i % 4 === 2 ? '0%' : '30%',
              animationDuration: `${12 + i * 3}s`,
              animationDirection: i % 2 === 0 ? 'normal' : 'reverse'
            }}
          />
        ))}
        
        {/* Enhanced Sparkle Effects */}
        {[...Array(30)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute rounded-full animate-ping opacity-60"
            style={{
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: 'white',
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1 + Math.random() * 2}s`,
              boxShadow: `0 0 ${5 + Math.random() * 10}px white`
            }}
          />
        ))}
        
        {/* Moving Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-8"
          style={{
            backgroundImage: `linear-gradient(var(--theme-primary) 1px, transparent 1px), linear-gradient(90deg, var(--theme-primary) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
            animation: 'grid-move 30s linear infinite'
          }}
        />
        
        {/* Pulsing Rings */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`ring-${i}`}
            className="absolute rounded-full border animate-ping opacity-15"
            style={{
              width: `${250 + i * 200}px`,
              height: `${250 + i * 200}px`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              borderColor: 'var(--theme-primary)',
              borderWidth: '2px',
              animationDelay: `${i * 1}s`,
              animationDuration: '6s',
              filter: `blur(${i * 0.5}px)`
            }}
          />
        ))}
        
        {/* Floating Icons with Enhanced Effects */}
        {[
          { icon: '✨', delay: 0, x: 10, y: 20 },
          { icon: '🎨', delay: 1, x: 85, y: 25 },
          { icon: '🚀', delay: 2, x: 15, y: 75 },
          { icon: '💫', delay: 3, x: 90, y: 70 },
          { icon: '🌟', delay: 4, x: 50, y: 15 },
          { icon: '⭐', delay: 5, x: 75, y: 85 },
          { icon: '🎭', delay: 6, x: 25, y: 50 },
          { icon: '🎪', delay: 7, x: 70, y: 40 }
        ].map((item, i) => (
          <div
            key={`emoji-${i}`}
            className="absolute text-4xl animate-float opacity-40"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              animationDelay: `${item.delay}s`,
              animationDuration: '8s',
              filter: 'drop-shadow(0 0 15px var(--theme-primary))',
              textShadow: `0 0 20px var(--theme-primary)`
            }}
          >
            {item.icon}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-up">
            <div className="flex justify-between items-center mb-8">
              <Link href="/" className="flex items-center space-x-3 animate-slide-in-left">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center animate-heartbeat transition-all duration-500 shadow-2xl" style={{
                  background: `linear-gradient(45deg, var(--theme-primary), var(--theme-accent))`,
                  boxShadow: `0 0 30px var(--theme-primary)60`
                }}>
                  <Zap className="w-7 h-7 text-white animate-flash" />
                </div>
                <span className="text-3xl font-bold transition-colors duration-500" style={{ color: 'var(--theme-text)' }}>
                  WebCraft Studio
                </span>
              </Link>
              
              {/* Enhanced Theme Indicator */}
              <div className="flex items-center space-x-4 animate-slide-in-right">
                <div className="flex items-center space-x-3 px-4 py-3 rounded-full transition-all duration-500 backdrop-blur-md" style={{
                  backgroundColor: 'var(--theme-surface)90',
                  borderColor: 'var(--theme-border)',
                  border: '2px solid',
                  boxShadow: `0 0 20px var(--theme-primary)30`
                }}>
                  <div 
                    className="w-4 h-4 rounded-full animate-pulse"
                    style={{ 
                      backgroundColor: 'var(--theme-primary)',
                      boxShadow: `0 0 10px var(--theme-primary)`
                    }}
                  />
                  <span className="text-sm font-bold transition-colors duration-500" style={{ color: 'var(--theme-text)' }}>
                    {themes[currentThemeIndex].name.charAt(0).toUpperCase() + themes[currentThemeIndex].name.slice(1)} Theme
                  </span>
                </div>
                <SimpleThemeSelector />
              </div>
            </div>
            
            <div className="relative">
              <h1 className="text-6xl md:text-7xl font-bold mb-8 animate-bounce-in transition-colors duration-500" style={{
                color: 'var(--theme-text)'
              }}>
                Create Your 
                <span className="block mt-4 animate-rainbow-shimmer relative" style={{
                  background: `linear-gradient(45deg, var(--theme-primary), var(--theme-accent), var(--theme-primary))`,
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Dream Website ✨
                  {/* Enhanced floating sparkles */}
                  {[...Array(12)].map((_, i) => (
                    <span
                      key={i}
                      className="absolute text-3xl animate-ping opacity-70"
                      style={{
                        left: `${-5 + i * 10}%`,
                        top: `${-15 + (i % 3) * 15}%`,
                        animationDelay: `${i * 0.2}s`,
                        color: 'var(--theme-accent)',
                        filter: 'drop-shadow(0 0 10px var(--theme-accent))'
                      }}
                    >
                      ✨
                    </span>
                  ))}
                </span>
              </h1>
              
              <p className="text-2xl md:text-3xl max-w-4xl mx-auto animate-roll-in transition-colors duration-500 leading-relaxed mb-8" style={{ 
                animationDelay: '0.3s',
                color: 'var(--theme-muted)'
              }}>
                Just describe your vision and watch as our AI creates a stunning website with your chosen theme and animations!
              </p>
            </div>
          </div>

          {/* Main Creation Card */}
          <Card className="animate-scale-in shadow-2xl relative overflow-hidden backdrop-blur-md" style={{
            backgroundColor: 'var(--theme-surface)95',
            borderColor: 'var(--theme-border)',
            border: '2px solid',
            boxShadow: `0 0 50px var(--theme-primary)20`
          }}>
            {/* Card background effects */}
            <div className="absolute inset-0 opacity-10">
              <div 
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(45deg, var(--theme-primary), transparent, var(--theme-accent))`,
                  animation: 'gradient-shift 6s ease-in-out infinite'
                }}
              />
            </div>
            
            <CardHeader className="text-center pb-8 relative z-10">
              <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse-glow relative" style={{
                background: `linear-gradient(45deg, var(--theme-primary), var(--theme-accent))`,
                boxShadow: `0 0 40px var(--theme-primary)60`
              }}>
                <Wand2 className="w-12 h-12 text-white animate-spin" style={{ animationDuration: '4s' }} />
                {/* Enhanced sparkle effects around the icon */}
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 bg-white rounded-full animate-ping opacity-70"
                    style={{
                      left: `${50 + 50 * Math.cos(i * Math.PI / 6)}%`,
                      top: `${50 + 50 * Math.sin(i * Math.PI / 6)}%`,
                      animationDelay: `${i * 0.15}s`
                    }}
                  />
                ))}
              </div>
              <CardTitle className="text-4xl font-bold mb-6 animate-text-glow" style={{
                background: `linear-gradient(45deg, var(--theme-primary), var(--theme-accent))`,
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradient-shift 4s ease-in-out infinite'
              }}>
                🌍 Describe Your Dream Website in ANY Language
              </CardTitle>
              <CardDescription className="text-xl animate-fade-up" style={{ 
                color: 'var(--theme-muted)',
                animationDelay: '0.3s'
              }}>
                Tell us what you want to create in English, اردو, العربية, Español, Français, or any language you prefer! Our AI understands them all! 🚀
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-8 relative z-10">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4 animate-slide-in-left" style={{ 
                    color: 'var(--theme-text)',
                    animationDelay: '0.5s'
                  }}>
                    What kind of website do you want? ✨
                  </h3>
                </div>
                
                <Textarea
                  value={websitePrompt}
                  onChange={(e) => setWebsitePrompt(e.target.value)}
                  placeholder="Describe your dream website in ANY language! 

Examples:
🇺🇸 English: Create a modern portfolio website for a photographer with a dark theme, image gallery, contact form, and smooth animations...

🇵🇰 اردو: ایک جدید فوٹوگرافر کے لیے پورٹ فولیو ویب سائٹ بنائیں جس میں تاریک تھیم، تصاویر کی گیلری، رابطہ فارم اور ہموار حرکات ہوں...

🇸🇦 العربية: إنشاء موقع محفظة حديث للمصور مع موضوع داكن ومعرض صور ونموذج اتصال ورسوم متحركة سلسة...

🇪🇸 Español: Crear un sitio web de portafolio moderno para un fotógrafo con tema oscuro, galería de imágenes, formulario de contacto y animaciones suaves...

🇫🇷 Français: Créer un site web de portfolio moderne pour un photographe avec un thème sombre, une galerie d'images, un formulaire de contact et des animations fluides..."
                  rows={10}
                  className="text-lg animate-scale-in transition-all duration-300 hover:scale-105 focus:animate-glow resize-none backdrop-blur-sm"
                  style={{
                    backgroundColor: 'var(--theme-background)90',
                    borderColor: 'var(--theme-border)',
                    color: 'var(--theme-text)',
                    animationDelay: '0.7s',
                    border: '2px solid',
                    boxShadow: `0 0 20px var(--theme-primary)20`
                  }}
                />
                
                {/* Enhanced Suggestion Pills - Multi-language */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-center animate-fade-up" style={{ 
                    color: 'var(--theme-text)',
                    animationDelay: '0.9s'
                  }}>
                    💡 Quick Ideas in Multiple Languages (Click to use):
                  </h4>
                  
                  {/* English Suggestions */}
                  <div className="space-y-3">
                    <h5 className="font-medium text-center" style={{ color: 'var(--theme-text)' }}>🇺🇸 English</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-fade-up" style={{ animationDelay: '1s' }}>
                      {[
                        "🏢 Professional business website with contact forms and service pages",
                        "🎨 Creative portfolio with stunning image gallery and animations", 
                        "🍕 Restaurant website with menu, online ordering, and reservation system",
                        "💼 Corporate landing page with team profiles and testimonials",
                        "🛍️ E-commerce store with product catalog and shopping cart",
                        "📝 Personal blog with modern design and social media integration",
                        "🏥 Medical practice website with appointment booking system",
                        "🎓 Educational platform with course listings and student portal"
                      ].map((suggestion, index) => (
                        <button
                          key={suggestion}
                          onClick={() => setWebsitePrompt(suggestion.split(' ').slice(1).join(' '))}
                          className="p-4 text-left rounded-xl transition-all duration-300 hover:scale-105 hover:animate-jello backdrop-blur-sm"
                          style={{
                            backgroundColor: 'var(--theme-primary)20',
                            borderColor: 'var(--theme-primary)',
                            border: '1px solid',
                            color: 'var(--theme-text)',
                            animationDelay: `${1.1 + index * 0.05}s`,
                            boxShadow: `0 0 15px var(--theme-primary)10`
                          }}
                        >
                          <div className="font-medium">{suggestion}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Urdu Suggestions */}
                  <div className="space-y-3">
                    <h5 className="font-medium text-center" style={{ color: 'var(--theme-text)' }}>🇵🇰 اردو</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-fade-up" style={{ animationDelay: '1.2s' }}>
                      {[
                        "🏢 کاروباری ویب سائٹ بنائیں رابطہ فارم اور خدمات کے صفحات کے ساتھ",
                        "🎨 تخلیقی پورٹ فولیو بنائیں تصاویر کی گیلری اور حرکات کے ساتھ",
                        "🍕 ریسٹورنٹ کی ویب سائٹ بنائیں مینو اور آن لائن آرڈرنگ کے ساتھ",
                        "💼 کمپنی کا لینڈنگ پیج بنائیں ٹیم کی تفصیلات کے ساتھ",
                        "🛍️ آن لائن دکان بنائیں مصنوعات کی فہرست کے ساتھ",
                        "📝 ذاتی بلاگ بنائیں جدید ڈیزائن اور سوشل میڈیا کے ساتھ",
                        "🏥 طبی کلینک کی ویب سائٹ بنائیں اپائنٹمنٹ بکنگ کے ساتھ",
                        "🎓 تعلیمی پلیٹ فارم بنائیں کورسز کی فہرست کے ساتھ"
                      ].map((suggestion, index) => (
                        <button
                          key={suggestion}
                          onClick={() => setWebsitePrompt(suggestion)}
                          className="p-4 text-right rounded-xl transition-all duration-300 hover:scale-105 hover:animate-jello backdrop-blur-sm"
                          style={{
                            backgroundColor: 'var(--theme-accent)20',
                            borderColor: 'var(--theme-accent)',
                            border: '1px solid',
                            color: 'var(--theme-text)',
                            animationDelay: `${1.3 + index * 0.05}s`,
                            boxShadow: `0 0 15px var(--theme-accent)10`,
                            fontFamily: 'Noto Nastaliq Urdu, serif'
                          }}
                        >
                          <div className="font-medium">{suggestion}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Arabic Suggestions */}
                  <div className="space-y-3">
                    <h5 className="font-medium text-center" style={{ color: 'var(--theme-text)' }}>🇸🇦 العربية</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-fade-up" style={{ animationDelay: '1.4s' }}>
                      {[
                        "🏢 موقع تجاري احترافي مع نماذج الاتصال وصفحات الخدمات",
                        "🎨 محفظة إبداعية مع معرض صور مذهل ورسوم متحركة",
                        "🍕 موقع مطعم مع القائمة والطلب عبر الإنترنت ونظام الحجز",
                        "💼 صفحة هبوط للشركات مع ملفات الفريق والشهادات",
                        "🛍️ متجر إلكتروني مع كتالوج المنتجات وعربة التسوق",
                        "📝 مدونة شخصية بتصميم حديث وتكامل وسائل التواصل الاجتماعي",
                        "🏥 موقع عيادة طبية مع نظام حجز المواعيد",
                        "🎓 منصة تعليمية مع قوائم الدورات وبوابة الطلاب"
                      ].map((suggestion, index) => (
                        <button
                          key={suggestion}
                          onClick={() => setWebsitePrompt(suggestion)}
                          className="p-4 text-right rounded-xl transition-all duration-300 hover:scale-105 hover:animate-jello backdrop-blur-sm"
                          style={{
                            backgroundColor: 'var(--theme-primary)15',
                            borderColor: 'var(--theme-primary)',
                            border: '1px solid',
                            color: 'var(--theme-text)',
                            animationDelay: `${1.5 + index * 0.05}s`,
                            boxShadow: `0 0 15px var(--theme-primary)10`,
                            fontFamily: 'Noto Sans Arabic, sans-serif'
                          }}
                        >
                          <div className="font-medium">{suggestion}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Spanish Suggestions */}
                  <div className="space-y-3">
                    <h5 className="font-medium text-center" style={{ color: 'var(--theme-text)' }}>🇪🇸 Español</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-fade-up" style={{ animationDelay: '1.6s' }}>
                      {[
                        "🏢 Sitio web empresarial profesional con formularios de contacto",
                        "🎨 Portafolio creativo con galería de imágenes y animaciones",
                        "🍕 Sitio web de restaurante con menú y pedidos en línea",
                        "💼 Página de aterrizaje corporativa con perfiles del equipo",
                        "🛍️ Tienda en línea con catálogo de productos y carrito",
                        "📝 Blog personal con diseño moderno e integración social",
                        "🏥 Sitio web de clínica médica con sistema de citas",
                        "🎓 Plataforma educativa con listado de cursos y portal estudiantil"
                      ].map((suggestion, index) => (
                        <button
                          key={suggestion}
                          onClick={() => setWebsitePrompt(suggestion)}
                          className="p-4 text-left rounded-xl transition-all duration-300 hover:scale-105 hover:animate-jello backdrop-blur-sm"
                          style={{
                            backgroundColor: 'var(--theme-accent)15',
                            borderColor: 'var(--theme-accent)',
                            border: '1px solid',
                            color: 'var(--theme-text)',
                            animationDelay: `${1.7 + index * 0.05}s`,
                            boxShadow: `0 0 15px var(--theme-accent)10`
                          }}
                        >
                          <div className="font-medium">{suggestion}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* French Suggestions */}
                  <div className="space-y-3">
                    <h5 className="font-medium text-center" style={{ color: 'var(--theme-text)' }}>🇫🇷 Français</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-fade-up" style={{ animationDelay: '1.8s' }}>
                      {[
                        "🏢 Site web d'entreprise professionnel avec formulaires de contact",
                        "🎨 Portfolio créatif avec galerie d'images et animations",
                        "🍕 Site web de restaurant avec menu et commande en ligne",
                        "💼 Page d'atterrissage d'entreprise avec profils d'équipe",
                        "🛍️ Boutique en ligne avec catalogue de produits et panier",
                        "📝 Blog personnel avec design moderne et intégration sociale",
                        "🏥 Site web de clinique médicale avec système de rendez-vous",
                        "🎓 Plateforme éducative avec liste de cours et portail étudiant"
                      ].map((suggestion, index) => (
                        <button
                          key={suggestion}
                          onClick={() => setWebsitePrompt(suggestion)}
                          className="p-4 text-left rounded-xl transition-all duration-300 hover:scale-105 hover:animate-jello backdrop-blur-sm"
                          style={{
                            backgroundColor: 'var(--theme-primary)10',
                            borderColor: 'var(--theme-primary)',
                            border: '1px solid',
                            color: 'var(--theme-text)',
                            animationDelay: `${1.9 + index * 0.05}s`,
                            boxShadow: `0 0 15px var(--theme-primary)10`
                          }}
                        >
                          <div className="font-medium">{suggestion}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Prompt Section */}
                  <div className="space-y-3 mt-8">
                    <h5 className="font-medium text-center" style={{ color: 'var(--theme-text)' }}>
                      🌍 Or describe in ANY language you prefer!
                    </h5>
                    <div className="text-center text-sm opacity-75" style={{ color: 'var(--theme-muted)' }}>
                      You can write your website description in English, اردو, العربية, Español, Français, Deutsch, 中文, 日本語, हिंदी, or any other language!
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleGenerateWebsite}
                disabled={!websitePrompt.trim() || isGenerating}
                className="w-full text-2xl py-8 animate-glow hover:animate-bounce-gentle hover:scale-105 transition-all duration-300 relative overflow-hidden shadow-2xl"
                size="lg"
                style={{
                  backgroundColor: 'var(--theme-primary)',
                  color: 'white',
                  animationDelay: '1.5s',
                  borderRadius: '20px',
                  boxShadow: `0 0 40px var(--theme-primary)50`
                }}
              >
                {/* Enhanced button background animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer" />
                
                {isGenerating ? (
                  <>
                    <div className="animate-spin mr-4 text-3xl">🎨</div>
                    Creating Your Amazing Website...
                  </>
                ) : (
                  <>
                    <Rocket className="mr-4 w-8 h-8 animate-bounce" />
                    Generate My Website Now!
                    <Sparkles className="ml-4 w-8 h-8 animate-flash" />
                  </>
                )}
              </Button>

              {/* Enhanced Progress indicator */}
              {isGenerating && (
                <div className="space-y-6 animate-fade-up">
                  <div className="flex justify-between text-lg font-medium" style={{ color: 'var(--theme-text)' }}>
                    <span>🧠 AI is analyzing your requirements...</span>
                    <span>Processing...</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden" style={{
                    backgroundColor: 'var(--theme-border)'
                  }}>
                    <div 
                      className="h-4 rounded-full transition-all duration-1000"
                      style={{ 
                        backgroundColor: 'var(--theme-primary)',
                        width: '0%',
                        animation: 'progress-fill 4s ease-in-out forwards',
                        boxShadow: `0 0 20px var(--theme-primary)`
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    {[
                      { icon: '🎨', text: 'Designing Layout', delay: '0s' },
                      { icon: '🎯', text: 'Selecting Components', delay: '1.5s' },
                      { icon: '✨', text: 'Adding Animations', delay: '3s' }
                    ].map((step, index) => (
                      <div 
                        key={step.text}
                        className="flex flex-col items-center space-y-2 animate-pulse"
                        style={{ 
                          color: 'var(--theme-muted)',
                          animationDelay: step.delay
                        }}
                      >
                        <div className="text-3xl">{step.icon}</div>
                        <div className="font-medium">{step.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
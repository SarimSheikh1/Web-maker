import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Basic validation
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }
    
    if (!body.websiteType || !body.techPreference) {
      return NextResponse.json(
        { error: 'Website type and technology preference are required' },
        { status: 400 }
      )
    }
    
    // In a real application, you would:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Create user account
    // 4. Set up trial project
    
    // For demo purposes, we'll just return success
    const trialData = {
      id: Date.now(),
      name: body.name,
      email: body.email,
      company: body.company || null,
      websiteType: body.websiteType,
      techPreference: body.techPreference,
      features: body.features || [],
      description: body.description || null,
      submittedAt: new Date().toISOString(),
      status: 'active',
      trialExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
    }
    
    // Log the submission (in production, save to database)
    console.log('Free trial submission:', trialData)
    
    return NextResponse.json({
      success: true,
      message: 'Free trial activated successfully!',
      data: {
        id: trialData.id,
        name: trialData.name,
        email: trialData.email,
        websiteType: trialData.websiteType,
        techPreference: trialData.techPreference,
        trialExpiresAt: trialData.trialExpiresAt
      }
    })
    
  } catch (error) {
    console.error('Free trial submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  // Return information about the free trial
  return NextResponse.json({
    title: 'SiteCraft Free Trial',
    description: 'Create your first website for free',
    features: [
      'Create 1 website for free',
      'Access to all 17 themes',
      'Drag-and-drop visual editor',
      'Mobile-responsive design',
      'Export clean HTML/CSS/JS code',
      'No credit card required'
    ],
    techStacks: [
      {
        id: 'visual',
        name: 'Visual Builder (No Code)',
        description: 'Perfect for beginners! Drag-and-drop interface with no coding required.',
        icon: '🎨'
      },
      {
        id: 'html-css',
        name: 'HTML + CSS Only',
        description: 'Clean, semantic markup. Fast loading and SEO-friendly.',
        icon: '🏗️'
      },
      {
        id: 'javascript',
        name: 'HTML + CSS + JavaScript',
        description: 'Interactive features, animations, and dynamic content.',
        icon: '⚡'
      },
      {
        id: 'react',
        name: 'React/Next.js',
        description: 'Modern JavaScript framework for single-page applications.',
        icon: '⚛️'
      },
      {
        id: 'python',
        name: 'Python (Django/Flask)',
        description: 'Server-side Python with Django or Flask for complex applications.',
        icon: '🐍'
      },
      {
        id: 'php',
        name: 'PHP',
        description: 'Traditional server-side scripting for dynamic websites.',
        icon: '🔧'
      },
      {
        id: 'wordpress',
        name: 'WordPress',
        description: 'Popular CMS with thousands of themes and plugins.',
        icon: '📝'
      }
    ],
    websiteTypes: [
      'Business Website',
      'Portfolio',
      'E-commerce Store',
      'Blog/News Site',
      'Restaurant/Food',
      'Agency/Services',
      'Non-profit',
      'Other'
    ],
    availableFeatures: [
      'Contact Forms',
      'Image Gallery',
      'Blog/News',
      'E-commerce',
      'User Authentication',
      'Payment Processing',
      'Social Media Integration',
      'SEO Optimization',
      'Analytics',
      'Multi-language',
      'Mobile App',
      'Custom Domain'
    ]
  })
}
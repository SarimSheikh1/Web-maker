import { PrismaClient } from '@prisma/client'
// import bcrypt from 'bcryptjs'
import { themePresets } from '../lib/types/theme'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create demo user (simple password for demo)
  const user = await prisma.user.upsert({
    where: { email: 'demo@sitecraft.com' },
    update: {},
    create: {
      email: 'demo@sitecraft.com',
      name: 'Demo User',
      // Note: In production, use proper password hashing
    },
  })

  console.log('👤 Created demo user:', user.email)

  // Create demo project with Agency template
  const project = await prisma.project.upsert({
    where: { slug: 'demo-agency' },
    update: {},
    create: {
      name: 'Demo Agency Website',
      slug: 'demo-agency',
      userId: user.id,
      isPublished: true,
      publishedAt: new Date(),
    },
  })

  console.log('📁 Created demo project:', project.name)

  // Create theme
  await prisma.theme.upsert({
    where: { projectId: project.id },
    update: {},
    create: {
      projectId: project.id,
      tokens: themePresets.modern,
    },
  })

  console.log('🎨 Created theme')

  // Create home page
  const homePage = await prisma.page.upsert({
    where: { 
      projectId_path: {
        projectId: project.id,
        path: '/'
      }
    },
    update: {},
    create: {
      projectId: project.id,
      name: 'Home',
      path: '/',
      metaTitle: 'Demo Agency - Creative Solutions',
      metaDescription: 'We help brands tell their story through creative design and digital experiences.',
      isVisible: true,
    },
  })

  console.log('📄 Created home page')

  // Create blocks for home page
  const blocks = [
    {
      id: 'navbar-1',
      type: 'navbar',
      order: 0,
      variant: 'default',
      props: {
        logo: { text: 'Demo Agency' },
        links: [
          { id: 'nav-1', label: 'Services', href: '#services', isExternal: false },
          { id: 'nav-2', label: 'About', href: '#about', isExternal: false },
          { id: 'nav-3', label: 'Contact', href: '#contact', isExternal: false },
        ],
        showCTA: true,
        ctaText: 'Get Started',
        ctaHref: '#contact',
        sticky: true,
      },
      style: {},
    },
    {
      id: 'hero-1',
      type: 'hero',
      order: 1,
      variant: 'centered',
      props: {
        headline: 'We Build Brands That Matter',
        subheadline: 'Creative agency specializing in brand identity, web design, and digital experiences that connect with your audience.',
        primaryCTA: { text: 'View Our Work', href: '#services' },
        secondaryCTA: { text: 'Get In Touch', href: '#contact' },
        textAnimation: { type: 'fadeUp', durationMs: 800, delayMs: 200, once: true },
      },
      style: {},
    },
    {
      id: 'features-1',
      type: 'features',
      order: 2,
      variant: 'cards',
      props: {
        title: 'Our Services',
        subtitle: 'We offer comprehensive creative services to help your brand stand out',
        features: [
          {
            id: 'feature-1',
            title: 'Brand Identity',
            description: 'Create a memorable brand identity that resonates with your target audience.',
            icon: 'palette',
          },
          {
            id: 'feature-2',
            title: 'Web Design',
            description: 'Beautiful, responsive websites that convert visitors into customers.',
            icon: 'monitor',
          },
          {
            id: 'feature-3',
            title: 'Digital Marketing',
            description: 'Strategic digital marketing campaigns that drive results.',
            icon: 'trending-up',
          },
        ],
        layout: 'grid',
        columns: 3,
        textAnimation: { type: 'fadeUp', durationMs: 600, delayMs: 100, once: true },
      },
      style: {},
    },
    {
      id: 'testimonials-1',
      type: 'testimonials',
      order: 3,
      variant: 'grid',
      props: {
        title: 'What Our Clients Say',
        subtitle: 'Don\'t just take our word for it - hear from our satisfied clients',
        testimonials: [
          {
            id: 'testimonial-1',
            content: 'Working with Demo Agency was a game-changer for our business. Their creative approach and attention to detail exceeded our expectations.',
            author: 'Sarah Johnson',
            role: 'CEO',
            company: 'TechStart Inc.',
            rating: 5,
            avatar: '',
          },
          {
            id: 'testimonial-2',
            content: 'The team delivered a stunning website that perfectly captures our brand essence. Highly recommended!',
            author: 'Michael Chen',
            role: 'Marketing Director',
            company: 'GrowthCorp',
            rating: 5,
            avatar: '',
          },
          {
            id: 'testimonial-3',
            content: 'Professional, creative, and results-driven. Demo Agency helped us rebrand and increase our market presence significantly.',
            author: 'Emily Rodriguez',
            role: 'Founder',
            company: 'InnovateLab',
            rating: 5,
            avatar: '',
          },
        ],
        layout: 'grid',
        showRatings: true,
        textAnimation: { type: 'scaleIn', durationMs: 800, delayMs: 200, once: true },
      },
      style: {},
    },
    {
      id: 'pricing-1',
      type: 'pricing',
      order: 4,
      variant: 'cards',
      props: {
        title: 'Our Packages',
        subtitle: 'Choose the perfect package for your project needs',
        plans: [
          {
            id: 'plan-1',
            name: 'Starter',
            price: '$2,500',
            period: 'project',
            description: 'Perfect for small businesses getting started',
            features: [
              'Logo Design',
              'Business Card Design',
              'Basic Brand Guidelines',
              '2 Revisions',
              '1 Month Support'
            ],
            highlighted: false,
            ctaText: 'Get Started',
            ctaHref: '#contact',
          },
          {
            id: 'plan-2',
            name: 'Professional',
            price: '$5,000',
            period: 'project',
            description: 'Comprehensive branding for growing businesses',
            features: [
              'Complete Brand Identity',
              'Website Design',
              'Marketing Materials',
              'Brand Guidelines',
              'Unlimited Revisions',
              '3 Months Support'
            ],
            highlighted: true,
            ctaText: 'Most Popular',
            ctaHref: '#contact',
          },
          {
            id: 'plan-3',
            name: 'Enterprise',
            price: '$10,000',
            period: 'project',
            description: 'Full-service solution for established companies',
            features: [
              'Everything in Professional',
              'Digital Marketing Strategy',
              'Social Media Templates',
              'Video Brand Assets',
              'Ongoing Consultation',
              '6 Months Support'
            ],
            highlighted: false,
            ctaText: 'Contact Sales',
            ctaHref: '#contact',
          },
        ],
        showAnnualToggle: false,
        textAnimation: { type: 'slideUp', durationMs: 700, delayMs: 150, once: true },
      },
      style: {},
    },
    {
      id: 'faq-1',
      type: 'faq',
      order: 5,
      variant: 'accordion',
      props: {
        title: 'Frequently Asked Questions',
        subtitle: 'Everything you need to know about working with us',
        faqs: [
          {
            id: 'faq-1',
            question: 'How long does a typical project take?',
            answer: 'Project timelines vary depending on scope, but most branding projects take 4-6 weeks, while website projects typically take 6-8 weeks from start to finish.',
          },
          {
            id: 'faq-2',
            question: 'Do you work with businesses of all sizes?',
            answer: 'Yes! We work with startups, small businesses, and large enterprises. Our packages are designed to scale with your needs and budget.',
          },
          {
            id: 'faq-3',
            question: 'What\'s included in your brand identity service?',
            answer: 'Our brand identity service includes logo design, color palette, typography selection, brand guidelines, and application examples across various touchpoints.',
          },
          {
            id: 'faq-4',
            question: 'Can you help with ongoing marketing support?',
            answer: 'Absolutely! We offer ongoing support packages that include marketing consultation, content creation, and brand maintenance services.',
          },
        ],
        layout: 'accordion',
        textAnimation: { type: 'fadeLeft', durationMs: 600, delayMs: 100, once: true },
      },
      style: {},
    },
    {
      id: 'contact-1',
      type: 'contact',
      order: 6,
      variant: 'split',
      props: {
        title: 'Ready to Start Your Project?',
        subtitle: 'Let\'s discuss how we can help bring your vision to life.',
        showForm: true,
        formFields: { name: true, email: true, subject: true, message: true },
        contactInfo: {
          email: 'hello@demoagency.com',
          phone: '+1 (555) 123-4567',
          address: '123 Creative Street, Design City, DC 12345',
        },
        textAnimation: { type: 'fadeUp', durationMs: 600, delayMs: 0, once: true },
      },
      style: {},
    },
    {
      id: 'footer-1',
      type: 'footer',
      order: 7,
      variant: 'default',
      props: {
        logo: { text: 'Demo Agency' },
        description: 'Creative agency building brands that matter. We help businesses tell their story through exceptional design and digital experiences.',
        links: [
          {
            id: 'footer-links-1',
            title: 'Services',
            links: [
              { id: 'footer-link-1', label: 'Brand Identity', href: '/services/branding', isExternal: false },
              { id: 'footer-link-2', label: 'Web Design', href: '/services/web-design', isExternal: false },
              { id: 'footer-link-3', label: 'Digital Marketing', href: '/services/marketing', isExternal: false },
            ],
          },
          {
            id: 'footer-links-2',
            title: 'Company',
            links: [
              { id: 'footer-link-4', label: 'About Us', href: '/about', isExternal: false },
              { id: 'footer-link-5', label: 'Our Work', href: '/portfolio', isExternal: false },
              { id: 'footer-link-6', label: 'Careers', href: '/careers', isExternal: false },
            ],
          },
          {
            id: 'footer-links-3',
            title: 'Support',
            links: [
              { id: 'footer-link-7', label: 'Contact', href: '#contact', isExternal: false },
              { id: 'footer-link-8', label: 'FAQ', href: '#faq', isExternal: false },
              { id: 'footer-link-9', label: 'Blog', href: '/blog', isExternal: false },
            ],
          },
        ],
        socialLinks: [
          { id: 'social-1', platform: 'Twitter', url: 'https://twitter.com', icon: '🐦' },
          { id: 'social-2', platform: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' },
          { id: 'social-3', platform: 'Instagram', url: 'https://instagram.com', icon: '📷' },
          { id: 'social-4', platform: 'Dribbble', url: 'https://dribbble.com', icon: '🏀' },
        ],
        showNewsletter: true,
        copyright: '© 2024 Demo Agency. All rights reserved.',
        textAnimation: { type: 'fadeUp', durationMs: 500, delayMs: 0, once: true },
      },
      style: {},
    },
  ]

  for (const blockData of blocks) {
    await prisma.block.upsert({
      where: { id: blockData.id },
      update: {},
      create: {
        id: blockData.id,
        pageId: homePage.id,
        type: blockData.type,
        order: blockData.order,
        variant: blockData.variant,
        props: blockData.props,
        style: blockData.style,
      },
    })
  }

  console.log('🧱 Created blocks')

  // Create publish snapshot
  await prisma.publishSnapshot.create({
    data: {
      projectId: project.id,
      versionNumber: 1,
      snapshotJSON: {
        project: {
          id: project.id,
          name: project.name,
          slug: project.slug,
        },
        pages: [
          {
            ...homePage,
            blocks: blocks,
          },
        ],
        theme: themePresets.modern,
      },
    },
  })

  console.log('📸 Created publish snapshot')
  console.log('✅ Seeding completed!')
  console.log('')
  console.log('🔑 Demo credentials:')
  console.log('   Email: demo@sitecraft.com')
  console.log('   Password: demo123')
  console.log('')
  console.log('🌐 Demo site: http://localhost:3000/site/demo-agency')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
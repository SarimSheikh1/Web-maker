import { themePresets } from '@/lib/types/theme'
import { generateId } from '@/lib/utils'

export interface TemplateData {
  id: string
  name: string
  description: string
  theme: any
  pages: Array<{
    name: string
    path: string
    metaTitle?: string
    metaDescription?: string
    isVisible: boolean
    blocks: Array<{
      type: string
      order: number
      variant: string
      props: any
      style: any
    }>
  }>
}

const agencyTemplate: TemplateData = {
  id: 'agency',
  name: 'Agency',
  description: 'Perfect for creative agencies',
  theme: themePresets.modern,
  pages: [
    {
      name: 'Home',
      path: '/',
      metaTitle: 'Creative Agency - Build Your Brand',
      metaDescription: 'We help brands tell their story through creative design and digital experiences.',
      isVisible: true,
      blocks: [
        {
          type: 'navbar',
          order: 0,
          variant: 'default',
          props: {
            logo: { text: 'Agency' },
            links: [
              { id: generateId(), label: 'Services', href: '#services', isExternal: false },
              { id: generateId(), label: 'Work', href: '#work', isExternal: false },
              { id: generateId(), label: 'About', href: '/about', isExternal: false },
              { id: generateId(), label: 'Contact', href: '#contact', isExternal: false },
            ],
            showCTA: true,
            ctaText: 'Get Started',
            ctaHref: '#contact',
            sticky: true,
          },
          style: {},
        },
        {
          type: 'hero',
          order: 1,
          variant: 'centered',
          props: {
            headline: 'We Build Brands That Matter',
            subheadline: 'Creative agency specializing in brand identity, web design, and digital experiences that connect with your audience.',
            primaryCTA: { text: 'View Our Work', href: '#work' },
            secondaryCTA: { text: 'Get In Touch', href: '#contact' },
            textAnimation: { type: 'fadeUp', durationMs: 800, delayMs: 200, once: true },
          },
          style: {},
        },
        {
          type: 'features',
          order: 2,
          variant: 'cards',
          props: {
            title: 'Our Services',
            subtitle: 'We offer comprehensive creative services to help your brand stand out',
            features: [
              {
                id: generateId(),
                title: 'Brand Identity',
                description: 'Create a memorable brand identity that resonates with your target audience.',
                icon: 'palette',
              },
              {
                id: generateId(),
                title: 'Web Design',
                description: 'Beautiful, responsive websites that convert visitors into customers.',
                icon: 'monitor',
              },
              {
                id: generateId(),
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
          type: 'testimonials',
          order: 3,
          variant: 'carousel',
          props: {
            title: 'What Our Clients Say',
            testimonials: [
              {
                id: generateId(),
                content: 'Working with this agency transformed our brand. The attention to detail and creative vision exceeded our expectations.',
                author: 'Sarah Johnson',
                role: 'CEO',
                company: 'TechStart Inc.',
                rating: 5,
              },
              {
                id: generateId(),
                content: 'Professional, creative, and results-driven. They delivered exactly what we needed to take our business to the next level.',
                author: 'Michael Chen',
                role: 'Marketing Director',
                company: 'Growth Co.',
                rating: 5,
              },
            ],
            layout: 'carousel',
            showRatings: true,
            textAnimation: { type: 'fadeUp', durationMs: 600, delayMs: 0, once: true },
          },
          style: {},
        },
        {
          type: 'contact',
          order: 4,
          variant: 'centered',
          props: {
            title: 'Ready to Start Your Project?',
            subtitle: 'Let\'s discuss how we can help bring your vision to life.',
            showForm: true,
            formFields: { name: true, email: true, subject: true, message: true },
            textAnimation: { type: 'fadeUp', durationMs: 600, delayMs: 0, once: true },
          },
          style: {},
        },
        {
          type: 'footer',
          order: 5,
          variant: 'default',
          props: {
            logo: { text: 'Agency' },
            description: 'Creative agency building brands that matter.',
            links: [
              {
                id: generateId(),
                title: 'Services',
                links: [
                  { id: generateId(), label: 'Brand Identity', href: '/services/branding', isExternal: false },
                  { id: generateId(), label: 'Web Design', href: '/services/web-design', isExternal: false },
                  { id: generateId(), label: 'Digital Marketing', href: '/services/marketing', isExternal: false },
                ],
              },
            ],
            socialLinks: [
              { id: generateId(), platform: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
              { id: generateId(), platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
              { id: generateId(), platform: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
            ],
            copyright: '© 2024 Agency. All rights reserved.',
            textAnimation: { type: 'none', durationMs: 0, delayMs: 0, once: true },
          },
          style: {},
        },
      ],
    },
    {
      name: 'About',
      path: '/about',
      metaTitle: 'About Us - Creative Agency',
      metaDescription: 'Learn more about our creative agency and the team behind the work.',
      isVisible: true,
      blocks: [
        {
          type: 'navbar',
          order: 0,
          variant: 'default',
          props: {
            logo: { text: 'Agency' },
            links: [
              { id: generateId(), label: 'Home', href: '/', isExternal: false },
              { id: generateId(), label: 'Services', href: '/#services', isExternal: false },
              { id: generateId(), label: 'Work', href: '/#work', isExternal: false },
              { id: generateId(), label: 'Contact', href: '/#contact', isExternal: false },
            ],
            showCTA: true,
            ctaText: 'Get Started',
            ctaHref: '/#contact',
            sticky: true,
          },
          style: {},
        },
        {
          type: 'hero',
          order: 1,
          variant: 'minimal',
          props: {
            headline: 'About Our Agency',
            subheadline: 'We are a team of creative professionals passionate about building brands that make a difference.',
            textAnimation: { type: 'fadeUp', durationMs: 800, delayMs: 200, once: true },
          },
          style: {},
        },
        {
          type: 'footer',
          order: 2,
          variant: 'minimal',
          props: {
            logo: { text: 'Agency' },
            description: 'Creative agency building brands that matter.',
            copyright: '© 2024 Agency. All rights reserved.',
            textAnimation: { type: 'none', durationMs: 0, delayMs: 0, once: true },
          },
          style: {},
        },
      ],
    },
  ],
}

const portfolioTemplate: TemplateData = {
  id: 'portfolio',
  name: 'Portfolio',
  description: 'Showcase your work',
  theme: themePresets.elegant,
  pages: [
    {
      name: 'Home',
      path: '/',
      metaTitle: 'John Doe - Creative Portfolio',
      metaDescription: 'Creative professional showcasing design work and projects.',
      isVisible: true,
      blocks: [
        {
          type: 'navbar',
          order: 0,
          variant: 'minimal',
          props: {
            logo: { text: 'John Doe' },
            links: [
              { id: generateId(), label: 'Work', href: '#work', isExternal: false },
              { id: generateId(), label: 'About', href: '/about', isExternal: false },
              { id: generateId(), label: 'Contact', href: '#contact', isExternal: false },
            ],
            showCTA: false,
            sticky: true,
          },
          style: {},
        },
        {
          type: 'hero',
          order: 1,
          variant: 'split',
          props: {
            headline: 'Creative Designer & Developer',
            subheadline: 'I create beautiful digital experiences that connect brands with their audiences.',
            primaryCTA: { text: 'View My Work', href: '#work' },
            secondaryCTA: { text: 'Get In Touch', href: '#contact' },
            textAnimation: { type: 'typewriter', durationMs: 2000, delayMs: 500, once: true },
          },
          style: {},
        },
        {
          type: 'gallery',
          order: 2,
          variant: 'masonry',
          props: {
            title: 'Featured Work',
            subtitle: 'A selection of my recent projects',
            images: [
              {
                id: generateId(),
                src: '/placeholder-work-1.jpg',
                alt: 'Project 1',
                caption: 'Brand Identity Design',
              },
              {
                id: generateId(),
                src: '/placeholder-work-2.jpg',
                alt: 'Project 2',
                caption: 'Website Design',
              },
              {
                id: generateId(),
                src: '/placeholder-work-3.jpg',
                alt: 'Project 3',
                caption: 'Mobile App Design',
              },
            ],
            layout: 'masonry',
            columns: 3,
            showCaptions: true,
          },
          style: {},
        },
        {
          type: 'contact',
          order: 3,
          variant: 'minimal',
          props: {
            title: 'Let\'s Work Together',
            subtitle: 'Have a project in mind? I\'d love to hear about it.',
            showForm: true,
            formFields: { name: true, email: true, message: true },
            textAnimation: { type: 'fadeUp', durationMs: 600, delayMs: 0, once: true },
          },
          style: {},
        },
        {
          type: 'footer',
          order: 4,
          variant: 'minimal',
          props: {
            logo: { text: 'John Doe' },
            description: 'Creative designer & developer',
            socialLinks: [
              { id: generateId(), platform: 'Dribbble', url: 'https://dribbble.com', icon: 'dribbble' },
              { id: generateId(), platform: 'Behance', url: 'https://behance.net', icon: 'behance' },
              { id: generateId(), platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
            ],
            copyright: '© 2024 John Doe. All rights reserved.',
            textAnimation: { type: 'none', durationMs: 0, delayMs: 0, once: true },
          },
          style: {},
        },
      ],
    },
  ],
}

const restaurantTemplate: TemplateData = {
  id: 'restaurant',
  name: 'Restaurant',
  description: 'For restaurants and cafes',
  theme: themePresets.warm,
  pages: [
    {
      name: 'Home',
      path: '/',
      metaTitle: 'Bella Vista - Authentic Italian Cuisine',
      metaDescription: 'Experience authentic Italian cuisine in a warm, welcoming atmosphere.',
      isVisible: true,
      blocks: [
        {
          type: 'navbar',
          order: 0,
          variant: 'default',
          props: {
            logo: { text: 'Bella Vista' },
            links: [
              { id: generateId(), label: 'Menu', href: '#menu', isExternal: false },
              { id: generateId(), label: 'About', href: '#about', isExternal: false },
              { id: generateId(), label: 'Location', href: '#location', isExternal: false },
              { id: generateId(), label: 'Contact', href: '#contact', isExternal: false },
            ],
            showCTA: true,
            ctaText: 'Reserve Table',
            ctaHref: '#contact',
            sticky: true,
          },
          style: {},
        },
        {
          type: 'hero',
          order: 1,
          variant: 'video',
          props: {
            headline: 'Authentic Italian Cuisine',
            subheadline: 'Experience the taste of Italy in every bite. Fresh ingredients, traditional recipes, modern presentation.',
            primaryCTA: { text: 'View Menu', href: '#menu' },
            secondaryCTA: { text: 'Reserve Table', href: '#contact' },
            textAnimation: { type: 'gradientShimmer', durationMs: 2000, delayMs: 0, once: false },
          },
          style: {},
        },
        {
          type: 'features',
          order: 2,
          variant: 'alternating',
          props: {
            title: 'Why Choose Bella Vista',
            features: [
              {
                id: generateId(),
                title: 'Fresh Ingredients',
                description: 'We source the finest ingredients daily to ensure every dish is fresh and flavorful.',
                icon: 'leaf',
              },
              {
                id: generateId(),
                title: 'Traditional Recipes',
                description: 'Our recipes have been passed down through generations of Italian chefs.',
                icon: 'book',
              },
              {
                id: generateId(),
                title: 'Warm Atmosphere',
                description: 'Enjoy your meal in our cozy, family-friendly dining room.',
                icon: 'heart',
              },
            ],
            layout: 'list',
            textAnimation: { type: 'fadeUp', durationMs: 600, delayMs: 100, once: true },
          },
          style: {},
        },
        {
          type: 'testimonials',
          order: 3,
          variant: 'wall',
          props: {
            title: 'What Our Guests Say',
            testimonials: [
              {
                id: generateId(),
                content: 'The best Italian food outside of Italy! The pasta is incredible and the service is outstanding.',
                author: 'Maria Rodriguez',
                role: 'Food Blogger',
                rating: 5,
              },
              {
                id: generateId(),
                content: 'A hidden gem! The atmosphere is perfect for date nights and the food is absolutely delicious.',
                author: 'David Thompson',
                role: 'Local Resident',
                rating: 5,
              },
            ],
            layout: 'grid',
            showRatings: true,
            textAnimation: { type: 'blurIn', durationMs: 800, delayMs: 0, once: true },
          },
          style: {},
        },
        {
          type: 'contact',
          order: 4,
          variant: 'split',
          props: {
            title: 'Visit Us Today',
            subtitle: 'Reserve your table or contact us for special events.',
            showForm: true,
            formFields: { name: true, email: true, subject: false, message: true },
            contactInfo: {
              email: 'info@bellavista.com',
              phone: '(555) 123-4567',
              address: '123 Main Street, Downtown, City 12345',
            },
            textAnimation: { type: 'fadeUp', durationMs: 600, delayMs: 0, once: true },
          },
          style: {},
        },
        {
          type: 'footer',
          order: 5,
          variant: 'default',
          props: {
            logo: { text: 'Bella Vista' },
            description: 'Authentic Italian cuisine in the heart of the city.',
            links: [
              {
                id: generateId(),
                title: 'Restaurant',
                links: [
                  { id: generateId(), label: 'Menu', href: '#menu', isExternal: false },
                  { id: generateId(), label: 'Reservations', href: '#contact', isExternal: false },
                  { id: generateId(), label: 'Private Events', href: '/events', isExternal: false },
                ],
              },
            ],
            socialLinks: [
              { id: generateId(), platform: 'Facebook', url: 'https://facebook.com', icon: 'facebook' },
              { id: generateId(), platform: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
              { id: generateId(), platform: 'Yelp', url: 'https://yelp.com', icon: 'star' },
            ],
            copyright: '© 2024 Bella Vista Restaurant. All rights reserved.',
            textAnimation: { type: 'none', durationMs: 0, delayMs: 0, once: true },
          },
          style: {},
        },
      ],
    },
  ],
}

const saasTemplate: TemplateData = {
  id: 'saas',
  name: 'SaaS Landing',
  description: 'Software product landing page',
  theme: themePresets.vibrant,
  pages: [
    {
      name: 'Home',
      path: '/',
      metaTitle: 'ProductFlow - Streamline Your Workflow',
      metaDescription: 'The all-in-one productivity platform that helps teams collaborate and get things done.',
      isVisible: true,
      blocks: [
        {
          type: 'navbar',
          order: 0,
          variant: 'default',
          props: {
            logo: { text: 'ProductFlow' },
            links: [
              { id: generateId(), label: 'Features', href: '#features', isExternal: false },
              { id: generateId(), label: 'Pricing', href: '#pricing', isExternal: false },
              { id: generateId(), label: 'About', href: '/about', isExternal: false },
              { id: generateId(), label: 'Contact', href: '#contact', isExternal: false },
            ],
            showCTA: true,
            ctaText: 'Start Free Trial',
            ctaHref: '#pricing',
            sticky: true,
          },
          style: {},
        },
        {
          type: 'hero',
          order: 1,
          variant: 'centered',
          props: {
            headline: 'Streamline Your Workflow',
            subheadline: 'The all-in-one productivity platform that helps teams collaborate, manage projects, and get things done faster.',
            primaryCTA: { text: 'Start Free Trial', href: '#pricing' },
            secondaryCTA: { text: 'Watch Demo', href: '#demo' },
            textAnimation: { type: 'fadeUp', durationMs: 800, delayMs: 200, once: true },
          },
          style: {},
        },
        {
          type: 'logos',
          order: 2,
          variant: 'carousel',
          props: {
            title: 'Trusted by leading companies',
            logos: [
              { id: generateId(), name: 'Company 1', image: '/logo-1.png' },
              { id: generateId(), name: 'Company 2', image: '/logo-2.png' },
              { id: generateId(), name: 'Company 3', image: '/logo-3.png' },
            ],
            showTitle: true,
            grayscale: true,
          },
          style: {},
        },
        {
          type: 'features',
          order: 3,
          variant: 'cards',
          props: {
            title: 'Everything you need to succeed',
            subtitle: 'Powerful features designed to help your team work smarter, not harder.',
            features: [
              {
                id: generateId(),
                title: 'Project Management',
                description: 'Organize tasks, set deadlines, and track progress with intuitive project boards.',
                icon: 'kanban-square',
              },
              {
                id: generateId(),
                title: 'Team Collaboration',
                description: 'Real-time chat, file sharing, and collaborative editing in one place.',
                icon: 'users',
              },
              {
                id: generateId(),
                title: 'Time Tracking',
                description: 'Track time spent on tasks and projects with detailed reporting.',
                icon: 'clock',
              },
              {
                id: generateId(),
                title: 'Analytics & Reports',
                description: 'Get insights into team productivity and project performance.',
                icon: 'bar-chart',
              },
              {
                id: generateId(),
                title: 'Integrations',
                description: 'Connect with your favorite tools and streamline your workflow.',
                icon: 'plug',
              },
              {
                id: generateId(),
                title: 'Mobile Apps',
                description: 'Stay productive on the go with our native mobile applications.',
                icon: 'smartphone',
              },
            ],
            layout: 'grid',
            columns: 3,
            textAnimation: { type: 'fadeUp', durationMs: 600, delayMs: 100, once: true },
          },
          style: {},
        },
        {
          type: 'pricing',
          order: 4,
          variant: 'cards',
          props: {
            title: 'Simple, transparent pricing',
            subtitle: 'Choose the plan that works best for your team.',
            plans: [
              {
                id: generateId(),
                name: 'Starter',
                price: '$9',
                period: 'month',
                description: 'Perfect for small teams getting started',
                features: [
                  'Up to 5 team members',
                  'Unlimited projects',
                  'Basic reporting',
                  'Email support',
                ],
                highlighted: false,
                ctaText: 'Start Free Trial',
                ctaHref: '#contact',
              },
              {
                id: generateId(),
                name: 'Professional',
                price: '$29',
                period: 'month',
                description: 'For growing teams that need more power',
                features: [
                  'Up to 25 team members',
                  'Advanced project templates',
                  'Time tracking',
                  'Priority support',
                  'Advanced analytics',
                ],
                highlighted: true,
                ctaText: 'Start Free Trial',
                ctaHref: '#contact',
              },
              {
                id: generateId(),
                name: 'Enterprise',
                price: '$99',
                period: 'month',
                description: 'For large organizations with complex needs',
                features: [
                  'Unlimited team members',
                  'Custom integrations',
                  'Advanced security',
                  'Dedicated support',
                  'Custom reporting',
                ],
                highlighted: false,
                ctaText: 'Contact Sales',
                ctaHref: '#contact',
              },
            ],
            showAnnualToggle: true,
            textAnimation: { type: 'fadeUp', durationMs: 600, delayMs: 0, once: true },
          },
          style: {},
        },
        {
          type: 'faq',
          order: 5,
          variant: 'accordion',
          props: {
            title: 'Frequently Asked Questions',
            faqs: [
              {
                id: generateId(),
                question: 'How does the free trial work?',
                answer: 'You get full access to all features for 14 days, no credit card required. You can upgrade or downgrade at any time.',
              },
              {
                id: generateId(),
                question: 'Can I change my plan later?',
                answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.',
              },
              {
                id: generateId(),
                question: 'Is my data secure?',
                answer: 'Absolutely. We use enterprise-grade security measures to protect your data, including encryption and regular backups.',
              },
              {
                id: generateId(),
                question: 'Do you offer customer support?',
                answer: 'Yes, we provide email support for all plans and priority support for Professional and Enterprise customers.',
              },
            ],
            layout: 'accordion',
            textAnimation: { type: 'fadeUp', durationMs: 600, delayMs: 0, once: true },
          },
          style: {},
        },
        {
          type: 'contact',
          order: 6,
          variant: 'centered',
          props: {
            title: 'Ready to get started?',
            subtitle: 'Join thousands of teams already using ProductFlow to streamline their workflow.',
            showForm: true,
            formFields: { name: true, email: true, message: false },
            textAnimation: { type: 'fadeUp', durationMs: 600, delayMs: 0, once: true },
          },
          style: {},
        },
        {
          type: 'footer',
          order: 7,
          variant: 'newsletter',
          props: {
            logo: { text: 'ProductFlow' },
            description: 'The all-in-one productivity platform for modern teams.',
            links: [
              {
                id: generateId(),
                title: 'Product',
                links: [
                  { id: generateId(), label: 'Features', href: '#features', isExternal: false },
                  { id: generateId(), label: 'Pricing', href: '#pricing', isExternal: false },
                  { id: generateId(), label: 'Integrations', href: '/integrations', isExternal: false },
                ],
              },
              {
                id: generateId(),
                title: 'Company',
                links: [
                  { id: generateId(), label: 'About', href: '/about', isExternal: false },
                  { id: generateId(), label: 'Blog', href: '/blog', isExternal: false },
                  { id: generateId(), label: 'Careers', href: '/careers', isExternal: false },
                ],
              },
            ],
            socialLinks: [
              { id: generateId(), platform: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
              { id: generateId(), platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
              { id: generateId(), platform: 'GitHub', url: 'https://github.com', icon: 'github' },
            ],
            showNewsletter: true,
            copyright: '© 2024 ProductFlow. All rights reserved.',
            textAnimation: { type: 'none', durationMs: 0, delayMs: 0, once: true },
          },
          style: {},
        },
      ],
    },
  ],
}

const templates: Record<string, TemplateData> = {
  agency: agencyTemplate,
  portfolio: portfolioTemplate,
  restaurant: restaurantTemplate,
  saas: saasTemplate,
}

export function getTemplateData(templateId: string): TemplateData | null {
  return templates[templateId] || null
}

export function getAllTemplates(): TemplateData[] {
  return Object.values(templates)
}
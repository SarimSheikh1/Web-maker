import { z } from 'zod'

// Animation schemas
export const textAnimationSchema = z.object({
  type: z.enum([
    'none', 
    'fadeUp', 
    'fadeDown', 
    'fadeLeft', 
    'fadeRight', 
    'blurIn', 
    'scaleIn', 
    'rotateIn', 
    'slideUp', 
    'slideDown', 
    'flipIn', 
    'typewriter', 
    'gradientShimmer', 
    'rainbowShimmer',
    'bounceGentle',
    'pulseGlow',
    'float',
    'wiggle'
  ]).default('none'),
  durationMs: z.number().min(100).max(5000).default(1000),
  delayMs: z.number().min(0).max(2000).default(0),
  once: z.boolean().default(true),
})

export const styleSchema = z.object({
  backgroundColor: z.string().optional(),
  textColor: z.string().optional(),
  padding: z.object({
    top: z.number().default(0),
    bottom: z.number().default(0),
    left: z.number().default(0),
    right: z.number().default(0),
  }).optional(),
  margin: z.object({
    top: z.number().default(0),
    bottom: z.number().default(0),
    left: z.number().default(0),
    right: z.number().default(0),
  }).optional(),
})

// Navbar Block
export const navbarPropsSchema = z.object({
  logo: z.object({
    text: z.string().default('SiteCraft'),
    image: z.string().optional(),
  }),
  links: z.array(z.object({
    id: z.string(),
    label: z.string(),
    href: z.string(),
    isExternal: z.boolean().default(false),
  })).default([]),
  showCTA: z.boolean().default(true),
  ctaText: z.string().default('Get Started'),
  ctaHref: z.string().default('#contact'),
  sticky: z.boolean().default(true),
})

// Hero Block
export const heroPropsSchema = z.object({
  headline: z.string().default('Build Beautiful Websites'),
  subheadline: z.string().default('Create stunning websites with our drag-and-drop builder'),
  backgroundImage: z.string().optional(),
  backgroundVideo: z.string().optional(),
  primaryCTA: z.object({
    text: z.string().default('Get Started'),
    href: z.string().default('#contact'),
  }),
  secondaryCTA: z.object({
    text: z.string().default('Learn More'),
    href: z.string().default('#features'),
  }).optional(),
  textAnimation: textAnimationSchema,
})

// Logos Block
export const logosPropsSchema = z.object({
  title: z.string().default('Trusted by leading companies'),
  logos: z.array(z.object({
    id: z.string(),
    name: z.string(),
    image: z.string(),
    url: z.string().optional(),
  })).default([]),
  showTitle: z.boolean().default(true),
  grayscale: z.boolean().default(true),
})

// Features Block
export const featuresPropsSchema = z.object({
  title: z.string().default('Features'),
  subtitle: z.string().default('Everything you need to build amazing websites'),
  features: z.array(z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    image: z.string().optional(),
  })).default([]),
  layout: z.enum(['grid', 'list']).default('grid'),
  columns: z.number().min(1).max(4).default(3),
  textAnimation: textAnimationSchema,
})

// Gallery Block
export const galleryPropsSchema = z.object({
  title: z.string().default('Gallery'),
  subtitle: z.string().optional(),
  images: z.array(z.object({
    id: z.string(),
    src: z.string(),
    alt: z.string(),
    caption: z.string().optional(),
  })).default([]),
  layout: z.enum(['grid', 'masonry', 'carousel']).default('grid'),
  columns: z.number().min(1).max(6).default(3),
  showCaptions: z.boolean().default(true),
})

// Testimonials Block
export const testimonialsPropsSchema = z.object({
  title: z.string().default('What our customers say'),
  subtitle: z.string().optional(),
  testimonials: z.array(z.object({
    id: z.string(),
    content: z.string(),
    author: z.string(),
    role: z.string(),
    company: z.string().optional(),
    avatar: z.string().optional(),
    rating: z.number().min(1).max(5).default(5),
  })).default([]),
  layout: z.enum(['grid', 'carousel', 'single']).default('grid'),
  showRatings: z.boolean().default(true),
  textAnimation: textAnimationSchema,
})

// FAQ Block
export const faqPropsSchema = z.object({
  title: z.string().default('Frequently Asked Questions'),
  subtitle: z.string().optional(),
  faqs: z.array(z.object({
    id: z.string(),
    question: z.string(),
    answer: z.string(),
  })).default([]),
  layout: z.enum(['accordion', 'grid']).default('accordion'),
  textAnimation: textAnimationSchema,
})

// Pricing Block
export const pricingPropsSchema = z.object({
  title: z.string().default('Choose your plan'),
  subtitle: z.string().optional(),
  plans: z.array(z.object({
    id: z.string(),
    name: z.string(),
    price: z.string(),
    period: z.string().default('month'),
    description: z.string(),
    features: z.array(z.string()),
    highlighted: z.boolean().default(false),
    ctaText: z.string().default('Get Started'),
    ctaHref: z.string().default('#contact'),
  })).default([]),
  showAnnualToggle: z.boolean().default(false),
  textAnimation: textAnimationSchema,
})

// Contact Block
export const contactPropsSchema = z.object({
  title: z.string().default('Get in touch'),
  subtitle: z.string().optional(),
  showForm: z.boolean().default(true),
  formFields: z.object({
    name: z.boolean().default(true),
    email: z.boolean().default(true),
    subject: z.boolean().default(false),
    message: z.boolean().default(true),
  }),
  contactInfo: z.object({
    email: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
  }).optional(),
  textAnimation: textAnimationSchema,
})

// Footer Block
export const footerPropsSchema = z.object({
  logo: z.object({
    text: z.string().default('SiteCraft'),
    image: z.string().optional(),
  }),
  description: z.string().default('Build beautiful websites with ease'),
  links: z.array(z.object({
    id: z.string(),
    title: z.string(),
    links: z.array(z.object({
      id: z.string(),
      label: z.string(),
      href: z.string(),
      isExternal: z.boolean().default(false),
    })),
  })).default([]),
  socialLinks: z.array(z.object({
    id: z.string(),
    platform: z.string(),
    url: z.string(),
    icon: z.string(),
  })).default([]),
  showNewsletter: z.boolean().default(false),
  copyright: z.string().default('© 2024 SiteCraft. All rights reserved.'),
  textAnimation: textAnimationSchema,
})

// Block variants
export const blockVariants = {
  navbar: ['default', 'transparent', 'centered'],
  hero: ['default', 'centered', 'split', 'video', 'minimal'],
  logos: ['default', 'carousel', 'grid'],
  features: ['default', 'cards', 'alternating', 'minimal'],
  gallery: ['default', 'masonry', 'carousel', 'lightbox'],
  testimonials: ['default', 'cards', 'carousel', 'wall'],
  faq: ['default', 'accordion', 'grid', 'minimal'],
  pricing: ['default', 'cards', 'table', 'minimal'],
  contact: ['default', 'split', 'centered', 'minimal'],
  footer: ['default', 'minimal', 'newsletter', 'social'],
} as const

// Discriminated union for all block types
export const blockSchema = z.discriminatedUnion('type', [
  z.object({
    id: z.string(),
    type: z.literal('navbar'),
    order: z.number(),
    variant: z.enum(blockVariants.navbar).default('default'),
    props: navbarPropsSchema,
    style: styleSchema,
  }),
  z.object({
    id: z.string(),
    type: z.literal('hero'),
    order: z.number(),
    variant: z.enum(blockVariants.hero).default('default'),
    props: heroPropsSchema,
    style: styleSchema,
  }),
  z.object({
    id: z.string(),
    type: z.literal('logos'),
    order: z.number(),
    variant: z.enum(blockVariants.logos).default('default'),
    props: logosPropsSchema,
    style: styleSchema,
  }),
  z.object({
    id: z.string(),
    type: z.literal('features'),
    order: z.number(),
    variant: z.enum(blockVariants.features).default('default'),
    props: featuresPropsSchema,
    style: styleSchema,
  }),
  z.object({
    id: z.string(),
    type: z.literal('gallery'),
    order: z.number(),
    variant: z.enum(blockVariants.gallery).default('default'),
    props: galleryPropsSchema,
    style: styleSchema,
  }),
  z.object({
    id: z.string(),
    type: z.literal('testimonials'),
    order: z.number(),
    variant: z.enum(blockVariants.testimonials).default('default'),
    props: testimonialsPropsSchema,
    style: styleSchema,
  }),
  z.object({
    id: z.string(),
    type: z.literal('faq'),
    order: z.number(),
    variant: z.enum(blockVariants.faq).default('default'),
    props: faqPropsSchema,
    style: styleSchema,
  }),
  z.object({
    id: z.string(),
    type: z.literal('pricing'),
    order: z.number(),
    variant: z.enum(blockVariants.pricing).default('default'),
    props: pricingPropsSchema,
    style: styleSchema,
  }),
  z.object({
    id: z.string(),
    type: z.literal('contact'),
    order: z.number(),
    variant: z.enum(blockVariants.contact).default('default'),
    props: contactPropsSchema,
    style: styleSchema,
  }),
  z.object({
    id: z.string(),
    type: z.literal('footer'),
    order: z.number(),
    variant: z.enum(blockVariants.footer).default('default'),
    props: footerPropsSchema,
    style: styleSchema,
  }),
])

export type TextAnimation = z.infer<typeof textAnimationSchema>
export type BlockStyle = z.infer<typeof styleSchema>
export type Block = z.infer<typeof blockSchema>
export type BlockType = Block['type']
export type BlockVariant<T extends BlockType> = Extract<Block, { type: T }>['variant']

// Props type helpers
export type NavbarProps = z.infer<typeof navbarPropsSchema>
export type HeroProps = z.infer<typeof heroPropsSchema>
export type LogosProps = z.infer<typeof logosPropsSchema>
export type FeaturesProps = z.infer<typeof featuresPropsSchema>
export type GalleryProps = z.infer<typeof galleryPropsSchema>
export type TestimonialsProps = z.infer<typeof testimonialsPropsSchema>
export type FAQProps = z.infer<typeof faqPropsSchema>
export type PricingProps = z.infer<typeof pricingPropsSchema>
export type ContactProps = z.infer<typeof contactPropsSchema>
export type FooterProps = z.infer<typeof footerPropsSchema>
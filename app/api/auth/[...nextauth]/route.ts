import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

const handler = NextAuth({
  ...authOptions,
  callbacks: {
    ...authOptions.callbacks,
    async signIn({ user, account, profile, isNewUser }) {
      // Call the original signIn callback first
      const originalResult = await authOptions.callbacks?.signIn?.({ user, account, profile })
      
      if (originalResult && isNewUser && user.id) {
        // Create a demo project for new users
        try {
          const { prisma } = await import('@/lib/prisma')
          const { themePresets } = await import('@/lib/types/theme')
          
          // Create demo project
          const project = await prisma.project.create({
            data: {
              name: 'My First Website',
              slug: `demo-${user.id}-${Date.now()}`,
              userId: user.id,
              isPublished: false,
            },
          })

          // Create theme
          await prisma.theme.create({
            data: {
              projectId: project.id,
              tokens: themePresets.modern,
            },
          })

          // Create home page
          const homePage = await prisma.page.create({
            data: {
              projectId: project.id,
              name: 'Home',
              path: '/',
              metaTitle: 'Welcome to My Website',
              metaDescription: 'My beautiful website built with SiteCraft',
              isVisible: true,
            },
          })

          // Create welcome blocks
          const welcomeBlocks = [
            {
              id: `navbar-${Date.now()}`,
              type: 'navbar',
              order: 0,
              variant: 'default',
              props: {
                logo: { text: 'My Website' },
                links: [
                  { id: 'nav-1', label: 'Home', href: '#', isExternal: false },
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
              id: `hero-${Date.now()}`,
              type: 'hero',
              order: 1,
              variant: 'centered',
              props: {
                headline: 'Welcome to Your New Website!',
                subheadline: 'This is your demo website created with SiteCraft. You can edit this content, add new blocks, change themes, and make it truly yours.',
                primaryCTA: { text: 'Edit This Page', href: '#' },
                secondaryCTA: { text: 'Learn More', href: '#about' },
                textAnimation: { type: 'fadeUp', durationMs: 800, delayMs: 200, once: true },
              },
              style: {},
            },
            {
              id: `features-${Date.now()}`,
              type: 'features',
              order: 2,
              variant: 'cards',
              props: {
                title: 'Getting Started',
                subtitle: 'Here are some things you can do with your new website',
                features: [
                  {
                    id: 'feature-1',
                    title: 'Customize Content',
                    description: 'Click on any text or element to edit it. Change colors, fonts, and layouts to match your style.',
                    icon: 'palette',
                  },
                  {
                    id: 'feature-2',
                    title: 'Add New Blocks',
                    description: 'Use the sidebar to add new sections like testimonials, pricing, galleries, and more.',
                    icon: 'zap',
                  },
                  {
                    id: 'feature-3',
                    title: 'Choose Themes',
                    description: 'Switch between 12 beautiful themes including Neon, Ocean, Forest, and more.',
                    icon: 'star',
                  },
                ],
                layout: 'grid',
                columns: 3,
                textAnimation: { type: 'fadeUp', durationMs: 600, delayMs: 100, once: true },
              },
              style: {},
            },
            {
              id: `contact-${Date.now()}`,
              type: 'contact',
              order: 3,
              variant: 'centered',
              props: {
                title: 'Ready to Get Started?',
                subtitle: 'Start editing your website by clicking the "Edit" button in the top navigation.',
                showForm: true,
                formFields: { name: true, email: true, message: true },
                textAnimation: { type: 'fadeUp', durationMs: 600, delayMs: 0, once: true },
              },
              style: {},
            },
            {
              id: `footer-${Date.now()}`,
              type: 'footer',
              order: 4,
              variant: 'minimal',
              props: {
                logo: { text: 'My Website' },
                description: 'Built with SiteCraft - The easiest way to create beautiful websites.',
                copyright: '© 2024 My Website. All rights reserved.',
                textAnimation: { type: 'fadeUp', durationMs: 500, delayMs: 0, once: true },
              },
              style: {},
            },
          ]

          // Create blocks
          for (const blockData of welcomeBlocks) {
            await prisma.block.create({
              data: {
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

          console.log(`✅ Created demo project for new user: ${user.email}`)
        } catch (error) {
          console.error('❌ Failed to create demo project:', error)
          // Don't fail the sign-in process if demo creation fails
        }
      }
      
      return originalResult
    },
  },
})

export { handler as GET, handler as POST }
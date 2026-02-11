import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { PublishedSiteRenderer } from '@/components/renderer/published-site-renderer'
import type { Metadata } from 'next'

interface PublishedPageProps {
  params: {
    slug: string
    path: string[]
  }
}

export async function generateMetadata({ params }: PublishedPageProps): Promise<Metadata> {
  const pagePath = '/' + params.path.join('/')
  
  const project = await prisma.project.findFirst({
    where: {
      slug: params.slug,
      isPublished: true,
    },
    include: {
      pages: {
        where: {
          path: pagePath,
          isVisible: true,
        },
        take: 1,
      },
    },
  })

  if (!project || !project.pages[0]) {
    return {
      title: 'Page Not Found',
    }
  }

  const page = project.pages[0]

  return {
    title: page.metaTitle || page.name,
    description: page.metaDescription || `${page.name} - ${project.name}`,
    openGraph: {
      title: page.metaTitle || page.name,
      description: page.metaDescription || `${page.name} - ${project.name}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.metaTitle || page.name,
      description: page.metaDescription || `${page.name} - ${project.name}`,
    },
  }
}

export default async function PublishedPagePage({ params }: PublishedPageProps) {
  const pagePath = '/' + params.path.join('/')
  
  const project = await prisma.project.findFirst({
    where: {
      slug: params.slug,
      isPublished: true,
    },
    include: {
      pages: {
        where: {
          path: pagePath,
          isVisible: true,
        },
        include: {
          blocks: {
            orderBy: {
              order: 'asc',
            },
          },
        },
        take: 1,
      },
      theme: true,
    },
  })

  if (!project || !project.pages[0]) {
    notFound()
  }

  return (
    <PublishedSiteRenderer
      project={project}
      page={project.pages[0]}
      theme={project.theme?.tokens}
    />
  )
}
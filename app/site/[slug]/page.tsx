import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { PublishedSiteRenderer } from '@/components/renderer/published-site-renderer'
import type { Metadata } from 'next'

interface PublishedSitePageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PublishedSitePageProps): Promise<Metadata> {
  const project = await prisma.project.findFirst({
    where: {
      slug: params.slug,
      isPublished: true,
    },
    include: {
      pages: {
        where: {
          path: '/',
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

  const homePage = project.pages[0]

  return {
    title: homePage.metaTitle || project.name,
    description: homePage.metaDescription || `Welcome to ${project.name}`,
    openGraph: {
      title: homePage.metaTitle || project.name,
      description: homePage.metaDescription || `Welcome to ${project.name}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: homePage.metaTitle || project.name,
      description: homePage.metaDescription || `Welcome to ${project.name}`,
    },
  }
}

export default async function PublishedSitePage({ params }: PublishedSitePageProps) {
  const project = await prisma.project.findFirst({
    where: {
      slug: params.slug,
      isPublished: true,
    },
    include: {
      pages: {
        where: {
          path: '/',
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
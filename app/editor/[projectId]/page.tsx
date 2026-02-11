import { getServerSession } from 'next-auth'
import { redirect, notFound } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { EditorProvider } from '@/components/editor/editor-provider'
import { EditorLayout } from '@/components/editor/editor-layout'

interface EditorPageProps {
  params: {
    projectId: string
  }
}

export default async function EditorPage({ params }: EditorPageProps) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect('/auth/signin')
  }

  // Fetch project with all related data
  const project = await prisma.project.findFirst({
    where: {
      id: params.projectId,
      userId: session.user.id,
    },
    include: {
      pages: {
        include: {
          blocks: {
            orderBy: {
              order: 'asc',
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
      theme: true,
      assets: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })

  if (!project) {
    notFound()
  }

  return (
    <EditorProvider project={project}>
      <EditorLayout />
    </EditorProvider>
  )
}
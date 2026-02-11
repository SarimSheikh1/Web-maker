import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Verify project ownership
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
        },
        theme: true,
      },
    })

    if (!project) {
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 }
      )
    }

    // Create snapshot
    const latestSnapshot = await prisma.publishSnapshot.findFirst({
      where: { projectId: params.projectId },
      orderBy: { versionNumber: 'desc' },
    })

    const versionNumber = (latestSnapshot?.versionNumber || 0) + 1

    await prisma.publishSnapshot.create({
      data: {
        projectId: params.projectId,
        versionNumber,
        snapshotJSON: {
          project: {
            id: project.id,
            name: project.name,
            slug: project.slug,
          },
          pages: project.pages,
          theme: project.theme?.tokens || {},
        },
      },
    })

    // Update project as published
    const updatedProject = await prisma.project.update({
      where: { id: params.projectId },
      data: {
        isPublished: true,
        publishedAt: new Date(),
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({
      message: 'Project published successfully',
      project: updatedProject,
      versionNumber,
    })
  } catch (error) {
    console.error('Publish project error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
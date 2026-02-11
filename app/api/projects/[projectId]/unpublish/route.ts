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
    })

    if (!project) {
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 }
      )
    }

    // Update project as unpublished
    const updatedProject = await prisma.project.update({
      where: { id: params.projectId },
      data: {
        isPublished: false,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({
      message: 'Project unpublished successfully',
      project: updatedProject,
    })
  } catch (error) {
    console.error('Unpublish project error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
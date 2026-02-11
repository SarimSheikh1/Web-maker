import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
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
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error('Get project error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(
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

    const body = await request.json()
    const { pages, theme, ...projectUpdates } = body

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

    // Update project
    const updatedProject = await prisma.project.update({
      where: { id: params.projectId },
      data: {
        ...projectUpdates,
        updatedAt: new Date(),
      },
    })

    // Update theme if provided
    if (theme) {
      await prisma.theme.upsert({
        where: { projectId: params.projectId },
        update: { tokens: theme },
        create: {
          projectId: params.projectId,
          tokens: theme,
        },
      })
    }

    // Update pages and blocks if provided
    if (pages) {
      for (const pageData of pages) {
        await prisma.page.update({
          where: { id: pageData.id },
          data: {
            name: pageData.name,
            path: pageData.path,
            metaTitle: pageData.metaTitle,
            metaDescription: pageData.metaDescription,
            isVisible: pageData.isVisible,
            updatedAt: new Date(),
          },
        })

        // Update blocks
        for (const blockData of pageData.blocks) {
          await prisma.block.upsert({
            where: { id: blockData.id },
            update: {
              type: blockData.type,
              order: blockData.order,
              variant: blockData.variant,
              props: blockData.props,
              style: blockData.style,
              updatedAt: new Date(),
            },
            create: {
              id: blockData.id,
              pageId: pageData.id,
              type: blockData.type,
              order: blockData.order,
              variant: blockData.variant,
              props: blockData.props,
              style: blockData.style,
            },
          })
        }
      }
    }

    return NextResponse.json(updatedProject)
  } catch (error) {
    console.error('Update project error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
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

    // Delete project (cascade will handle related records)
    await prisma.project.delete({
      where: { id: params.projectId },
    })

    return NextResponse.json({ message: 'Project deleted successfully' })
  } catch (error) {
    console.error('Delete project error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
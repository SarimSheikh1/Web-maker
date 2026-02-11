import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createProjectSchema } from '@/lib/types'
import { generateId } from '@/lib/utils'
import { getTemplateData } from '@/lib/templates'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const projects = await prisma.project.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error('Get projects error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, slug, templateId } = createProjectSchema.parse(body)

    // Check if slug is already taken
    const existingProject = await prisma.project.findUnique({
      where: { slug }
    })

    if (existingProject) {
      return NextResponse.json(
        { message: 'Slug already exists' },
        { status: 400 }
      )
    }

    // Create project
    const project = await prisma.project.create({
      data: {
        name,
        slug,
        userId: session.user.id,
      },
    })

    // Create default theme
    const theme = await prisma.theme.create({
      data: {
        projectId: project.id,
        tokens: {},
      },
    })

    // If template is selected, create pages and blocks from template
    if (templateId) {
      const templateData = getTemplateData(templateId)
      
      if (templateData) {
        // Update theme with template tokens
        await prisma.theme.update({
          where: { id: theme.id },
          data: { tokens: templateData.theme },
        })

        // Create pages from template
        for (const pageData of templateData.pages) {
          const page = await prisma.page.create({
            data: {
              projectId: project.id,
              name: pageData.name,
              path: pageData.path,
              metaTitle: pageData.metaTitle,
              metaDescription: pageData.metaDescription,
              isVisible: pageData.isVisible,
            },
          })

          // Create blocks for this page
          for (const blockData of pageData.blocks) {
            await prisma.block.create({
              data: {
                id: generateId(),
                pageId: page.id,
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
    } else {
      // Create default home page for blank project
      await prisma.page.create({
        data: {
          projectId: project.id,
          name: 'Home',
          path: '/',
          metaTitle: name,
          metaDescription: `Welcome to ${name}`,
          isVisible: true,
        },
      })
    }

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Create project error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
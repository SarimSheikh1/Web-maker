import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { ProjectGrid } from '@/components/dashboard/project-grid'
import { EmptyState } from '@/components/dashboard/empty-state'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, Zap, Palette } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect('/auth/signin')
  }

  const projects = await prisma.project.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  // Check if user is new (has only demo projects or no projects)
  const isNewUser = projects.length <= 1 && projects.some(p => p.name === 'My First Website')
  const demoProject = projects.find(p => p.name === 'My First Website')

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        {isNewUser && (
          <Card className="mb-8 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-blue-600" />
                <CardTitle className="text-blue-900">Welcome to SiteCraft! 🎉</CardTitle>
              </div>
              <CardDescription className="text-blue-700">
                We've created your first demo website to get you started. You can edit it, customize it, or create a new one from scratch.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900">18+ Animations</h4>
                    <p className="text-sm text-blue-700">Add life to your content</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Palette className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900">12 Themes</h4>
                    <p className="text-sm text-blue-700">Beautiful design options</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900">No Code</h4>
                    <p className="text-sm text-blue-700">Visual drag & drop</p>
                  </div>
                </div>
              </div>
              {demoProject && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <Link href={`/editor/${demoProject.id}`}>
                      <Zap className="w-4 h-4 mr-2" />
                      Edit Your Demo Website
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={`/site/${demoProject.slug}`} target="_blank">
                      View Demo Site
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Projects
          </h1>
          <p className="text-gray-600">
            Create and manage your website projects
          </p>
        </div>

        {projects.length > 0 ? (
          <ProjectGrid projects={projects} />
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  )
}
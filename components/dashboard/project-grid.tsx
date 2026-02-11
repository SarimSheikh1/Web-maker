'use client'

import { useState } from 'react'
import Link from 'next/link'
import { formatDateTime } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  MoreHorizontal, 
  Edit, 
  Eye, 
  Globe, 
  Download, 
  Trash2,
  Copy,
  Settings 
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Project {
  id: string
  name: string
  slug: string
  isPublished: boolean
  publishedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

interface ProjectGridProps {
  projects: Project[]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const { toast } = useToast()

  const handleDelete = async (projectId: string) => {
    setIsDeleting(projectId)
    
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Project deleted successfully',
        })
        // Refresh the page to update the project list
        window.location.reload()
      } else {
        toast({
          title: 'Error',
          description: 'Failed to delete project',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    } finally {
      setIsDeleting(null)
    }
  }

  const handleDuplicate = async (projectId: string) => {
    try {
      const response = await fetch(`/api/projects/${projectId}/duplicate`, {
        method: 'POST',
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Project duplicated successfully',
        })
        window.location.reload()
      } else {
        toast({
          title: 'Error',
          description: 'Failed to duplicate project',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  const copyPublicUrl = (slug: string) => {
    const url = `${window.location.origin}/site/${slug}`
    navigator.clipboard.writeText(url)
    toast({
      title: 'Copied',
      description: 'Public URL copied to clipboard',
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card key={project.id} className="group hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <CardDescription className="text-sm">
                  sitecraft.com/site/{project.slug}
                </CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/editor/${project.id}`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  {project.isPublished && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href={`/site/${project.slug}`} target="_blank">
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => copyPublicUrl(project.slug)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy URL
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/projects/${project.id}/settings`}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDuplicate(project.id)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => handleDelete(project.id)}
                    className="text-destructive"
                    disabled={isDeleting === project.id}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    {isDeleting === project.id ? 'Deleting...' : 'Delete'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="flex items-center gap-2 pt-2">
              {project.isPublished ? (
                <Badge variant="default" className="text-xs">
                  <Globe className="mr-1 h-3 w-3" />
                  Published
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-xs">
                  Draft
                </Badge>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">
                <div>Created {formatDateTime(new Date(project.createdAt))}</div>
                <div>Updated {formatDateTime(new Date(project.updatedAt))}</div>
                {project.publishedAt && (
                  <div>Published {formatDateTime(new Date(project.publishedAt))}</div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button asChild size="sm" className="flex-1">
                  <Link href={`/editor/${project.id}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </Button>
                {project.isPublished && (
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/site/${project.slug}`} target="_blank">
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
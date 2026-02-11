'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEditor } from './editor-provider'
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { 
  ArrowLeft, 
  Globe, 
  Eye, 
  Settings, 
  Download, 
  MoreHorizontal,
  Loader2,
  PanelLeft,
  PanelRight,
  Save,
  Undo,
  Redo
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function EditorHeader() {
  const { state, dispatch, saveProject, publishProject, unpublishProject } = useEditor()
  const [showPublishDialog, setShowPublishDialog] = useState(false)
  const [showUnpublishDialog, setShowUnpublishDialog] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleExport = async () => {
    setIsExporting(true)
    try {
      const response = await fetch(`/api/projects/${state.project.id}/export`, {
        method: 'POST',
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${state.project.slug}.zip`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)

        toast({
          title: 'Success',
          description: 'Project exported successfully',
        })
      } else {
        throw new Error('Export failed')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to export project',
        variant: 'destructive',
      })
    } finally {
      setIsExporting(false)
    }
  }

  const handlePublish = async () => {
    await publishProject()
    setShowPublishDialog(false)
  }

  const handleUnpublish = async () => {
    await unpublishProject()
    setShowUnpublishDialog(false)
  }

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/dashboard')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <div className="flex items-center space-x-3">
              <h1 className="text-lg font-semibold text-gray-900">
                {state.project.name}
              </h1>
              
              {state.project.isPublished ? (
                <Badge variant="default" className="text-xs">
                  <Globe className="w-3 h-3 mr-1" />
                  Published
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-xs">
                  Draft
                </Badge>
              )}

              {state.isSaving && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                  Saving...
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Editor Controls */}
            <div className="flex items-center space-x-1 mr-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
                className={state.sidebarOpen ? 'bg-gray-100' : ''}
              >
                <PanelLeft className="w-4 h-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dispatch({ type: 'TOGGLE_RIGHT_PANEL' })}
                className={state.rightPanelOpen ? 'bg-gray-100' : ''}
              >
                <PanelRight className="w-4 h-4" />
              </Button>

              <Button variant="ghost" size="sm" onClick={saveProject}>
                <Save className="w-4 h-4" />
              </Button>

              <Button variant="ghost" size="sm" disabled>
                <Undo className="w-4 h-4" />
              </Button>

              <Button variant="ghost" size="sm" disabled>
                <Redo className="w-4 h-4" />
              </Button>
            </div>

            {/* Preview Button */}
            {state.project.isPublished && (
              <Button variant="outline" size="sm" asChild>
                <Link href={`/site/${state.project.slug}`} target="_blank">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Link>
              </Button>
            )}

            {/* Publish/Unpublish Button */}
            {state.project.isPublished ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowUnpublishDialog(true)}
              >
                Unpublish
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => setShowPublishDialog(true)}
              >
                <Globe className="w-4 h-4 mr-2" />
                Publish
              </Button>
            )}

            {/* More Options */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/projects/${state.project.id}/settings`}>
                    <Settings className="mr-2 h-4 w-4" />
                    Project Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleExport}
                  disabled={isExporting}
                >
                  <Download className="mr-2 h-4 w-4" />
                  {isExporting ? 'Exporting...' : 'Export Site'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Publish Dialog */}
      <Dialog open={showPublishDialog} onOpenChange={setShowPublishDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish Project</DialogTitle>
            <DialogDescription>
              Your site will be available at{' '}
              <code className="bg-muted px-1 py-0.5 rounded text-sm">
                sitecraft.com/site/{state.project.slug}
              </code>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPublishDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handlePublish}>
              <Globe className="w-4 h-4 mr-2" />
              Publish Site
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Unpublish Dialog */}
      <Dialog open={showUnpublishDialog} onOpenChange={setShowUnpublishDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unpublish Project</DialogTitle>
            <DialogDescription>
              Your site will no longer be accessible to visitors. You can republish it at any time.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUnpublishDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleUnpublish}>
              Unpublish Site
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
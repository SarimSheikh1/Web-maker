'use client'

import { useState } from 'react'
import { useEditor } from './editor-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Plus,
  Layout,
  Type,
  Image,
  Star,
  MessageSquare,
  DollarSign,
  Mail,
  Users,
  Grid,
  Navigation,
  Eye,
  EyeOff,
  Settings,
  Trash2
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const blockTypes = [
  { type: 'navbar', icon: Navigation, label: 'Navigation', description: 'Site navigation menu' },
  { type: 'hero', icon: Layout, label: 'Hero', description: 'Hero section with headline' },
  { type: 'features', icon: Grid, label: 'Features', description: 'Feature grid or list' },
  { type: 'gallery', icon: Image, label: 'Gallery', description: 'Image gallery' },
  { type: 'testimonials', icon: MessageSquare, label: 'Testimonials', description: 'Customer testimonials' },
  { type: 'pricing', icon: DollarSign, label: 'Pricing', description: 'Pricing tables' },
  { type: 'faq', icon: MessageSquare, label: 'FAQ', description: 'Frequently asked questions' },
  { type: 'contact', icon: Mail, label: 'Contact', description: 'Contact form' },
  { type: 'logos', icon: Star, label: 'Logos', description: 'Company logos' },
  { type: 'footer', icon: Layout, label: 'Footer', description: 'Site footer' },
]

export function EditorSidebar() {
  const { state, dispatch, addBlock, currentPage, updatePage } = useEditor()
  const [showPageDialog, setShowPageDialog] = useState(false)
  const [newPageName, setNewPageName] = useState('')
  const [newPagePath, setNewPagePath] = useState('')
  const { toast } = useToast()

  const handleAddBlock = (type: string) => {
    addBlock(type)
    toast({
      title: 'Block added',
      description: `${type} block added to the page`,
    })
  }

  const handlePageSelect = (pageId: string) => {
    dispatch({ type: 'SET_CURRENT_PAGE', pageId })
  }

  const handleCreatePage = async () => {
    if (!newPageName.trim() || !newPagePath.trim()) return

    try {
      const response = await fetch(`/api/projects/${state.project.id}/pages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newPageName,
          path: newPagePath,
        }),
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Page created successfully',
        })
        setShowPageDialog(false)
        setNewPageName('')
        setNewPagePath('')
        // Refresh the page to update the pages list
        window.location.reload()
      } else {
        toast({
          title: 'Error',
          description: 'Failed to create page',
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

  const handleTogglePageVisibility = async (pageId: string, isVisible: boolean) => {
    try {
      const response = await fetch(`/api/projects/${state.project.id}/pages/${pageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isVisible: !isVisible }),
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: `Page ${!isVisible ? 'shown' : 'hidden'}`,
        })
        window.location.reload()
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update page',
        variant: 'destructive',
      })
    }
  }

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Editor</h2>
        </div>

        <Tabs defaultValue="blocks" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-2 mx-4 mt-4">
            <TabsTrigger value="blocks">Blocks</TabsTrigger>
            <TabsTrigger value="pages">Pages</TabsTrigger>
          </TabsList>

          <TabsContent value="blocks" className="flex-1 mt-4">
            <ScrollArea className="h-full px-4">
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700 mb-3">
                  Add Blocks
                </div>
                {blockTypes.map((block) => {
                  const Icon = block.icon
                  return (
                    <Button
                      key={block.type}
                      variant="ghost"
                      className="w-full justify-start h-auto p-3 text-left"
                      onClick={() => handleAddBlock(block.type)}
                    >
                      <Icon className="w-5 h-5 mr-3 text-gray-500" />
                      <div>
                        <div className="font-medium text-sm">{block.label}</div>
                        <div className="text-xs text-gray-500">{block.description}</div>
                      </div>
                    </Button>
                  )
                })}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="pages" className="flex-1 mt-4">
            <div className="px-4">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-gray-700">
                  Pages ({state.project.pages.length})
                </div>
                <Button
                  size="sm"
                  onClick={() => setShowPageDialog(true)}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>

              <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="space-y-2">
                  {state.project.pages.map((page) => (
                    <div
                      key={page.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        page.id === state.currentPageId
                          ? 'bg-blue-50 border-blue-200'
                          : 'bg-white border-gray-200 hover:bg-gray-50'
                      }`}
                      onClick={() => handlePageSelect(page.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm text-gray-900 truncate">
                            {page.name}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {page.path}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {page.blocks.length} blocks
                            </Badge>
                            {!page.isVisible && (
                              <Badge variant="outline" className="text-xs">
                                Hidden
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleTogglePageVisibility(page.id, page.isVisible)
                          }}
                        >
                          {page.isVisible ? (
                            <Eye className="w-3 h-3" />
                          ) : (
                            <EyeOff className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Page Dialog */}
      <Dialog open={showPageDialog} onOpenChange={setShowPageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Page</DialogTitle>
            <DialogDescription>
              Add a new page to your website.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="page-name">Page Name</Label>
              <Input
                id="page-name"
                placeholder="About Us"
                value={newPageName}
                onChange={(e) => {
                  setNewPageName(e.target.value)
                  if (!newPagePath) {
                    setNewPagePath('/' + e.target.value.toLowerCase().replace(/\s+/g, '-'))
                  }
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="page-path">Page Path</Label>
              <Input
                id="page-path"
                placeholder="/about"
                value={newPagePath}
                onChange={(e) => setNewPagePath(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPageDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreatePage}>
              Create Page
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
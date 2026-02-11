'use client'

import { useEditor } from './editor-provider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'

interface PagePropertiesPanelProps {
  page: {
    id: string
    name: string
    path: string
    metaTitle?: string
    metaDescription?: string
    isVisible: boolean
    blocks: any[]
  }
}

export function PagePropertiesPanel({ page }: PagePropertiesPanelProps) {
  const { updatePage } = useEditor()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Page Settings</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="page-name">Page Name</Label>
            <Input
              id="page-name"
              value={page.name}
              onChange={(e) => updatePage({ name: e.target.value })}
              placeholder="Page Name"
            />
          </div>

          <div>
            <Label htmlFor="page-path">Page Path</Label>
            <Input
              id="page-path"
              value={page.path}
              onChange={(e) => updatePage({ path: e.target.value })}
              placeholder="/page-path"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="page-visible"
              checked={page.isVisible}
              onCheckedChange={(checked) => updatePage({ isVisible: checked })}
            />
            <Label htmlFor="page-visible">Page Visible</Label>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">SEO Settings</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="meta-title">Meta Title</Label>
            <Input
              id="meta-title"
              value={page.metaTitle || ''}
              onChange={(e) => updatePage({ metaTitle: e.target.value })}
              placeholder="Page Title for SEO"
            />
            <p className="text-xs text-gray-500 mt-1">
              Recommended: 50-60 characters
            </p>
          </div>

          <div>
            <Label htmlFor="meta-description">Meta Description</Label>
            <Textarea
              id="meta-description"
              value={page.metaDescription || ''}
              onChange={(e) => updatePage({ metaDescription: e.target.value })}
              placeholder="Brief description of this page for search engines"
              rows={3}
            />
            <p className="text-xs text-gray-500 mt-1">
              Recommended: 150-160 characters
            </p>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Page Statistics</h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Blocks:</span>
            <span className="font-medium">{page.blocks.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <span className={`font-medium ${page.isVisible ? 'text-green-600' : 'text-gray-500'}`}>
              {page.isVisible ? 'Visible' : 'Hidden'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
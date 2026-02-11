'use client'

import { useEditor } from './editor-provider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { BlockPropertiesPanel } from './block-properties-panel'
import { ThemePanel } from './theme-panel'
import { PagePropertiesPanel } from './page-properties-panel'
import { Settings, Palette, FileText } from 'lucide-react'

export function EditorRightPanel() {
  const { selectedBlock, currentPage } = useEditor()

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Properties</h2>
      </div>

      <Tabs defaultValue="block" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3 mx-4 mt-4">
          <TabsTrigger value="block" className="text-xs">
            <Settings className="w-4 h-4 mr-1" />
            Block
          </TabsTrigger>
          <TabsTrigger value="page" className="text-xs">
            <FileText className="w-4 h-4 mr-1" />
            Page
          </TabsTrigger>
          <TabsTrigger value="theme" className="text-xs">
            <Palette className="w-4 h-4 mr-1" />
            Theme
          </TabsTrigger>
        </TabsList>

        <TabsContent value="block" className="flex-1 mt-4">
          <ScrollArea className="h-full px-4">
            {selectedBlock ? (
              <BlockPropertiesPanel block={selectedBlock} />
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Settings className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Select a block to edit its properties</p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="page" className="flex-1 mt-4">
          <ScrollArea className="h-full px-4">
            {currentPage ? (
              <PagePropertiesPanel page={currentPage} />
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No page selected</p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="theme" className="flex-1 mt-4">
          <ScrollArea className="h-full px-4">
            <ThemePanel />
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
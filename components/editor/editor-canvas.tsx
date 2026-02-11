'use client'

import { useEditor } from './editor-provider'
import { BlockRenderer } from './block-renderer'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Plus, Smartphone, Tablet, Monitor } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type ViewportSize = 'mobile' | 'tablet' | 'desktop'

export function EditorCanvas() {
  const { state, dispatch, currentPage, reorderBlocks, addBlock } = useEditor()
  const [viewportSize, setViewportSize] = useState<ViewportSize>('desktop')
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = () => {
    dispatch({ type: 'SET_DRAGGING', isDragging: true })
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    dispatch({ type: 'SET_DRAGGING', isDragging: false })

    if (active.id !== over?.id && currentPage) {
      const oldIndex = currentPage.blocks.findIndex(block => block.id === active.id)
      const newIndex = currentPage.blocks.findIndex(block => block.id === over.id)
      
      const newOrder = arrayMove(currentPage.blocks, oldIndex, newIndex)
      reorderBlocks(newOrder.map(block => block.id))
    }
  }

  const getViewportClasses = () => {
    switch (viewportSize) {
      case 'mobile':
        return 'max-w-sm mx-auto'
      case 'tablet':
        return 'max-w-2xl mx-auto'
      case 'desktop':
        return 'max-w-full'
      default:
        return 'max-w-full'
    }
  }

  if (!currentPage) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No page selected</h3>
          <p className="text-gray-600">Select a page from the sidebar to start editing.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-100">
      {/* Viewport Controls */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Viewport:</span>
            <div className="flex items-center space-x-1">
              <Button
                variant={viewportSize === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewportSize('mobile')}
              >
                <Smartphone className="w-4 h-4" />
              </Button>
              <Button
                variant={viewportSize === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewportSize('tablet')}
              >
                <Tablet className="w-4 h-4" />
              </Button>
              <Button
                variant={viewportSize === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewportSize('desktop')}
              >
                <Monitor className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            {currentPage.name} • {currentPage.blocks.length} blocks
          </div>
        </div>
      </div>

      {/* Canvas */}
      <ScrollArea className="flex-1">
        <div className="p-8">
          <div className={cn('bg-white shadow-lg rounded-lg overflow-hidden', getViewportClasses())}>
            {currentPage.blocks.length === 0 ? (
              <div className="py-24 text-center">
                <div className="text-gray-400 mb-4">
                  <Plus className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No blocks yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Add blocks from the sidebar to start building your page.
                </p>
                <Button onClick={() => addBlock('hero')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Hero Block
                </Button>
              </div>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}
              >
                <SortableContext
                  items={currentPage.blocks.map(block => block.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {currentPage.blocks.map((block) => (
                    <BlockRenderer
                      key={block.id}
                      block={block}
                      isSelected={state.selectedBlockId === block.id}
                      isDragging={state.isDragging}
                      onClick={() => dispatch({ type: 'SELECT_BLOCK', blockId: block.id })}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
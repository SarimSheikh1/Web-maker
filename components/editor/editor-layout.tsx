'use client'

import { useEditor } from './editor-provider'
import { EditorHeader } from './editor-header'
import { EditorSidebar } from './editor-sidebar'
import { EditorCanvas } from './editor-canvas'
import { EditorRightPanel } from './editor-right-panel'
import { cn } from '@/lib/utils'

export function EditorLayout() {
  const { state } = useEditor()

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <EditorHeader />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div
          className={cn(
            'bg-white border-r border-gray-200 transition-all duration-300 ease-in-out',
            state.sidebarOpen ? 'w-80' : 'w-0'
          )}
        >
          {state.sidebarOpen && <EditorSidebar />}
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <EditorCanvas />
        </div>

        {/* Right Panel */}
        <div
          className={cn(
            'bg-white border-l border-gray-200 transition-all duration-300 ease-in-out',
            state.rightPanelOpen ? 'w-80' : 'w-0'
          )}
        >
          {state.rightPanelOpen && <EditorRightPanel />}
        </div>
      </div>
    </div>
  )
}
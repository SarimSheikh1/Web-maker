'use client'

import { createContext, useContext, useReducer, useCallback, useEffect } from 'react'
import { Block, ThemeTokens } from '@/lib/types'
import { themePresets } from '@/lib/types/theme'
import { useToast } from '@/hooks/use-toast'
import { debounce } from '@/lib/utils'

interface Project {
  id: string
  name: string
  slug: string
  isPublished: boolean
  publishedAt: Date | null
  pages: Array<{
    id: string
    name: string
    path: string
    metaTitle?: string
    metaDescription?: string
    isVisible: boolean
    blocks: Block[]
  }>
  theme?: {
    id: string
    tokens: any
  }
  assets: Array<{
    id: string
    url: string
    filename: string
    mimeType: string
    size: number
    width?: number
    height?: number
  }>
}

interface EditorState {
  project: Project
  currentPageId: string | null
  selectedBlockId: string | null
  isDragging: boolean
  isSaving: boolean
  history: any[]
  historyIndex: number
  sidebarOpen: boolean
  rightPanelOpen: boolean
}

type EditorAction =
  | { type: 'SET_CURRENT_PAGE'; pageId: string }
  | { type: 'SELECT_BLOCK'; blockId: string | null }
  | { type: 'ADD_BLOCK'; pageId: string; block: Block }
  | { type: 'UPDATE_BLOCK'; blockId: string; updates: Partial<Block> }
  | { type: 'DELETE_BLOCK'; blockId: string }
  | { type: 'REORDER_BLOCKS'; pageId: string; blockIds: string[] }
  | { type: 'UPDATE_PAGE'; pageId: string; updates: any }
  | { type: 'UPDATE_THEME'; tokens: ThemeTokens }
  | { type: 'SET_DRAGGING'; isDragging: boolean }
  | { type: 'SET_SAVING'; isSaving: boolean }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'TOGGLE_RIGHT_PANEL' }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'SAVE_STATE' }

interface EditorContextType {
  state: EditorState
  dispatch: React.Dispatch<EditorAction>
  currentPage: Project['pages'][0] | null
  selectedBlock: Block | null
  addBlock: (type: string, variant?: string) => void
  updateBlock: (blockId: string, updates: Partial<Block>) => void
  deleteBlock: (blockId: string) => void
  reorderBlocks: (blockIds: string[]) => void
  updatePage: (updates: any) => void
  updateTheme: (tokens: ThemeTokens) => void
  saveProject: () => Promise<void>
  publishProject: () => Promise<void>
  unpublishProject: () => Promise<void>
}

const EditorContext = createContext<EditorContextType | null>(null)

function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPageId: action.pageId,
        selectedBlockId: null,
      }

    case 'SELECT_BLOCK':
      return {
        ...state,
        selectedBlockId: action.blockId,
      }

    case 'ADD_BLOCK': {
      const page = state.project.pages.find(p => p.id === action.pageId)
      if (!page) return state

      const updatedPages = state.project.pages.map(p =>
        p.id === action.pageId
          ? { ...p, blocks: [...p.blocks, action.block] }
          : p
      )

      return {
        ...state,
        project: { ...state.project, pages: updatedPages },
        selectedBlockId: action.block.id,
      }
    }

    case 'UPDATE_BLOCK': {
      const updatedPages = state.project.pages.map(page => ({
        ...page,
        blocks: page.blocks.map(block =>
          block.id === action.blockId
            ? { ...block, ...action.updates }
            : block
        ),
      }))

      return {
        ...state,
        project: { ...state.project, pages: updatedPages },
      }
    }

    case 'DELETE_BLOCK': {
      const updatedPages = state.project.pages.map(page => ({
        ...page,
        blocks: page.blocks.filter(block => block.id !== action.blockId),
      }))

      return {
        ...state,
        project: { ...state.project, pages: updatedPages },
        selectedBlockId: state.selectedBlockId === action.blockId ? null : state.selectedBlockId,
      }
    }

    case 'REORDER_BLOCKS': {
      const page = state.project.pages.find(p => p.id === action.pageId)
      if (!page) return state

      const reorderedBlocks = action.blockIds.map((id, index) => {
        const block = page.blocks.find(b => b.id === id)
        return block ? { ...block, order: index } : null
      }).filter(Boolean) as Block[]

      const updatedPages = state.project.pages.map(p =>
        p.id === action.pageId
          ? { ...p, blocks: reorderedBlocks }
          : p
      )

      return {
        ...state,
        project: { ...state.project, pages: updatedPages },
      }
    }

    case 'UPDATE_PAGE': {
      const updatedPages = state.project.pages.map(page =>
        page.id === state.currentPageId
          ? { ...page, ...action.updates }
          : page
      )

      return {
        ...state,
        project: { ...state.project, pages: updatedPages },
      }
    }

    case 'UPDATE_THEME':
      return {
        ...state,
        project: {
          ...state.project,
          theme: state.project.theme
            ? { ...state.project.theme, tokens: action.tokens }
            : { id: '', tokens: action.tokens },
        },
      }

    case 'SET_DRAGGING':
      return { ...state, isDragging: action.isDragging }

    case 'SET_SAVING':
      return { ...state, isSaving: action.isSaving }

    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen }

    case 'TOGGLE_RIGHT_PANEL':
      return { ...state, rightPanelOpen: !state.rightPanelOpen }

    default:
      return state
  }
}

interface EditorProviderProps {
  children: React.ReactNode
  project: Project
}

export function EditorProvider({ children, project }: EditorProviderProps) {
  const { toast } = useToast()

  const initialState: EditorState = {
    project,
    currentPageId: project.pages[0]?.id || null,
    selectedBlockId: null,
    isDragging: false,
    isSaving: false,
    history: [],
    historyIndex: -1,
    sidebarOpen: true,
    rightPanelOpen: true,
  }

  const [state, dispatch] = useReducer(editorReducer, initialState)

  const currentPage = state.project.pages.find(p => p.id === state.currentPageId) || null
  const selectedBlock = currentPage?.blocks.find(b => b.id === state.selectedBlockId) || null

  const addBlock = useCallback((type: string, variant = 'default') => {
    if (!state.currentPageId) return

    const newBlock: Block = {
      id: `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: type as any,
      order: currentPage?.blocks.length || 0,
      variant,
      props: {},
      style: {},
    }

    dispatch({ type: 'ADD_BLOCK', pageId: state.currentPageId, block: newBlock })
  }, [state.currentPageId, currentPage?.blocks.length])

  const updateBlock = useCallback((blockId: string, updates: Partial<Block>) => {
    dispatch({ type: 'UPDATE_BLOCK', blockId, updates })
  }, [])

  const deleteBlock = useCallback((blockId: string) => {
    dispatch({ type: 'DELETE_BLOCK', blockId })
  }, [])

  const reorderBlocks = useCallback((blockIds: string[]) => {
    if (!state.currentPageId) return
    dispatch({ type: 'REORDER_BLOCKS', pageId: state.currentPageId, blockIds })
  }, [state.currentPageId])

  const updatePage = useCallback((updates: any) => {
    dispatch({ type: 'UPDATE_PAGE', updates })
  }, [])

  const updateTheme = useCallback((tokens: ThemeTokens) => {
    dispatch({ type: 'UPDATE_THEME', tokens })
  }, [])

  const saveProject = useCallback(async () => {
    dispatch({ type: 'SET_SAVING', isSaving: true })

    try {
      const response = await fetch(`/api/projects/${project.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pages: state.project.pages,
          theme: state.project.theme?.tokens,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save project')
      }

      toast({
        title: 'Saved',
        description: 'Project saved successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save project',
        variant: 'destructive',
      })
    } finally {
      dispatch({ type: 'SET_SAVING', isSaving: false })
    }
  }, [project.id, state.project.pages, state.project.theme?.tokens, toast])

  const publishProject = useCallback(async () => {
    try {
      const response = await fetch(`/api/projects/${project.id}/publish`, {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to publish project')
      }

      toast({
        title: 'Published',
        description: 'Project published successfully',
      })

      // Refresh the page to update the published state
      window.location.reload()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to publish project',
        variant: 'destructive',
      })
    }
  }, [project.id, toast])

  const unpublishProject = useCallback(async () => {
    try {
      const response = await fetch(`/api/projects/${project.id}/unpublish`, {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to unpublish project')
      }

      toast({
        title: 'Unpublished',
        description: 'Project unpublished successfully',
      })

      // Refresh the page to update the published state
      window.location.reload()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to unpublish project',
        variant: 'destructive',
      })
    }
  }, [project.id, toast])

  // Auto-save functionality
  const debouncedSave = useCallback(
    debounce(() => {
      saveProject()
    }, 2000),
    [saveProject]
  )

  useEffect(() => {
    debouncedSave()
  }, [state.project.pages, state.project.theme, debouncedSave])

  const contextValue: EditorContextType = {
    state,
    dispatch,
    currentPage,
    selectedBlock,
    addBlock,
    updateBlock,
    deleteBlock,
    reorderBlocks,
    updatePage,
    updateTheme,
    saveProject,
    publishProject,
    unpublishProject,
  }

  return (
    <EditorContext.Provider value={contextValue}>
      {children}
    </EditorContext.Provider>
  )
}

export function useEditor() {
  const context = useContext(EditorContext)
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider')
  }
  return context
}
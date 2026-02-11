'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CreateProjectDialog } from './create-project-dialog'
import { Plus, Zap } from 'lucide-react'

export function EmptyState() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  return (
    <>
      <Card className="border-dashed border-2 border-muted-foreground/25">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
            <Zap className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            Create your first project
          </h3>
          
          <p className="text-gray-600 mb-8 max-w-md">
            Start building beautiful websites with our drag-and-drop editor. 
            Choose from professional templates or start from scratch.
          </p>
          
          <Button onClick={() => setShowCreateDialog(true)} size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Create New Project
          </Button>
          
          <div className="mt-8 text-sm text-gray-500">
            <p>✨ No coding required • 🚀 Publish instantly • 📱 Mobile responsive</p>
          </div>
        </CardContent>
      </Card>

      <CreateProjectDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />
    </>
  )
}
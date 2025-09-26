"use client"

import { useState, useEffect } from 'react'
import { type CVProfile } from '@/lib/supabase'
import { CVAPI } from '@/api/cv'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, FileText, Edit, Trash2 } from 'lucide-react'

interface CVManagerProps {
  onSelectCV?: (cv: CVProfile) => void
}

export function CVManager({ onSelectCV }: CVManagerProps) {
  const [cvs, setCvs] = useState<CVProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  useEffect(() => {
    fetchCVs()
  }, [])

  const fetchCVs = async () => {
    try {
      const response = await CVAPI.getCVs()
      if (response.error) {
        console.error('API Error:', response.error)
        return
      }
      setCvs(response.data || [])
    } catch (error) {
      console.error('Error fetching CVs:', error)
    } finally {
      setLoading(false)
    }
  }

  const createCV = async () => {
    if (!newTitle.trim()) return

    try {
      const response = await CVAPI.createCV({ title: newTitle.trim() })
      if (response.error) {
        alert(`Error creating CV: ${response.error}`)
        return
      }

      setCvs(prev => [response.data!, ...prev])
      setNewTitle('')
      setCreating(false)
    } catch (error) {
      console.error('Error creating CV:', error)
      alert('Failed to create CV. Please try again.')
    }
  }

  const deleteCV = async (id: string) => {
    if (!confirm('Are you sure you want to delete this CV?')) return

    try {
      const response = await CVAPI.deleteCV(id)
      if (response.error) {
        alert(`Error deleting CV: ${response.error}`)
        return
      }

      setCvs(prev => prev.filter(cv => cv.id !== id))
    } catch (error) {
      console.error('Error deleting CV:', error)
      alert('Failed to delete CV. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Loading CVs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">My CVs</h2>
          <p className="text-muted-foreground">Manage your CV profiles</p>
        </div>
        <Button onClick={() => setCreating(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create CV
        </Button>
      </div>

      {/* Create CV Form */}
      {creating && (
        <Card>
          <CardHeader>
            <CardTitle>Create New CV</CardTitle>
            <CardDescription>
              Enter a title for your new CV. You can always edit it later.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cv-title">CV Title</Label>
              <Input
                id="cv-title"
                type="text"
                value={newTitle}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTitle(e.target.value)}
                placeholder="e.g., Software Engineer Resume"
                onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && createCV()}
                autoFocus
              />
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button 
              onClick={createCV} 
              disabled={!newTitle.trim()}
            >
              Create CV
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setCreating(false)
                setNewTitle('')
              }}
            >
              Cancel
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* CV List */}
      {cvs.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-16 w-16 mb-4 text-muted-foreground" />
            <CardTitle className="text-lg mb-2">No CVs yet</CardTitle>
            <CardDescription className="text-center mb-6">
              Create your first CV to get started
            </CardDescription>
            <Button onClick={() => setCreating(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create First CV
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cvs.map(cv => (
            <Card key={cv.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <FileText className="h-8 w-8 text-primary" />
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSelectCV?.(cv)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteCV(cv.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <CardTitle className="text-lg mb-2 line-clamp-2">
                  {cv.title}
                </CardTitle>
                
                <CardDescription>
                  Created {new Date(cv.created_at).toLocaleDateString()}
                </CardDescription>
              </CardContent>
              
              <CardFooter>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => onSelectCV?.(cv)}
                >
                  Open CV
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
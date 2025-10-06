"use client"

import { useState } from 'react'
import { CVManager } from './components/cv/CVManager'
import { AuthComponent } from './components/auth/AuthComponent'
import CVGeneratorTest from './components/CVGeneratorTest'
import EnhancedCVTest from './components/cv/EnhancedCVTest'
import { type CVProfile } from './lib/supabase'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from './components/ui/card'
import { ArrowLeft, Sparkles, TestTube, FileText } from 'lucide-react'
import type { User as SupabaseUser } from '@supabase/supabase-js'

function App() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [selectedCV, setSelectedCV] = useState<CVProfile | null>(null)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'test' | 'enhanced'>('dashboard')

  // Simple CV detail view (MVP - just shows title for now)
  const CVDetailView = ({ cv }: { cv: CVProfile }) => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => setSelectedCV(null)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to CVs
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{cv.title}</h1>
          <p className="text-muted-foreground">
            Created {new Date(cv.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
      
      {/* MVP: Basic CV content placeholder */}
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <Sparkles className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl mb-4">{cv.title}</CardTitle>
          <CardDescription className="text-center max-w-md">
            CV editor and content management will be implemented in the next phase.
            For now, you can create and manage CV titles through the dashboard.
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  )

  // Show auth screen if not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <AuthComponent onAuthChange={setUser} />
      </div>
    )
  }

  // Show CV detail view if one is selected
  if (selectedCV) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-8">
          <CVDetailView cv={selectedCV} />
        </div>
      </div>
    )
  }

  // Show CV Test page
  if (activeTab === 'test') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header with navigation */}
        <div className="border-b bg-gradient-to-r from-white to-gray-100/50">
          <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={() => setActiveTab('dashboard')}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                    <TestTube className="h-4 w-4 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold">Simple CV API Test</h1>
                </div>
              </div>
              <AuthComponent onAuthChange={setUser} />
            </div>
          </div>
        </div>
        
        <CVGeneratorTest />
      </div>
    )
  }

  // Show Enhanced CV Test page
  if (activeTab === 'enhanced') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header with navigation */}
        <div className="border-b bg-gradient-to-r from-white to-gray-100/50">
          <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={() => setActiveTab('dashboard')}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                    <FileText className="h-4 w-4 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold">Enhanced CV Generation Test</h1>
                </div>
              </div>
              <AuthComponent onAuthChange={setUser} />
            </div>
          </div>
        </div>
        
        <EnhancedCVTest />
      </div>
    )
  }

  // Show main CV dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Auth Header */}
      <AuthComponent onAuthChange={setUser} />
      
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-white to-gray-100/50">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  CV Generation System
                </h1>
              </div>
              <p className="text-gray-600 text-lg">
                Create and manage professional CVs with ease
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => setActiveTab('test')}
                variant="outline"
                className="flex items-center gap-2"
              >
                <TestTube className="h-4 w-4" />
                Simple API Test
              </Button>
              <Button 
                onClick={() => setActiveTab('enhanced')}
                variant="outline"
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Frank Digital Test
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <CVManager onSelectCV={setSelectedCV} />
      </div>
    </div>
  )
}

export default App

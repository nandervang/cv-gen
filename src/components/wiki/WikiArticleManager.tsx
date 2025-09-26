"use client"

import { useState } from 'react'
import { WikiEditor } from './WikiEditor'
import { WikiRenderer } from './WikiRenderer'
import { Button } from '@/components/ui/button'
import { supabase, type WikiArticle } from '@/lib/supabase'
import { Eye, Edit, Save, X } from 'lucide-react'

interface WikiArticleManagerProps {
  article?: WikiArticle
  onSave?: (article: WikiArticle) => void
  onCancel?: () => void
}

export function WikiArticleManager({ article, onSave, onCancel }: WikiArticleManagerProps) {
  const [isEditing, setIsEditing] = useState(!article)
  const [title, setTitle] = useState(article?.title || '')
  const [content, setContent] = useState(article?.content || {})
  const [category, setCategory] = useState(article?.category || 'general')
  const [tags, setTags] = useState(article?.tags?.join(', ') || '')
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const articleData = {
        title,
        content,
        category,
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
        published: true,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      }

      let savedArticle: WikiArticle

      if (article) {
        // Update existing article
        const { data, error } = await supabase
          .from('wiki_articles')
          .update(articleData)
          .eq('id', article.id)
          .select()
          .single()

        if (error) throw error
        savedArticle = data
      } else {
        // Create new article
        const { data, error } = await supabase
          .from('wiki_articles')
          .insert(articleData)
          .select()
          .single()

        if (error) throw error
        savedArticle = data
      }

      onSave?.(savedArticle)
      setIsEditing(false)
    } catch (error) {
      console.error('Error saving article:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const convertTiptapToMarkdown = (content: any): string => {
    if (!content || !content.content) return ''
    
    const processNode = (node: any): string => {
      switch (node.type) {
        case 'paragraph':
          return node.content?.map(processNode).join('') + '\n\n'
        case 'heading':
          const level = '#'.repeat(node.attrs?.level || 1)
          return `${level} ${node.content?.map(processNode).join('')}\n\n`
        case 'bulletList':
          return node.content?.map((item: any) => 
            `- ${item.content?.map(processNode).join('').trim()}\n`
          ).join('') + '\n'
        case 'orderedList':
          return node.content?.map((item: any, index: number) => 
            `${index + 1}. ${item.content?.map(processNode).join('').trim()}\n`
          ).join('') + '\n'
        case 'codeBlock':
          return `\`\`\`\n${node.content?.map(processNode).join('')}\`\`\`\n\n`
        case 'blockquote':
          return `> ${node.content?.map(processNode).join('')}\n\n`
        case 'text':
          let text = node.text
          if (node.marks) {
            node.marks.forEach((mark: any) => {
              switch (mark.type) {
                case 'bold':
                  text = `**${text}**`
                  break
                case 'italic':
                  text = `*${text}*`
                  break
                case 'code':
                  text = `\`${text}\``
                  break
                case 'link':
                  text = `[${text}](${mark.attrs.href})`
                  break
              }
            })
          }
          return text
        default:
          return node.content?.map(processNode).join('') || ''
      }
    }

    return content.content?.map(processNode).join('') || ''
  }

  if (!isEditing && article) {
    const markdownContent = convertTiptapToMarkdown(article.content)
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{article.title}</h1>
            <div className="flex gap-2 mt-2">
              <span className="text-sm bg-muted px-2 py-1 rounded">{article.category}</span>
              {article.tags?.map(tag => (
                <span key={tag} className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <Button onClick={() => setIsEditing(true)} size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
        
        <WikiRenderer content={markdownContent} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {article ? 'Edit Article' : 'Create New Article'}
        </h1>
        <div className="flex gap-2">
          <Button
            onClick={handleSave}
            disabled={isSaving || !title.trim()}
            size="sm"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
          {article && (
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
              size="sm"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          )}
          {onCancel && (
            <Button variant="outline" onClick={onCancel} size="sm">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Article title..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
          >
            <option value="general">General</option>
            <option value="tutorial">Tutorial</option>
            <option value="guide">Guide</option>
            <option value="reference">Reference</option>
            <option value="troubleshooting">Troubleshooting</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Tags</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="tag1, tag2, tag3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
          />
        </div>
      </div>

      <WikiEditor
        content={content}
        onChange={setContent}
        placeholder="Write your article content here..."
        className="min-h-[400px]"
      />
    </div>
  )
}
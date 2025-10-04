import puppeteer, { type Browser, type PDFOptions } from 'puppeteer'
import { ServerCVAPI } from '../api/cvAPI'
import { ServerTemplateAPI } from '../api/templateAPI'
import { serverSupabase } from '../lib/supabase'

interface GenerationRequest {
  cvId: string
  templateId: string
  format: 'pdf' | 'html' | 'docx'
  options?: {
    paperSize?: 'A4' | 'Letter'
    margin?: { top: string; right: string; bottom: string; left: string }
    orientation?: 'portrait' | 'landscape'
  }
}

interface GenerationResult {
  id: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  fileUrl?: string
  downloadUrl?: string
  format: string
  createdAt: string
}

export class CVGenerationService {
  private browser: puppeteer.Browser | null = null

  constructor() {
    this.initializeBrowser()
  }

  private async initializeBrowser() {
    try {
      this.browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu'
        ]
      })
      console.log('✅ Puppeteer browser initialized')
    } catch (error) {
      console.error('❌ Failed to initialize Puppeteer browser:', error)
    }
  }

  async generateCV(request: GenerationRequest): Promise<GenerationResult> {
    try {
      // Create generation record
      const { data: generation, error } = await serverSupabase
        .from('cv_generations')
        .insert({
          cv_profile_id: request.cvId,
          template_id: request.templateId,
          generation_config: request.options || {},
          content_data: {},
          output_format: request.format,
          generation_status: 'pending'
        })
        .select()
        .single()

      if (error) throw error

      // Update status to processing
      await serverSupabase
        .from('cv_generations')
        .update({ generation_status: 'processing' })
        .eq('id', generation.id)

      // Generate the CV file
      const fileUrl = await this.processGeneration(generation.id, request)

      // Update with completion
      await serverSupabase
        .from('cv_generations')
        .update({ 
          generation_status: 'completed',
          file_url: fileUrl
        })
        .eq('id', generation.id)

      return {
        id: generation.id,
        status: 'completed',
        fileUrl,
        downloadUrl: fileUrl,
        format: request.format,
        createdAt: generation.created_at
      }
    } catch (error: any) {
      console.error('CV Generation Error:', error)
      throw new Error(`Generation failed: ${error.message}`)
    }
  }

  async generatePreview(request: Omit<GenerationRequest, 'format'>): Promise<string> {
    try {
      // Fetch CV data
      const cvResponse = await CVAPI.getCV(request.cvId)
      if (cvResponse.error || !cvResponse.data) {
        throw new Error('CV not found')
      }

      // Fetch template
      const templateResponse = await TemplateAPI.getTemplate(request.templateId)
      if (templateResponse.error || !templateResponse.data) {
        throw new Error('Template not found')
      }

      // Generate HTML (basic for now - will enhance with actual templates)
      const html = this.renderBasicTemplate(cvResponse.data, templateResponse.data)
      return html
    } catch (error: any) {
      console.error('Preview Generation Error:', error)
      throw new Error(`Preview failed: ${error.message}`)
    }
  }

  private async processGeneration(generationId: string, request: GenerationRequest): Promise<string> {
    try {
      // Fetch CV data
      const cvResponse = await CVAPI.getCV(request.cvId)
      if (cvResponse.error || !cvResponse.data) {
        throw new Error('CV not found')
      }

      // Fetch template
      const templateResponse = await TemplateAPI.getTemplate(request.templateId)
      if (templateResponse.error || !templateResponse.data) {
        throw new Error('Template not found')
      }

      // Generate HTML
      const html = this.renderBasicTemplate(cvResponse.data, templateResponse.data)

      if (request.format === 'html') {
        return await this.uploadToStorage(html, `${generationId}.html`, 'text/html')
      } else if (request.format === 'pdf') {
        const pdfBuffer = await this.htmlToPdf(html, request.options)
        return await this.uploadToStorage(pdfBuffer, `${generationId}.pdf`, 'application/pdf')
      } else {
        throw new Error('DOCX format not yet implemented')
      }
    } catch (error: any) {
      // Update generation status to failed
      await serverSupabase
        .from('cv_generations')
        .update({ generation_status: 'failed' })
        .eq('id', generationId)
      
      throw error
    }
  }

  private renderBasicTemplate(cvData: any, template: any): string {
    const styles = template.styling_config || {}
    const primaryColor = styles.primary_color || '#2563eb'
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${cvData.title} - CV</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
      line-height: 1.6; 
      color: #1f2937; 
      background: white;
    }
    .cv-container { 
      max-width: 210mm; 
      margin: 0 auto; 
      padding: 20mm; 
      background: white; 
      min-height: 297mm;
    }
    .header { 
      border-bottom: 3px solid ${primaryColor}; 
      padding-bottom: 20px; 
      margin-bottom: 30px; 
    }
    .name { 
      font-size: 32px; 
      font-weight: bold; 
      color: ${primaryColor}; 
      margin-bottom: 8px; 
    }
    .title-role { 
      font-size: 18px; 
      color: #6b7280; 
      margin-bottom: 15px; 
    }
    .section { 
      margin-bottom: 25px; 
    }
    .section-title { 
      font-size: 20px; 
      font-weight: bold; 
      color: ${primaryColor}; 
      margin-bottom: 15px; 
      border-bottom: 1px solid #e5e7eb; 
      padding-bottom: 5px; 
    }
    .placeholder { 
      color: #9ca3af; 
      font-style: italic; 
    }
    @media print { 
      .cv-container { padding: 0; margin: 0; } 
      body { print-color-adjust: exact; }
    }
    @page { margin: 10mm; }
  </style>
</head>
<body>
  <div class="cv-container">
    <div class="header">
      <div class="name">${cvData.title}</div>
      <div class="title-role">Professional CV</div>
    </div>
    
    <div class="section">
      <div class="section-title">Summary</div>
      <div class="placeholder">
        A dedicated professional with expertise in their field, committed to excellence and continuous growth.
      </div>
    </div>
    
    <div class="section">
      <div class="section-title">Experience</div>
      <div class="placeholder">
        Professional experience will be displayed here based on CV content sections.
      </div>
    </div>
    
    <div class="section">
      <div class="section-title">Education</div>
      <div class="placeholder">
        Educational background and qualifications.
      </div>
    </div>
    
    <div class="section">
      <div class="section-title">Skills</div>
      <div class="placeholder">
        Key skills and competencies.
      </div>
    </div>
    
    <div style="margin-top: 40px; text-align: center; color: #9ca3af; font-size: 12px;">
      Generated by CV Generation System • ${new Date().toLocaleDateString()}
    </div>
  </div>
</body>
</html>`
  }

  private async htmlToPdf(html: string, options?: any): Promise<Buffer> {
    if (!this.browser) {
      await this.initializeBrowser()
    }

    if (!this.browser) {
      throw new Error('Failed to initialize browser for PDF generation')
    }

    const page = await this.browser.newPage()
    
    try {
      await page.setContent(html, { waitUntil: 'networkidle0' })
      
      const pdfOptions: puppeteer.PDFOptions = {
        format: options?.paperSize || 'A4',
        margin: options?.margin || {
          top: '10mm',
          right: '10mm',
          bottom: '10mm',
          left: '10mm'
        },
        printBackground: true,
        preferCSSPageSize: true
      }
      
      const pdfBuffer = await page.pdf(pdfOptions)
      return pdfBuffer
    } finally {
      await page.close()
    }
  }

  private async uploadToStorage(data: string | Buffer, fileName: string, contentType: string): Promise<string> {
    try {
      const { error } = await serverSupabase.storage
        .from('cv-files')
        .upload(`generated/${fileName}`, data, {
          contentType,
          upsert: true
        })

      if (error) throw error

      // Get public URL
      const { data: urlData } = serverSupabase.storage
        .from('cv-files')
        .getPublicUrl(`generated/${fileName}`)

      return urlData.publicUrl
    } catch (error: any) {
      console.error('Storage upload error:', error)
      throw new Error(`Failed to upload file: ${error.message}`)
    }
  }

  async getGenerationStatus(generationId: string): Promise<GenerationResult | null> {
    try {
      const { data, error } = await serverSupabase
        .from('cv_generations')
        .select('*')
        .eq('id', generationId)
        .single()

      if (error || !data) return null

      return {
        id: data.id,
        status: data.generation_status,
        fileUrl: data.file_url,
        downloadUrl: data.file_url,
        format: data.output_format,
        createdAt: data.created_at
      }
    } catch (error) {
      console.error('Error fetching generation status:', error)
      return null
    }
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close()
      this.browser = null
    }
  }
}
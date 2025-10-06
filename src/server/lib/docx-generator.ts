import { Document, Packer } from 'docx';

/**
 * Generate a DOCX buffer from a Document object
 */
export async function generateDOCXFromDocument(doc: Document): Promise<Buffer> {
  try {
    const buffer = await Packer.toBuffer(doc);
    return buffer;
  } catch (error) {
    console.error('DOCX generation error:', error);
    throw new Error(`Failed to generate DOCX: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
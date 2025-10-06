import { Router } from 'express';
import { generateTemplatePreview, generateAllTemplatePreviews } from '../api/previewAPI.js';

const router = Router();

// POST /api/preview/template - Generate single template preview
router.post('/template', generateTemplatePreview);

// POST /api/preview/batch - Generate previews for all templates
router.post('/batch', generateAllTemplatePreviews);

export { router as previewRoutes };
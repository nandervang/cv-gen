import { Router } from 'express';
import { getCustomizationOptions, previewCustomization } from '../api/customizationAPI.js';

const router = Router();

// GET /api/customization/options - Get all available customization options
router.get('/options', getCustomizationOptions);

// POST /api/customization/preview - Preview template with customization
router.post('/preview', previewCustomization);

export { router as customizationRoutes };
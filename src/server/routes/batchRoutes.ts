import { Router } from 'express';
import { generateAllFormats, generateAllTemplatesAllFormats } from '../api/batchAPI.js';

const router = Router();

// POST /api/batch/formats - Generate CV in all formats
router.post('/formats', generateAllFormats);

// POST /api/batch/comprehensive - Generate all templates in all formats  
router.post('/comprehensive', generateAllTemplatesAllFormats);

export { router as batchRoutes };
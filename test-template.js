const fs = require('fs');
const path = require('path');

// Read the template file and execute it to get the function
const templatePath = path.join(__dirname, 'src/server/templates/andervang-consulting.ts');
const templateContent = fs.readFileSync(templatePath, 'utf8');

// Extract just the function code
const functionStart = templateContent.indexOf('export function generateAndervangConsultingHTML');
const functionEnd = templateContent.indexOf('\nexport function generateAndervangConsultingDOCX');
const functionCode = templateContent.substring(functionStart + 7, functionEnd); // Remove 'export '

console.log('Function found:', functionCode.substring(0, 200) + '...');

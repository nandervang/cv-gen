/**
 * Global fetch override for automatic API URL detection and authentication
 */
import { getSmartApiUrl } from './api-config';

// Store the original fetch
const originalFetch = window.fetch;

// Get API key from environment
const getApiKey = (): string | undefined => {
  return import.meta.env.VITE_CV_API_KEY || import.meta.env.VITE_API_KEY || 'dev-api-key-12345';
};

// Check if URL is an API endpoint that needs authentication
const isApiEndpoint = (url: string): boolean => {
  return url.includes('/api/') && !url.includes('/health') && !url.includes('/test');
};

// Override fetch to automatically handle localhost URLs and add API key
window.fetch = function(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  let url: string = '';
  let processedInput: RequestInfo | URL = input;
  
  if (typeof input === 'string') {
    url = getSmartApiUrl(input);
    processedInput = url;
  } else if (input instanceof URL) {
    url = getSmartApiUrl(input.toString());
    processedInput = new URL(url);
  } else if (input instanceof Request) {
    url = getSmartApiUrl(input.url);
    // Clone the request with the new URL
    processedInput = new Request(url, input);
  }
  
  // Add API key for API endpoints
  if (isApiEndpoint(url)) {
    const apiKey = getApiKey();
    if (apiKey) {
      const headers = new Headers(init?.headers);
      if (!headers.has('X-API-Key')) {
        headers.set('X-API-Key', apiKey);
      }
      
      // Merge with existing init
      init = {
        ...init,
        headers: headers
      };
    }
  }
  
  return originalFetch(processedInput, init);
};

export {}; // Make this a module
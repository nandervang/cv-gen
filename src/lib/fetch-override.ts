/**
 * Global fetch override for automatic API URL detection
 */
import { getSmartApiUrl } from './api-config';

// Store the original fetch
const originalFetch = window.fetch;

// Override fetch to automatically handle localhost URLs
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
  
  return originalFetch(processedInput, init);
};

export {}; // Make this a module
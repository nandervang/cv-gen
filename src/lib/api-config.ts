/**
 * API Configuration and URL Management
 */

// Get the base API URL based on environment
export const getApiBaseUrl = (): string => {
  // In development, use Netlify Dev
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'http://localhost:8888';
  }
  
  // In production, use relative URLs which will resolve to the domain
  return '';
};

// Get the full API URL for a specific endpoint
export const getApiUrl = (endpoint: string = ''): string => {
  const baseUrl = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  if (baseUrl) {
    return `${baseUrl}/.netlify/functions/api${cleanEndpoint}`;
  }
  
  return `/.netlify/functions/api${cleanEndpoint}`;
};

// Smart API URL detection - handles both full URLs and endpoint paths
export const getSmartApiUrl = (urlOrPath: string): string => {
  // If it's already a full URL, return as-is
  if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) {
    return urlOrPath;
  }
  
  // If it's a path starting with /api/, convert to Netlify function
  if (urlOrPath.startsWith('/api/')) {
    const endpoint = urlOrPath.replace('/api', '');
    return getApiUrl(endpoint);
  }
  
  // If it's just an endpoint path, use getApiUrl
  return getApiUrl(urlOrPath);
};

// Health check URL
export const getHealthUrl = (): string => {
  const baseUrl = getApiBaseUrl();
  if (baseUrl) {
    return `${baseUrl}/.netlify/functions/health`;
  }
  return '/.netlify/functions/health';
};

// Test endpoint URL
export const getTestUrl = (): string => {
  const baseUrl = getApiBaseUrl();
  if (baseUrl) {
    return `${baseUrl}/.netlify/functions/test`;
  }
  return '/.netlify/functions/test';
};
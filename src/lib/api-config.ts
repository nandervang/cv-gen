/**
 * API Configuration for different environments
 */

export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  retries: number;
}

/**
 * Get API configuration based on environment
 */
export function getApiConfig(): ApiConfig {
  // Try environment variable first
  let baseUrl = import.meta.env.VITE_CV_API_URL;
  
  // If no environment variable, detect based on current URL
  if (!baseUrl) {
    const currentHost = window.location.hostname;
    
    if (currentHost === 'localhost' || currentHost === '127.0.0.1') {
      // Local development
      baseUrl = 'http://localhost:3001';
    } else if (currentHost.includes('netlify.app') || currentHost.includes('netlify.com')) {
      // Netlify deployment - use current domain for functions
      baseUrl = `${window.location.protocol}//${window.location.host}/.netlify/functions`;
    } else {
      // Production or other deployment
      baseUrl = `${window.location.protocol}//${window.location.host}`;
    }
  }
  
  // Handle empty environment variable (means use relative/detect)
  if (baseUrl === '') {
    baseUrl = `${window.location.protocol}//${window.location.host}/.netlify/functions`;
  }
  
  return {
    baseUrl,
    timeout: 30000, // 30 seconds
    retries: 1 // Reduce retries for faster failure
  };
}

/**
 * Make API request with proper configuration
 */
export async function makeApiRequest(
  endpoint: string, 
  options: RequestInit = {}
): Promise<Response> {
  const config = getApiConfig();
  const url = endpoint.startsWith('http') 
    ? endpoint 
    : `${config.baseUrl}${endpoint}`;
    
  const requestOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  };
  
  let lastError: Error;
  
  // Retry logic
  for (let attempt = 1; attempt <= config.retries; attempt++) {
    try {
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), config.timeout);
      
      const response = await fetch(url, {
        ...requestOptions,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      lastError = error as Error;
      
      // Don't retry on certain errors
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        // Network error, might be worth retrying
        if (attempt < config.retries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
          continue;
        }
      }
      
      throw error;
    }
  }
  
  throw lastError!;
}

/**
 * Get full API URL for a given endpoint
 */
export function getApiUrl(endpoint: string): string {
  const config = getApiConfig();
  return endpoint.startsWith('http') 
    ? endpoint 
    : `${config.baseUrl}${endpoint}`;
}

/**
 * Check if we're in development mode
 */
export function isDevelopment(): boolean {
  return window.location.hostname === 'localhost' || 
         window.location.hostname === '127.0.0.1';
}

/**
 * Check if we're deployed on Netlify
 */
export function isNetlify(): boolean {
  return window.location.hostname.includes('netlify.app') || 
         window.location.hostname.includes('netlify.com');
}
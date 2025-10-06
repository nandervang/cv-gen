import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { getApiUrl } from '@/lib/api-config';

interface FormatResult {
  success: boolean;
  fileUrl?: string;
  error?: string;
  generatedAt?: string;
}

interface ComprehensiveResult {
  success: boolean;
  fileUrl?: string;
  error?: string;
  generatedAt?: string;
}

interface BatchTestResult {
  success: boolean;
  data?: {
    results?: Record<string, FormatResult>;
    summary?: {
      total?: number;
      successful?: number;
      failed?: number;
      successRate?: string;
      totalCombinations?: number;
    };
  };
  error?: {
    message: string;
  };
}

interface ComprehensiveBatchResult {
  success: boolean;
  data?: {
    results?: Record<string, Record<string, ComprehensiveResult>>;
    summary?: {
      totalCombinations?: number;
      successful?: number;
      failed?: number;
      successRate?: string;
    };
  };
  error?: {
    message: string;
  };
}

interface BatchTesterProps {
  cvData: Record<string, unknown>;
  selectedTemplate: string;
}

export const BatchTester: React.FC<BatchTesterProps> = ({ cvData, selectedTemplate }) => {
  const [isTestingFormats, setIsTestingFormats] = useState(false);
  const [isTestingComprehensive, setIsTestingComprehensive] = useState(false);
  const [formatResults, setFormatResults] = useState<BatchTestResult | null>(null);
  const [comprehensiveResults, setComprehensiveResults] = useState<ComprehensiveBatchResult | null>(null);

  const testAllFormats = async () => {
    setIsTestingFormats(true);
    setFormatResults(null);

    try {
      const apiKey = import.meta.env.VITE_CV_API_KEY || 'dev-api-key-12345';
      const apiUrl = getApiUrl('');

      const payload = {
        ...cvData,
        template: selectedTemplate
      };

      const response = await fetch(`${apiUrl}/api/batch/formats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      setFormatResults(result);

    } catch (error) {
      setFormatResults({
        success: false,
        error: {
          message: error instanceof Error ? error.message : 'Unknown error occurred'
        }
      });
    } finally {
      setIsTestingFormats(false);
    }
  };

  const testComprehensive = async () => {
    setIsTestingComprehensive(true);
    setComprehensiveResults(null);

    try {
      const apiKey = import.meta.env.VITE_CV_API_KEY || 'dev-api-key-12345';
      const apiUrl = getApiUrl('');

      const response = await fetch(`${apiUrl}/api/batch/comprehensive`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify(cvData),
      });

      const result = await response.json();
      setComprehensiveResults(result);

    } catch (error) {
      setComprehensiveResults({
        success: false,
        error: {
          message: error instanceof Error ? error.message : 'Unknown error occurred'
        }
      });
    } finally {
      setIsTestingComprehensive(false);
    }
  };

  const renderFormatResults = () => {
    if (!formatResults) return null;

    if (!formatResults.success && formatResults.error) {
      return (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h4 className="font-semibold text-red-800 mb-2">Error</h4>
          <p className="text-red-700">{formatResults.error.message}</p>
        </div>
      );
    }

    const results = formatResults.data?.results || {};
    const summary = formatResults.data?.summary;

    return (
      <div className="mt-4 space-y-4">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Format Generation Results</h4>
          {summary && (
            <div className="text-blue-700 mb-3">
              <span className="font-medium">
                Success Rate: {summary.successful}/{summary.total} 
                {summary.successRate && ` (${summary.successRate})`}
              </span>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {Object.entries(results).map(([format, result]: [string, FormatResult]) => (
              <div 
                key={format} 
                className={`p-3 border rounded ${
                  result.success 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium uppercase">{format}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    result.success 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {result.success ? 'Success' : 'Failed'}
                  </span>
                </div>
                {result.success && result.fileUrl && (
                  <a 
                    href={result.fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm underline"
                  >
                    Open File
                  </a>
                )}
                {!result.success && result.error && (
                  <p className="text-red-600 text-xs mt-1">{result.error}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderComprehensiveResults = () => {
    if (!comprehensiveResults) return null;

    if (!comprehensiveResults.success && comprehensiveResults.error) {
      return (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h4 className="font-semibold text-red-800 mb-2">Error</h4>
          <p className="text-red-700">{comprehensiveResults.error.message}</p>
        </div>
      );
    }

    const results = comprehensiveResults.data?.results || {};
    const summary = comprehensiveResults.data?.summary;

    return (
      <div className="mt-4 space-y-4">
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h4 className="font-semibold text-purple-800 mb-2">Comprehensive Test Results</h4>
          {summary && (
            <div className="text-purple-700 mb-3 space-y-1">
              <div><span className="font-medium">Total Combinations:</span> {summary.totalCombinations}</div>
              <div><span className="font-medium">Successful:</span> {summary.successful}</div>
              <div><span className="font-medium">Failed:</span> {summary.failed}</div>
              <div><span className="font-medium">Success Rate:</span> {summary.successRate}</div>
            </div>
          )}
          
          <div className="space-y-4">
            {Object.entries(results).map(([template, templateResults]: [string, Record<string, ComprehensiveResult>]) => (
              <div key={template} className="border border-purple-100 rounded p-3 bg-white">
                <h5 className="font-medium capitalize mb-2">{template} Template</h5>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(templateResults).map(([format, result]: [string, ComprehensiveResult]) => (
                    <div 
                      key={format}
                      className={`p-2 border rounded text-sm ${
                        result.success 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-red-50 border-red-200'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="uppercase font-medium">{format}</span>
                        <span className={`text-xs ${
                          result.success ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {result.success ? '✓' : '✗'}
                        </span>
                      </div>
                      {result.success && result.fileUrl && (
                        <a 
                          href={result.fileUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-xs underline block mt-1"
                        >
                          Open
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Batch Testing</CardTitle>
        <CardDescription>
          Test CV generation across multiple formats and templates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Format Testing */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Test All Formats</h3>
          <p className="text-sm text-gray-600 mb-4">
            Generate the current CV data in HTML, PDF, and DOCX formats using the {selectedTemplate} template.
          </p>
          <Button 
            onClick={testAllFormats}
            disabled={isTestingFormats}
            className="w-full md:w-auto"
          >
            {isTestingFormats ? 'Testing All Formats...' : 'Test All Formats'}
          </Button>
          {renderFormatResults()}
        </div>

        {/* Comprehensive Testing */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Comprehensive Test</h3>
          <p className="text-sm text-gray-600 mb-4">
            Generate the current CV data using all templates in all formats (12 total combinations).
          </p>
          <Button 
            onClick={testComprehensive}
            disabled={isTestingComprehensive}
            variant="outline"
            className="w-full md:w-auto"
          >
            {isTestingComprehensive ? 'Running Comprehensive Test...' : 'Run Comprehensive Test'}
          </Button>
          {renderComprehensiveResults()}
        </div>
      </CardContent>
    </Card>
  );
};
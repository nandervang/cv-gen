import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface ColorScheme {
  id: string;
  name: string;
  primaryColor: string;
  accentColor: string;
  highlightColor?: string;
  description: string;
}

interface FontOption {
  id: string;
  name: string;
  fontFamily: string;
  fallback: string[];
  category: 'serif' | 'sans-serif' | 'monospace';
  description: string;
}

interface LayoutOption {
  id: string;
  name: string;
  description: string;
  supportedTemplates: string[];
}

interface CustomizationOptions {
  colorSchemes: Record<string, ColorScheme[]>;
  fontOptions: FontOption[];
  layoutOptions: LayoutOption[];
  sizeOptions: Array<{ id: string; name: string; description: string }>;
  spacingOptions: Array<{ id: string; name: string; description: string }>;
}

interface TemplateCustomization {
  templateId: string;
  colorScheme?: string;
  fontFamily?: string;
  fontSize?: 'small' | 'medium' | 'large';
  spacing?: 'compact' | 'normal' | 'relaxed';
  layout?: string;
  customColors?: {
    primaryColor?: string;
    accentColor?: string;
    highlightColor?: string;
  };
}

interface TemplateCustomizerProps {
  selectedTemplate: string;
  onCustomizationChange: (customization: TemplateCustomization) => void;
}

export const TemplateCustomizer: React.FC<TemplateCustomizerProps> = ({
  selectedTemplate,
  onCustomizationChange
}) => {
  const [options, setOptions] = useState<CustomizationOptions | null>(null);
  const [customization, setCustomization] = useState<TemplateCustomization>({
    templateId: selectedTemplate,
    fontSize: 'medium',
    spacing: 'normal'
  });
  const [useCustomColors, setUseCustomColors] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCustomizationOptions();
  }, []);

  useEffect(() => {
    setCustomization(prev => ({ ...prev, templateId: selectedTemplate }));
  }, [selectedTemplate]);

  useEffect(() => {
    onCustomizationChange(customization);
  }, [customization, onCustomizationChange]);

  const fetchCustomizationOptions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/customization/options');

      if (!response.ok) {
        throw new Error('Failed to fetch customization options');
      }

      const result = await response.json();
      setOptions(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const updateCustomization = (updates: Partial<TemplateCustomization>) => {
    setCustomization(prev => ({ ...prev, ...updates }));
  };

  const updateCustomColors = (colorUpdates: Partial<TemplateCustomization['customColors']>) => {
    setCustomization(prev => ({
      ...prev,
      customColors: { ...prev.customColors, ...colorUpdates }
    }));
  };

  const getAvailableLayouts = () => {
    if (!options) return [];
    return options.layoutOptions.filter(layout => 
      layout.supportedTemplates.includes(selectedTemplate)
    );
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading customization options...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">Error: {error}</div>
          <Button onClick={fetchCustomizationOptions} className="mt-4">
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!options) return null;

  const availableColorSchemes = options.colorSchemes[selectedTemplate] || [];
  const availableLayouts = getAvailableLayouts();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Template Customization</CardTitle>
          <CardDescription>
            Customize the appearance and layout of your CV template
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Color Scheme Selection */}
          <div>
            <Label className="text-base font-semibold">Color Scheme</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              {availableColorSchemes.map((scheme) => (
                <div
                  key={scheme.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    customization.colorScheme === scheme.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => {
                    updateCustomization({ colorScheme: scheme.id });
                    setUseCustomColors(false);
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      <div
                        className="w-4 h-4 rounded border"
                        style={{ backgroundColor: scheme.primaryColor }}
                        title="Primary color"
                      />
                      <div
                        className="w-4 h-4 rounded border"
                        style={{ backgroundColor: scheme.accentColor }}
                        title="Accent color"
                      />
                      {scheme.highlightColor && (
                        <div
                          className="w-4 h-4 rounded border"
                          style={{ backgroundColor: scheme.highlightColor }}
                          title="Highlight color"
                        />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{scheme.name}</div>
                      <div className="text-sm text-gray-600">{scheme.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Colors */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <input
                type="checkbox"
                id="useCustomColors"
                checked={useCustomColors}
                onChange={(e) => {
                  setUseCustomColors(e.target.checked);
                  if (!e.target.checked) {
                    updateCustomization({ customColors: undefined });
                  }
                }}
                className="rounded"
                aria-describedby="useCustomColors-desc"
              />
              <Label htmlFor="useCustomColors" className="text-base font-semibold">
                Use Custom Colors
              </Label>
              <span id="useCustomColors-desc" className="sr-only">
                Enable custom color picker instead of preset color schemes
              </span>
            </div>
            
            {useCustomColors && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <Input
                    id="primaryColor"
                    type="color"
                    value={customization.customColors?.primaryColor || '#2563eb'}
                    onChange={(e) => updateCustomColors({ primaryColor: e.target.value })}
                    className="h-10 mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="accentColor">Accent Color</Label>
                  <Input
                    id="accentColor"
                    type="color"
                    value={customization.customColors?.accentColor || '#64748b'}
                    onChange={(e) => updateCustomColors({ accentColor: e.target.value })}
                    className="h-10 mt-1"
                  />
                </div>
                {selectedTemplate === 'creative' && (
                  <div>
                    <Label htmlFor="highlightColor">Highlight Color</Label>
                    <Input
                      id="highlightColor"
                      type="color"
                      value={customization.customColors?.highlightColor || '#f59e0b'}
                      onChange={(e) => updateCustomColors({ highlightColor: e.target.value })}
                      className="h-10 mt-1"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Font Selection */}
          <div>
            <Label htmlFor="fontSelect" className="text-base font-semibold">Font Family</Label>
            <select
              id="fontSelect"
              value={customization.fontFamily || ''}
              onChange={(e) => updateCustomization({ fontFamily: e.target.value || undefined })}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
              aria-describedby="fontSelect-desc"
            >
              <option value="">Default Font</option>
              {options.fontOptions.map((font) => (
                <option key={font.id} value={font.id}>
                  {font.name} ({font.category})
                </option>
              ))}
            </select>
            <span id="fontSelect-desc" className="sr-only">
              Choose the font family for your CV text
            </span>
          </div>

          {/* Layout Selection */}
          {availableLayouts.length > 0 && (
            <div>
              <Label className="text-base font-semibold">Layout</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                {availableLayouts.map((layout) => (
                  <div
                    key={layout.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      customization.layout === layout.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => updateCustomization({ layout: layout.id })}
                  >
                    <div className="font-medium">{layout.name}</div>
                    <div className="text-sm text-gray-600 mt-1">{layout.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Size and Spacing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Font Size */}
            <div>
              <Label className="text-base font-semibold">Font Size</Label>
              <div className="space-y-2 mt-2">
                {options.sizeOptions.map((size) => (
                  <label key={size.id} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="fontSize"
                      value={size.id}
                      checked={customization.fontSize === size.id}
                      onChange={(e) => updateCustomization({ 
                        fontSize: e.target.value as 'small' | 'medium' | 'large'
                      })}
                      className="text-blue-600"
                    />
                    <span className="font-medium">{size.name}</span>
                    <span className="text-sm text-gray-600">- {size.description}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Spacing */}
            <div>
              <Label className="text-base font-semibold">Spacing</Label>
              <div className="space-y-2 mt-2">
                {options.spacingOptions.map((spacing) => (
                  <label key={spacing.id} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="spacing"
                      value={spacing.id}
                      checked={customization.spacing === spacing.id}
                      onChange={(e) => updateCustomization({ 
                        spacing: e.target.value as 'compact' | 'normal' | 'relaxed'
                      })}
                      className="text-blue-600"
                    />
                    <span className="font-medium">{spacing.name}</span>
                    <span className="text-sm text-gray-600">- {spacing.description}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
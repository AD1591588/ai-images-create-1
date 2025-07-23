import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Settings, X, Zap, AlertCircle } from 'lucide-react';

interface ControlPanelProps {
  onGenerate: () => void;
  canGenerate: boolean;
  isGenerating: boolean;
  settings: {
    quality: number;
    style: string;
    removeBackground: boolean;
  };
  onSettingsChange: (settings: any) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ 
  onGenerate, 
  canGenerate, 
  isGenerating,
  settings,
  onSettingsChange
}) => {
  const styles = ['Natural', 'Realistic', 'Enhanced', 'Artistic'];

  return (
    <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-800">
          <Settings className="h-5 w-5" />
          AI Undress Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-yellow-800">
              <p className="font-medium">AI Processing Active</p>
              <p>Images will be processed with advanced AI algorithms for realistic undressing effects.</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-red-700">Processing Quality</Label>
          <Slider
            value={[settings.quality]}
            onValueChange={(value) => onSettingsChange({ ...settings, quality: value[0] })}
            max={100}
            min={10}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-red-500">
            <span>Fast</span>
            <span className="font-medium">{settings.quality}% Quality</span>
            <span>Ultra HD</span>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-red-700">AI Processing Style</Label>
          <div className="grid grid-cols-2 gap-2">
            {styles.map((style) => (
              <Button
                key={style}
                variant={settings.style === style ? "default" : "outline"}
                size="sm"
                onClick={() => onSettingsChange({ ...settings, style })}
                className={settings.style === style ? "bg-red-500 hover:bg-red-600 text-white" : "border-red-300 text-red-700 hover:bg-red-100"}
              >
                {style}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="text-sm font-medium text-red-700">Auto Background Removal</Label>
            <p className="text-xs text-red-500">Clean background for better results</p>
          </div>
          <Switch
            checked={settings.removeBackground}
            onCheckedChange={(checked) => onSettingsChange({ ...settings, removeBackground: checked })}
          />
        </div>

        <div className="pt-4 border-t border-red-200">
          <Button 
            onClick={onGenerate}
            disabled={!canGenerate || isGenerating}
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed h-12 text-lg font-semibold text-white"
          >
            {isGenerating ? (
              <>
                <Zap className="h-5 w-5 mr-2 animate-pulse" />
                AI Processing...
              </>
            ) : (
              <>
                <X className="h-5 w-5 mr-2" />
                Generate AI Undress
              </>
            )}
          </Button>
          
          {!canGenerate && (
            <div className="mt-3 text-center">
              <Badge variant="secondary" className="text-xs text-red-600 border-red-300">
                Upload an image to start AI processing
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ControlPanel;
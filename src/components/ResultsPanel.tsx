import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Share2, X, Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResultsPanelProps {
  isGenerating: boolean;
  resultImage: string | null;
  onDownload: () => void;
  onShare: () => void;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ 
  isGenerating, 
  resultImage, 
  onDownload, 
  onShare 
}) => {
  const { toast } = useToast();

  const handleDownload = () => {
    onDownload();
    toast({
      title: "Download started!",
      description: "Your AI processed image is being downloaded"
    });
  };

  const handleShare = () => {
    onShare();
    toast({
      title: "Share link copied!",
      description: "Share your AI undress result with friends"
    });
  };

  return (
    <Card className="h-full bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-800">
          <Sparkles className="h-5 w-5 text-red-500" />
          AI Undress Result
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-square bg-gradient-to-br from-red-50 to-pink-50 rounded-lg border-2 border-dashed border-red-200 flex items-center justify-center relative overflow-hidden">
          {isGenerating ? (
            <div className="text-center space-y-4">
              <div className="relative">
                <Loader2 className="h-12 w-12 animate-spin text-red-500 mx-auto" />
                <Sparkles className="h-6 w-6 text-pink-500 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div>
                <p className="font-medium text-red-700">AI Processing Image...</p>
                <p className="text-sm text-red-600">Applying advanced undressing algorithms</p>
              </div>
              <div className="w-48 bg-red-200 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-pink-500 h-full rounded-full animate-pulse w-3/4"></div>
              </div>
              <div className="text-xs text-red-500 space-y-1">
                <p>• Analyzing clothing patterns</p>
                <p>• Generating realistic skin texture</p>
                <p>• Applying final enhancements</p>
              </div>
            </div>
          ) : resultImage ? (
            <div className="w-full h-full relative group">
              <img 
                src={resultImage} 
                alt="AI Undress result" 
                className="w-full h-full object-contain rounded-lg shadow-lg transition-transform group-hover:scale-105"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                <Badge className="opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI Enhanced
                </Badge>
              </div>
              <div className="absolute top-2 right-2">
                <Badge className="bg-green-500 text-white text-xs">
                  ✓ Processed
                </Badge>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-3">
              <X className="h-16 w-16 text-red-300 mx-auto" />
              <div>
                <p className="font-medium text-red-700">Ready for AI Processing</p>
                <p className="text-sm text-red-600">Upload a photo to generate undressed version</p>
              </div>
            </div>
          )}
        </div>
        
        {resultImage && !isGenerating && (
          <div className="space-y-3">
            <div className="text-center">
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <Sparkles className="h-3 w-3 mr-1" />
                AI Processing Complete
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handleDownload}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button 
                onClick={handleShare}
                variant="outline"
                className="flex-1 border-red-200 hover:bg-red-50 text-red-700"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultsPanel;
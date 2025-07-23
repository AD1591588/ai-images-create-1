import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import UploadSection from './UploadSection';
import ClothingSelector from './ClothingSelector';
import ResultsPanel from './ResultsPanel';
import ControlPanel from './ControlPanel';
import { processImageWithAI } from './ImageProcessor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, X } from 'lucide-react';

const AppLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useAppContext();
  const isMobile = useIsMobile();
  
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [settings, setSettings] = useState({
    quality: 80,
    style: 'Natural',
    removeBackground: false
  });

  const handleImageUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setUploadedImage(url);
    setUploadedFile(file);
    setResultImage(null); // Clear previous result
  };

  const handleUndressClothes = async () => {
    if (!uploadedFile) return;
    
    await processImageWithAI(
      uploadedFile,
      settings,
      () => setIsGenerating(true),
      (processedUrl) => {
        setResultImage(processedUrl);
        setIsGenerating(false);
      }
    );
  };

  const handleDownload = () => {
    if (resultImage && uploadedFile) {
      const link = document.createElement('a');
      link.href = resultImage;
      link.download = `undressed-${uploadedFile.name}`;
      link.click();
    }
  };

  const handleShare = () => {
    if (navigator.share && resultImage) {
      navigator.share({
        title: 'My Undress Result',
        text: 'Check out my AI undress result!',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const canGenerate = uploadedImage && !isGenerating;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-red-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 p-2 rounded-lg">
              <X className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                AI Undress Studio
              </h1>
              <p className="text-sm text-gray-600">Powered by Stable Diffusion 3.5 Large</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <UploadSection 
              onImageUpload={handleImageUpload}
              uploadedImage={uploadedImage}
            />
            <ClothingSelector 
              onUndressClothes={handleUndressClothes}
            />
          </div>

          {/* Middle Column */}
          <div className="space-y-6">
            <ResultsPanel 
              isGenerating={isGenerating}
              resultImage={resultImage}
              onDownload={handleDownload}
              onShare={handleShare}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <ControlPanel 
              onGenerate={handleUndressClothes}
              canGenerate={canGenerate}
              isGenerating={isGenerating}
              settings={settings}
              onSettingsChange={setSettings}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
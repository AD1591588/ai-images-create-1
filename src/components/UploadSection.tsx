import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UploadSectionProps {
  onImageUpload: (file: File) => void;
  uploadedImage: string | null;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onImageUpload, uploadedImage }) => {
  const { toast } = useToast();
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith('image/')) {
      onImageUpload(file);
      toast({
        title: "Image uploaded successfully!",
        description: "Ready for undressing process"
      });
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive"
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  return (
    <Card className={`transition-all duration-300 bg-gradient-to-br from-red-50 to-pink-50 border-red-200 ${dragOver ? 'border-red-400 scale-105' : ''}`}>
      <CardContent className="p-8">
        <div
          className="border-2 border-dashed border-red-300 rounded-lg p-8 text-center hover:border-red-400 transition-colors"
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
        >
          {uploadedImage ? (
            <div className="space-y-4">
              <div className="relative">
                <img 
                  src={uploadedImage} 
                  alt="Uploaded" 
                  className="max-h-64 w-full object-contain mx-auto rounded-lg shadow-lg" 
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
              <p className="text-sm text-red-600">Image ready for undressing</p>
            </div>
          ) : (
            <div className="space-y-4">
              <ImageIcon className="h-16 w-16 mx-auto text-red-400" />
              <div>
                <h3 className="text-lg font-semibold mb-2 text-red-800">Upload Your Photo</h3>
                <p className="text-red-600 mb-4">Drag and drop or click to select</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-upload"
                />
                <Button asChild className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Photo
                  </label>
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UploadSection;
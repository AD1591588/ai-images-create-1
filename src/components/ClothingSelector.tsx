import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shirt, X } from 'lucide-react';

interface ClothingSelectorProps {
  onUndressClothes: () => void;
}

const ClothingSelector: React.FC<ClothingSelectorProps> = ({ onUndressClothes }) => {
  return (
    <Card className="h-full bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-800">
          <X className="h-5 w-5" />
          Clothing Removal
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-6 py-12">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center border-2 border-red-200">
            <X className="h-12 w-12 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-red-800">Remove Clothes</h3>
          <p className="text-sm text-red-600 max-w-xs">
            Click the button below to remove clothing from the uploaded image
          </p>
        </div>
        
        <Button 
          onClick={onUndressClothes}
          className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          size="lg"
        >
          <X className="h-5 w-5 mr-2" />
          Undress Clothes
        </Button>
        
        <div className="text-center space-y-2">
          <Badge variant="outline" className="text-red-600 border-red-300">
            AI-Powered Removal
          </Badge>
          <p className="text-xs text-red-500">
            Using Stable Diffusion 3.5 Large
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClothingSelector;
import { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { localStorageService } from '@/services/localStorage.service';

export const SettingsPanel = () => {
  const [contrast, setContrast] = useState(50);
  const [fontSize, setFontSize] = useState(50);

  useEffect(() => {
    const settings = localStorageService.getSettings();
    setContrast(settings.contrast);
    setFontSize(settings.fontSize);
    applySettings(settings.contrast, settings.fontSize);
  }, []);

  const applySettings = (contrastValue: number, fontSizeValue: number) => {
    const root = document.documentElement;
    
    // Apply contrast (affects opacity/brightness)
    const contrastFactor = 0.5 + (contrastValue / 100);
    root.style.setProperty('--contrast', contrastFactor.toString());
    
    // Apply font size (base is 16px)
    const baseFontSize = 12 + (fontSizeValue / 100) * 8; // Range: 12px to 20px
    root.style.setProperty('--base-font-size', `${baseFontSize}px`);
    root.style.fontSize = `${baseFontSize}px`;
  };

  const handleContrastChange = (value: number[]) => {
    const newContrast = value[0];
    setContrast(newContrast);
    applySettings(newContrast, fontSize);
    localStorageService.saveSettings({ contrast: newContrast, fontSize });
  };

  const handleFontSizeChange = (value: number[]) => {
    const newFontSize = value[0];
    setFontSize(newFontSize);
    applySettings(contrast, newFontSize);
    localStorageService.saveSettings({ contrast, fontSize: newFontSize });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-primary hover:bg-accent"
          aria-label="Configuración"
        >
          <Settings size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="contrast">Contraste</Label>
              <span className="text-sm text-muted-foreground">{contrast}%</span>
            </div>
            <Slider
              id="contrast"
              min={0}
              max={100}
              step={1}
              value={[contrast]}
              onValueChange={handleContrastChange}
              className="cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="fontSize">Tamaño de letra</Label>
              <span className="text-sm text-muted-foreground">{fontSize}%</span>
            </div>
            <Slider
              id="fontSize"
              min={0}
              max={100}
              step={1}
              value={[fontSize]}
              onValueChange={handleFontSizeChange}
              className="cursor-pointer"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

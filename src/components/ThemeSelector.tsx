import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Theme } from '@/type/GameType';
import pokemonImage from '@/assets/pokemon.png';
import harryPotterImage from '@/assets/harrypotter.png';

const themes: Theme[] = [
    { name: 'Pokemon', image: pokemonImage },
    { name: 'Harry Potter', image: harryPotterImage }
  ];
  
  interface ThemeSelectorProps {
    onThemeSelect: (theme: Theme) => void;
  }

export default function ThemeSelector({ onThemeSelect }: ThemeSelectorProps) {
  const [selectedTheme, setSelectedTheme] = useState<Theme>(themes[0]);

  useEffect(() => {
    document.body.style.backgroundImage = `url(${selectedTheme.image})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
  }, [selectedTheme]);

  const handleThemeChange = (value: string) => {
    const theme = themes.find(t => t.name === value);
    if (theme) {
      setSelectedTheme(theme);
      onThemeSelect(theme);
    }
  };

  return (
    <Card className="w-[300px] mx-auto mt-10">
      <CardContent className="pt-6">
        <Select onValueChange={handleThemeChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choisir un thème" />
          </SelectTrigger>
          <SelectContent>
            {themes.map((theme) => (
              <SelectItem key={theme.name} value={theme.name}>
                <div className="flex items-center">
                  <img src={theme.image} alt={theme.name} className="w-8 h-8 mr-2 rounded-full object-cover" />
                  <span>{theme.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="mt-4">
          <img 
            src={selectedTheme.image} 
            alt={selectedTheme.name} 
            className="w-full h-40 object-cover rounded-lg"
          />
        </div>
      </CardContent>
    </Card>
  );
}
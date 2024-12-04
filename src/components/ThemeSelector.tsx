import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Theme } from "@/type/GameType";
import pokemonImage from "@/assets/pokemon.png";

const themes: Theme[] = [{ name: "Pokemon", image: pokemonImage }];

interface ThemeSelectorProps {
  onThemeSelect: (theme: Theme) => void;
  className: string;
}

export default function ThemeSelector({ onThemeSelect, className }: ThemeSelectorProps) {
  const [selectedTheme, setSelectedTheme] = useState<Theme>(themes[0]);

  useEffect(() => {
    document.body.style.backgroundImage = `url(${selectedTheme.image})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
  }, [selectedTheme]);

  const handleThemeChange = (value: string) => {
    const theme = themes.find((t) => t.name === value);
    if (theme) {
      setSelectedTheme(theme);
      onThemeSelect(theme);
    }
  };

  return (
    <>
      <Select
        onValueChange={handleThemeChange}
      >
        <SelectTrigger className={className}>
          <SelectValue placeholder="Choisir un thème" />
        </SelectTrigger>
        <SelectContent>
          {themes.map((theme) => (
            <SelectItem key={theme.name} value={theme.name}>
              <div className="flex items-center">
                <img
                  src={theme.image}
                  alt={theme.name}
                  className="w-8 h-8 mr-2 rounded-full object-cover"
                />
                <span>{theme.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import ThemeSelector from "@/components/ThemeSelector";
import { Theme } from "@/type/GameType";

const Home: React.FC = () => {
  const [username, setUsername] = useState("");
  const [level, setLevel] = useState("Facile");
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const navigate = useNavigate();

  const handleThemeSelect = (theme: Theme) => {
    setSelectedTheme(theme);
  };

  const handleStartGame = () => {
    let isValid = true;

    if (!username.trim()) {
      alert("Merci d'entrer un pseudo.");
      isValid = false;
    }

    if (!selectedTheme) {
      alert("Veuillez sélectionner un thème.");
      isValid = false;
    }

    if (isValid) {
      sessionStorage.setItem("username", username.trim());
      sessionStorage.setItem("level", level);
      sessionStorage.setItem("selectedTheme", JSON.stringify(selectedTheme));
      navigate("/game-board");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4 p-4 bg-gray-50">
      <h1 className="text-2xl font-bold">Bienvenue sur MemoryQuest !</h1>
      <Input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Entrez votre pseudo"
      />
      <Select
        value={level}
        onChange={(value) => setLevel(value)}
        options={[
          { label: "Facile", value: "Facile" },
          { label: "Moyen", value: "Moyen" },
          { label: "Difficile", value: "Difficile" },
        ]}
      />
      <ThemeSelector onThemeSelect={handleThemeSelect} />
      <Button onClick={handleStartGame} label="Démarrer le Jeu" />
    </div>
  );
};

export default Home;

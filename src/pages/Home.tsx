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
		<div className="flex flex-col items-center justify-center min-h-screen space-y-6 p-6 bg-gradient-to-r from-rose-300 to-rose-500 text-white">
			<h1 className="text-4xl font-extrabold mb-4">
				Bienvenue sur MemoryQuest !
			</h1>

			<Input
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				placeholder="Entrez votre pseudo"
				className="w-64 p-2 rounded-lg border-none shadow-md focus:outline-none focus:ring-2 focus:ring-purple-300 focus-visible:ring-purple-300 placeholder:text-white"
			/>

			<Select
				value={level}
				onChange={(value) => setLevel(value)}
				options={[
					{ label: "Facile", value: "Facile" },
					{ label: "Moyen", value: "Moyen" },
					{ label: "Difficile", value: "Difficile" },
				]}
				className="w-64 p-2 rounded-lg border-none shadow-md focus:outline-none focus:ring-2 focus:ring-purple-300"
			/>

			<ThemeSelector
				onThemeSelect={handleThemeSelect}
				className="w-64 p-2 rounded-lg border-none shadow-md focus:outline-none focus:ring-2 focus:ring-purple-300"
			/>

			<Button
				onClick={handleStartGame}
				label="Démarrer le Jeu"
				className="mt-4 px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
			/>
		</div>
	);
};

export default Home;

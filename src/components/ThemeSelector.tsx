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

export default function ThemeSelector({
	onThemeSelect,
	className,
}: ThemeSelectorProps) {
	const handleThemeChange = (value: string) => {
		const theme = themes.find((t) => t.name === value);
		if (theme) {
			onThemeSelect(theme);
		}
	};

	return (
		<>
			<Select onValueChange={handleThemeChange}>
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

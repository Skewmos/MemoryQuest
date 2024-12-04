import React from "react";
import Select from "./Select";
import { Difficulty, Level } from "@/type/GameType";
import { getLevel } from "@/hooks/useGameState";

type LevelChangeDialogProps = {
	level: Level;
	setLevel: (level: Level) => void;
};

const LevelChangeDialog: React.FC<LevelChangeDialogProps> = ({
	level,
	setLevel,
}) => {
	return (
		<div className="mb-3">
			<Select
				value={level.difficulty}
				onChange={(value) => setLevel(getLevel(value as Difficulty))}
				options={[
					{ label: "Facile", value: "Facile" },
					{ label: "Moyen", value: "Moyen" },
					{ label: "Difficile", value: "Difficile" },
				]}
				className={""}
			/>
		</div>
	);
};

export default LevelChangeDialog;

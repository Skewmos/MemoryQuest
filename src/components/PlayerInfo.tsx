import React, { useState } from "react";
import Button from "./Button";
import LevelChangeDialog from "./LevelChangeDialog";
import { Difficulty, Level } from "@/type/GameType";
import { getLevel } from "@/hooks/useGameState";

type PlayerInfoProps = {
	playerName: string;
	level: Level;
	setLevel: (level: Level) => void;
};

const PlayerInfo: React.FC<PlayerInfoProps> = ({
	playerName,
	level,
	setLevel,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	return (
		<div className="bg-rose-700 text-white shadow-md w-full text-center fixed top-0 left-0 right-0 p-4">
			<h2 className="text-lg font-bold">Joueur : {playerName}</h2>
			<p className="text-md">Niveau : {level.difficulty}</p>
			<Button
				onClick={openModal}
				label="Changer de niveau"
				className={"bg-rose-600 hover:bg-rose-900"}
			></Button>

			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white p-6 rounded shadow-lg">
						<h3 className="text-lg font-semibold mb-4 text-blue-500 ">
							Changer le niveau
						</h3>
						<LevelChangeDialog
							level={level}
							setLevel={(newLevel) => {
								setLevel(getLevel(newLevel.difficulty as Difficulty));
								closeModal();
							}}
						/>
						<Button onClick={closeModal} label="Fermer" className={""} />
					</div>
				</div>
			)}
		</div>
	);
};

export default PlayerInfo;

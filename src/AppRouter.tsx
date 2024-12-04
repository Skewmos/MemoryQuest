import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import GameBoard from "./pages/GameBoard";

const AppRouter: React.FC = () => (
	<Router>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/game-board" element={<GameBoard />} />
		</Routes>
	</Router>
);

export default AppRouter;

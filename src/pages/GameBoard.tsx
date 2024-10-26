import React from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/card';

const GameBoard: React.FC = () => {
  const username = sessionStorage.getItem('username');
  const level = sessionStorage.getItem('level');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <Card className="w-full max-w-md p-4">
        <CardHeader>
          <h1 className="text-xl font-semibold">Plateau de Jeu</h1>
        </CardHeader>
        <CardContent>
          <p>Bienvenue, <span className="font-bold">{username}</span> !</p>
          <p>Niveau sélectionné : <span className="font-bold">{level}</span></p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameBoard;

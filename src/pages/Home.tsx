import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';

const Home: React.FC = () => {
  const [username, setUsername] = useState('');
  const [level, setLevel] = useState('Facile');
  const navigate = useNavigate();

  const handleStartGame = () => {
    if (username.trim()) {
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('level', level);
      navigate('/game-board');
    } else {
      alert("Merci d'entrer un pseudo.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4 p-4 bg-gray-50">
      <h1 className="text-2xl font-bold">Bienvenue sur MemoryQuest !</h1>
      <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Entrez votre pseudo" />
      <Select
        value={level}
        onChange={(value) => setLevel(value)}
        options={[
          { label: 'Facile', value: 'Facile' },
          { label: 'Moyen', value: 'Moyen' },
          { label: 'Difficile', value: 'Difficile' },
        ]}
      />
      <Button onClick={handleStartGame} label="Démarrer le Jeu" />
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/GameSelect.css';

const GameSelect = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);

  const gameTypes = [
    {
      id: 'sokoban',
      name: 'Sokoban-style',
      description: 'Grid-based puzzle where the player pushes boxes onto goal tiles.',
      image: '/Sokoban_ani.gif'
    },
    {
      id: 'topdown',
      name: 'Top-down',
      description: 'Tile-based 2D RPG-style navigation and interaction.',
      image: '/top_down.gif'
    },
    {
      id: 'custom',
      name: 'Custom Game',
      description: 'Design your own game with unique rules and layout.',
      image: '/other.gif'
    }
  ];

  useEffect(() => {
    const mockGames = [
      { id: 1, title: 'Sokoban Level 1' },
      { id: 2, title: 'Puzzle Challenge' }
    ];
    setGames(mockGames);
  }, []);

  const handleGameTypeSelect = (typeId) => {
    const selectedType = gameTypes.find((type) => type.id === typeId);
    if (selectedType) {
      localStorage.setItem('selectedGameTypeData', JSON.stringify(selectedType));
      navigate('/create');
    }
  };

  return (
    <div className="dashboard-container">
      <h1>🎮 Game Design Platform</h1>

      <section className="game-type-select">
        <h2>Create New Game</h2>
        <div className="game-type-options">
          {gameTypes.map((type) => (
            <div key={type.id} className="game-type-card">
              <img src={type.image} alt={type.name} />
              <h3>{type.name}</h3>
              <p>{type.description}</p>
              <button className="select-btn" onClick={() => handleGameTypeSelect(type.id)}>
                Choose
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="my-games">
        <h2>My Games</h2>
        {games.length === 0 ? (
          <p className="empty-msg">No games yet. Start building!</p>
        ) : (
          <ul className="game-list">
            {games.map((game) => (
              <li key={game.id} className="game-item">
                <span>🎮 {game.title}</span>
                <button className="btn btn-edit" onClick={() => alert(`Editing ${game.title}`)}>
                  Edit
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <button className="btn btn-play" onClick={() => alert('Play Game clicked!')}>
        ▶️ Play Game
      </button>
    </div>
  );
};

export default GameSelect;

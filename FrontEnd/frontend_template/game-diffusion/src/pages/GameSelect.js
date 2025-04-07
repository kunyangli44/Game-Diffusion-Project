import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/GameSelect.css';

const GameSelect = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <h1>Game Design Platform</h1>
            <button className="btn btn-build" onClick={() => navigate('/create')}>
                Build Game
            </button>
            <button className="btn btn-play" onClick={() => alert('Play Game clicked!')}>
                Play Game
            </button>
        </div>
    );
};

export default GameSelect;
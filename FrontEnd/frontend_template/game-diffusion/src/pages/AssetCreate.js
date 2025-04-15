import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/AssetCreate.css';

const AssetCreate = ({ title, nextPath, backPath, confirmPath, previewImage }) => {

  const canvasRef = useRef(null);
  const [showImage, setShowImage] = useState(false);
  const [gameType, setGameType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedGameType = localStorage.getItem('selectedGameTypeData');
    if (storedGameType) {
      setGameType(JSON.parse(storedGameType));
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#000';
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let drawing = false;
    canvas.addEventListener('mousedown', (e) => {
      drawing = true;
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
    });
    canvas.addEventListener('mousemove', (e) => {
      if (drawing) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
      }
    });
    canvas.addEventListener('mouseup', () => { drawing = false; });
    canvas.addEventListener('mouseout', () => { drawing = false; });

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <div className="container">
      <h1>{title}</h1>
      {gameType && (
        <div className="selected-game-info">
          <img src={gameType.image} alt={gameType.name} className="game-preview-gif" />
          <h2>{gameType.name}</h2>
          <p>{gameType.description}</p>
        </div>
      )}
      <div className="nav-buttons">
        {backPath && (
          <button className="btn btn-back" onClick={() => navigate(backPath)}>
            ⬅ Back
          </button>
        )}
        <button
          className="btn btn-clear"
          onClick={() => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }}
        >
          Clear
        </button>
      </div>

      <div className="top-section">
        <div className="left-half">
          <canvas ref={canvasRef}></canvas>
        </div>
        <div className="right-half">
          <textarea placeholder="Enter your prompt here..."></textarea>
        </div>
      </div>

      <div className="create-section">
        <button className="btn btn-create" onClick={() => setShowImage(true)}>
          Create
        </button>
      </div>

      {showImage && (
        <div className="bottom-section show">
          <p>Generated Preview:</p>
          <img src={previewImage || "/placeholder.jpg"} alt="Preview" className="preview-image" />
          <div className="confirm-section">
            <button className="btn btn-confirm" onClick={() => navigate(confirmPath || nextPath)}>
              Confirm and Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetCreate;

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/CharacterCreate.css';

const CharacterCreate = () => {
    const canvasRef = useRef(null);
    const [showImage, setShowImage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
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
            <h1>Create Your Game Character</h1>
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
                <div className="bottom-section">
                    <p>Generated Character Image:</p>
                    <img
                        src="https://via.placeholder.com/600x400?text=Character+Image"
                        alt="Character"
                    />
                    <div className="confirm-section">
                        <button className="btn btn-confirm" onClick={() => navigate('/map')}>
                            Confirm Character
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CharacterCreate;

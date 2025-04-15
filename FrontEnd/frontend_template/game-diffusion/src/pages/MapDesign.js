import React, { useEffect } from 'react';
import './styles/MapDesign.css';
import { useNavigate } from 'react-router-dom';

const MapDesign = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const mapFrame = document.getElementById('mapFrame');
    const paletteBox = document.getElementById('boxTemplate');
    const trashBin = document.getElementById('trashBin');

    paletteBox.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('type', 'new-box');
    });

    function enableDragMove(box) {
      box.setAttribute('draggable', true);
      box.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('type', 'move-box');
        e.dataTransfer.setData('id', box.id);
      });
    }

    mapFrame.addEventListener('dragover', (e) => e.preventDefault());
    mapFrame.addEventListener('drop', (e) => {
      e.preventDefault();
      const type = e.dataTransfer.getData('type');

      if (type === 'new-box') {
        const newBox = paletteBox.cloneNode(true);
        newBox.classList.remove('palette-box');
        newBox.classList.add('draggable-box');
        newBox.removeAttribute('id');

        const img = document.createElement('img');
        img.src = '/box.png';
        img.alt = 'Box';
        img.className = 'box-image';
        newBox.innerHTML = ''; 
        newBox.appendChild(img);

        const uniqueId = `box-${Date.now()}`;
        newBox.setAttribute('id', uniqueId);
        newBox.style.position = 'absolute';
        newBox.style.left = `${e.clientX - mapFrame.getBoundingClientRect().left - 40}px`;
        newBox.style.top = `${e.clientY - mapFrame.getBoundingClientRect().top - 40}px`;

        enableDragMove(newBox);
        mapFrame.appendChild(newBox);
      }

      if (type === 'move-box') {
        const draggedId = e.dataTransfer.getData('id');
        const box = document.getElementById(draggedId);
        if (box && mapFrame.contains(box)) {
          box.style.left = `${e.clientX - mapFrame.getBoundingClientRect().left - 40}px`;
          box.style.top = `${e.clientY - mapFrame.getBoundingClientRect().top - 40}px`;
        }
      }
    });

    // Add trash bin 
    trashBin.addEventListener('dragover', (e) => e.preventDefault());
    trashBin.addEventListener('drop', (e) => {
      const id = e.dataTransfer.getData('id');
      const el = document.getElementById(id);
      if (el) el.remove();
      trashBin.classList.remove('active');
    });

    trashBin.addEventListener('dragenter', () => trashBin.classList.add('active'));
    trashBin.addEventListener('dragleave', () => trashBin.classList.remove('active'));

    const existingBoxes = mapFrame.querySelectorAll('.draggable-box');
    existingBoxes.forEach(enableDragMove);

    document.getElementById('finishBtn').addEventListener('click', () => {
      alert('Mapping finished!');
    });
  }, []);

  return (
    <div className="map-container">
      <h1>Design Your Map</h1>

      <div id="mapFrame"></div>

      <div className="bottom-controls">
        <div id="palette">
          <div className="palette-box" draggable="true" id="boxTemplate">
            <img src="/box.png" alt="Box" className="box-image" />
          </div>
        </div>
        <div id="trashBin">🗑 Drop Here to Delete</div>
      </div>

      <div className="button-group">
        <button className="btn btn-back" onClick={() => navigate(-1)}>
          ⬅ Previous Page
        </button>
        <button className="btn btn-back" onClick={() => navigate('/dashboard')}>
          🏠 Back to Dashboard
        </button>
        <button
          className="btn btn-clear"
          onClick={() => {
            const mapFrame = document.getElementById('mapFrame');
            const boxes = mapFrame.querySelectorAll('.draggable-box');
            boxes.forEach(box => box.remove());
          }}
        >
          Clear
        </button>
        <button id="finishBtn" className="btn btn-finish">
          Finishing Mapping
        </button>
      </div>
    </div>
  );
};

export default MapDesign;

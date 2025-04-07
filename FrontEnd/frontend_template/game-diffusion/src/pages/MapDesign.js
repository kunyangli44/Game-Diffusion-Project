import React, { useEffect } from 'react';
import './styles/MapDesign.css';

const MapDesign = () => {
    useEffect(() => {
        const mapFrame = document.getElementById('mapFrame');
        const paletteBox = document.getElementById('boxTemplate');

        mapFrame.addEventListener('dragover', (e) => e.preventDefault());

        mapFrame.addEventListener('drop', (e) => {
            e.preventDefault();
            const newBox = paletteBox.cloneNode(true);
            newBox.classList.remove('palette-box');
            newBox.classList.add('draggable-box');
            newBox.removeAttribute('id');

            const frameRect = mapFrame.getBoundingClientRect();
            const offsetX = e.clientX - frameRect.left - newBox.offsetWidth / 2;
            const offsetY = e.clientY - frameRect.top - newBox.offsetHeight / 2;
            newBox.style.left = `${offsetX}px`;
            newBox.style.top = `${offsetY}px`;

            makeDraggable(newBox);
            newBox.addEventListener('dblclick', () => mapFrame.removeChild(newBox));

            mapFrame.appendChild(newBox);
        });

        function makeDraggable(box) {
            box.addEventListener('mousedown', (e) => {
                e.preventDefault();
                const shiftX = e.clientX - box.getBoundingClientRect().left;
                const shiftY = e.clientY - box.getBoundingClientRect().top;

                function moveAt(pageX, pageY) {
                    const frameRect = mapFrame.getBoundingClientRect();
                    let newLeft = pageX - frameRect.left - shiftX;
                    let newTop = pageY - frameRect.top - shiftY;
                    newLeft = Math.max(0, Math.min(newLeft, mapFrame.clientWidth - box.offsetWidth));
                    newTop = Math.max(0, Math.min(newTop, mapFrame.clientHeight - box.offsetHeight));
                    box.style.left = `${newLeft}px`;
                    box.style.top = `${newTop}px`;
                }

                function onMouseMove(e) {
                    moveAt(e.pageX, e.pageY);
                }

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', function mouseUpHandler() {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', mouseUpHandler);
                });
            });

            box.ondragstart = () => false;
        }

        document.getElementById('finishBtn').addEventListener('click', () => {
            alert('Mapping finished!');
        });
    }, []);

    return (
        <div className="map-container">
            <h1>Design Your Map</h1>
            <div id="mapFrame"></div>
            <div id="palette">
                <div className="palette-box" draggable="true" id="boxTemplate">Box</div>
            </div>
            <button id="finishBtn">Finishing Mapping</button>
        </div>
    );
};

export default MapDesign;
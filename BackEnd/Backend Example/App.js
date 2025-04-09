import React, { useState } from 'react';

function App() {
  const [imageUrl, setImageUrl] = useState(null);

  const fetchImage = async () => {
    const response = await fetch('http://localhost:5000/generate-image');
    const blob = await response.blob();
    const imageObjectURL = URL.createObjectURL(blob);
    setImageUrl(imageObjectURL);
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
      <button onClick={fetchImage}>Generate Noisy Image</button>
      {imageUrl && (
        <div style={{ marginTop: '2rem' }}>
          <img src={imageUrl} alt="Generated" />
        </div>
      )}
    </div>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import GameSelect from './pages/GameSelect';
import CharacterCreate from './pages/CharacterCreate';
import MapDesign from './pages/MapDesign';

function App() {
  console.log("!!!App.js loaded!!!");

  return (
      <Routes>
        <Route path="/" element={<GameSelect />} />
        <Route path="/create" element={<CharacterCreate />} />
        <Route path="/map" element={<MapDesign />} />
      </Routes>
  );
}

export default App;

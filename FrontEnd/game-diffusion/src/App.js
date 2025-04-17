import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Auth pages
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

// Core pages
import Landing from './pages/Landing';
import GameSelect from './pages/GameSelect';
import CharacterCreate from './pages/CharacterCreate';
// import MapDesign from './pages/MapDesign';
import Editor from "./pages/Editor";

// Asset creation pages
import BoxCreate from './pages/BoxCreate';
import WallCreate from './pages/WallCreate';
import FloorCreate from './pages/FloorCreate';
import GoalCreate from './pages/GoalCreate';
import BackgroundCreate from './pages/BackgroundCreate';

function App() {
  console.log("!!!App.js loaded!!!");

  return (
    <GoogleOAuthProvider clientId="1065858595235-it1bfucl10n4737pdd2hcsisb64pktl6.apps.googleusercontent.com">
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Core Navigation */}
        <Route path="/dashboard" element={<GameSelect />} />
        <Route path="/create" element={<CharacterCreate />} />

        {/* Asset Creation */}
        <Route path="/box" element={<BoxCreate />} />
        <Route path="/wall" element={<WallCreate />} />
        <Route path="/floor" element={<FloorCreate />} />
        <Route path="/goal" element={<GoalCreate />} />
        <Route path="/background" element={<BackgroundCreate />} />

        {/* Game Editor Page */}
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;

import React, { useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import './styles/authToggle.css';

export default function Landing() {
  const [isSignup, setIsSignup] = useState(true);

  return (
    <div className="landing-container">
      <h1 className="landing-title">Welcome to the Game Engine</h1>
      <h2 className="welcome-subtitle">
        {isSignup ? "Start Creating 🎮" : "Welcome Back 👾👻"}
      </h2>
      <p className="welcome-message">
        {isSignup 
          ? "New here? Join us and start crafting your own Sokoban-style puzzle worlds!🚀🧩" 
          : "Log in to keep building, testing, or playing your creations! 😃"}
      </p>


      <div className="auth-toggle">
        <button 
          className={isSignup ? 'active' : ''} 
          onClick={() => setIsSignup(true)}
        >
          Sign Up
        </button>
        <button 
          className={!isSignup ? 'active' : ''} 
          onClick={() => setIsSignup(false)}
        >
          Sign In
        </button>
      </div>

      {isSignup ? <SignUp /> : <SignIn />}
    </div>
  );
}

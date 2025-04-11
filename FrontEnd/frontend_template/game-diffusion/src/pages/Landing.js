import React, { useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import './styles/authToggle.css';

export default function LandingPage() {
  const [isSignup, setIsSignup] = useState(true);

  return (
    <div className="landing-container">
      <h1 className="landing-title">Welcome to the Game Engine</h1>

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









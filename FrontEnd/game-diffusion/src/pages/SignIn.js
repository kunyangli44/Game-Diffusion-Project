import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import './styles/SignIn.css';

function Signin() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate(); 

  function handleChange(event) {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetch('/api/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        console.log('Signin success:', data);
        alert('Welcome back, ' + data.userId);
        navigate('/dashboard');
      })
      .catch(err => {
        console.error('Signin failed:', err);
        alert('Signin error');
      });
  }

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} /><br />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br />
        <button type="submit">Sign In</button>
      </form>

      <hr />
      <p style={{ textAlign: "center" }}>or sign in with Google</p>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const decoded = jwtDecode(credentialResponse.credential);
          console.log("Google user:", decoded);
          alert(`Welcome back, ${decoded.name} 👋`);
          navigate('/dashboard');
        }}
        onError={() => {
          console.log("Google Sign In Failed");
          alert("Google sign in failed");
        }}
      />
    </div>
  );
}

export default Signin;

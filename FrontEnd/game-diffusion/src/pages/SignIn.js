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

    fetch('http://localhost:8000/api/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    .then(res => {
      if (!res.ok) { 
        return res.json().then(err => { throw new Error(err.detail || 'Signin failed'); });
      }
      return res.json();
    })
    .then(data => {
      console.log('Signin success:', data);
      localStorage.setItem('token', data.access_token);
      alert('Welcome back!');
      navigate('/dashboard');
    })
    .catch(err => {
      console.error('Signin failed:', err);
      alert(err.message); 
    });
  }

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} /><br />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} /><br />
        <button type="submit">Sign In</button>
      </form>

      <hr />
      <p style={{ textAlign: "center" }}>or sign in with Google</p>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const decoded = jwtDecode(credentialResponse.credential);
          console.log("Google user:", decoded);

          // Send the Google token to the backend
          fetch('/api/google-signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: credentialResponse.credential }),
          })
            .then(res => res.json())
            .then(data => {
              alert(`Welcome, ${decoded.name} 👋`);
              navigate('/dashboard');
            })
            .catch(err => {
              console.error('Google signup failed:', err);
              alert('Google signup error');
            });
        }}
        onError={() => {
          console.log("Google Sign Up Failed");
          alert("Google sign up failed");
        }}
      />
    </div>
  );
}

export default Signin;

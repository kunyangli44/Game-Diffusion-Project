import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import './styles/SignUp.css';

function SignUp() {
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: ''
  });

  const navigate = useNavigate(); 

  function handleChange(event) {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetch('http://localhost:8000/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(err => { throw new Error(err.detail || 'Signup failed'); });
      }
      return res.json();
    })
    .then(data => {
      console.log('Signup success:', data);
      localStorage.setItem('token', data.access_token);
      alert(`Welcome, ${data.username}!`);
      navigate('/dashboard');
    })
    .catch(err => {
      console.error('Signup failed:', err);
      alert(err.message); 
    });
  }

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} /><br />
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} /><br />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} /><br />
        <button type="submit">Sign Up</button>
      </form>

      <hr />
      <p style={{ textAlign: "center" }}>or sign up with Google</p>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const decoded = jwtDecode(credentialResponse.credential);
          console.log("Google user:", decoded);

          // Send the Google token to the backend
          fetch('/api/google-signup', {
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

export default SignUp;

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

    fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        console.log('Signup success:', data);
        alert('Welcome, ' + data.userId);
        navigate('/dashboard');
      })
      .catch(err => {
        console.error('Signup failed:', err);
        alert('Signup error');
      });
  }

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} /><br />
        <input name="username" placeholder="Username" onChange={handleChange} /><br />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br />
        <button type="submit">Sign Up</button>
      </form>

      <hr />
      <p style={{ textAlign: "center" }}>or sign up with Google</p>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const decoded = jwtDecode(credentialResponse.credential);
          console.log("Google user:", decoded);
          alert(`Welcome, ${decoded.name} 👋`);
          navigate('/dashboard');

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

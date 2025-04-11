// Signin.js
import React, { useState } from 'react';
import './styles/SignIn.css';
function Signin() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

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
    </div>
  );
}

export default Signin;

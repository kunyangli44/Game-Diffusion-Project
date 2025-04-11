import React, {useState} from "react";
import './styles/SignUp.css';


function SignUp() {
    const [form, setForm] = useState({
        email: '',
        username:'',
        password:''
    });

    function handleChange(event){
        const {name, value} = event.target;
        setForm(prev => ({...prev, [name]: value}));
    }

    function handleSubmit(event) {
        event.preventDefault(); // prevent page reload
    
        // Send data to backend
        fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        })
          .then(res => res.json())
          .then(data => {
            console.log('Signup success:', data);
            alert('Welcome, ' + data.userId);
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
        </div>
      );
    }
    
    export default SignUp;
    




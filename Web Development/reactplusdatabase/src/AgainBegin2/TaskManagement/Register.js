import React, { useState } from 'react';
import { register, sendEmailVerification } from './auth';
import './Register.css'

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      await sendEmailVerification();
      alert('Registration successful! Please check your email for verification.');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form className='formRegister' onSubmit={handleRegister}>
      <input
          className='inputRegister'
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className='inputRegister'
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='inputRegister'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='divRegister'>        
          <button className='buttonRegister' type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};
export default Register;
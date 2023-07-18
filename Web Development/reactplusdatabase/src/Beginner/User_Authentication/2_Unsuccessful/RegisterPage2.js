import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Register(){
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');
    const handleRegister = async () => {
        try {
          const response = await fetch('/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }), 
          });
          const data = await response.json(); 
    
          if (response.ok) {
            setToken(data.token);
            setMessage('Registration successful!');
          } 
          else {
            setMessage(data.message);
            if (response.status === 409) {
                navigate('/login');            
            }
          }
        } 
        catch (error) {
          console.error(error);
        }
      };
    return(
        <div>
            <h2>Register</h2>
            <form>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
            <Link to="/login">Go to Login</Link>
            </form>
        </div>
    )
}
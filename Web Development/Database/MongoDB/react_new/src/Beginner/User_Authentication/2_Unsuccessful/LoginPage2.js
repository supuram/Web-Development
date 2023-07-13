import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Home from './Home'

export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
    
            if (response.ok) {
                setToken(data.token);
                navigate('/')
                setMessage('Login successful!');
            } 
            else {
                setMessage(data.message);
            }
        } 
        catch (error) {
            console.error(error);
        }
    };
    return(
        <div>
            <h2>Login</h2>
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
                <button onClick={handleLogin}>Login</button>
                <Link to="/Home">Go to Registration</Link>
            </form>
        </div>
    )
}
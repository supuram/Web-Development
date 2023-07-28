import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from 'axios';
import EmailContext from './EmailContext';

export default function PasswordResetPage() {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { email } = useContext(EmailContext);
    const queryParams = new URLSearchParams(location.search);
    const resetToken = queryParams.get('resetToken');

    const handleSubmit = async (event) => {
        event.preventDefault();
        await Axios.post('/Forgot-Password-Form', { resetToken, newPassword: password, email })
        .then(response => {
            if(response.data.token){
                document.cookie = `authToken = ${response.data.token}; path=/`
                navigate('/LoginPage');
            }
        })
        .catch(err => console.log(err))

        Axios.get('/protected-route', {
            headers: {
                Authorization: `Bearer ${getCookie('authToken')}`
            }
        })
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
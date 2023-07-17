import React, {useState, useContext} from "react";
import Axios from 'axios'
import EmailContext from './EmailContext';

export default function ForgotPassword(){
    const [email, setEmail] = useState("");
    const { setEmail: setEmailContext } = useContext(EmailContext);
    const handleSubmit = (event) => {
        event.preventDefault()
        try{
            Axios.post('/Forgot-Password', {email})
            setEmailContext(email);
        }
        catch (error) {
            console.log(error);
        }
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    >
                </input>
                <button type="submit">Sumbit</button>
            </form>
        </div>
    )
}
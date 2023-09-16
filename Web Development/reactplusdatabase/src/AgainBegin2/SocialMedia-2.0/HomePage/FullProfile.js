import React from "react";
import { useNavigate } from 'react-router-dom';
import ProfileImage from './ProfileImage.js'
import ProfileForm from "./ProfileForm.js";
import ImagesUploadedinProfile from './ImagesUploadedinProfile.js'

export default function FullProfile(){
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/LoggedInHomePage')
    }
    
    return(
        <div>
            <button onClick={handleClick}>Home</button>
            <ProfileImage />
            <ProfileForm />
            <ImagesUploadedinProfile />
        </div>
    )
}
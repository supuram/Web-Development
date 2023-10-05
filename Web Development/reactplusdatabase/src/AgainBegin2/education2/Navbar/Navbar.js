import React from "react";
import Button from "./Button.js";
import { useLocation } from 'react-router-dom';

export default function Navbar(){
    const location = useLocation();
    return(
        <div>
            <Button to="/" text="Home" active={location.pathname.startsWith('/')} />
            <Button to="/coding" text="Coding" active={location.pathname.startsWith('/coding')} />
            <Button to="/science" text="Science" active={location.pathname.startsWith('/science')} />
            <Button to='/maths' text='Maths' active={location.pathname.startsWith('/maths')} />
            <Button to='/arts' text='English' active={location.pathname.startsWith('/arts')} />
            <Button to='/jeeneet' text='IITJEE' active={location.pathname.startsWith('/jeeneet')} />
            <Button to="/contactus" text="Contact" active={location.pathname.startsWith('/contactus')} />
        </div>
    )
}
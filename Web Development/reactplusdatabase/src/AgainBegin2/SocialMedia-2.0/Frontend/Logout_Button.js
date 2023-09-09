import React from 'react'
import { Link } from 'react-router-dom';

export default function Logout_Button({onLogout}) {
    return (
        <div>
            <Link 
                onClick={onLogout}
                style={{
                    textDecoration:'none'
                }}>Logout
            </Link>
        </div>
    )
}
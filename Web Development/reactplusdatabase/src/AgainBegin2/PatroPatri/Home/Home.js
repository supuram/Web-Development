import React from "react";
import { Link } from 'react-router-dom'
import './Home.css'

export default function Home(){
    return(
        <div>
            <ul className="ulHomePatro">
                <li><Link to='/giveinfo' className="liHomePatro">Give Unverified Ads</Link></li>
                <li><Link to='/giveinfoverified' className="liHomePatro">Give Verified Ads</Link></li>
                <li><Link to='/' className="liHomePatro">Home</Link></li>
            </ul>
            
        </div>
    )
}
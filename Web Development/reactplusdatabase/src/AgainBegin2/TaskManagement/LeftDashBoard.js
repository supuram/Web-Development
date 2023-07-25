import React from "react";
import { Link } from 'react-router-dom';
import './LeftDashBoard.css'

export default function LeftDashBoard(){
    return(
        <div className="divLeftDashBoard">
            <ul className="ulLeftDashBoard">
                <li><Link to='/home/brainstorm'style={{textDecoration:'none'}}>Brainstorm Ideas</Link></li>
                <li><Link to='/home/employeelist' style={{textDecoration:'none'}}>Employee List</Link></li>
                <li><Link to='/home/codeofconduct' style={{textDecoration:'none'}}>Code of Conduct</Link></li>
                <li><Link to='/home/leave' style={{textDecoration:'none'}}>Apply For Leave</Link></li>
                <li><Link to='/home/leaveapproval' style={{textDecoration:'none'}}>Leave Approval</Link></li>
            </ul>
        </div>
    )
}
import React from 'react';
import {Link} from "react-router-dom";
import "../styles/Header.css";
import logo from "../media/icons/book_logo5.png";


export default function AppHeader() { 
let userConnected = false;
return (
    <div className="AppHeader">
        <div className='headerLogo'>
            <Link to="/home">
                <img src={logo} className="logoImg" alt=""></img>
            </Link>
        </div>
        <div className='menus'>
            <ul className="headerMenu">
                <li className='listItem'>
                    <Link to="/home" className='itemName'>Home</Link>
                </li>
                <li className='listItem'>
                    <Link to="/booking" className='itemName'>Booking</Link>
                </li>
                <li className='listItem'>
                    <Link to="/contact-us" className='itemName'>Contact us</Link>
                </li>
                
                {userConnected === false && <>
                    <li className='listItem'>
                        <Link to="/signup" className='itemName'>Sign in</Link>
                    </li>
                    <li className='listItem'>
                        <Link to="/login" className='itemName'>Log in</Link>
                    </li>
                    
                </>}
                {userConnected === true && 
                <>
                <li className='listItem'>
                    <Link to="/settings" className='itemName'>Settings</Link>
                </li>
                <li className='listItem'>
                    <Link to="/logout" className='itemName'>Log out</Link>
                </li>
                </>
                }
            </ul>
            <ul className='adminMenu'>
                <li className='listItem'>
                    <Link to="/users" className='itemName'>Users</Link>
                </li>
            </ul>
        </div>
    </div>
)}
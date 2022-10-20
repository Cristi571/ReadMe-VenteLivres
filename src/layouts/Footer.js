import React from 'react';
import {Link} from "react-router-dom";

import '../styles/Footer.css';

export default function footer() { return (
    <footer className="AppFooter">
        <div className="footerMenu">
            <ul className="f-learnMore">
                <div className="listTitle">EN SAVOIR PLUS</div>
                <li><Link to="/cookies-settings" className='itemName'>Cookie Settings</Link></li>
                <li><Link to="/cookies-policy" className='itemName'>Cookie Policy</Link></li>
                <li><Link to="/privacy-policy" className='itemName'>Privacy Policy</Link></li>
            </ul>
            <ul className="f-support">
                <div className="listTitle">SUPPORT</div>
                <li><Link to="/contact-us" className='itemName'>Contactez us</Link></li>
                <li><Link to="/faq" className='itemName'>FAQ</Link></li>
            </ul>
        </div>
        
        <div className="footerLabel">
            © Copyright 2022 <Link to="/about-us" className='itemName'> ReadMe</Link> .<br></br>
            All rights reserved.
        </div>
    </footer>
)}

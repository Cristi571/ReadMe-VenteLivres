import React from 'react';
import {Routes, Route} from "react-router-dom";


// Import pages views
import Home from '../views/Home';
import Signup from '../views/Signup';
import Login from '../views/Login';
import Logout from '../views/Logout';
import ContactUs from '../views/ContactUs'

// Admin only accessible pages
import Users from '../views/Users'

// Footer legal pages
import CookieSett from '../views/legal/CookieSettings';
import Cookies from '../views/legal/CookiesPolicy';
import Privacy from '../views/legal/PrivacyPolicy';
import Booking from '../views/Booking';
import Faq from '../views/legal/FAQ';


function Navigation () { return (
    <main className="AppMain">
        <Routes>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
            <Route path="/contact-us" element={<ContactUs />}></Route>
            <Route path="/cookies-settings" element={<CookieSett />}></Route>
            <Route path="/cookies-policy" element={<Cookies />}></Route>
            <Route path="/privacy-policy" element={<Privacy />}></Route>
            <Route path="/faq" element={<Faq />}></Route>
            <Route path="/booking" element={<Booking />}></Route>

            {/* Admin  */}
            <Route path="/users" element={<Users />}></Route>
            <Route path="/users/:id" element={<Users />}></Route>

            {/* Default root application route */}
            <Route path="/" exact element={<Home />}></Route>
        </Routes>
    </main>
);}

export default Navigation;
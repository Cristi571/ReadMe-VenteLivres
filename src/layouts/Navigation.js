import React from 'react';
import {Routes, Route} from "react-router-dom";



// Import pages views
import Home from '../views/Home';
import Signup from '../views/Signup';
import Login from '../views/Login';
import ResetPassword from '../views/ResetPassword';
import Logout from '../views/Logout';
import ContactUs from '../views/ContactUs'
import Settings from '../views/Settings';
// Admin only accessible pages
import Users from '../views/Users'

// Footer legal pages
import CookieSett from '../views/legal/CookieSettings';
import Cookies from '../views/legal/CookiesPolicy';
import Privacy from '../views/legal/PrivacyPolicy';
import Books from '../views/Books';
import Faq from '../views/legal/FAQ';


function Navigation ({localSession, setLocalSession}) { 

return (
    <main className="AppMain">
        <Routes>
            {/* Default page */}
            <Route path="/home" element={<Home />}></Route>

            {/* Check connexion/auth/session */}
            <Route path="/signup" element={<Signup localSession={localSession} setLocalSession={setLocalSession} ></Signup>}></Route>
            <Route path="/login" element={<Login localSession={localSession} setLocalSession={setLocalSession}></Login>}></Route>
            <Route path="/reset-password" element={<ResetPassword localSession={localSession} setLocalSession={setLocalSession} ></ResetPassword>}></Route>
            <Route path="/logout" element={<Logout localSession={localSession} setLocalSession={setLocalSession} ></Logout>}></Route>
            {/* Admin  */}
            <Route path="/users" element={<Users localSession={localSession}/>}></Route>
            <Route path="/users/:id" element={<Users localSession={localSession}/>}></Route>
            <Route path="/settings" element={<Settings localSession={localSession}/>}></Route>

            {/* Free access pages/content */}
            <Route path="/contact-us" element={<ContactUs />}></Route>
            <Route path="/cookies-settings" element={<CookieSett />}></Route>
            <Route path="/cookies-policy" element={<Cookies />}></Route>
            <Route path="/privacy-policy" element={<Privacy />}></Route>
            <Route path="/faq" element={<Faq />}></Route>
            <Route path="/books" element={<Books />}></Route>

            {/* Default root application route */}
            <Route path="/" exact element={<Home />}></Route>
        </Routes>
    </main>
);}

export default Navigation;
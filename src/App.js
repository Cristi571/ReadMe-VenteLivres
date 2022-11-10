
import { React, useState, useEffect } from 'react';

import Header from './layouts/Header';
import Navigation from './layouts/Navigation';
import Footer from './layouts/Footer';
import './styles/App.css';
import {useNavigate} from "react-router-dom";

function App() { 
    function checkLocalSession() {
        let sessionToken = localStorage.getItem('sess_token');
        if(sessionToken) {
            // Local session is set
            let token = sessionToken.substring(1, sessionToken.length-1);
            console.log("token : ", token);
            return token;
        }
        return false; // No local session
    }
    const [localSession, setLocalSession] = useState(checkLocalSession)
    /*
    const navigate = useNavigate();
    useEffect(() => {
        if(localSession) {
            navigate("/home")
        }
    }, [localSession]);
    */

return (
    <div className="App">
        {/* Display the Header section of the page */}
        <Header 
        localSession={localSession}
        ></Header>

        <div>Token : {localSession}</div>

        {/* Display the Current navigation page */}
        <Navigation 
        localSession={localSession}
        setLocalSession={setLocalSession}
        ></Navigation>

        {/* Display the Footer section of the page */}
        <Footer></Footer>
    </div>
);}

export default App;

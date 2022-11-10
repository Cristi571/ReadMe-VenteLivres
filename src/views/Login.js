import React, { useState, useEffect } from 'react';
import "../styles/Login.css"
import {Link, useNavigate} from "react-router-dom";

import { saveToLocal, removeFromLocal} from "../tools/Tools";


export default function Login({localSession, setLocalSession}) {
    // Redirect user to safe page area if there is already a session running
    const navigate = useNavigate();
    useEffect(() => {
        if(localSession) {
            navigate("/home")
        }
    }, [localSession]);

    // ELSE ..
    
    const urlAPI = "http://localhost:3001/api/users/login";
    const [email, setEmail] = useState('');
    const [password, setPassw] = useState('');
    const [errorMess, setInfoMess] = useState(false)

    // No need to check for already existing session
    // because it is already controlled by the auth middlewares
    const handleLogin = async () => {
        // Prepare et send a request to api server
        let result = await fetch(urlAPI, {
            method: 'post',
            body:JSON.stringify({ email, password }),
            headers: { 'Content-Type' : 'application/json' }
        })
        // Wait for a server response
        result = await result.json()
        console.log(result);
        
        /* // Version cookies storage
        
        var now = new Date();
        var time = now.getTime();
        var expireTime = time + 1000*36000;
        console.log(expireTime);
        var data = {
            name : "sess_token",
            value : result.token,
            domain : "",
            path : "/",
            expire : expireTime,
        }
        setMyCookie(data) */

        // Version localStorage of token
        // Try to remove existing session token
        removeFromLocal("sess_token");

        // Set the session token if it is returned by the api
        if (result.token) {
            // Login successful
            saveToLocal("sess_token", result.token);
            setInfoMess("Login successful")
            setLocalSession(result.token)
        } else {
            if (result.message) {
                console.log(result.message)
                setInfoMess(result.message)
            }
        }
    }
    
return (
<div className="accountContainer">
    {!localSession && 
    <div className="formContainer">
        <div className="formTitle">Connect to account</div>
        
            <form id="inscriptForm" className="formBody">

                {errorMess !== false && <div className='error errMess'>{errorMess}</div>}

                <label htmlFor="userEmail">
                    <div className="inputBorder">
                        <input type="email" placeholder="example@mail.com" autoComplete='username'
                        id='userEmail' onChange={(e)=>setEmail(e.target.value)}></input>
                    </div>
                </label>

                <label htmlFor="userPass">
                    <div className="inputBorder">
                        <input type="password" placeholder="StrongPassword" autoComplete='current-password'
                        id='userPass' onChange={(e)=>setPassw(e.target.value)}></input>
                    </div>
                </label>

                {errorMess === "User not found" && 
                <Link to="/signup" className='itemName'>Create account</Link>}
                {errorMess === "Incorrect password" && 
                <Link to="/reset-password" className='itemName'>Forgot password?</Link>}

                <button type="button" className="sbmtForm" onClick={handleLogin}>Submit</button>
            </form>
    </div>
    }
</div>

)}




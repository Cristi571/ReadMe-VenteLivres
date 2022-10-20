import React, { useState } from 'react';
import "../styles/Login.css"


export default function Login() {

    const urlAPI = "http://localhost:3001/api/users/login";
    const [email, setEmail] = useState('');
    const [password, setPassw] = useState('');

    const handleLogin = async () => {
        let result = await fetch(urlAPI, {
            method: 'post',
            body:JSON.stringify({ email, password }),
            headers: { 'Content-Type' : 'application/json' }
        })
        result = await result.json()
        console.log(result)
    }
    
return (
<div className="accountContainer">
    <div className="formContainer">
        <div className="formTitle">Connect to account</div>
            <div id="inscriptForm" className="formBody">
                <label htmlFor="userEmail">
                    <div className="inputBorder">
                        <input type="email" placeholder="example@mail.com"
                        id='userEmail' onChange={(e)=>setEmail(e.target.value)}></input>
                    </div>
                </label>
                <label htmlFor="userPass">
                    <div className="inputBorder">
                        <input type="password" placeholder="StrongPassword"
                        id='userPass' onChange={(e)=>setPassw(e.target.value)}></input>
                    </div>
                </label>
                <button type="submit" className="sbmtForm"
                onClick={handleLogin}>Submit</button>
            </div>
    </div>
</div>

)}




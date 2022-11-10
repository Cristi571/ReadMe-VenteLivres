import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";

export default function Signup({localSession}) {
    const navigate = useNavigate();
    // Redirect user to home page if local session is set
    useEffect(() => {
        if(localSession) {
            navigate("/home");
        }
    }, [localSession]);
    
    const urlAPI = "http://localhost:3001/api/users/signup";

    const [firstname, setFname] = useState('');
    const [lastname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassw] = useState('');
    const [infoMess, setInfoMess] = useState(false);

    // Verification and Validation of the user input
    const handleInput = (atr, input) => {
        function capitalizeWords(input) {
            // Capitalize the names splitted by spaces
            const words1 = input.split(" ");
            let res = words1.map((word) => {
                try {
                    return word[0].toUpperCase() + word.substring(1); 
                } catch (error) {}
            }).join(" ");

            // Capitalize the names splitted by -
            const words2 = res.split("-");
            return words2.map((word) => {
                try {
                    return word[0].toUpperCase() + word.substring(1); 
                } catch (error) {}
            }).join("-");
        }
        if (atr === "fname") {
            setFname(capitalizeWords(input));
        } else if (atr === "lname") {
            setLname(capitalizeWords(input));
        }
    }

    const handleSignup = async () => {
        // Send api request to server
        let result = await fetch(urlAPI, {
            method: 'post',
            body:JSON.stringify({ firstname, lastname, email, password }),
            headers: { 'Content-Type' : 'application/json' }
        })
        // Wait for the server response
        result = await result.json()
        // Verify the server response
        if (result.message) {
            if (result.message === 'User account created successfully.') {
                // Redirect user to login page after sucessful registration
                navigate("/login");
            }
        }
        console.log(result)
    }
    
return (
<div className="accountContainer">
    <div className="formContainer">
        <div className="formTitle">Create account</div>
            <form id="inscriptForm" className="formBody">
                <label htmlFor="userFname">
                    <div className="inputBorder">
                        <input type="text" placeholder="Brad" id='userFname'
                        onChange={(e)=>handleInput("fname", e.target.value)}></input>
                    </div>
                </label>
                <label htmlFor="userLname">
                    <div className="inputBorder">
                        <input type="text" placeholder="Pitt" id='userLname'
                        onChange={(e)=>handleInput("lname", e.target.value)}></input>
                    </div>
                </label>
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
                <button type="button" className="sbmtForm" onClick={handleSignup}>Submit</button>
            </form>
    </div>
</div>

)}




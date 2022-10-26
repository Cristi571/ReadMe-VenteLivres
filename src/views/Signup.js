import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";

export default function Signup() {
    const navigate = useNavigate();
    const urlAPI = "http://localhost:3001/api/users/signup";

    const [firstname, setFname] = useState('');
    const [lastname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassw] = useState('');

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
        // console.log("fname : " + firstname)
        // console.log("lname : " + lastname)
        // console.log("email : " + email)
        // console.log("passw : " + password)
        let result = await fetch(urlAPI, {
            method: 'post',
            body:JSON.stringify({ firstname, lastname, email, password }),
            headers: { 'Content-Type' : 'application/json' }
        })
        result = await result.json()
        if (result.message) {
            if (result.message === 'User account created successfully.') {
                navigate("/login")
            }
        }
        console.log(result)
    }
    
return (
<div className="accountContainer">
    <div className="formContainer">
        <div className="formTitle">Create account</div>
            <div id="inscriptForm" className="formBody">
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
                onClick={handleSignup}>Submit</button>
            </div>
    </div>
</div>

)}




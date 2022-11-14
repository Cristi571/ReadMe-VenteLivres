

import { React, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { removeFromLocal } from "../tools/Tools";


export default function Logout({localSession, setLocalSession}) {    
    // Redirect user to safe page area if there is already a session running
    const navigate = useNavigate();
    useEffect(() => {
        if(localSession) {
            handleLogout();
        } else {
            navigate("/home");
        }
    }, [localSession]);



    const [infoMess, setInfoMess] = useState(false)

    const urlAPI = "http://localhost:3001/api/users/logout";
    const handleLogout = async () => {
        // Prepare et send a request to api server
        var bearer = 'Bearer ' + localSession;
        let result = await fetch(urlAPI, {
            method: 'post',
            headers: { 
                'Authorization': bearer,
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        })
        // Wait for a server response
        result = await result.json()
        // console.log(result);
        removeFromLocal("sess_token");
        // Set the session token if it is returned by the api
        if (result.message) {
            if (result.message === "Auth failed") {
                // Logout failed
                setInfoMess("Bad token")
                setLocalSession(false)
                navigate("/home");
            }
            if (result.message === "User logged out") {
                // Logout successful
                setInfoMess("Logout successful")
                setLocalSession(false)
                navigate("/home");
            }
        }
        
    }

    return (
        <>
        <div>{infoMess}</div>
        </>
    )
}
